# ─────────────────────────────────────────────────────────────────────────────
# Dockerfile for the Node.js backend (lives in backend/)
# Build context must be the REPO ROOT so Docker can reach src/data/siteData.json
#
# Local:   docker compose up --build
# Render:  dockerfilePath = ./backend/Dockerfile   dockerContext = .
# ─────────────────────────────────────────────────────────────────────────────

# ── Stage 1: install production dependencies ──────────────────────────────────
FROM node:20-alpine AS deps

WORKDIR /app

# Copy only package files — Docker caches this layer if they don't change
COPY backend/package.json backend/package-lock.json* ./

RUN npm install --omit=dev

# ── Stage 2: lean runtime image ───────────────────────────────────────────────
FROM node:20-alpine AS runner

WORKDIR /app

# Bring in installed modules from the deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy all backend source files into /app  (server.js, seed.js, models/, routes/, start.sh …)
COPY backend/ .

# Copy siteData.json into /app/data/ so seed.js can read it at ./data/siteData.json
COPY src/data/siteData.json ./data/siteData.json

# Make the startup script executable
RUN chmod +x start.sh

ENV PORT=5000
ENV NODE_ENV=production

EXPOSE 5000

# Every container start → seed MongoDB from siteData.json → then run API server
CMD ["sh", "start.sh"]
