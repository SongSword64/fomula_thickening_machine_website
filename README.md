# Formula Thickening Machine Website

This repository contains a small React (Vite) scaffold for the "Formula Thickening Machine" project — a site to introduce the project (Who I Am), explain the business idea, collect user stories and data, and provide a simple recipe tuning interface.

## What's included
- React + Vite scaffold
- Pages: Home, Who I Am (YouTube embed), My Story, Executive Summary, Business Idea, Data Collection (local storage), Formula Tuning (mock tuning + local storage)
- Simple navigation and minimal styling

## Quick start (Windows)
1. Install dependencies:

   npm install

2. Run the dev server:

   npm run dev

3. Build for production:

   npm run build

4. Preview the production build locally:

   npm run preview

## Notes
- Data collection and recipe candidates are stored in the browser's localStorage (no backend yet). You can export data from localStorage or connect to a backend later.
- Replace the placeholder YouTube video in `src/pages/WhoIAm.jsx` with your own link.

## Next steps / ideas
- Add a backend API to persist submissions and candidates
- Add authentication and admin UI for reviewing submissions
- Integrate model-driven tuning or experiment tracking for robust recipe optimization

---

Note: A small proxy server is included to allow the app to fetch and parse recipe pages from `healthierthickening.com` (avoids CORS and improves scraping reliability). To run it locally:

1. Install dependencies:

   npm install

2. Start the proxy server in a separate terminal:

   npm run serve:proxy

3. Start the frontend dev server in another terminal:

   npm run dev

The proxy only allows requests to a small set of trusted hosts by default (see `server/index.js`). If you'd like more hosts added, tell me and I'll update the whitelist.

---

If you'd like, I can:
- Wire up a simple Node.js backend to save submissions, or
- Add export (CSV) functionality for collected data, or
- Replace the example video with your real YouTube link.

