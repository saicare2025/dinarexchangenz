// Simple in-memory rate limiter
class RateLimiter {
  constructor() {
    this.requests = new Map();
    this.cleanupInterval = setInterval(() => this.cleanup(), 60000); // Clean up every minute
  }

  // Get client IP from request
  getClientIP(req) {
    // Check various headers for IP address
    const forwarded = req.headers['x-forwarded-for'];
    const realIP = req.headers['x-real-ip'];
    const cfConnectingIP = req.headers['cf-connecting-ip'];
    
    if (forwarded) {
      return forwarded.split(',')[0].trim();
    }
    if (realIP) {
      return realIP;
    }
    if (cfConnectingIP) {
      return cfConnectingIP;
    }
    
    // Fallback to connection remote address
    return req.socket?.remoteAddress || 'unknown';
  }

  // Check if request is allowed
  isAllowed(ip, limits) {
    const now = Date.now();
    const key = `rate_limit:${ip}`;
    
    if (!this.requests.has(key)) {
      this.requests.set(key, {
        minute: { count: 1, resetTime: now + 60000 },
        day: { count: 1, resetTime: now + 86400000 }
      });
      return true;
    }

    const record = this.requests.get(key);
    
    // Check minute limit
    if (now > record.minute.resetTime) {
      record.minute = { count: 1, resetTime: now + 60000 };
    } else if (record.minute.count >= limits.perMinute) {
      return false;
    } else {
      record.minute.count++;
    }
    
    // Check day limit
    if (now > record.day.resetTime) {
      record.day = { count: 1, resetTime: now + 86400000 };
    } else if (record.day.count >= limits.perDay) {
      return false;
    } else {
      record.day.count++;
    }
    
    return true;
  }

  // Get retry after time for rate limited requests
  getRetryAfter(ip) {
    const key = `rate_limit:${ip}`;
    const record = this.requests.get(key);
    
    if (!record) return 60;
    
    const now = Date.now();
    const minuteRetry = Math.ceil((record.minute.resetTime - now) / 1000);
    const dayRetry = Math.ceil((record.day.resetTime - now) / 1000);
    
    return Math.min(minuteRetry, dayRetry);
  }

  // Clean up expired records
  cleanup() {
    const now = Date.now();
    for (const [key, record] of this.requests.entries()) {
      if (now > record.minute.resetTime && now > record.day.resetTime) {
        this.requests.delete(key);
      }
    }
  }

  // Destroy the rate limiter (clean up interval)
  destroy() {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
    }
  }
}

// Singleton instance
const rateLimiter = new RateLimiter();

export { rateLimiter };
