---
name: API Specification
description: Complete OpenAPI 3.1.0 spec for the VTU backend — all endpoints, schemas, enums, and security scheme
type: project
---

## Base URL
Configured via `NEXT_PUBLIC_API_BASE_URL`. All paths are prefixed `/api/v1/`.

## Authentication
- Scheme: OAuth2 Password Flow
- Token URL: `api/v1/auth/login`
- Login body: `application/x-www-form-urlencoded` with fields `username` (email), `password`
- All protected routes: `Authorization: Bearer <token>` header
- Role discrimination: `EditUser` schema has `is_admin: boolean` — role is embedded in user data, likely in JWT claims (`sub`, `is_admin`)

## Endpoint Groups

### Authentication (no auth required)
- POST `/api/v1/auth/login` — form-urlencoded: username, password → access_token, token_type
- POST `/api/v1/auth/register` — JSON: CreateUser { name, email, number, password, confirm_password }

### User Dashboard (auth required)
- GET `/api/v1/user/dashboard`

### Purchases (auth required)
- POST `/api/v1/user/purchase/buy-airtime` — BuyAirtime { network_id: int, amount: int, number: string }
- POST `/api/v1/user/purchase/buy-data` — BuyData { plan_id: int, number: string }
- POST `/api/v1/user/purchase/cable-sub` — CableSub { plan_id: int, iuc_number: string }
- POST `/api/v1/user/purchase/pay-bill` — PayBill { plan_id: int, meter_number: string, amount: float }

### User Transactions (auth required)
- GET `/api/v1/user/transaction/summary`
- GET `/api/v1/user/transaction/summary/{service}` — service: "airtime"|"data"|"cable"|"bill"

### Vending Routes / Route Selection (auth required)
- GET  `/api/v1/user/vending-route/{service}`
- POST `/api/v1/user/vending-route/add` — SetRoute { service, plan_id: int, provider }
- PUT  `/api/v1/user/vending-route/update/{route_id}` — UpdateRoute { provider }
- DELETE `/api/v1/user/vending-route/delete/{route_id}`

### Plans (auth required)
- GET `/api/v1/user/data-plans`
- GET `/api/v1/user/airtime-plans`
- GET `/api/v1/user/cable-plans`
- GET `/api/v1/user/bills-plans`

### SIM / Providers (auth required)
- GET    `/api/v1/user/provider/sim` — list all SIMs
- POST   `/api/v1/user/providersim/add/request-otp` — RequestOTP { network_id: int, number: string }
- POST   `/api/v1/user/providersim/add/connect-sim` — ConnectSim { network_id: int, number: string, otp_passcode: string }
- DELETE `/api/v1/user/provider/sim/delete{sim_id}` — NOTE: URL missing slash before {sim_id} — quirk to handle

### Admin Overview (admin auth required)
- GET `/api/v1/admin/overview`

### Admin Transactions (admin auth required)
- GET `/api/v1/admin/transactions/summary`
- GET `/api/v1/admin/transactions/summary/{service}`

### Admin Users (admin auth required)
- GET    `/api/v1/admin/users/all`
- PUT    `/api/v1/admin/users/edit/{user_id}` — EditUser { name?, email?, number?, is_active?, is_admin? }
- DELETE `/api/v1/admin/users/delete/{user_id}`

### Admin Plans — Networks (admin auth required)
- GET    `/api/v1/admin/plans/networks`
- POST   `/api/v1/admin/plans/networks/add` — AddNetwork { name: NetworkName, is_active: bool }
- PUT    `/api/v1/admin/plans/networks/update/{network_id}` — EditNetwork { is_active?: bool }
- DELETE `/api/v1/admin/plans/networks/delete/{network_id}`

### Admin Plans — Airtime (admin auth required)
- GET    `/api/v1/admin/plans/airtime-plans`
- POST   `/api/v1/admin/plans/airtime-plans/add` — AddAirtimePlan { network_id, minimum_amount, maximum_amount, charges, discount, is_active }
- PUT    `/api/v1/admin/plans/airtime-plans/update/{plan_id}` — EditAirtimePlan (all optional)
- DELETE `/api/v1/admin/plans/airtime-plan/delete/{plan_id}` — NOTE: singular "plan" not "plans" in path

### Admin Plans — Data (admin auth required)
- GET    `/api/v1/admin/plans/data-plans`
- POST   `/api/v1/admin/plans/data-plans/add` — AddDataPlan { network_id, data_type_id, name, size?, validity, description?, teleco_price?, wallet_price, charges, is_active, sim_id?, momo_id?, smartcash_id?, vtpass_id? }
- PUT    `/api/v1/admin/plans/data-plans/update/{plan_id}` — EditDataPlan (all optional)
- DELETE `/api/v1/admin/plans/data-plans/delete/{plan_id}`

## Key Enums
- Service: "airtime" | "data" | "cable" | "bill"
- NetworkName: "mtn" | "airtel" | "glo" | "t2"
- Provider: "sim" | "smartcash" | "momo" | "vtpass"
- DataSize: "MB" | "GB" | "TB"

## Notable Quirks
1. DELETE `/api/v1/user/provider/sim/delete{sim_id}` — missing slash before path param (backend bug). Frontend must call it as-is: `/api/v1/user/provider/sim/delete${sim_id}`
2. DELETE airtime plan uses singular `/airtime-plan/delete/` but GET/POST/PUT use `/airtime-plans/` — inconsistent plural
3. `EditDataPlan.validity` references `DataSize` enum (MB/GB/TB) — likely a backend schema error; validity is a string in AddDataPlan
4. Amount fields on AddAirtimePlan/AddDataPlan accept both `number` and `string` matching numeric regex — send as number from frontend
5. No cable or bill plan admin CRUD endpoints visible — cable-plans and bills-plans management may be out of scope or not yet implemented
6. No password change, profile update, or wallet top-up endpoint visible in this spec version

## Why These Decisions Matter
How to apply: Use quirk #1 literally in the sim API client. Use quirk #2 to ensure correct delete path for airtime plans. Treat DataSize enum for validity as string in frontend Zod schema since AddDataPlan defines validity as plain string.
