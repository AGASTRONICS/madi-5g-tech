---
name: Architecture Decisions
description: Core frontend architecture decisions for the VTU platform — auth strategy, folder structure, routing, state, component patterns
type: project
---

## Auth Strategy — IMPLEMENTED
- OAuth2 Password Flow; login sends `application/x-www-form-urlencoded`
- Token stored in Zustand with `persist` middleware (localStorage, key: `vtu_auth`, SSR-safe via `skipHydration: true`)
- Zustand store hydrated client-side via `AuthRehydrator` component (useEffect in root layout)
- JWT decoded client-side with `jwt-decode` to extract `is_admin` boolean claim
- Middleware reads token from HttpOnly cookie named `vtu_session` (set by login server action)
- Middleware protects: unauthenticated → `/login`, non-admin on `/admin/*` → `/dashboard`
- `getStoredToken()` in `lib/api/client.ts` reads from `localStorage.getItem("vtu_auth")` directly (avoids circular import with auth.store)
- `rehydrateAuthStore()` exported from auth.store — call in root layout useEffect

## Role Discrimination
- `EditUser` schema exposes `is_admin: boolean` — confirmed boolean flag not a string role
- JWT likely carries `is_admin` claim; decoded on client to gate admin UI
- Admin routes: `/admin/*` — separate route group `(admin)`
- User routes: `/dashboard`, `/airtime`, `/data`, `/cable`, `/bills`, `/transactions`, `/sim-management`, `/routes`

## State Management
- React Query (TanStack Query v5) for all server state
- Zustand for auth state only (token + user profile + is_admin)
- No Redux or Context API for data — React Query handles caching, invalidation, loading/error states

## Stale Times
- Plans (airtime, data, cable, bills): 10 minutes — semi-static
- Dashboard: 30 seconds — changes with purchases
- Transactions: 60 seconds
- Admin overview: 30 seconds
- Networks: 10 minutes

## Folder Structure Decision — IMPLEMENTED
- Project root is the source root — NO `src/` directory. `@/*` alias maps to `./` (not `./src/`)
- The initial template was generated WITHOUT a `src/` directory; all code lives at root level:
  `app/`, `lib/`, `components/`, `hooks/`, `types/`, `middleware.ts`
- Feature-based: each feature (airtime, data, cable, bills, transactions, sim, routes, admin) has its own page
- Shared API layer under `lib/api/` — one file per domain
- Shared hooks under `lib/hooks/` — one file per domain
- Zod schemas under `lib/validations/`
- Types under `types/`
- components.json aliases: `@/components`, `@/lib`, `@/hooks` (all root-relative)

## Purchase Flow Pattern
1. Page loads plans via React Query (cached)
2. User selects plan from dropdown / fills form
3. React Hook Form + Zod validates
4. `useMutation` calls purchase endpoint
5. On success: invalidate dashboard + transactions queries, show success toast with receipt details
6. On error: extract `detail` from FastAPI error response, show error toast

## Vending Route Feature
- Users can assign a `provider` (sim/smartcash/momo/vtpass) per plan per service
- This is a power-user/reseller feature — expose in a dedicated "Routes" settings page
- GET by service, then add/update/delete individual route entries

## SIM Management Flow
- Two-step: Request OTP (sends OTP to SIM number) → Connect SIM (submit OTP)
- Implemented as a two-step wizard/dialog
- List existing SIMs, delete SIM

## Admin Plan Management
- Networks CRUD (only `is_active` editable after creation — name is fixed enum)
- Airtime Plans CRUD (min/max amount range, charges, discount, active toggle)
- Data Plans CRUD (rich schema: network, data_type_id, name, size, validity, prices, provider IDs)
- No cable or bill plan CRUD in current API spec — admin plans section covers networks + airtime + data only

## API Client Design — IMPLEMENTED (`lib/api/client.ts`)
- Axios instance with baseURL from `NEXT_PUBLIC_API_BASE_URL` env var
- Request interceptor: reads token directly from `localStorage("vtu_auth").state.token` (avoids circular import)
- Response interceptor: 401 → dynamic import auth.store → clearAuth() + window.location.href="/login"
- 422 → parse FastAPI `detail[]` array into "field: msg; field: msg" string
- 5xx → console.error + re-throw
- 403: handled in-component via caught error; no global redirect
- All domain functions return `response.data` directly (not wrapped in ApiResponse<T>)
- API inconsistencies preserved: `deleteSim` uses literal `/sim/delete${simId}` (no slash); `deleteAirtimePlan` uses `/airtime-plan/` (singular)

## Auth Flow — IMPLEMENTED (useAuth hook + pages)
- `lib/hooks/useAuth.ts` wraps login/register mutations and logout
- Login: calls `login()` from `lib/api/auth.ts` → decodes JWT → `setToken()` (stores in Zustand/localStorage) → writes `vtu_session` cookie → redirects
- Cookie written client-side: `document.cookie = vtu_session=JSON.stringify({is_admin}); path=/; max-age=604800`
- Cookie cleared on logout: `document.cookie = "vtu_session=; path=/; max-age=0"`
- Logout: `clearAuth()` + clear cookie + `queryClient.clear()` + navigate to `/login`
- `useAuth` re-exports `isAuthenticated`, `isAdmin`, `user` from Zustand store as selector functions
- Toast: uses `sonner` `toast.success` / `toast.error` (NOT shadcn useToast — Toaster is from sonner in root layout)
- Error shape cast: `loginMutation.error as ApiError` (error is typed as `unknown` in React Query v5 by default when using typed generics)

## UI Component Availability — IMPORTANT
- Only `components/ui/button.tsx` was pre-scaffolded; it wraps `@base-ui/react/button` (NOT Radix)
- Written during auth implementation: `input.tsx`, `label.tsx`, `card.tsx`, `alert.tsx` — all pure HTML + Tailwind, no Radix dependency
- Do NOT assume other shadcn components exist — check `components/ui/` before importing

## Zod Version and Import Path
- Installed: zod v4.3.6 — BUT `@hookform/resolvers` v5 imports `zod/v3` internally for resolver compatibility
- All Zod schemas use `import { z } from "zod/v3"` to guarantee hookform resolver compatibility
- Regular Zod v4 API (`import { z } from "zod"`) also works for standalone validation but use v3 path for RHF

## Form Pattern (Auth Pages)
- `useForm<FormValues>({ resolver: zodResolver(Schema) })` — standard RHF + Zod pattern
- Field errors: `{errors.fieldName && <p className="text-xs text-destructive">{errors.fieldName.message}</p>}`
- API error: read from `mutation.error as ApiError` and render in `<Alert variant="destructive">`
- Show/hide password: local `useState(false)`, toggle via Eye/EyeOff from lucide-react, absolute button inside relative wrapper
- Submit button disabled + Loader2 spinner while `mutation.isPending`
- `confirm_password` stripped before API call: `const { confirm_password: _omit, ...payload } = data`

## Why These Decisions Matter
How to apply: These decisions are binding for all future code generation. Do not deviate without noting the reason. The cookie-based role mirror for middleware is the key SSR-compatible auth pattern to remember.
