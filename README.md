# Wanderlust — Client

Next.js 16 (App Router) + HeroUI v3 + Tailwind CSS v4 + Better Auth.

## Setup
```bash
npm install
cp .env.example .env.local   # API_URL=http://localhost:5000
npm run dev                  # http://localhost:3000  (start the API first)
```

`/api/*` is rewritten to the Express API (see `next.config.mjs`), so the browser only talks to this
origin and auth cookies work locally and in production.

## Pages
- `/` — hero with search, featured destinations, why us, testimonials, CTA
- `/destinations` — search, category & price filters, sort, pagination (URL-driven)
- `/destinations/[id]` — overview, highlights, itinerary, reviews, booking card (admins see Edit/Delete)
- `/login`, `/signup` — email/password (+ Google when `NEXT_PUBLIC_GOOGLE_AUTH=true`)
- `/my-bookings` — status filters, cancel
- `/profile` — stats, upcoming trips, edit profile
- `/admin` — overview stats, packages (edit/delete), bookings (confirm/cancel), add package

`src/proxy.js` redirects signed-out users away from protected pages; the API enforces real permissions.

## Deploying (Vercel)
Set `API_URL` to your Render URL (and `NEXT_PUBLIC_GOOGLE_AUTH` if used).
