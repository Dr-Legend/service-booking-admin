# 🗓️ Service Booking — Admin Panel

A **Next.js 16** admin dashboard for managing service bookings, users, and service catalogs. Built with **Clean Architecture** principles to ensure a maintainable, testable, and scalable codebase.

> **Backend API**: This is the frontend admin panel only. It communicates with a separate **Hono.js** backend API via REST. Authentication is handled through JWT tokens stored in HttpOnly cookies.

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Architecture Overview](#architecture-overview)
- [Project Structure](#project-structure)
- [Layer Details](#layer-details)
  - [Domain Layer](#1-domain-layer)
  - [Application Layer](#2-application-layer)
  - [Infrastructure Layer](#3-infrastructure-layer)
  - [Presentation Layer](#4-presentation-layer)
  - [App Layer (Next.js)](#5-app-layer-nextjs-routing)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)

---

## Tech Stack

| Technology      | Purpose                     |
| --------------- | --------------------------- |
| Next.js 16      | App Router, SSR, Middleware  |
| React 19        | UI Components               |
| TypeScript 5    | Type Safety                 |
| Tailwind CSS 4  | Styling                     |
| JWT (HttpOnly)  | Authentication              |
| Hono.js (ext.)  | Backend API (separate repo) |

---

## Architecture Overview

This project follows **Clean Architecture** (inspired by Robert C. Martin). The dependency rule is strictly enforced — _dependencies always point inward toward the Domain_.

```
┌──────────────────────────────────────────────────────┐
│                    App (Next.js)                      │
│          Routes, Layouts, Server Actions              │
├──────────────────────────────────────────────────────┤
│                  Presentation                         │
│        React Components, UI State, Hooks              │
├──────────────────────────────────────────────────────┤
│                  Infrastructure                       │
│     API Repositories, DI Container, HTTP Clients      │
├──────────────────────────────────────────────────────┤
│                   Application                         │
│          Use Cases (Business Logic)                   │
├──────────────────────────────────────────────────────┤
│                     Domain                            │
│     Entities, Interfaces (Repository Contracts)       │
└──────────────────────────────────────────────────────┘
          ▲ Dependencies point INWARD (upward) ▲
```

---

## Project Structure

```
service-booking/
│
├── domain/                         # 🏛️ Domain Layer (Core)
│   ├── entities/
│   │   ├── Booking.ts              #   Booking entity & BookingStatus type
│   │   ├── ServiceCategory.ts      #   Service category entity
│   │   ├── ServiceItem.ts          #   Service item entity & PricingType
│   │   └── User.ts                 #   User entity & UserRole type
│   └── interfaces/
│       ├── BookingRepository.ts    #   Booking repository contract
│       ├── ServiceRepository.ts    #   Service repository contract (categories + items)
│       └── UserRepository.ts       #   User repository contract
│
├── application/                    # ⚙️ Application Layer (Use Cases)
│   └── use-cases/
│       ├── bookings/
│       │   ├── GetAllBookingsUseCase.ts
│       │   └── UpdateBookingStatusUseCase.ts
│       ├── services/
│       │   ├── CreateServiceCategoryUseCase.ts
│       │   ├── CreateServiceItemUseCase.ts
│       │   ├── DeleteServiceCategoryUseCase.ts
│       │   ├── DeleteServiceItemUseCase.ts
│       │   ├── GetAllCategoriesUseCase.ts
│       │   ├── GetAllServiceItemsUseCase.ts
│       │   └── UpdateServiceItemUseCase.ts
│       └── users/
│           ├── CreateUserUseCase.ts
│           └── GetAllUsersUseCase.ts
│
├── infrastructure/                 # 🔌 Infrastructure Layer
│   ├── di/
│   │   └── container.ts            #   Dependency Injection container
│   └── repositories/
│       ├── ApiBookingRepository.ts  #   REST implementation of BookingRepository
│       ├── ApiServiceRepository.ts  #   REST implementation of ServiceRepository
│       ├── ApiUserRepository.ts     #   REST implementation of UserRepository
│       └── InMemoryServiceRepository.ts  # In-memory stub (testing/dev)
│
├── presentation/                   # 🎨 Presentation Layer (UI Components)
│   └── components/
│       ├── BookingManager.tsx       #   Booking management UI
│       ├── ServiceManager.tsx       #   Service & category management UI
│       ├── Sidebar.tsx              #   Dashboard sidebar navigation
│       └── UserManager.tsx          #   User management UI
│
├── app/                            # 📱 Next.js App Router
│   ├── layout.tsx                  #   Root layout
│   ├── globals.css                 #   Global styles (Tailwind)
│   ├── (auth)/                     #   Auth route group
│   │   ├── layout.tsx              #     Auth-specific layout
│   │   └── login/
│   │       ├── page.tsx            #     Login page
│   │       └── actions.ts          #     Login server actions
│   └── (dashboard)/                #   Dashboard route group (protected)
│       ├── layout.tsx              #     Dashboard layout with sidebar
│       ├── page.tsx                #     Dashboard home / overview
│       ├── bookings/
│       │   ├── page.tsx            #     Bookings management page
│       │   └── actions.ts          #     Booking server actions
│       ├── services/
│       │   ├── page.tsx            #     Services management page
│       │   └── actions.ts          #     Service server actions
│       └── users/
│           ├── page.tsx            #     Users management page
│           └── actions.ts          #     User server actions
│
├── proxy.ts                        # 🔒 Auth middleware (route protection)
├── next.config.ts                  # Next.js configuration
├── tsconfig.json                   # TypeScript configuration
├── package.json                    # Dependencies & scripts
└── .env.local                      # Environment variables (not committed)
```

---

## Layer Details

### 1. Domain Layer

> 📁 `domain/`  •  **Zero dependencies** — no React, no Next.js, no external libraries.

The innermost layer defines the core business models and repository contracts.

**Entities** are plain TypeScript interfaces representing core data:

| Entity            | Key Fields                                                      |
| ----------------- | --------------------------------------------------------------- |
| `User`            | `id`, `name`, `email`, `role` (ADMIN / CLIENT), `company?`, `phone?` |
| `Booking`         | `id`, `userId`, `serviceItemId`, `status`, `targetStartDate`, `projectDescription` |
| `ServiceCategory` | `id`, `title`, `description`                                    |
| `ServiceItem`     | `id`, `categoryId`, `name`, `pricingType` (FIXED / HOURLY / CUSTOM_QUOTE), `basePrice?`, `isActive` |

**Interfaces** define repository contracts (ports) that the Application layer depends on. The Infrastructure layer provides concrete implementations.

---

### 2. Application Layer

> 📁 `application/`  •  Depends **only** on the Domain layer.

Contains **Use Cases** — each class encapsulates a single business operation. Use cases receive a repository interface via constructor injection and orchestrate domain logic.

```typescript
// Example: GetAllBookingsUseCase
export class GetAllBookingsUseCase {
  constructor(private bookingRepository: BookingRepository) {}

  async execute(): Promise<Booking[]> {
    return this.bookingRepository.getAllBookings();
  }
}
```

| Module     | Use Cases                                                                                      |
| ---------- | ---------------------------------------------------------------------------------------------- |
| Bookings   | `GetAllBookingsUseCase`, `UpdateBookingStatusUseCase`                                          |
| Services   | `GetAllCategoriesUseCase`, `CreateServiceCategoryUseCase`, `DeleteServiceCategoryUseCase`, `GetAllServiceItemsUseCase`, `CreateServiceItemUseCase`, `UpdateServiceItemUseCase`, `DeleteServiceItemUseCase` |
| Users      | `GetAllUsersUseCase`, `CreateUserUseCase`                                                      |

---

### 3. Infrastructure Layer

> 📁 `infrastructure/`  •  Implements interfaces defined in the Domain layer.

**Repositories** are concrete implementations that communicate with the external Hono.js API via `fetch`. Authentication tokens are read from HttpOnly cookies using `next/headers`.

**DI Container** (`di/container.ts`) wires repository interfaces to their API implementations, serving as the single composition root:

```typescript
export const serviceRepository: ServiceRepository = new ApiServiceRepository();
export const userRepository: UserRepository = new ApiUserRepository();
export const bookingRepository: BookingRepository = new ApiBookingRepository();
```

---

### 4. Presentation Layer

> 📁 `presentation/`  •  React components focused purely on UI rendering.

Client-side components that handle user interaction and display data. They do **not** contain business logic or make direct API calls — all data flows through Server Actions that invoke Use Cases.

| Component          | Purpose                           |
| ------------------ | --------------------------------- |
| `BookingManager`   | View & update booking statuses    |
| `ServiceManager`   | CRUD for categories & items       |
| `UserManager`      | View & create users               |
| `Sidebar`          | Dashboard navigation              |

---

### 5. App Layer (Next.js Routing)

> 📁 `app/`  •  Next.js App Router with route groups and server actions.

- **(auth)** — Unauthenticated routes (login page).
- **(dashboard)** — Protected routes with a shared sidebar layout.
- **Server Actions** (`actions.ts`) in each route instantiate Use Cases from the DI container and invoke them, bridging the UI and Application layers.
- **Middleware** (`proxy.ts`) protects dashboard routes by checking for the `auth-token` cookie.

---

## Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm**, **pnpm**, **yarn**, or **bun**
- A running instance of the **Hono.js backend API**

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd service-booking

# Install dependencies
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to access the admin panel.

---

## Environment Variables

Create a `.env.local` file in the project root:

```env
API_BASE_URL=http://127.0.0.1:8787
```

| Variable       | Description                          | Default                    |
| -------------- | ------------------------------------ | -------------------------- |
| `API_BASE_URL` | Base URL of the Hono.js backend API  | `http://127.0.0.1:8787`   |

---

## Scripts

| Command          | Description                        |
| ---------------- | ---------------------------------- |
| `npm run dev`    | Start development server           |
| `npm run build`  | Create production build            |
| `npm run start`  | Start production server            |
| `npm run lint`   | Run ESLint                         |

---

<p align="center">
  Built with ❤️ using <strong>Next.js 16</strong> &amp; <strong>Clean Architecture</strong>
</p>
