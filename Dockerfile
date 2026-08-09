# Stage 1: Build Frontend
FROM node:20-alpine AS frontend-builder
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci
COPY frontend ./
RUN npm run build

# Stage 2: Build Backend & Setup Runtime
FROM node:20-alpine
WORKDIR /app/backend

# Install backend dependencies
COPY backend/package*.json ./
RUN npm ci

# Copy backend source code and prisma schema
COPY backend ./

# Generate Prisma Client
RUN npx prisma generate

# Create the frontend dist directory structure
RUN mkdir -p /app/frontend/dist

# Copy the built frontend files from Stage 1
COPY --from=frontend-builder /app/frontend/dist /app/frontend/dist

# Start the application
CMD ["npm", "start"]
