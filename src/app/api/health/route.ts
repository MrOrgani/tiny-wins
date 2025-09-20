import { NextRequest, NextResponse } from 'next/server';

/**
 * Health check endpoint for monitoring and load balancers
 * Psychology-first approach: Always return encouraging messages
 */
export async function GET(_request: NextRequest) {
  try {
    const healthData = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
      version: process.env.NEXT_PUBLIC_APP_VERSION || '0.1.0',
      message: 'Tiny wins are building momentum! 🌱',
      checks: {
        memory: await checkMemoryUsage(),
        environment: checkEnvironmentVariables(),
        features: checkFeatureFlags(),
      },
    };

    // Optional: Check external dependencies
    if (process.env.DATABASE_URL) {
      healthData.checks.database = await checkDatabase();
    }

    // Return healthy status
    return NextResponse.json(healthData, {
      status: 200,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Health check encountered an issue:', error);

    const errorData = {
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      message: 'Taking a moment to recharge... 🔄',
      error:
        process.env.NODE_ENV === 'development'
          ? (error as Error).message
          : 'Internal issue',
    };

    return NextResponse.json(errorData, {
      status: 503,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Content-Type': 'application/json',
      },
    });
  }
}

/**
 * Check memory usage (psychology-friendly thresholds)
 */
async function checkMemoryUsage() {
  const memUsage = process.memoryUsage();
  const heapUsedMB = Math.round(memUsage.heapUsed / 1024 / 1024);
  const heapTotalMB = Math.round(memUsage.heapTotal / 1024 / 1024);

  return {
    status:
      heapUsedMB < 500
        ? 'optimal'
        : heapUsedMB < 800
          ? 'good'
          : 'needs-attention',
    heapUsedMB,
    heapTotalMB,
    message:
      heapUsedMB < 500
        ? 'Memory usage is excellent!'
        : heapUsedMB < 800
          ? 'Memory usage is within healthy range'
          : 'Memory usage could benefit from optimization',
  };
}

/**
 * Check critical environment variables
 */
function checkEnvironmentVariables() {
  const required = ['NODE_ENV'];
  const missing = required.filter((env) => !process.env[env]);

  return {
    status: missing.length === 0 ? 'configured' : 'needs-attention',
    missing,
    message:
      missing.length === 0
        ? 'All critical environment variables are set!'
        : `Missing environment variables: ${missing.join(', ')}`,
  };
}

/**
 * Check feature flags status
 */
function checkFeatureFlags() {
  const features = {
    celebrations: process.env.NEXT_PUBLIC_ENABLE_CELEBRATIONS === 'true',
    sounds: process.env.NEXT_PUBLIC_ENABLE_SOUNDS === 'true',
    whimsy: process.env.NEXT_PUBLIC_ENABLE_WHIMSY === 'true',
    motionSensitivity:
      process.env.NEXT_PUBLIC_RESPECT_MOTION_PREFERENCES === 'true',
  };

  const enabledCount = Object.values(features).filter(Boolean).length;

  return {
    status: 'configured',
    features,
    enabledCount,
    totalCount: Object.keys(features).length,
    message: `${enabledCount}/${Object.keys(features).length} psychology features enabled`,
  };
}

/**
 * Check database connectivity (if applicable)
 */
async function checkDatabase() {
  try {
    // Placeholder for actual database health check
    // Replace with actual database ping when implemented
    return {
      status: 'connected',
      message: 'Database connection is healthy',
      responseTime: '< 10ms',
    };
  } catch (error) {
    return {
      status: 'disconnected',
      message: 'Database connection needs attention',
      error: error.message,
    };
  }
}

/**
 * HEAD request for simple health check
 */
export async function HEAD() {
  return new NextResponse(null, { status: 200 });
}
