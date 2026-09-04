# Dine Discover (Tablesetter) — Next.js

Next.js 15 App Router port of the original TanStack Router app. Same UI, same design
system, same data/logic flow (Ant Design + Tailwind v4 + TanStack Query + axios).

## Getting started

```bash
npm install
cp .env.example .env.local   # set NEXT_PUBLIC_API_URL
npm run dev                  # http://localhost:3000
```

## Structure

```
app/                      # App Router pages (each page.tsx = metadata, page-client.tsx = UI)
  layout.tsx              # replaces routes/__root.tsx shell
  providers.tsx           # QueryClient + Ant Design ConfigProvider/App + AntdRegistry (SSR styles)
  not-found.tsx           # replaces notFoundComponent
  error.tsx               # replaces errorComponent
  globals.css             # unchanged design system (was src/styles.css)
src/components|lib|hooks  # unchanged atoms/molecules/organisms/templates and logic
src/assets, public/       # unchanged assets
```

## Routing map

| TanStack route | Next.js route |
| --- | --- |
| `/` | `app/page.tsx` |
| `/search?q=` | `app/search/page.tsx` |
| `/restaurants` | `app/restaurants/page.tsx` |
| `/restaurants/$id` | `app/restaurants/[id]/page.tsx` |
| `/customer/login|register|dashboard|profile|dining-logs` | `app/customer/*` |
| `/owner/login|register|dashboard|profile` | `app/owner/*` |
| `/owner/restaurants/new`, `/owner/restaurants/$id` | `app/owner/restaurants/new`, `app/owner/restaurants/[id]` |

## API mapping

- `Link to=` → `next/link` `href=`
- `useNavigate()` → `useRouter()` from `next/navigation`
- `Route.useParams()` → `useParams()`
- `Route.useSearch()` / `validateSearch` → `useSearchParams()` + typed parsing in the page
- `useLocation().pathname` → `usePathname()`
- route `head()` → exported `metadata` in each `page.tsx`
- `import.meta.env.VITE_API_URL` → `process.env.NEXT_PUBLIC_API_URL`
