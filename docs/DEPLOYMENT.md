# Tiny Wins - Deployment Guide

A comprehensive deployment guide for the psychology-focused habit tracking application.

## Overview

Tiny Wins is configured for multiple deployment strategies:

- **Vercel** (Recommended): Optimized for Next.js with zero-config deployments
- **Docker**: Containerized deployment for cloud platforms
- **GitHub Actions**: Automated CI/CD pipeline with comprehensive testing

## Quick Start

### 1. Vercel Deployment (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to Vercel
vercel

# Deploy to production
vercel --prod
```

### 2. Docker Deployment

```bash
# Build the Docker image
docker build -t tiny-wins .

# Run locally
docker run -p 3000:3000 tiny-wins

# Deploy with docker-compose
docker-compose up -d
```

### 3. Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run all quality checks
npm run validate:full
```

## Deployment Configurations

### Vercel Configuration

The application includes optimized Vercel configuration in `vercel.json`:

- **Framework Detection**: Automatic Next.js optimization
- **Security Headers**: Comprehensive security policy
- **Caching Strategy**: Optimized for performance
- **Health Checks**: Built-in monitoring endpoints
- **Regional Deployment**: Multi-region for better performance

**Required Environment Variables:**

```bash
# Set these in Vercel dashboard or via CLI
vercel env add NEXT_PUBLIC_APP_URL
vercel env add NEXT_PUBLIC_ENVIRONMENT
```

### Docker Configuration

**Multi-stage build process:**

1. **Dependencies Stage**: Installs production dependencies
2. **Build Stage**: Compiles the application
3. **Runtime Stage**: Creates optimized production container

**Security Features:**

- Non-root user execution
- Minimal base image (Alpine Linux)
- Security updates included
- Health check monitoring

**Environment Variables:**
Copy `.env.example` to `.env.production` and configure:

```bash
cp .env.example .env.production
# Edit .env.production with your values
```

## CI/CD Pipeline

### GitHub Actions Workflows

#### 1. Continuous Integration (`.github/workflows/ci.yml`)

**Quality Assurance:**

- Code quality checks (ESLint, Prettier)
- Type checking (TypeScript)
- Psychology-first code auditing
- Security scanning

**Testing:**

- Unit tests with coverage
- Integration tests
- End-to-end tests (Playwright)
- Accessibility auditing

**Performance:**

- Bundle size analysis
- Lighthouse performance auditing
- Memory usage monitoring

#### 2. Deployment (`.github/workflows/deploy.yml`)

**Automated Deployment:**

- Pre-deployment validation
- Multi-environment support
- Health check verification
- Rollback capabilities

**Post-deployment:**

- Performance monitoring
- Error tracking
- Notification system

### Required Secrets

Configure these secrets in your GitHub repository:

```bash
# Vercel Integration
VERCEL_TOKEN=your_vercel_token
VERCEL_ORG_ID=your_org_id
VERCEL_PROJECT_ID=your_project_id

# Optional: Notifications
SLACK_WEBHOOK_URL=your_slack_webhook
```

## Environment Management

### Development Environment

```bash
# Copy example file
cp .env.example .env.local

# Required for development
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_ENVIRONMENT=development
```

### Production Environment

**Vercel Dashboard:**

1. Navigate to Project Settings → Environment Variables
2. Add production environment variables
3. Deploy automatically triggers with new variables

**Docker Production:**

```bash
# Use production environment file
docker run --env-file .env.production -p 3000:3000 tiny-wins
```

## Performance Optimization

### Bundle Analysis

```bash
# Generate bundle analysis report
npm run stats:report

# View bundle composition
npm run stats
```

### Size Monitoring

Bundle size limits are enforced via `size-limit`:

- First Load JS: 300 KB
- Client Bundle: 150 KB
- All Static Assets: 500 KB

### Image Optimization

- WebP and AVIF format support
- Automatic image optimization via Next.js
- CDN delivery via Vercel

## Security Configuration

### Headers

Security headers are automatically applied:

- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Referrer-Policy: origin-when-cross-origin
- Strict-Transport-Security (HTTPS only)
- Content-Security-Policy

### Environment Variables

**Never commit sensitive data:**

- Use `.env.local` for local development
- Use platform-specific environment management for production
- Follow principle of least privilege

## Monitoring & Health Checks

### Health Endpoint

Health check available at `/health` or `/api/health`:

```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "uptime": 3600,
  "message": "Tiny wins are building momentum! 🌱",
  "checks": {
    "memory": { "status": "optimal" },
    "environment": { "status": "configured" },
    "features": { "status": "configured" }
  }
}
```

### Performance Monitoring

**Automatic monitoring:**

- Lighthouse CI in pull requests
- Bundle size tracking
- Performance regression detection
- Accessibility compliance

## Rollback Procedures

### Vercel Rollback

```bash
# List deployments
vercel ls

# Rollback to specific deployment
vercel rollback [deployment-url]
```

### Docker Rollback

```bash
# Tag current version before deployment
docker tag tiny-wins tiny-wins:backup

# Rollback if needed
docker stop tiny-wins-app
docker run -d --name tiny-wins-app -p 3000:3000 tiny-wins:backup
```

### Git Rollback

```bash
# Revert last commit
git revert HEAD --no-edit
git push origin main

# This triggers automatic redeployment
```

## Troubleshooting

### Common Issues

**Build Failures:**

```bash
# Clear Next.js cache
npm run clean

# Reinstall dependencies
npm run fresh

# Check for TypeScript errors
npm run type-check
```

**Performance Issues:**

```bash
# Analyze bundle size
npm run stats:report

# Check memory usage via health endpoint
curl https://your-domain.com/health
```

**Environment Issues:**

```bash
# Validate environment configuration
npm run validate:quick

# Check required environment variables
npm run psychology-check
```

### Logs and Debugging

**Vercel:**

- View logs in Vercel dashboard
- Use `vercel logs` CLI command
- Enable Vercel Analytics for insights

**Docker:**

```bash
# View container logs
docker logs tiny-wins-app

# Debug container
docker exec -it tiny-wins-app sh
```

## Psychology-First Deployment Practices

### Feature Flags

Gradually roll out features using environment variables:

- `NEXT_PUBLIC_ENABLE_CELEBRATIONS`
- `NEXT_PUBLIC_ENABLE_SOUNDS`
- `NEXT_PUBLIC_ENABLE_WHIMSY`

### Performance Psychology

- Bundle size monitoring prevents slow load times
- Health checks use encouraging language
- Error messages avoid shame-based language
- Accessibility checks ensure inclusive experience

### Monitoring Philosophy

- Focus on user impact over technical metrics
- Track engagement over vanity metrics
- Monitor for inclusive design compliance
- Ensure features support habit formation psychology

## Support

For deployment issues:

1. Check the health endpoint: `/health`
2. Review GitHub Actions logs
3. Consult Vercel dashboard (if using Vercel)
4. Review this documentation

**Emergency Contacts:**

- Rollback procedures above
- Health check endpoints for status
- Automated alerts via configured webhooks
