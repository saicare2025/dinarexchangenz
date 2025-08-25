#!/usr/bin/env bash

# Simple Email Worker Testing Script
# This script tests the basic functionality of the email worker system

set -euo pipefail

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
BASE_URL="${APP_URL:-http://localhost:3000}"
CRON_SECRET="${CRON_SECRET:-}"
TEST_ORDER_ID="${TEST_ORDER_ID:-test-order-123}"

# Test results
PASSED=0
FAILED=0

log() {
    echo -e "${BLUE}[$(date '+%Y-%m-%d %H:%M:%S')]${NC} $1"
}

success() {
    echo -e "${GREEN}✅ $1${NC}"
    ((PASSED++))
}

error() {
    echo -e "${RED}❌ $1${NC}"
    ((FAILED++))
}

warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

test_api() {
    local name="$1"
    local method="$2"
    local url="$3"
    local headers="$4"
    local body="$5"
    local expected_status="$6"
    
    log "Testing: $name"
    
    if [ -n "$body" ]; then
        response=$(curl -s -w "%{http_code}" -X "$method" "$url" -H "$headers" -d "$body" 2>/dev/null)
    else
        response=$(curl -s -w "%{http_code}" -X "$method" "$url" -H "$headers" 2>/dev/null)
    fi
    
    status_code="${response: -3}"
    response_body="${response%???}"
    
    if [ "$status_code" = "$expected_status" ]; then
        success "$name - Status $status_code (Expected: $expected_status)"
        echo "   Response: $response_body"
    else
        error "$name - Status $status_code (Expected: $expected_status)"
        echo "   Response: $response_body"
    fi
    echo
}

# Check if required environment variables are set
check_env_vars() {
    log "Checking environment variables..."
    
    required_vars=(
        "SMTP_HOST"
        "SMTP_PORT"
        "SMTP_USER"
        "SMTP_PASS"
        "SMTP_FROM"
        "ALERT_TO"
        "NEXT_PUBLIC_SUPABASE_URL"
        "SUPABASE_SERVICE_ROLE_KEY"
        "CRON_SECRET"
    )
    
    for var in "${required_vars[@]}"; do
        if [ -z "${!var:-}" ]; then
            error "Missing environment variable: $var"
        else
            success "Environment variable: $var is set"
        fi
    done
    echo
}

# Test API endpoints
test_api_endpoints() {
    log "Testing API endpoints..."
    
    # Test unauthorized access
    test_api \
        "Unauthorized Access" \
        "POST" \
        "$BASE_URL/api/internal/email-worker" \
        "Content-Type: application/json" \
        "{}" \
        "401"
    
    # Test authorized access
    if [ -n "$CRON_SECRET" ]; then
        test_api \
            "Authorized Access" \
            "POST" \
            "$BASE_URL/api/internal/email-worker" \
            "Content-Type: application/json" \
            "{}" \
            "200"
    else
        warning "CRON_SECRET not set, skipping authorized access test"
    fi
    
    # Test endpoint info
    test_api \
        "Test Endpoint Info" \
        "GET" \
        "$BASE_URL/api/internal/email-worker/test" \
        "Content-Type: application/json" \
        "" \
        "200"
}

# Test email queueing
test_email_queueing() {
    log "Testing email queueing..."
    
    # Test different event types
    event_types=("STATUS_UPDATE" "MISSING_ID" "MISSING_PAYMENT" "TRACKING_ADDED" "ORDER_COMPLETED")
    
    for event_type in "${event_types[@]}"; do
        test_api \
            "Queue Email - $event_type" \
            "POST" \
            "$BASE_URL/api/internal/email-worker/test" \
            "Content-Type: application/json" \
            "{\"order_id\": \"$TEST_ORDER_ID\", \"event_type\": \"$event_type\"}" \
            "200"
    done
}

# Test email processing
test_email_processing() {
    log "Testing email processing..."
    
    if [ -n "$CRON_SECRET" ]; then
        test_api \
            "Process Emails" \
            "POST" \
            "$BASE_URL/api/internal/email-worker" \
            "Content-Type: application/json" \
            "{}" \
            "200"
    else
        warning "CRON_SECRET not set, skipping email processing test"
    fi
}

# Test error handling
test_error_handling() {
    log "Testing error handling..."
    
    # Test invalid event type
    test_api \
        "Invalid Event Type" \
        "POST" \
        "$BASE_URL/api/internal/email-worker/test" \
        "Content-Type: application/json" \
        "{\"order_id\": \"$TEST_ORDER_ID\", \"event_type\": \"INVALID_EVENT\"}" \
        "400"
    
    # Test missing required fields
    test_api \
        "Missing Event Type" \
        "POST" \
        "$BASE_URL/api/internal/email-worker/test" \
        "Content-Type: application/json" \
        "{\"order_id\": \"$TEST_ORDER_ID\"}" \
        "400"
    
    # Test missing order ID
    test_api \
        "Missing Order ID" \
        "POST" \
        "$BASE_URL/api/internal/email-worker/test" \
        "Content-Type: application/json" \
        "{\"event_type\": \"STATUS_UPDATE\"}" \
        "400"
}

# Test database connectivity (basic check)
test_database() {
    log "Testing database connectivity..."
    
    # This is a basic test - you might want to add more sophisticated database tests
    if [ -n "$NEXT_PUBLIC_SUPABASE_URL" ] && [ -n "$SUPABASE_SERVICE_ROLE_KEY" ]; then
        success "Database configuration appears to be set"
    else
        error "Database configuration is missing"
    fi
    echo
}

# Test SMTP configuration
test_smtp() {
    log "Testing SMTP configuration..."
    
    if [ -n "$SMTP_HOST" ] && [ -n "$SMTP_USER" ] && [ -n "$SMTP_PASS" ]; then
        success "SMTP configuration appears to be set"
        log "SMTP Host: $SMTP_HOST"
        log "SMTP Port: ${SMTP_PORT:-587}"
        log "SMTP User: $SMTP_USER"
    else
        error "SMTP configuration is incomplete"
    fi
    echo
}

# Main test function
run_tests() {
    log "🚀 Starting Email Worker System Tests..."
    log "Base URL: $BASE_URL"
    log "Test Order ID: $TEST_ORDER_ID"
    echo
    
    check_env_vars
    test_database
    test_smtp
    test_api_endpoints
    test_email_queueing
    test_email_processing
    test_error_handling
    
    # Summary
    log "📊 Test Results Summary:"
    log "✅ Passed: $PASSED"
    log "❌ Failed: $FAILED"
    
    if [ $FAILED -eq 0 ]; then
        success "🎉 All tests passed! Your email worker system is working correctly."
    else
        error "⚠️  Some tests failed. Please check the details above."
    fi
    
    echo
    log "📋 Next Steps:"
    log "1. Check your email inbox for test emails"
    log "2. Verify database entries in Supabase"
    log "3. Check Next.js console for any errors"
    log "4. Test with real order IDs from your database"
}

# Run tests if script is executed directly
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    run_tests
fi
