# Tiny Wins - Production-Ready Docker Configuration
# This Dockerfile creates a secure, optimized container for the psychology-focused habit tracking app

# =============================================================================
# Build Stage - Dependencies
# =============================================================================
FROM node:18-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies with security optimizations
RUN npm ci --only=production && npm cache clean --force

# =============================================================================
# Build Stage - Application
# =============================================================================
FROM node:18-alpine AS builder
WORKDIR /app

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy source code
COPY . .

# Set build environment
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Install all dependencies (including dev)
RUN npm ci

# Run build optimizations
RUN npm run build

# =============================================================================
# Production Stage - Runtime
# =============================================================================
FROM node:18-alpine AS runner

# Security: Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Install security updates
RUN apk update && apk upgrade && apk add --no-cache dumb-init

WORKDIR /app

# Set production environment
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Copy built application
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

# Copy build output and set permissions
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Security: Switch to non-root user
USER nextjs

# Health check for psychology-first monitoring
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

# Expose port
EXPOSE 3000

# Use dumb-init for proper signal handling
ENTRYPOINT ["dumb-init", "--"]

# Start the application
CMD ["node", "server.js"]

# =============================================================================
# Metadata
# =============================================================================
LABEL maintainer="Tiny Wins Team"
LABEL description="Psychology-focused habit tracking application"
LABEL version="0.1.0"
LABEL org.opencontainers.image.source="https://github.com/your-username/tiny-wins"