# Cloud Matrix Technologies — Website Redesign

A modern, animated React frontend for Cloud Matrix Technologies, built with
React, React Router, Tailwind CSS and Framer Motion. Content (services,
vision/mission, contact details, testimonial) is sourced from the existing
site, cmatrix.in. The Tap2Bill product section has been removed entirely.

## Getting started

```bash
npm install
npm run dev       # start local dev server
npm run build      # production build into /dist
npm run preview    # preview the production build
```

Requires Node.js 18+.

## The "Signal" interaction system

This redesign introduces a small set of signature interactions — built once
as reusable primitives in `src/components/` — that repeat across the site
so they read as a deliberate brand identity rather than one-off effects:

- **Signal Cursor** (`CustomCursor.jsx`) — a node-dot with an orbiting ring
  that expands into a labelled pill ("View", "Chat", "Go"…) over
  interactive elements. Auto-disabled on touch devices and for
  `prefers-reduced-motion`.
- **Magnetic elements** (`MagneticButton.jsx`) — CTAs, nav links and social
  icons gently pull toward the cursor within range, then spring back.
- **Signal Cards** (`TiltCard.jsx`) — service, industry and "why us" cards
  tilt in 3D toward the pointer with a soft radial spotlight tracking the
  cursor across the surface.
- **Signal Wipe** (`RouteTransition.jsx`) — a shutter panel sweeps away on
  every page navigation instead of a plain cut.
- **Scroll depth** — the hero uses `useScroll`/`useTransform` parallax so
  the backdrop, code-window mockup and copy drift at different rates.
- **Buttery scroll** (`SmoothScroll.jsx`) — Lenis smooths native scroll
  input without hijacking layout, so `whileInView` and `useScroll` keep
  working exactly as before; skipped for `prefers-reduced-motion`.
- **Cinematic load** (`Preloader.jsx`) — a short, once-per-session load
  sequence instead of a static logo splash.

All of the above degrade gracefully: reduced-motion users get instant,
static states; touch users never see the custom cursor or tilt.

## What's included

- **Home page** — hero, company intro (vision/mission), technology
  capabilities, a full services section with alternating left/right
  scroll-reveal panels (each service is a full-height rectangle, image on
  one side / description on the other, direction alternates per service),
  business problems solved, development process, why-choose-us, industries
  served, an infinite horizontal-scroll testimonials marquee, FAQ accordion,
  and a final contact CTA.
- **Blog** (`/blog`) — office events/photo page, pre-wired with sample
  entries. Replace the array in `src/pages/Blog.jsx` with your real events.
- **Career** (`/career`) — job application form (name, email, phone, role,
  resume upload, message). On submit it opens WhatsApp with the details
  pre-filled. **Note:** browsers cannot attach a file to a WhatsApp chat
  automatically — there's no public API for that from client-side code. The
  form includes the resume file name in the message and prompts the
  applicant to attach the same file manually in the WhatsApp window that
  opens. If you need fully automated resume delivery, that requires a small
  backend using the WhatsApp Business Cloud API — happy to help wire that up
  separately.
- **Talk to an Expert** (`/talk-to-expert`) — enquiry form (name, email,
  phone, service needed, message) that opens WhatsApp with the details
  pre-filled, plus an embedded map and direct contact details.
- **Privacy Policy** and **Terms of Service** — generic, non-product-specific
  legal pages in the site's own theme (the previous policy was written for
  the Tap2Bill product, so this is new generic copy — have it reviewed by
  a legal professional before publishing).
- **Dark / light mode** toggle in the navbar, persisted to `localStorage`.
- Colors are derived from the uploaded Cloud Matrix logo (teal cloud outline
  with an orange → yellow → green node gradient) — see `tailwind.config.js`.
- Scroll animations use Framer Motion's `whileInView` with `once: false`,
  so they play forward on scroll-down and reverse on scroll-up, and
  `prefers-reduced-motion` is respected globally in `src/index.css`.

## Things to swap before going live

- **Images**: every image is a placeholder Unsplash URL chosen to match the
  section's topic (marked clearly in `src/sections/Services.jsx`,
  `Industries.jsx`, `Blog.jsx`, `Hero.jsx`). Replace with your own licensed
  photography or illustrations — search each file for `images.unsplash.com`.
- **WhatsApp number**: set in `src/data/content.js` (`whatsappNumber`).
- **Blog posts**: replace the sample array in `src/pages/Blog.jsx`.
- **Legal pages**: review the generic Privacy Policy / Terms copy with a
  lawyer before publishing, especially if you collect payment data again in
  the future.

## Project structure

```
src/
  assets/        logo
  components/    Navbar, Footer, ThemeToggle, ScrollReveal, NodeSpine
  context/       ThemeContext (dark/light mode)
  data/          content.js — all real company copy in one place
  pages/         Home, Blog, Career, TalkToExpert, PrivacyPolicy, TermsOfService, NotFound
  sections/      Home page sections (Hero, Services, FAQ, etc.)
```
