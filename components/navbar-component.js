export default {
  name: 'navbar-component',
  setup() {
    const authState = Vue.inject('authState');
    const supabaseAuth = Vue.inject('supabaseAuth');

    return {
      authState,
      supabaseAuth,
    };
  },
  methods: {
    handleAuthAction() {
      if (this.authState.user) {
        this.supabaseAuth.signOut();
        return;
      }

      if (!this.authState.isConfigured) {
        window.alert('Supabase is not configured yet. Add your URL and anon key to enable login and database access.');
        return;
      }

      const email = window.prompt('Enter your email to sign in with Supabase:');
      if (email) {
        this.supabaseAuth.signIn(email.trim());
      }
    },
  },
  template: /* html */ `
    <nav class="navbar sticky-top bg-white border-bottom px-3 site-nav" aria-label="Main navigation">
      <router-link class="navbar-brand mb-0" to="/">
        <img src="./bow.jpg" alt="" class="site-logo me-2" />
        <span>Wellness Waiver Support</span>
      </router-link>

      <div class="ms-auto d-flex gap-2 site-nav-links align-items-center">
        <router-link class="btn btn-outline-primary btn-sm" to="/">
          <i class="bi bi-house me-1"></i>Home
        </router-link>
        <router-link class="btn btn-outline-primary btn-sm d-flex align-items-center" to="/items">
          <i class="bi bi-heart-pulse me-1"></i>Services
        </router-link>
        <router-link class="btn btn-outline-primary btn-sm" to="/about">
          <i class="bi bi-info-circle me-1"></i>About
        </router-link>

        <button
          type="button"
          class="btn btn-sm"
          :class="authState.user ? 'btn-outline-secondary' : 'btn-primary'"
          @click="handleAuthAction"
        >
          {{ authState.user ? 'Log out' : 'Log in' }}
        </button>
      </div>
    </nav>
  `,
};
