# Tasks — Health and Wellness Waiver Web Page

> Derived from the plan document. Each task is small, checkable, and traceable to a requirement.

## Task List

| ID | Task | Traces to (R# / ADR#) | Depends on | Status |
|----|------|--------------------------|------------|--------|
| T1 | Confirm the waiver service names, descriptions, eligibility information, and next steps | R5, R7 | — | Not started |
| T2 | Confirm the service data fields: id, name, description, category, image_url, and location | R3, R5, R7, ADR-01 | T1 | Not started |
| T3 | Set up the no-build Vue 3 page structure and Vue Router routes | R1, R2, ADR-00 | — | Not started |
| T4 | Add the navigation links for Home, Services, and About | R2, ADR-00 | T3 | Not started |
| T5 | Build the Home page for the waiver resource | R1, R2 | T3 | Not started |
| T6 | Build the Services page with one card for each service | R1, R3, R4, R5, ADR-01 | T2, T3 | Not started |
| T7 | Add a link from each service card to its detail page | R6 | T6 | Not started |
| T8 | Build the Service detail page with full service information | R1, R6, R7 | T2, T3, T7 | Not started |
| T9 | Build the About page with provider information | R1, R2 | T3 | Not started |
| T10 | Add the sample service data and show an error when data cannot load | R3, R4, R5, ADR-01 | T2, T6 | Not started |
| T11 | Test the page navigation, service cards, detail links, and data-load error | R1–R7 | T4, T5, T6, T7, T8, T9, T10 | Not started |
| T12 | Add Supabase login and service data | R1–R7, ADR-02 | T11 | Not started |
| T13 | Add the Python service with Agno and connect OpenRouter | R7, ADR-03 | T12 | Not started |
| T14 | Publish the web page on GitHub Pages | R1–R7, ADR-04 | T11 | Not started |

**Status values:** Not started · In progress · Done · Blocked

## Definition of Done (applies to every task)
- Matches its linked requirement's acceptance criteria in the specification.
- Reviewed by a human before marked done
- No task marked done without a test passing

## Blocked / Questions
| Task | Blocker | Raised | Resolved |
|------|---------|--------|----------|
| | | | |

## Quick Self-Check
- [ ] Every task traces to a requirement or ADR.
- [ ] Every task is small enough to finish in under a day.
- [ ] The task order follows `plan.md`.
- [ ] Every task has a clear result.
- [ ] Blocked tasks are recorded above.
