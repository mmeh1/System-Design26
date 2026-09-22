# Plan — Health and Wellness Waiver Web Page

> Written after specification. Every decision here must trace back to a requirement ID.

The plan uses these labels: **R1** pages, **R2** navigation, **R3** data, **R4** service cards, **R5** card content, **R6** detail links, and **R7** item details.

## 1. Approach Summary
We will build a simple web page for health and wellness waiver services. Users will see the available services, read about each one, and learn what to do next. We will start with sample data, then add Supabase and the Python service later.

## 1.5 Tech Stack
- Frontend: No-build Vue 3, Vue Router, Bootstrap, Bootstrap icons, and marked.js.
- Backend/DB: Supabase for login and service data.
- Hosting: GitHub Pages for the web page, Supabase for data, and Railway for the Python service.
- Other services/APIs: OpenRouter for LLM responses.

## 2. Key Decisions (ADRs)

| ADR # | Decision | Traces to (R#) | Alternatives considered | Why this one |
|-------|----------|------------------|---------------------------|----------------|
| ADR-00 | Use no-build Vue 3 | R1, R2, R4, R6 | React with Vite | Keeps the web page simple |
| ADR-01 | Use sample data first | R3, R4, R5, R7 | Start with a live database | Lets us build and test the page quickly |
| ADR-02 | Use Supabase later | R1–R7 | Firebase, custom database | Provides login and data storage in one place |
| ADR-03 | Use a Python service for AI | R7 | Run AI in the browser | Keeps private keys off the web page |
| ADR-04 | Host the page on GitHub Pages | R1–R7 | Use one host for everything | Works well for a simple web page |

## 3. Components / Building Blocks
List the major pieces (screens, services, data stores). No code — just names and purpose.

| Component | Purpose | Related requirements |
|-----------|---------|------------------------|
| Home page | Introduces the waiver resource | R1, R2 |
| Services page | Lists the available waiver services | R1, R3, R4, R5 |
| Service detail page | Shows details, eligibility, and next steps | R1, R6, R7 |
| About page | Explains the provider and resource | R1, R2 |
| Navigation bar | Links the main pages | R2 |
| Sample data | Provides service information for the first version | R3, R4, R5, R7 |
| Supabase | Stores login and service data later | R1–R7 |
| Python service | Handles AI requests later | R7 |

## 4. Dependencies & Assumptions
- External services/tools needed: Vue 3, Vue Router, Bootstrap, Supabase, GitHub Pages, Railway, Python, Agno, and OpenRouter.
- Assumptions being made (flag anything unverified):
	- Service content fits the item shape: `id`, `name`, `description`, `category`, `image_url`, and `location`.
	- Sample data is enough for the first version.
	- Supabase will be available for a later version.
	- The provider will confirm eligibility information.
	- GitHub Pages can host the web page.

## 5. Risks

| Risk | Likelihood | Impact | Mitigation | Owner |
|------|------------|--------|------------|-------|
| Service information is unclear | Medium | High | Ask the provider to review it | Product owner |
| Service data does not load | Medium | High | Show an error message and test it | Development team |
| Backend setup takes too long | Medium | Medium | Finish the basic web page first | Development team |
| AI gives a wrong answer | Medium | High | Have the provider review AI responses | Product owner / development team |
| Private keys are exposed | Low | High | Keep keys on the Python server | Development team |

## 6. Sequencing
1. Confirm the waiver service information.
2. Build the simple Vue web page and navigation.
3. Add sample service data and service detail pages.
4. Test the pages, links, and error message.
5. Add Supabase login and data later.
6. Add the Python and OpenRouter services later.
7. Publish the web page on GitHub Pages.

## 7. Review & Approval
| Reviewer | Date | Approved? |
|----------|------|-----------|
| Mi Meh | | 9/22/2026 | Pending |

