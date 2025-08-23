export function pruneUndefined(obj) {
  const out = {};
  for (const k in obj || {}) {
    if (obj[k] !== undefined) out[k] = obj[k];
  }
  return out;
}

export function numberOrUndef(v) {
  if (v === null || v === undefined || v === "") return undefined;
  const n = Number(v);
  return Number.isFinite(n) ? n : undefined;
}

