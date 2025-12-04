# syntax=docker/dockerfile:1

# Build stage: install deps and build Vite app
FROM node:20-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# Runtime stage: serve static assets with nginx
FROM nginx:1.27-alpine AS runner

# Copy built files
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 3000
CMD ["npm", "run", "start"]
