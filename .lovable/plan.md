# The Tooth Wellness Dental Clinic — Build Plan

A premium, mobile-first dental clinic website for Dr. Manisha's clinic in Kharar, Punjab. Uses the uploaded real photos (clinic exterior, interior, doctor, equipment, branded items) and gold/ivory/dark-brown theme matched to the logo and signboard.

## Stack note

The project is **Spa ViteStart** (not React Router DOM as the brief assumes). I'll keep the same UX/visual spec, but routes go in `src/routes/*.tsx` using `createFileRoute`, and navigation uses `@tanstack/react-router`'s `<Link>`. Everything else (Tailwind v4, Framer Motion, Radix, Lucide, RHF+Zod, Poppins) stays as specified.

## Design system (src/styles.css)

Tokens in oklch matched to the logo gold:

- `--primary` warm gold (~#B68A4A)
- `--primary-glow` lighter champagne gold
- `--accent` dark brown (~#4B3528)
- `--background` warm ivory (~#FBF8F2)
- `--muted`, `--border`, `--accent-soft` (light gold tint)
- `--gradient-hero`: dark-brown → gold
- `--gradient-accent`: champagne → ivory
- Shadows: card / soft / image (warm brown tints)
- Poppins 400/600/700/900 loaded via `<link>` in `__root.tsx`

## Assets

Upload all attached photos as Lovable Assets and import via JSON pointers:

- Logo (tooth circle) → header + favicon source
- Signboard exterior → hero / about banner
- Doctor portrait → hero + About + Doctor section
- 4× treatment-room photos → gallery + treatment cards + clinic banner
- Consultation desk (2 angles) → About / facilities
- Tooth pen-stand → small accent / facilities

## Routes (`src/routes/`)

- `__root.tsx` — Poppins font link, sitewide meta, Organization/Dentist JSON-LD, sticky Header + Footer + Floating WA/Phone + Mobile BottomNav, `<Outlet />`
- `index.tsx` — Home (9 sections per brief)
- `treatments.tsx` — all 14 services with quick-nav, images, benefits, process, FAQ accordion
- `gallery.tsx` — filtered masonry (Clinic / Treatment Room / Equipment / Branding) using real photos
- `reviews.tsx` — 5.0 summary + 11 real Google reviews grid
- `about.tsx` — Dr. Manisha BDS bio, credentials, philosophy
- `contact.tsx` — RHF+Zod form (Sunday closed validation), info panel, hours, embedded Google Map of SCO 14 SBP Homes Sector 126 Kharar
- `sitemap[.]xml.ts` — server route with all 6 pages, relative BASE_URL placeholder

Each route gets unique `head()` (title, description, og:*, canonical relative path).

## Components (`src/components/`)

- `layout/Header.tsx` (floating, blurred, logo + pill nav + Book CTA)
- `layout/BottomNav.tsx` (mobile, 5 tabs with Lucide icons)
- `layout/Footer.tsx` (3-col, dark accent bg)
- `layout/FloatingActions.tsx` (WhatsApp + Phone)
- `ui/SectionLabel.tsx`, `ui/StatPill.tsx`, `ui/Reveal.tsx` (Framer Motion wrapper)
- `home/*` section components, `treatments/TreatmentCard.tsx`, `gallery/GalleryGrid.tsx`, `reviews/ReviewCard.tsx`, `contact/AppointmentForm.tsx`

## Data (`src/lib/`)

- `site.ts` — clinic name, doctor, phone `+917973369195`, WhatsApp `917973369195`, address, Mon–Sat 10–8 / Sun closed, `whatsappLink(msg)` helper
- `data.ts` — `treatments[]` (14 services with benefits/process/FAQs), `galleryItems[]` (real photos categorized), `reviews[]` (11 reviews from brief), `stats[]`, `features[]` (12 why-choose-us), `processSteps[]`

## Form validation

Zod schema, Sunday (`getDay() === 0`) blocked with inline message "Clinic is closed on Sunday — please choose another day". On submit, opens WhatsApp with a prefilled message containing form data (no backend needed).

## SEO

- Per-route titles/descriptions targeting "Dental Clinic in Kharar", "Best Dentist Kharar", "Dr. Manisha BDS", treatment keywords
- Dentist + Physician JSON-LD in root
- `public/robots.txt` (Allow all)
- Sitemap server route (relative URLs — no domain set yet)
- Lazy-loaded images with descriptive alt text
- Single H1 per page, semantic sections

## UX behaviors

WhatsApp prefill on every Book button, smooth-scroll quick-nav on Treatments, AnimatePresence on gallery filter, accordion FAQ (one open per card), scroll-triggered Framer Motion reveals, hover-lift cards, active route pill highlight, floating WA/Phone above bottom nav on mobile.

## Out of scope

- No Lovable Cloud / backend (form opens WhatsApp; no DB)
- `vercel.json` (project deploys via vercle)
- No domain-specific canonical/sitemap URLs until a domain is set

After your approval I'll build everything end-to-end.