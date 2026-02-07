# Deployment Suggestions

This project is a static React app built with Vite. Below are quick ways to deploy it.

## Vercel (recommended)
1. Create a Vercel account and connect your GitHub repo.
2. Import the project - Vercel will detect it as a Vite app.
3. Use default build command `npm run build` and output folder `dist`.
4. Deploy — automatic on push to `main` when connected.

## Netlify
1. Create a Netlify account and new site from Git.
2. Set build command to `npm run build` and publish directory to `dist`.
3. Deploy and configure domain if needed.

## GitHub Pages (simple)
1. Build locally with `npm run build`.
2. Push the `dist` contents to a `gh-pages` branch (or use an action to automate it).

## Next steps for production readiness
- Add a backend to persist submissions (e.g., Node/Express, Firebase, Supabase)
- Add auth for admin views
- Implement input validation and rate-limiting on APIs
- Add automated tests and CI checks

If you'd like, I can: add a simple Node.js API to receive submissions, or create a GitHub Action to deploy to Vercel/Netlify automatically.