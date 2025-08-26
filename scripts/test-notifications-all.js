#!/usr/bin/env node

// Load env
require('dotenv').config({ path: '.env.local' });

const fs = require('fs');
const path = require('path');

// Prefer built-in fetch (Node 18+) and fall back to dynamic import of node-fetch
async function getFetch() {
  if (typeof fetch !== 'undefined') return fetch;
  const mod = await import('node-fetch');
  return mod.default;
}

function ensureDir(p) {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
}

function getArg(idx, def) {
  return process.argv[idx] || def;
}

async function main() {
  const toNumber = String(getArg(2, '+61417460236'));
  const toEmail = String(getArg(3, 'test+notify@dinarexchange.co.nz'));

  const nowId = `#TEST-${new Date().toISOString().replace(/[-:TZ.]/g, '').slice(0,14)}`;

  const order = {
    id: nowId,
    createdAt: new Date().toISOString(),
    personalInfo: {
      fullName: 'Test User',
      email: toEmail,
      mobile: toNumber,
      address: '123 Test Street',
      address2: '',
      city: 'Auckland',
      state: 'AUK',
      postcode: '1010',
      country: 'New Zealand',
    },
    orderDetails: { currency: 'IQD', quantity: 1000000 },
    totalAmount: 999,
    payment: { method: 'Bank transfer' },
    shippingCost: 0,
  };

  // Call preview API (requires dev server running)
  const base = process.env.PREVIEW_BASE || 'http://localhost:3000';
  console.log(`\nCalling preview API at ${base}/api/internal/preview-templates ...`);
  const _fetch = await getFetch();
  const res = await _fetch(`${base}/api/internal/preview-templates`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ order }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Preview API failed: ${res.status} ${text}`);
  }
  const { subject, html, sms } = await res.json();

  console.log('\n================ EMAIL PREVIEW ================');
  console.log('Subject:', subject);
  console.log('HTML (truncated to 800 chars):');
  console.log(html.slice(0, 800) + (html.length > 800 ? '\n...[truncated]...' : ''));

  const outDir = path.join(__dirname, 'out');
  ensureDir(outDir);
  const outPath = path.join(outDir, 'test-email.html');
  fs.writeFileSync(outPath, html, 'utf8');
  console.log(`\nSaved full email HTML to: ${outPath}`);

  console.log('\n================ SMS PREVIEW ==================');
  console.log('To:', toNumber);
  sms.forEach((row) => {
    console.log(`\n[${row.event}]\n${row.body}`);
  });

  console.log('\n✅ Templates rendered via preview API. Open the saved HTML file to view the full email.');
}

main().catch((e) => {
  console.error('Fatal:', e);
  process.exit(1);
});


