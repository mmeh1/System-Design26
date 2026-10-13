import json
import os
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import urlparse
from urllib import request

from dotenv import load_dotenv

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
load_dotenv(dotenv_path=os.path.join(BASE_DIR, '.env'))
load_dotenv(dotenv_path=os.path.join(BASE_DIR, '.env.example'))

PORT = int(os.getenv('PORT', '8001'))
APP_NAME = os.getenv('APP_NAME', 'Wellness Waiver Support')
OPENROUTER_MODEL = os.getenv('OPENROUTER_MODEL', 'openai/gpt-4o-mini')
OPENROUTER_API_KEY = os.getenv('OPENROUTER_API_KEY', '')
OPENROUTER_BASE_URL = os.getenv('OPENROUTER_BASE_URL', 'https://openrouter.ai/api/v1/chat/completions')
APP_URL = os.getenv('APP_URL', 'http://localhost:8000')

try:
    from agno.agent import Agent  # type: ignore
    from agno.models.openrouter import OpenRouter  # type: ignore
except ImportError:  # pragma: no cover - optional dependency
    Agent = None
    OpenRouter = None


def ask_with_agno(prompt: str) -> str:
    if Agent is None or OpenRouter is None:
        raise RuntimeError('Agno is not installed. Install the project requirements before using the AI agent path.')

    agent = Agent(
        model=OpenRouter(id=OPENROUTER_MODEL),
        instructions='You help explain waiver services clearly and safely.',
    )
    result = agent.run(prompt)
    if hasattr(result, 'content'):
        return str(result.content)
    return str(result)


def ask_openrouter(prompt: str) -> str:
    if not OPENROUTER_API_KEY:
        raise RuntimeError('OPENROUTER_API_KEY is not configured. Set the key before using the AI service.')

    payload = {
        'model': OPENROUTER_MODEL,
        'messages': [
            {'role': 'user', 'content': prompt},
        ],
    }

    headers = {
        'Authorization': f'Bearer {OPENROUTER_API_KEY}',
        'Content-Type': 'application/json',
        'HTTP-Referer': APP_URL,
        'X-Title': APP_NAME,
    }

    req = request.Request(
        OPENROUTER_BASE_URL,
        data=json.dumps(payload).encode('utf-8'),
        headers=headers,
        method='POST',
    )

    with request.urlopen(req, timeout=30) as response:
        body = response.read().decode('utf-8')

    result = json.loads(body)
    return result['choices'][0]['message']['content']


def generate_answer(prompt: str) -> dict:
    if Agent is not None and OpenRouter is not None and OPENROUTER_API_KEY:
        try:
            return {'answer': ask_with_agno(prompt), 'provider': 'agno'}
        except Exception:
            pass

    if OPENROUTER_API_KEY:
        try:
            return {'answer': ask_openrouter(prompt), 'provider': 'openrouter'}
        except Exception as exc:  # pragma: no cover - network error handling
            return {'error': f'OpenRouter request failed: {exc}', 'provider': 'openrouter'}

    return {
        'answer': (
            'The AI service is ready, but OPENROUTER_API_KEY is not configured yet. '
            'Add the key to the environment and restart the service to enable live responses.'
        ),
        'provider': 'demo',
    }


class AIRequestHandler(BaseHTTPRequestHandler):
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', 'http://localhost:8000')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        self.send_header('Content-Length', '0')
        self.end_headers()

    def do_GET(self):
        parsed = urlparse(self.path)
        if parsed.path == '/health':
            payload = {
                'status': 'ok',
                'name': APP_NAME,
                'model': OPENROUTER_MODEL,
                'provider': 'openrouter' if OPENROUTER_API_KEY else 'demo',
            }
            self._send_json(payload)
            return

        self._send_json({'error': 'Not found'}, status=404)

    def do_POST(self):
        parsed = urlparse(self.path)
        if parsed.path not in ('/api/ask', '/ask'):
            self._send_json({'error': 'Not found'}, status=404)
            return

        try:
            content_length = int(self.headers.get('Content-Length', '0'))
            raw = self.rfile.read(content_length) if content_length > 0 else b'{}'
            payload = json.loads(raw.decode('utf-8')) if raw else {}
        except json.JSONDecodeError:
            self._send_json({'error': 'Request body must be valid JSON.'}, status=400)
            return

        prompt = str(payload.get('prompt') or payload.get('message') or '').strip()
        if not prompt:
            self._send_json({'error': 'A prompt is required.'}, status=400)
            return

        response = generate_answer(prompt)
        self._send_json(response)

    def _set_cors_headers(self):
        self.send_header('Access-Control-Allow-Origin', 'http://localhost:8000')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')

    def _send_json(self, payload, status=200):
        body = json.dumps(payload).encode('utf-8')
        self.send_response(status)
        self._set_cors_headers()
        self.send_header('Content-Type', 'application/json')
        self.send_header('Content-Length', str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def log_message(self, fmt, *args):
        return


if __name__ == '__main__':
    server = ThreadingHTTPServer(('0.0.0.0', PORT), AIRequestHandler)
    print(f'AI service running on http://localhost:{PORT}')
    server.serve_forever()
