# Invoice App (Invio)

A robust, modern invoice management application built with Next.js, TypeScript, Tailwind CSS, and shadcn/ui. This project focuses on providing a complete lifecycle for invoice management, featuring full CRUD capabilities, draft handling, status tracking, seamless theming, and a fully responsive interface.

---

## Core Objective

To provide a comprehensive invoice system that enables users to:

- Create, view, update, and delete invoices.
- Save incomplete work as drafts.
- Manage invoice lifecycles (e.g., mark as paid).
- Filter invoices by their current status.
- Toggle between light and dark themes seamlessly.
- Interact with a layout optimized for mobile, tablet, and desktop screens.
- Experience refined UI states (hover, focus, active).
- Persist data reliably using LocalStorage, IndexedDB, or a custom backend API.

---

## Key Features

### 1. Complete CRUD Operations

Users have full control over their data:

- **Create:** Generate new invoices through an intuitive form.
- **Read:** Browse a summarized list view and inspect detailed invoice pages.
- **Update:** Edit existing invoice data and securely persist the changes.
- **Delete:** Permanently remove records, guarded by a confirmation modal to prevent accidental data loss.

### 2. Strict Form Validation

Data integrity is maintained through rigorous validation rules before submission:

- Required fields are strictly enforced.
- Inline error messages provide immediate feedback on invalid inputs.
- Submission logic is blocked until all criteria are met (e.g., valid email formatting, positive numeric values for quantity and price, and a minimum of one line item per invoice).

### 3. Dynamic Status Flow

Invoices track real-world billing states:

- **Draft:** Incomplete invoices saved for later editing.
- **Pending:** Finalized invoices awaiting payment.
- **Paid:** Completed transactions.
- _Note:_ Paid invoices are locked to maintain historical accuracy. Status updates are immediately reflected across list views, detail pages, and UI badges.

### 4. Real-time Filtering

Efficiently manage large datasets with intuitive filtering:

- Filter views by Draft, Pending, Paid, or All.
- Instant UI updates upon selection.
- Clear empty-state messaging when no records match the criteria.

### 5. Persistent Theming

- Full support for Light and Dark modes.
- User preferences are saved via LocalStorage to persist across sessions.
- Ensures high-contrast accessibility and consistent styling in both themes.

### 6. Responsive Architecture

The application layout fluidly adapts to any device:

- Mobile (320px+), Tablet (768px+), and Desktop (1024px+).
- Features adaptive navigation, mobile-optimized forms, and consistent visual hierarchy without horizontal overflow.

### 7. Refined UI/UX

Every interactive element provides clear visual feedback:

- Consistent hover, focus, and active states applied across buttons, links, cards, filters, and form inputs to enhance usability and accessibility.

---

## Technical Stack

- **Framework:** Next.js 15+ (App Router)
- **Language:** TypeScript (Strict Mode)
- **Styling:** Tailwind CSS
- **UI Primitives:** Radix UI & shadcn/ui
- **Form Management:** React Hook Form
- **Schema Validation:** Zod
- **State Management:** Context API / Zustand
- **Data Persistence:** IndexedDB / LocalStorage / API
- **Utility Libraries:**
  - `date-fns` (Date formatting)
  - `nanoid` (Unique ID generation)
  - `clsx` / `tailwind-merge` (Dynamic class routing)
  - `sonner` (Toast notifications)

---

## Getting Started

### Prerequisites

Ensure you have Node.js and `pnpm` installed on your machine.

### Installation & Setup

1. Clone the repository:

   ```bash
   git clone <repo-url>
   cd invio
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Start the development server:
   ```bash
   pnpm dev
   ```

### Available Scripts

- `npm run dev`: Starts the local development server.
- `npm run build`: Compiles the application for production.
- `npm run start`: Runs the compiled production build.
- `npm run lint`: Analyzes the code for style and syntax errors.
- `npm run format`: Automatically formats the codebase.
- `npm run type-check`: Validates TypeScript typings.

### Project Goals & Architecture

This project was developed with a focus on:

- **Clean UI Architecture:** Modular and maintainable component design.
- **Strong Validation Logic:** Ensuring data integrity at the client level.
- **Flexible State Persistence:** Designing the application to easily swap between local storage and backend databases.
- **Production-Level Patterns:** Implementing industry-standard frontend practices for scalability and performance.

### Future Roadmap

- Implement full user authentication.
- Add multi-user support and role-based access.
- Enable PDF export functionality for invoices.
- Integrate a dedicated backend (Node/Next API routes) for centralized data management.
- Implement real-time synchronization across devices.
