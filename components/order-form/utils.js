// Parse IQD numeric amount from label, e.g. "1,000,000 IQD - $2,800 AUD" -> 1000000
export function getIqdAmountFromLabel(label) {
  if (!label) return 0;
  const match = label.match(/^([\d,]+)\s*IQD/i);
  return match ? parseInt(match[1].replace(/,/g, ""), 10) : 0;
}

// Parse ZWL numeric amount from label, e.g. "10 Billion Zimbabwe Dollars - $250 AUD" -> 10000000000
export function getZwlAmountFromLabel(label) {
  if (!label) return 0;
  const match = label.match(/^([\d,]+)\s*(Billion|Trillion)\s*Zimbabwe\s*Dollars/i);
  if (!match) return 0;
  
  const number = parseInt(match[1].replace(/,/g, ""), 10);
  const multiplier = match[2].toLowerCase() === 'trillion' ? 1e12 : 1e9;
  return number * multiplier;
}

// AU/NZ mobile validation: "04xxxxxxxx" or "+614xxxxxxxx" for AU, "02xxxxxxxx" or "+642xxxxxxxx" for NZ
export function validateAUMobile(raw) {
  if (typeof raw !== "string") return false;

  // Remove spaces and dashes, keep digits and leading +
  let number = raw.trim().replace(/[\s-]/g, "").replace(/[^\d+]/g, "");

  // If no + and not starting with 0, assume local format (prepend 0)
  if (!number.startsWith("+") && !number.startsWith("0")) {
    number = "0" + number;
  }

  // AU: +61 or 0, followed by 4...
  const AU = /^(?:\+61|0)4\d{7,9}$/;

  // NZ: +64 or 0, followed by 2...
  const NZ = /^(?:\+64|0)2\d{6,9}$/;

  return AU.test(number) || NZ.test(number);
}

// Generic amount parser that works for both IQD and ZWL
export function getAmountFromLabel(label, currencyType = 'IQD') {
  if (currencyType === 'ZWL') {
    return getZwlAmountFromLabel(label);
  }
  return getIqdAmountFromLabel(label);
}
