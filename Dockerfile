# syntax=docker/dockerfile:1

# Build stage
FROM node:20-slim AS builder
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy source
COPY . .

# Build static assets
RUN npm run build

# Runtime stage (serve static build)
FROM nginx:1.27-alpine AS runner

# Copy build output to nginx html directory
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
