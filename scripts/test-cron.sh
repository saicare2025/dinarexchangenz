#!/usr/bin/env bash
set -euo pipefail
URL="http://localhost:3000/api/internal/email-worker"
curl -sS -X POST "$URL" -H "x-cron-secret: $CRON_SECRET" -H "content-type: application/json" -d '{}' | jq .
