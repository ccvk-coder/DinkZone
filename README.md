# DinkZone

DinkZone is a pickleball platform for Cebu City: court discovery and booking, a sports shop,
equipment rentals, tournaments, a player profile, a front-desk staff workspace and a full venue
administration dashboard.

The application is built with **React 18 and JavaScript** (`.jsx` components, `.js` logic) on
Vite and Tailwind CSS. There is no TypeScript in the project.

## Getting started

```bash
npm install
npm run dev
```

Then open the URL Vite prints (http://localhost:5173 by default).

Other scripts:

```bash
npm run build     # production build
npm run preview   # serve the production build
npm run lint      # ESLint (JavaScript + JSX)
npm run format    # Prettier
```

## Stack

- React 18 with hooks and the Context API
- Vite 5 and Tailwind CSS 3 with the DinkZone design tokens and dark mode
- React Router DOM for every player, staff and admin route
- Lucide React icons through one shared `Icon` component
- Framer Motion for transitions and micro-interactions
- Recharts for admin and owner analytics
- Leaflet / React Leaflet for venue maps
- date-fns for schedules and date math
- qrcode.react for booking passes and check-in QR codes

## Routes

Player: `/onboarding`, `/courts`, `/courts/:venueId`, `/book/:venueId`, `/bookings`,
`/bookings/:id/confirmed`, `/bookings/:id/checkin`, `/shop`, `/shop/:productId`, `/rentals`,
`/cart`, `/orders`, `/events`, `/events/:id`, `/events/:id/register`, `/events/:id/bracket`,
`/profile`.

Staff: `/staff/overview`, `/staff/scan`, `/staff/schedule`.

Admin: `/admin`, `/admin/owner`, `/admin/bookings`, `/admin/calendar`, `/admin/venues`,
`/admin/tournaments`, `/admin/shop`, `/admin/users`, `/admin/reports`.

Unknown URLs render the not-found page. `/` redirects to onboarding until a player completes it,
then to `/courts`.

## Demo data and persistence

No backend is configured, so the application runs as an honest frontend demonstration:

- Venues, products, tournaments and seeded bookings come from `src/data` and `src/utils`.
- The cart, theme, role, onboarding state, saved venues, NFC cards, staff venue selection and
  rental requests persist in `localStorage` under the `dinkzone:` prefix.
- Bookings and shop orders are session state: seeded demo records are regenerated on reload, and a
  booking or order created during a session is kept in memory rather than written to storage.
- Payments, check-in validation, rentals and tournament registrations are simulated and labelled
  as demonstration flows in the UI. No money moves and no reservation is sent to a real venue.
- QR passes encode a demo booking token, not personal information. The staff scanner validates
  passes against the bookings currently stored in the app.
- Player bookings and the seeded admin bookings feed the same tables, calendar, staff schedule and
  reports for the duration of the session.

## Project structure

```
src/
├── components/        shared UI plus booking, courts, shop, events, staff, owner and admin pieces
├── contexts/          App (theme, user, role), Bookings and Shop state
├── data/              demo venues, products, tournaments, rentals and imagery
├── hooks/             booking flow, scanner, persistence, media queries and rentals
├── pages/             player/, staff/ and admin/ route screens
├── utils/             pricing, availability, formatting, analytics, calendar and check-in logic
├── App.jsx
├── main.jsx
└── index.css
```

## Notes

- Currency is Philippine pesos (₱) throughout.
- Player, staff, owner and admin experiences share one data set, so a booking made as a player
  appears in the staff schedule and the admin booking table.
- The role switcher in the profile is a demo convenience. It is not authentication or
  authorization, and there is no production access control until a backend is connected.
