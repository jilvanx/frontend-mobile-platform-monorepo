# Profiles Monorepo

Monorepo containing three applications that share a common TypeScript package for fetching and displaying user profile images. Built with Turborepo + npm workspaces.

## Project overview

- **apps/web-next** – Next.js 14 (App Router), server-side rendering, SEO metadata, `next/image` optimization.
- **apps/web-spa** – Vite + React SPA, client-side rendering with a dev proxy for CORS.
- **apps/mobile** – React Native (Expo SDK 54), reuses `@repo/shared`; no CORS restrictions in native.
- **packages/shared** – Framework-agnostic TypeScript library: types, parser, `fetchProfiles()`, `buildProfileImageUrl()`.

Data source: `GET https://www.hunqz.com/api/opengrid/profiles/msescortplus`
Image URL pattern: `https://www.hunqz.com/img/usr/original/0x0/{url_token}.jpg`

## Monorepo structure

```
apps/
  web-next/       Next.js SSR app
  web-spa/        Vite React SPA
  mobile/         React Native (Expo) app
packages/
  shared/         Shared TS library (types, parser, api, image URL)
package.json      workspaces: ["apps/*", "packages/*"]
turbo.json        Turborepo task config
tsconfig.base.json
.eslintrc.cjs     (per-package ESLint configs)
.prettierrc       Code formatting
.nvmrc            Node version
```

## Tooling

| Tool               | Purpose                                                             |
| ------------------ | ------------------------------------------------------------------- |
| **npm workspaces** | Dependency management; `@repo/shared` linked via workspace protocol |
| **Turborepo**      | Cached, dependency-aware task orchestration                         |
| **TypeScript**     | Type safety across all packages                                     |
| **ESLint**         | Linting (per-package configs, `next/core-web-vitals` for Next.js)   |
| **Prettier**       | Consistent code formatting                                          |
| **Vitest**         | Unit tests for shared package                                       |
| **Tailwind CSS**   | Styling for both web apps                                           |

## Shared package (`packages/shared`)

**Exports:** `Profile`, `FetchProfilesOptions`, `buildProfileImageUrl()`, `parseProfile()`, `parseProfilesResponse()`, `fetchProfiles()`.

Design decisions:

- No React or framework imports – pure TypeScript, usable anywhere.
- `fetchProfiles(slug, { baseUrl?, fetchImpl? })` accepts an injectable `fetch` implementation and configurable base URL, making it easy to test and to route through proxies.
- Defensive parsing: handles `url_token` / `urlToken`, array or `{ profiles: [] }` responses, and the hunqz single-profile shape with `pictures` array.

## CORS handling

| App            | Strategy                                                                                                                              |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| **Next.js**    | Data fetched in async server components (Node.js runtime) – no browser CORS.                                                          |
| **SPA (dev)**  | Vite dev server proxies `/api/profiles` → `https://www.hunqz.com/api/opengrid/profiles`                                               |
| **SPA (prod)** | Can point `VITE_API_BASE` to a deployed proxy. The Next.js app also exposes `/api/profiles/[slug]` as a CORS-friendly proxy endpoint. |
| **Mobile**     | React Native `fetch` is not subject to browser CORS policy. Direct API calls.                                                         |

The Next.js API route (`app/api/profiles/[slug]/route.ts`) serves as a reusable proxy endpoint with caching headers, usable by the SPA in production or any other client.

## SSR and SEO (Next.js)

- **Server components:** async page component fetches data on the server.
- **`next/image`:** optimized images with remote patterns, lazy loading, responsive `srcSet`.
- **Metadata:** `title`, `description`, `openGraph`, `twitter` card, `robots`, `viewport`.
- **Loading/Error states:** `loading.tsx` (skeleton UI during Suspense) and `error.tsx` (error boundary with retry).
- **Accessibility:** skip-to-content link, semantic HTML (`<main>`, headings, lists), `alt` text, `aria-label`, focus indicators.

## Setup

**Prerequisites:** Node 18+ (npm 7+ for workspaces). See `.nvmrc`.

On a fresh clone, `@repo/shared` is not usable until its build output exists (the `dist/` folder is gitignored). Do both steps:

```bash
npm install
npm run build -w @repo/shared
# or, to build everything:  npm run build
```

If the build reports cache issues on a new machine, run with cache disabled: `npm run build:fresh` (or `turbo run build --force`).

Then run any app (`npm run dev:next`, `npm run dev:spa`, `npm run dev:mobile`).

## Run commands

| Command                | Description                                                   |
| ---------------------- | ------------------------------------------------------------- |
| `npm run dev`          | Start all apps in dev mode (Turbo)                            |
| `npm run dev:next`     | Next.js only (`http://localhost:3000`)                        |
| `npm run dev:spa`      | Vite SPA only (`http://localhost:5173`)                       |
| `npm run dev:mobile`   | Expo dev server – scan QR with Expo Go or press **w** for web |
| `npm run build`        | Build shared + web apps                                       |
| `npm run test`         | Run all tests                                                 |
| `npm run lint`         | Lint all packages                                             |
| `npm run format`       | Format all files with Prettier                                |
| `npm run format:check` | Check formatting without writing                              |

## Tests

```bash
npm run test                   # All packages via Turbo
npm run test -w @repo/shared   # Shared package only
```

Tests cover:

- `imageUrl.test.ts` – URL construction, whitespace trimming, edge cases
- `parser.test.ts` – valid/invalid profiles, array/object responses, hunqz API shape with `pictures`
- `api.test.ts` – fetch mocking, error handling, custom base URL

## Accessibility

- Semantic HTML structure: `<main>`, headings, `<ul>` with `role="list"`
- Focus indicators (ring styles) on interactive elements
- Skip-to-content link in Next.js layout
- Descriptive `alt` text on all images
- `role="status"` and `role="alert"` for loading/error states
- `aria-live="polite"` for dynamic content updates in SPA
- Responsive grid: 2 columns → 3 → 4 on larger screens

## Mobile (Expo / React Native)

The mobile app reuses `@repo/shared` directly. Metro bundler is configured to resolve workspace packages from the monorepo root.

```bash
npm run dev:mobile
```

- Scan the QR code with Expo Go (SDK 54)
- Press **a** for Android emulator, **i** for iOS simulator, **w** for web

## Trade-offs and possible improvements

- **E2E tests:** Only the shared package has unit tests. Adding Playwright or Cypress for the web apps would improve confidence.
- **Caching:** The Next.js server component could use `revalidate` for ISR. The API proxy route already sets `Cache-Control` headers.
- **SPA production deployment:** In production, set `VITE_API_BASE` to the deployed Next.js API proxy URL, or deploy a standalone proxy.
- **Image error handling:** A fallback placeholder for broken image URLs would improve robustness.
