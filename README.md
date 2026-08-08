# Mini ERP + CRM Operations Portal

A complete Full Stack ERP + CRM solution built with Node.js, Express, Prisma, and React (Vite).

## Tech Stack
*   **Backend**: Node.js, Express.js, TypeScript, Prisma ORM
*   **Database**: SQLite (Configured for immediate local use due to environment constraints. See instructions below to switch to PostgreSQL).
*   **Frontend**: React (Vite), TypeScript, Vanilla CSS.

## Getting Started (Local Setup)

### Prerequisites
*   Node.js (v18 or higher)
*   npm or yarn

### 1. Backend Setup
```bash
cd backend
npm install
npm run dev
```
*   The backend runs on `http://localhost:5000`.
*   **Note on Database**: Prisma is currently configured to use `SQLite` out-of-the-box (`dev.db`). This ensures the app works immediately without needing Docker or a local Postgres instance. 

#### To switch back to PostgreSQL:
1. Update `backend/prisma/schema.prisma` and change `provider = "sqlite"` to `provider = "postgresql"`.
2. Ensure Docker Desktop is running.
3. Start the Postgres container using the provided docker-compose: `docker compose up -d`
4. Update `backend/.env` with your Postgres connection string (e.g., `DATABASE_URL="postgresql://erp_user:erp_password@localhost:5432/erp_db?schema=public"`).
5. Run migrations: `npx prisma db push`.
6. Seed data: `npx tsx prisma/seed.ts`.

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
*   The frontend runs on `http://localhost:5173`.

### 3. Demo Credentials
Use these credentials to test role-based access:
*   **Admin User**: `admin@minierp.com` / `admin123`
*   **Sales User**: `sales@minierp.com` / `sales123`

## Architecture & Assumptions
*   **Authentication**: JWT-based stateless authentication. Passwords are encrypted using bcrypt.
*   **CRM Flow**: Basic CRM functionality implemented. Users can create, update, and search leads and active customers.
*   **Inventory Flow**: Products maintain a stock level. A separate `StockMovement` table tracks every IN/OUT movement, ensuring auditability.
*   **Sales Challan Flow**: Creating a challan in `DRAFT` state does not affect stock. Moving a challan to `CONFIRMED` automatically deducts stock via a database transaction. If stock is insufficient, the transaction is rolled back and an error is returned.

## Known Limitations / Incomplete Parts
*   **PDF Generation**: Invoice export to PDF is not implemented yet.
*   **AWS S3**: Product image upload is not implemented yet.
*   **Deployment**: This setup is fully optimized for local development. To deploy:
    *   **Backend**: Can be deployed to Render or Railway. Change `DATABASE_URL` to the production Postgres database URL.
    *   **Frontend**: Can be easily deployed to Vercel or Netlify. Build command is `npm run build`. Set `VITE_API_URL` to point to your live backend.
