# Time Gap Cashflow

A bilingual (NL/EN) Vite + React single-page documentation site for the Time Gap Cashflow concept. It provides structured chapters, nested pages, and a built-in calculator overlay.

## Features

- **Structured navigation**: Hierarchical sections and subpages with automated date stamps for status blocks.
- **Bilingual content**: Toggle between Dutch and English.
- **Theme toggle**: Light/Dark themes.
- **Enhanced search**: Sidebar search with scoring, snippets, and term highlighting across all sections/pages.
- **Calculator overlay**: Interactive dashboard for Time Gap Cashflow metrics.
- **Responsive layout**: Mobile-friendly navigation with hamburger + overlays.

## Tech Stack

- Vite + React
- Tailwind CSS (Typography plugin)
- Recharts
- Lucide icons

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Run the dev server:

   ```bash
   npm run dev
   ```

3. Build for production:

   ```bash
   npm run build
   ```

4. Preview the build locally:

   ```bash
   npm run preview
   ```

## Project Structure

- `src/App.jsx` — navigation, content rendering, calculator overlay, and search logic.
- `src/index.css` — global styles and Tailwind setup.
- `src/main.jsx` — app entrypoint.
- `src/content/` — Markdown-like content blocks defined in code (see `navStructure` in `App.jsx`).

## Environment Variables

None required for basic usage. Add only if you introduce APIs.

## Deployment (Vercel)

- Framework preset: **Vite**
- Build command: `npm run build`
- Output directory: `dist`
- Install command: `npm install`

## Search (details)

- Indexes all sections and child pages for the active locale.
- Scoring prioritizes title > section > content matches.
- Up to 30 results with highlighted snippets; clearing the query hides results.

## Notes

- Node version: use an LTS (Vercel default works).
- Keep `node_modules/` and `dist/` out of git (see `.gitignore`).

## License

ISC
