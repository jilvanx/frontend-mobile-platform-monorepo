# Products Monorepo

A multi-app frontend monorepo sharing a centralized TypeScript library for fetching and rendering secure product thumbnails from DummyJSON. Built with **Turborepo** and **npm workspaces**.

## Project Overview

- **`apps/web-next`**: Next.js 14 (App Router) with SSR, SEO metadata, `next/image` optimization, and route handlers.
- **`apps/web-spa`**: Vite + React SPA with client-side rendering and graceful image fallbacks.
- **`apps/mobile`**: React Native (Expo SDK 54) mobile app with native components and custom hook (`useProducts`).
- **`packages/shared`**: Framework-agnostic TypeScript core providing types, API client, defensive parser, image builders, and centralized HTTPS security configuration.

**Data Source:** `GET https://dummyjson.com/products`  
**Image URL Pattern:** `https://cdn.dummyjson.com/...` (First product thumbnail with HTTPS enforcement)

---

## Monorepo Structure

```
apps/
  web-next/       Next.js SSR app (ProductCard, ProductGrid, /api/products)
  web-spa/        Vite React SPA (ProductCard, SkeletonGrid)
  mobile/         React Native Expo app (ProductCard, ProductGrid, useProducts)
packages/
  shared/         Core TS library (config, types, parser, api, image URL)
package.json      workspaces: ["apps/*", "packages/*"]
turbo.json        Turborepo task orchestration
tsconfig.base.json
.eslintrc.cjs
.prettierrc
.nvmrc
```

---

## Tooling

| Tool | Purpose |
| --- | --- |
| **npm workspaces** | Dependency management & local `@repo/shared` linking |
| **Turborepo** | Cached, dependency-aware build & test orchestration |
| **TypeScript** | Strict type safety across all packages |
| **ESLint & Prettier** | Code quality, linting, and formatting |
| **Vitest** | Unit and security test suite for `@repo/shared` |
| **Tailwind CSS** | Design system & utility styling for web apps |

---

## Shared Package (`@repo/shared`)

### Exports
- **Data Models:** `Product`, `FetchProductsOptions` (with backwards-compatible `Profile` aliases).
- **Security & Config:** `API_HOST`, `API_BASE_URL`, `DEFAULT_BASE_URL`, `ALLOWED_IMAGE_HOSTS`, `API_ENDPOINTS`, `isSecureUrl()`.
- **Helpers & API:** `buildProductImageUrl()`, `parseProduct()`, `parseProductsResponse()`, `fetchProducts()`.

### Key Design Decisions
- **Centralized Security (`config.ts`):** Enforces HTTPS to prevent unencrypted transmissions and tampering. Includes URL validation utilities.
- **Defensive Parser (`parser.ts`):** Safely extracts the first thumbnail (`thumbnail` / `images[0]`), handling diverse payload shapes and fallbacks.
- **Image URL Builder (`imageUrl.ts`):** Upgrades insecure `http://` image references to `https://` and safely formats relative asset tokens.
- **Pure TypeScript:** Zero framework runtime dependencies; portable across Node.js, Web, and React Native.

---

## CORS & API Handling

| Application | Strategy |
| --- | --- |
| **Next.js** | Data fetched in async server components (`Node.js` runtime) — no browser CORS. |
| **SPA (dev & prod)** | Direct fetch to CORS-enabled `https://dummyjson.com/products` (optional Vite `/api/products` proxy). |
| **Mobile** | Native networking bypasses browser CORS policies for direct API consumption. |

The Next.js route handler (`app/api/products/[slug]/route.ts`) provides a server-side proxy with caching headers (`Cache-Control: public, s-maxage=300, stale-while-revalidate=600`).

---

## Getting Started

### Prerequisites
- Node.js 18+ (see `.nvmrc`)
- npm 7+

### Installation & Build
```bash
# Install dependencies
npm install

# Build shared package and all apps
npm run build
```

### Development Servers
```bash
npm run dev           # Start all applications concurrently
npm run dev:next      # Next.js app (http://localhost:3000)
npm run dev:spa       # Vite React SPA (http://localhost:5173)
npm run dev:mobile    # Expo dev server (press 'w' for web, 'a' for Android, 'i' for iOS)
```

---

## Testing & Quality Assurance

```bash
npm run test          # Run all Vitest suites
npm run lint          # Lint all packages
npm run format        # Format with Prettier
npm run format:check  # Verify formatting compliance
```

### Test Coverage (`packages/shared/src/`)
- `config.test.ts`: Endpoint configuration, allowed image hosts, HTTPS validation.
- `imageUrl.test.ts`: URL building, HTTPS upgrade, whitespace trimming, edge cases.
- `parser.test.ts`: DummyJSON products parsing, thumbnail extraction, fallback handling.
- `api.test.ts`: Fetch mocking, slug resolution, custom base URLs, error handling.

---

## Accessibility & Performance

- **Semantic HTML:** `<main>`, headings, `<ul>` with `role="list"`, descriptive `alt` tags.
- **Keyboard & Focus:** Visible focus rings on all interactive elements; skip-to-content links.
- **Responsive Layout:** Adaptive grid layout (2 cols on mobile → 3 on tablet → 4 on desktop).
- **Next.js Image Optimization:** Automatic WebP/AVIF compression and responsive `srcSet` generation.
- **Fallback Handling:** Visual skeleton loaders and graceful placeholder states for broken images.
