## Bree Take-Home Monorepo Template

This is a minimal **frontend-only monorepo** wired for:

- **React admin dashboard** at `apps/admin` (Vite + React + TS)
- **React Native mobile app** at `apps/mobile` (Expo SDK 55 + React Native 0.83)

Both projects are managed via **npm workspaces** from the repo root.

### Structure

- `package.json` – root workspace + shared scripts
- `tsconfig.base.json` – shared TS config
- `apps/admin` – React admin dashboard (Vite)
- `apps/mobile` – React Native mobile app (Expo)

### Getting started

1. **Install dependencies (from repo root)**:

   ```bash
   npm install
   ```

2. **Run the admin dashboard**:

   ```bash
   npm run dev:admin
   ```

   Vite will start on `http://localhost:5173`.

3. **Run the mobile app (Expo)**:

   ```bash
   npm run dev:mobile
   ```

   This runs `expo start` in `apps/mobile`. Use the Expo Go app or emulators to preview.

### Where to implement your assignment

- **Admin dashboard** – build your web admin UI in `apps/admin/src`.
- **Mobile app** – build your mobile flows in `apps/mobile` (starting from `App.tsx`).

The goal is to give you a **clean, batteries-included monorepo scaffold** so you can focus on product logic and UI rather than project wiring.

