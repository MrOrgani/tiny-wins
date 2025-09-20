# Deployment Checklist - Tiny Wins

Use this checklist to ensure safe and successful deployments.

## Pre-Deployment Checklist

### Code Quality ✅

- [ ] All tests passing (`npm run test`)
- [ ] Type checking clean (`npm run type-check`)
- [ ] Linting passes (`npm run lint`)
- [ ] Code formatting consistent (`npm run format:check`)
- [ ] Psychology audit passes (`npm run psychology-check`)
- [ ] No shame-based language (`npm run audit:language`)

### Security & Performance ✅

- [ ] Dependencies audited (`npm audit`)
- [ ] Bundle size within limits (`npm run stats`)
- [ ] Accessibility tests pass (`npm run a11y:check`)
- [ ] E2E tests pass (`npm run e2e`)
- [ ] Performance audit acceptable (`npm run audit:performance`)

### Environment Configuration ✅

- [ ] Environment variables configured
- [ ] Production environment file updated (`.env.production`)
- [ ] Secrets properly configured in deployment platform
- [ ] Health check endpoint working (`/health`)

### Documentation ✅

- [ ] README updated if needed
- [ ] CHANGELOG updated with new features/fixes
- [ ] API documentation updated if applicable
- [ ] Deployment documentation current

## Deployment Process

### 1. Pre-Deploy Validation

```bash
# Run comprehensive checks
npm run deploy:check

# Validate build locally
npm run build
npm run start
```

### 2. Deploy to Staging (if applicable)

```bash
# Deploy to staging environment
vercel --target staging
# OR
docker-compose -f docker-compose.staging.yml up
```

### 3. Staging Validation

- [ ] Health check responds correctly
- [ ] Key user journeys working
- [ ] Performance acceptable
- [ ] No console errors
- [ ] Accessibility features working
- [ ] Psychology features enabled

### 4. Production Deployment

```bash
# Deploy to production
vercel --prod
# OR
docker-compose up -d
```

### 5. Post-Deploy Validation

- [ ] Health check responds (`curl https://your-domain.com/health`)
- [ ] Application loads successfully
- [ ] Key features working
- [ ] Performance monitoring active
- [ ] Error tracking functional

## Rollback Procedures

### Immediate Rollback Triggers

- [ ] Health check failing
- [ ] Critical user journeys broken
- [ ] Performance degradation > 50%
- [ ] Security vulnerabilities exposed
- [ ] Accessibility features broken

### Rollback Steps

#### Vercel Rollback

```bash
# List recent deployments
vercel ls

# Rollback to previous version
vercel rollback [previous-deployment-url]
```

#### Docker Rollback

```bash
# Stop current container
docker-compose down

# Restore from backup
docker-compose -f docker-compose.backup.yml up -d
```

#### Git Rollback

```bash
# Revert the problematic commit
git revert HEAD --no-edit
git push origin main
```

## Post-Deployment Tasks

### Monitoring Setup ✅

- [ ] Performance monitoring active
- [ ] Error tracking configured
- [ ] Health check monitoring enabled
- [ ] User analytics working (if applicable)

### Communication ✅

- [ ] Team notified of deployment
- [ ] Users informed of new features (if applicable)
- [ ] Documentation updated
- [ ] Changelog published

### Performance Validation ✅

- [ ] Lighthouse scores acceptable
- [ ] Bundle size within limits
- [ ] Loading times optimal
- [ ] Memory usage normal
- [ ] No memory leaks detected

## Emergency Procedures

### Critical Issues

1. **Immediate Actions:**
   - [ ] Execute rollback procedure
   - [ ] Update status page (if applicable)
   - [ ] Notify team via configured channels

2. **Investigation:**
   - [ ] Check application logs
   - [ ] Review error tracking
   - [ ] Analyze performance metrics
   - [ ] Document incident

3. **Resolution:**
   - [ ] Fix root cause
   - [ ] Test fix thoroughly
   - [ ] Deploy fix following full checklist
   - [ ] Conduct post-incident review

### Contact Information

- **Emergency Rollback:** See procedures above
- **Health Check:** `/health` endpoint
- **Logs:** Vercel dashboard or Docker logs
- **Monitoring:** Performance monitoring dashboard

## Psychology-First Deployment Notes

### User Experience Priorities

- [ ] Ensure habit-forming features work correctly
- [ ] Verify encouraging language in all user-facing text
- [ ] Confirm accessibility features support all users
- [ ] Test that animations respect motion preferences

### Feature Flags Validation

- [ ] Celebration features working (`NEXT_PUBLIC_ENABLE_CELEBRATIONS`)
- [ ] Sound effects functional (`NEXT_PUBLIC_ENABLE_SOUNDS`)
- [ ] Whimsy features active (`NEXT_PUBLIC_ENABLE_WHIMSY`)
- [ ] Motion sensitivity respected (`NEXT_PUBLIC_RESPECT_MOTION_PREFERENCES`)

### Performance Psychology

- [ ] Loading states are encouraging, not stressful
- [ ] Error messages are supportive, not blaming
- [ ] Success feedback reinforces positive behavior
- [ ] Overall experience promotes habit formation

## Sign-off

**Deployed by:** **\*\***\_\_\_\_**\*\***
**Date:** **\*\***\_\_\_\_**\*\***
**Version:** **\*\***\_\_\_\_**\*\***
**Environment:** **\*\***\_\_\_\_**\*\***

**Checklist completed:** ☐ Yes ☐ No
**Rollback plan confirmed:** ☐ Yes ☐ No
**Monitoring active:** ☐ Yes ☐ No

**Notes:**

---

---

---
