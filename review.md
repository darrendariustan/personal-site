# Comprehensive Code Review — Darren D. Tan Portfolio

**Reviewer**: AI Code Reviewer  
**Date**: 2026-06-06  
**Scope**: All source files under `src/`, configuration files, and `package.json`

---

## 1. Project Overview

| Aspect | Details |
|---|---|
| Framework | Next.js 16.2.7 (App Router, Turbopack) |
| Language | JavaScript (.js) for components, TypeScript (.ts) for API route |
| Styling | Tailwind CSS v4 + custom CSS utilities in `globals.css` |
| Animation | Framer Motion |
| Icons | Lucide React + one inline SVG |
| AI Backend | OpenAI SDK (`gpt-4o-mini`) via App Router API route |
| Node | React 19.2.4 |

### Files Reviewed

| File | Lines | Purpose |
|---|---|---|
| [globals.css](file:///c:/Users/User/OneDrive%20-%20Universitat%20Ram%C3%B3n%20Llull/Desktop/Learning/AI-Coder_Course/site/src/app/globals.css) | 55 | Theme variables, glassmorphism utilities |
| [layout.js](file:///c:/Users/User/OneDrive%20-%20Universitat%20Ram%C3%B3n%20Llull/Desktop/Learning/AI-Coder_Course/site/src/app/layout.js) | 25 | Root layout, font loading, ChatWidget injection |
| [page.js](file:///c:/Users/User/OneDrive%20-%20Universitat%20Ram%C3%B3n%20Llull/Desktop/Learning/AI-Coder_Course/site/src/app/page.js) | 25 | Homepage assembly |
| [route.ts](file:///c:/Users/User/OneDrive%20-%20Universitat%20Ram%C3%B3n%20Llull/Desktop/Learning/AI-Coder_Course/site/src/app/api/chat/route.ts) | 55 | OpenAI chat API endpoint |
| [Navbar.js](file:///c:/Users/User/OneDrive%20-%20Universitat%20Ram%C3%B3n%20Llull/Desktop/Learning/AI-Coder_Course/site/src/components/Navbar.js) | 35 | Fixed navigation header |
| [Hero.js](file:///c:/Users/User/OneDrive%20-%20Universitat%20Ram%C3%B3n%20Llull/Desktop/Learning/AI-Coder_Course/site/src/components/Hero.js) | 60 | Landing hero section |
| [About.js](file:///c:/Users/User/OneDrive%20-%20Universitat%20Ram%C3%B3n%20Llull/Desktop/Learning/AI-Coder_Course/site/src/components/About.js) | 81 | About me, skills, certs |
| [Experience.js](file:///c:/Users/User/OneDrive%20-%20Universitat%20Ram%C3%B3n%20Llull/Desktop/Learning/AI-Coder_Course/site/src/components/Experience.js) | 93 | Career timeline |
| [Portfolio.js](file:///c:/Users/User/OneDrive%20-%20Universitat%20Ram%C3%B3n%20Llull/Desktop/Learning/AI-Coder_Course/site/src/components/Portfolio.js) | 78 | Project showcase grid |
| [ChatWidget.js](file:///c:/Users/User/OneDrive%20-%20Universitat%20Ram%C3%B3n%20Llull/Desktop/Learning/AI-Coder_Course/site/src/components/ChatWidget.js) | 128 | Floating AI chat interface |

---

## 2. Architecture & Structure

### Strengths
- **Clean separation of concerns**: Each UI section is its own component in `src/components/`, composed together in `page.js`. This is idiomatic React.
- **Server/Client boundary is correct**: All interactive components are marked with `"use client"`, while `page.js` and `layout.js` remain Server Components. The API route runs entirely server-side.
- **API key is never exposed to the browser**: The OpenAI key stays in `.env` and is only accessed in the server-side `route.ts`.

### Issues

> [!WARNING]
> **Mixed language files (JS + TS)**: The project uses `.js` for all components and `.ts` only for the API route. This inconsistency means TypeScript's safety benefits are not applied to 90% of the codebase. Props, state shapes, and API response types are all untyped.

> [!IMPORTANT]
> **No data layer**: All content (experience entries, skills, certifications, projects) is hardcoded directly inside component files. This tightly couples data to presentation, making updates error-prone and requiring code changes to edit content.

**Remedial actions:**
- Migrate all components to `.tsx` for type safety, or commit fully to `.js` and remove the TypeScript config.
- Extract all content data into a `src/data/resume.json` or similar file and import it into components.

---

## 3. Security

### Critical Findings

> [!CAUTION]
> **No input validation or sanitization on the API route** ([route.ts:29](file:///c:/Users/User/OneDrive%20-%20Universitat%20Ram%C3%B3n%20Llull/Desktop/Learning/AI-Coder_Course/site/src/app/api/chat/route.ts#L29)): The endpoint blindly destructures `{ messages }` from the request body and forwards the entire array to OpenAI. A malicious user could:
> - Send thousands of messages in a single request to inflate token usage and costs.
> - Inject a `system` role message to override the system prompt (prompt injection).
> - Send non-string or malformed content values.

> [!CAUTION]
> **No rate limiting**: The `/api/chat` endpoint is completely open. Anyone can script rapid-fire requests and exhaust your OpenAI API credits.

> [!WARNING]
> **Error leaks internal details** ([route.ts:49](file:///c:/Users/User/OneDrive%20-%20Universitat%20Ram%C3%B3n%20Llull/Desktop/Learning/AI-Coder_Course/site/src/app/api/chat/route.ts#L49)): `error.message` is returned directly to the client. OpenAI error messages can contain internal request IDs, model names, and other information that should not be exposed to end users.

**Remedial actions:**
- Validate the `messages` array: enforce a maximum length (e.g., 20 messages), ensure each message has `role` of only `"user"` or `"assistant"` (never `"system"`), and verify `content` is a non-empty string under a character limit.
- Add rate limiting using a library like `@upstash/ratelimit` or a simple in-memory counter per IP.
- Return a generic error message to the client, and log the detailed error only server-side.

---

## 4. Performance

### Image Optimisation

> [!WARNING]
> **Missing `sizes` prop on profile image** ([Hero.js:16-22](file:///c:/Users/User/OneDrive%20-%20Universitat%20Ram%C3%B3n%20Llull/Desktop/Learning/AI-Coder_Course/site/src/components/Hero.js#L16-L22)): The `<Image>` component uses `fill` but does not specify `sizes`. Next.js already warns about this in the console. Without `sizes`, the browser downloads a larger image than necessary, hurting load time on mobile devices.

```jsx
// Current (missing sizes)
<Image src="/profile.jpg" alt="Darren D. Tan" fill className="object-cover" priority />

// Recommended fix
<Image src="/profile.jpg" alt="Darren D. Tan" fill sizes="(max-width: 768px) 128px, 160px" className="object-cover" priority />
```

### Bundle Size

- **Every component is `"use client"`**: This means all six components (Navbar, Hero, About, Experience, Portfolio, ChatWidget) and their dependencies (Framer Motion, Lucide React) are shipped to the browser. Components like `About.js` and `Experience.js` contain only static content with scroll-triggered animations. Consider whether the animation justifies the client-side JavaScript cost, or whether a CSS-only `@keyframes` approach would suffice for simpler sections.

### CSS

- **`transition: all` in `.glass-card`** ([globals.css:40](file:///c:/Users/User/OneDrive%20-%20Universitat%20Ram%C3%B3n%20Llull/Desktop/Learning/AI-Coder_Course/site/src/app/globals.css#L40)): Transitioning `all` properties is a performance anti-pattern. It forces the browser to check and animate every CSS property on every frame. Should be scoped to specific properties.

```css
/* Current */
transition: all 0.3s ease;

/* Recommended */
transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
```

**Remedial actions:**
- Add the `sizes` prop to the `<Image>` component.
- Replace `transition: all` with explicit property transitions.
- Evaluate whether simpler sections could use CSS animations instead of Framer Motion to reduce JavaScript bundle size.

---

## 5. Accessibility (a11y)

> [!IMPORTANT]
> Multiple accessibility issues were identified that would cause the site to fail a WCAG 2.1 AA audit.

| Issue | Location | Impact |
|---|---|---|
| Chat open button has no accessible label | [ChatWidget.js:57-62](file:///c:/Users/User/OneDrive%20-%20Universitat%20Ram%C3%B3n%20Llull/Desktop/Learning/AI-Coder_Course/site/src/components/ChatWidget.js#L57-L62) | Screen readers announce it as "button" with no context |
| Chat close button has no accessible label | [ChatWidget.js:79-81](file:///c:/Users/User/OneDrive%20-%20Universitat%20Ram%C3%B3n%20Llull/Desktop/Learning/AI-Coder_Course/site/src/components/ChatWidget.js#L79-L81) | Same as above |
| Send button has no accessible label | [ChatWidget.js:113-119](file:///c:/Users/User/OneDrive%20-%20Universitat%20Ram%C3%B3n%20Llull/Desktop/Learning/AI-Coder_Course/site/src/components/ChatWidget.js#L113-L119) | Same as above |
| LinkedIn SVG link has no accessible label | [Navbar.js:24-26](file:///c:/Users/User/OneDrive%20-%20Universitat%20Ram%C3%B3n%20Llull/Desktop/Learning/AI-Coder_Course/site/src/components/Navbar.js#L24-L26) | Screen readers cannot identify the link purpose |
| Mail icon link has no accessible label | [Navbar.js:27-29](file:///c:/Users/User/OneDrive%20-%20Universitat%20Ram%C3%B3n%20Llull/Desktop/Learning/AI-Coder_Course/site/src/components/Navbar.js#L27-L29) | Same as above |
| Nav links hidden on mobile with no hamburger menu | [Navbar.js:18](file:///c:/Users/User/OneDrive%20-%20Universitat%20Ram%C3%B3n%20Llull/Desktop/Learning/AI-Coder_Course/site/src/components/Navbar.js#L18) | Mobile users cannot navigate to sections |
| Chat widget not keyboard-trappable | ChatWidget.js | Focus can escape the open chat modal |
| Low contrast on `text-slate-400` over dark backgrounds | Multiple files | May not meet WCAG AA 4.5:1 contrast ratio |

**Remedial actions:**
- Add `aria-label` attributes to all icon-only buttons and links (e.g., `aria-label="Open chat"`, `aria-label="LinkedIn profile"`).
- Implement a mobile hamburger menu or similar mobile navigation pattern.
- Implement focus trapping within the chat widget when it is open.
- Audit text contrast ratios using a tool like the WebAIM Contrast Checker and adjust colors as needed.

---

## 6. Code Quality

### Positive Observations
- Code is clean, well-indented, and consistently formatted.
- Component naming is clear and descriptive.
- Good use of Framer Motion's `whileInView` for scroll-triggered animations.
- The `ChatWidget` correctly handles loading states, errors, and auto-scrolling.

### Issues

**Using array index as React `key`**: Multiple components use `key={index}` when mapping over arrays ([Experience.js:66](file:///c:/Users/User/OneDrive%20-%20Universitat%20Ram%C3%B3n%20Llull/Desktop/Learning/AI-Coder_Course/site/src/components/Experience.js#L66), [About.js:51](file:///c:/Users/User/OneDrive%20-%20Universitat%20Ram%C3%B3n%20Llull/Desktop/Learning/AI-Coder_Course/site/src/components/About.js#L51), [Portfolio.js:39](file:///c:/Users/User/OneDrive%20-%20Universitat%20Ram%C3%B3n%20Llull/Desktop/Learning/AI-Coder_Course/site/src/components/Portfolio.js#L39), [ChatWidget.js:87](file:///c:/Users/User/OneDrive%20-%20Universitat%20Ram%C3%B3n%20Llull/Desktop/Learning/AI-Coder_Course/site/src/components/ChatWidget.js#L87)). For static lists this is acceptable, but for the chat messages list (which grows dynamically) it can cause rendering bugs. Each chat message should have a unique ID.

**JSX elements stored in data arrays** ([Portfolio.js:12,19](file:///c:/Users/User/OneDrive%20-%20Universitat%20Ram%C3%B3n%20Llull/Desktop/Learning/AI-Coder_Course/site/src/components/Portfolio.js#L12-L19)): The `projects` array stores `icon: <Database ... />` as a JSX element inside a data structure. This mixes data with rendering logic, making the data non-serializable (can't be stored in JSON, sent over network, or used in Server Components).

```jsx
// Current — JSX inside data
const projects = [
  { title: "...", icon: <Database className="text-blue-400 mb-4" size={32} /> }
];

// Recommended — use a string identifier and render the icon separately
const iconMap = { database: Database, fileText: FileText };
const projects = [
  { title: "...", iconName: "database" }
];
// Then in JSX: const Icon = iconMap[project.iconName];
```

**Untyped API route** ([route.ts:27](file:///c:/Users/User/OneDrive%20-%20Universitat%20Ram%C3%B3n%20Llull/Desktop/Learning/AI-Coder_Course/site/src/app/api/chat/route.ts#L27)): Despite being a `.ts` file, the `POST` function parameter `req` has no type annotation. The `error` in the catch block is also typed as `any` implicitly.

```typescript
// Current
export async function POST(req) {

// Recommended
import { NextRequest } from "next/server";
export async function POST(req: NextRequest) {
```

**`new Date().getFullYear()` called at render time in a Server Component** ([page.js:19](file:///c:/Users/User/OneDrive%20-%20Universitat%20Ram%C3%B3n%20Llull/Desktop/Learning/AI-Coder_Course/site/src/app/page.js#L19)): Since `page.js` is a Server Component rendered at build time (static route), the year will be baked in at build time, not dynamically evaluated. If the site is rebuilt in January 2027, it will show 2027 — but a cached/stale build from late 2026 would still show 2026 past midnight on New Year's. This is minor but worth noting.

**Remedial actions:**
- Assign unique IDs (e.g., `crypto.randomUUID()`) to chat messages instead of relying on array index.
- Refactor `Portfolio.js` to separate icon selection from data.
- Add proper TypeScript types to `route.ts`.

---

## 7. UX & Design

### Strengths
- The glassmorphism and glow effects create a premium "Enterprise meets edgy" aesthetic.
- Scroll-triggered animations with `whileInView` feel polished and modern.
- The chat widget's sliding animation and loading spinner provide clear visual feedback.

### Issues

**Navbar has no mobile menu** ([Navbar.js:18](file:///c:/Users/User/OneDrive%20-%20Universitat%20Ram%C3%B3n%20Llull/Desktop/Learning/AI-Coder_Course/site/src/components/Navbar.js#L18)): The navigation links are hidden on screens below `md` breakpoint (`hidden md:flex`). There is no hamburger icon or slide-out menu for mobile users. They can only navigate by scrolling.

**Portfolio "Code" and "Details" links point to `#`** ([Portfolio.js:65-70](file:///c:/Users/User/OneDrive%20-%20Universitat%20Ram%C3%B3n%20Llull/Desktop/Learning/AI-Coder_Course/site/src/components/Portfolio.js#L65-L70)): These placeholder links could confuse users who click them and get scrolled to the top of the page.

**Chat widget overlaps content on small screens**: The chat widget is fixed at `w-[350px] h-[500px]` and positioned `bottom-6 right-6`. On smaller viewports this may overflow or be difficult to use.

**Remedial actions:**
- Implement a mobile hamburger menu with Framer Motion slide-in animation.
- Either remove the placeholder links or disable them with a "Coming soon" tooltip.
- Make the chat widget responsive (e.g., full-width/full-height on mobile).

---

## 8. Testing & CI

> [!WARNING]
> **There are zero tests in this project.** No unit tests, no integration tests, no end-to-end tests. There is no CI/CD pipeline configured.

**Remedial actions:**
- Add at minimum a smoke test that renders each component without crashing (using React Testing Library).
- Add an integration test for the `/api/chat` endpoint (mock the OpenAI SDK).
- Consider adding a GitHub Actions workflow for linting and building on push.

---

## 9. Summary of Remedial Actions

The table below consolidates all findings by priority:

| Priority | Finding | File(s) | Effort |
|---|---|---|---|
| 🔴 Critical | No input validation on chat API — prompt injection & cost attack vector | `route.ts` | Medium |
| 🔴 Critical | No rate limiting on chat API | `route.ts` | Medium |
| 🟠 High | Error message leaks internal details to client | `route.ts` | Low |
| 🟠 High | No mobile navigation menu | `Navbar.js` | Medium |
| 🟠 High | All icon-only buttons/links missing `aria-label` | `Navbar.js`, `ChatWidget.js` | Low |
| 🟡 Medium | Missing `sizes` prop on `<Image fill>` | `Hero.js` | Low |
| 🟡 Medium | `transition: all` performance anti-pattern | `globals.css` | Low |
| 🟡 Medium | Untyped TypeScript route handler | `route.ts` | Low |
| 🟡 Medium | Hardcoded data inside components | `About.js`, `Experience.js`, `Portfolio.js` | Medium |
| 🟡 Medium | Mixed JS/TS file extensions | All files | High |
| 🟡 Medium | JSX stored in data arrays | `Portfolio.js` | Low |
| 🟡 Medium | Chat messages keyed by array index | `ChatWidget.js` | Low |
| 🟡 Medium | Chat widget not responsive on mobile | `ChatWidget.js` | Medium |
| 🟡 Medium | Placeholder `href="#"` links | `Portfolio.js` | Low |
| 🔵 Low | No tests or CI pipeline | Project-wide | High |
| 🔵 Low | Chat history lost on page refresh | `ChatWidget.js` | Medium |
| 🔵 Low | `new Date().getFullYear()` baked at build time | `page.js` | Low |

---

## 10. Final Verdict

The project is a **solid MVP** that achieves its goal of a visually impressive personal portfolio with a functional AI chat feature. The code is clean, well-structured, and follows React and Next.js conventions correctly.

The most pressing concerns are **security-related** — the completely unprotected API endpoint is a real risk for cost escalation and prompt injection. These should be addressed before any public deployment.

Secondary priorities are **accessibility** (making the site usable for everyone) and **mobile UX** (adding a hamburger menu, making the chat responsive).

Everything else — TypeScript migration, data extraction, testing — represents good engineering hygiene that would become important as the project grows.
