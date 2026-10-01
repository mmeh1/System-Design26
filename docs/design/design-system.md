# Design System — Health and Wellness Waiver

**Status:** Draft for the Health and Wellness Waiver prototype. This is a project-level starting point, not an approved organization-wide brand standard. Confirm the provider's brand assets and service content before using this system on a public site.

## 1. Brand Principles
The experience should feel warm, supportive, and clear to both people seeking care and caregivers. Use calm colors, clean lines, and familiar page patterns so people can find services, understand eligibility information, and identify a next step without feeling overwhelmed. Favor plain language and useful information over decoration or promises about eligibility.

## 2. Color Palette

| Name | Hex | Use |
|------|-----|-----|
| Primary blue | #245B74 | Primary buttons, links, and key interactive states; use white text on this color. |
| Light blue | #E7F1F5 | Subtle informational backgrounds and non-interactive highlights. |
| Accent yellow | #F2C14E | Small highlights and emphasis; pair with dark text, not white text. |
| Page background | #F5F7F8 | Main page background. |
| Surface | #FFFFFF | Content areas, including service cards. |
| Text | #263238 | Headings and body text. |
| Secondary text | #52616B | Supporting text and descriptions; keep readable against light surfaces. |

These are proposed prototype colors based on the specification's white, gray, light blue, and yellow direction; they are not confirmed provider brand colors.

## 3. Typography

| Role | Font | Size | Weight |
|------|------|------|--------|
| Heading 1 | Bootstrap system sans-serif | 28px | 600 (semibold) |
| Heading 2 | Bootstrap system sans-serif | 24px | 600 (semibold) |
| Body | Bootstrap system sans-serif | 16px | 400 (regular) |

Use the existing Bootstrap/system font stack; do not add a downloaded font for the prototype. Keep headings concise and body copy easy to scan.

## 4. Logo Usage
- File(s): [`bow.jpg`](../../bow.jpg) (project root).
- Use the approved `bow.jpg` logo image in the app.
- Do NOT stretch, recolor, or place the logo on a busy background without approval.

## 5. Spacing & Grid
- Base unit: 4px, matching Bootstrap's spacing utilities.
- Grid/columns: Bootstrap responsive 12-column grid; use the existing `.container` widths and breakpoints.
- Standard spacing scale: 4 / 8 / 12 / 16 / 24 / 32 / 48px, using Bootstrap spacing utilities where possible.
- Keep service lists responsive: one column on small screens, two on medium screens, and three on large screens, as in the starter component.

## 6. Core Components
Use Bootstrap 5 components and utilities already loaded by the starter. Keep corners modest and layouts uncluttered.

| Component | Rules |
|-----------|-------|
| Button (primary) | Use for the main next step. Primary blue background with white text; use a clear, action-focused label. |
| Button (secondary) | Use an outlined or text-style Bootstrap button for secondary actions, such as returning to the collection. |
| Card | White surface, consistent image area, concise service name and summary, and a clear detail link. Keep card heights aligned within a row. Avoid decoration that competes with service information. |
| Form field | No form is in the first-version requirements. If one is added, put a visible label above each field and show a clear text error next to the field when input is invalid. |
| Navigation | Keep links to Home, Services, and About visible and consistent across pages. Use the existing responsive Bootstrap navigation pattern. |
| Status message | Use a readable Bootstrap alert for loading, missing-data, and error states; do not leave a blank content area when data fails to load. |
| Service image | Use a supplied, relevant image when available, with descriptive alternative text. If no image exists, show a calm text placeholder rather than a broken image. |

## 7. Voice & Tone
- Tone: warm, respectful, calm, and direct. Keep sentences short and use familiar words; avoid jokes, jargon, and pressure.
- Describe services and next steps plainly. Do not promise that a person is eligible; direct them to the provider to confirm eligibility and answer questions.
- Prefer labels such as “View details” and “Contact the provider” over vague labels such as “Submit.”
- Error messages should explain what happened in plain language, for example: “We couldn't load the service information. Please try again later.”

## 8. Accessibility Standards
- Minimum contrast ratio: 4.5:1 for normal text and 3:1 for large text and meaningful interface graphics.
- Standard to meet: WCAG 2.1 Level AA.
- Use semantic headings, keyboard-accessible links and controls, visible focus states, and useful alternative text for informative images. Do not rely on color alone to communicate status or meaning.
- Check color combinations in the implemented interface; palette choices alone do not guarantee that every component meets contrast requirements.

## 9. Version & Change Log

Current version: **1.0 draft**

| Version | Date | Change | Approved by |
|---------|------|--------|--------------|
| 1.0 | 2026-09-28 | Initial draft based on the project specification, plan, and Bootstrap starter. | Pending provider/project-owner review |

---

**Project references:** [specification.md](specification.md) defines the warm, supportive style direction and prototype constraints. [plan.md](plan.md) defines the Bootstrap-based implementation and page patterns. Reference this document as **Design System v1.0 draft**; obtain provider approval before treating the proposed palette or rules as official branding.

