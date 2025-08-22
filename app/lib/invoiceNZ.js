import jsPDF from "jspdf";

const BLUE = { r: 31, g: 111, b: 209 }; // #1f6fd1
const PAGE_W = 210;
const L = 20;                 // left margin
const R = PAGE_W - 20;        // right margin

// Logo placement + margin-bottom
const LOGO_X = L;
const LOGO_Y = 18;
const LOGO_W = 52;
const LOGO_H = 14;
const LOGO_MB = 8;            // margin-bottom after logo

// Fetch logo from remote URL and convert to base64
async function fetchLogoBase64() {
  try {
    const res = await fetch(
      "https://www.dinarexchange.co.nz/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.e45cf3bb.png&w=256&q=75"
    );
    const buffer = await res.arrayBuffer();
    const base64 = Buffer.from(buffer).toString("base64");
    return "data:image/png;base64," + base64;
  } catch (err) {
    console.error("Logo fetch failed:", err);
    return null;
  }
}

// Grand total must always show two decimals
const fmt2 = (n) => Number(n ?? 0).toFixed(2);

export async function buildInvoicePdfBuffer({
  orderId,
  status = "Payment Pending",
  dateStr,
  billTo = { name: "", address1: "", city: "", region: "", postcode: "", country: "New Zealand" },
  items = [],              // [{ description, qty, total }]
  iqdPurchased = 0,        // *** NEW: total IQD dinar purchased (numeric) ***
  subTotal = 0,
  shipping = 0,
  grandTotal = 0,
  currency = "NZD",
  paymentMethod = "Bank transfer",
  bank = { name: "Borelle", accountNumber: "123-456-7890" },
}) {
  try {
    const doc = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait" });

    // ===== HEADER =====
    const logo = await fetchLogoBase64();
    if (logo) {
      doc.addImage(logo, "PNG", LOGO_X, LOGO_Y, LOGO_W, LOGO_H);
    } else {
      doc.setFontSize(18);
      doc.text("Dinar Exchange", L, LOGO_Y + LOGO_H - 2);
    }
    const headerBottomY = LOGO_Y + LOGO_H + LOGO_MB;

    // TAX INVOICE (right)
    doc.setFontSize(12);
    doc.setTextColor(BLUE.r, BLUE.g, BLUE.b);
    doc.text("TAX INVOICE", R, headerBottomY - (LOGO_H / 2), { align: "right" });
    doc.setTextColor(0, 0, 0);

    // Order meta — LEFT aligned with address block
    doc.setFontSize(9);
    const metaY = headerBottomY + 3;
    doc.text(`ORDER # ${orderId ?? ""}`, L, metaY);
    doc.text(`Status: ${status ?? ""}`, L, metaY + 7);
    doc.text(`Date: ${dateStr ?? ""}`, L, metaY + 14);

    // ===== BILL TO =====
    const billY = metaY + 27;
    doc.setFontSize(10);
    doc.text("Invoice to :", L, billY);
    doc.setFontSize(12);
    doc.text(billTo.name || "", L, billY + 8);
    doc.setFontSize(9);
    doc.text(billTo.address1 || "", L, billY + 16);
    doc.text(
      `${billTo.city || ""}${billTo.city ? ", " : ""}${billTo.region || ""} ${billTo.postcode || ""}`.trim(),
      L, billY + 24
    );
    doc.text(billTo.country || "New Zealand", L, billY + 32);

    // ===== TABLE =====
    // Auto-append BONUS row if IQD purchased > 1,000,000
    const itemsWithBonus = Array.isArray(items) ? [...items] : [];
    if (Number(iqdPurchased) > 1_000_000) {
      itemsWithBonus.push({
        description: "Bonus — 20B ZIM Dollar",
        qty: "",     // free item; no qty/total
        total: "",
      });
    }

    // Columns: NO | DESCRIPTION | QTY | TOTAL
    let y = Math.max(110, billY + 40);
    doc.setFillColor(BLUE.r, BLUE.g, BLUE.b);
    doc.rect(L, y, R - L, 8, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(10);
    doc.text("NO", L + 5, y + 6);
    doc.text("DESCRIPTION", L + 35, y + 6);
    doc.text("QTY", R - 45, y + 6, { align: "right" });
    doc.text("TOTAL", R - 5, y + 6, { align: "right" });
    doc.setTextColor(0, 0, 0);

    y += 8;
    const rowH = 8;
    const descX = L + 35;
    const descMaxW = (R - L) - 95; // keep description inside printable width

    itemsWithBonus.forEach((it, idx) => {
      // zebra rows (light gray every other)
      if (idx % 2 === 1) {
        doc.setFillColor(248, 248, 248);
        doc.rect(L, y, R - L, rowH, "F");
      }

      const lineNo = String(idx + 1);
      const qtyStr = it && (it.qty === 0 || it.qty) ? String(it.qty) : (it.qty === "" ? "" : "1");
      const totalStr = it && (it.total === 0 || it.total) ? String(it.total) : (it.total === "" ? "" : "");

      const desc = doc.splitTextToSize((it && it.description) || "", descMaxW);

      doc.setFontSize(10);
      doc.text(lineNo, L + 5, y + 6);
      doc.text(desc, descX, y + 6);
      if (qtyStr !== undefined) doc.text(qtyStr, R - 45, y + 6, { align: "right" });
      if (totalStr !== undefined) doc.text(totalStr, R - 5, y + 6, { align: "right" });

      y += rowH;
    });

    // ===== PAYMENT METHOD (left) =====
    y += 8;
    doc.setFontSize(10);
    doc.setTextColor(BLUE.r, BLUE.g, BLUE.b);
    doc.text("PAYMENT METHOD :", L, y);
    doc.setTextColor(0, 0, 0);

    y += 6;
    doc.setFontSize(10);
    doc.text(`${paymentMethod || "Bank transfer"} :`, L, y);
    y += 6;
    doc.setFontSize(9);
    doc.text(`Bank Name : ${bank && bank.name ? bank.name : ""}`, L, y);
    y += 5;
    doc.text(`Account Number : ${bank && bank.accountNumber ? bank.accountNumber : ""}`, L, y);

    // ===== TOTALS (right) =====
    // Position totals BELOW the last drawn content to avoid overlap.
    const totalsY = Math.max(110, y - 5);
    const labelX = R - 70;
    const valueX = R;

    doc.setFontSize(10);
    doc.text("Sub Total :", labelX, totalsY + 12);
    doc.text(`${subTotal} ${currency}`, valueX, totalsY + 12, { align: "right" });

    doc.text("Shipping Cost :", labelX, totalsY + 20);
    doc.text(`${shipping} ${currency}`, valueX, totalsY + 20, { align: "right" });

    // GRAND TOTAL pill (two decimals)
    const pillY = totalsY + 30;
    const pillX = labelX;
    const pillW = R - pillX;
    const pillH = 10;

    doc.setFillColor(BLUE.r, BLUE.g, BLUE.b);
    doc.rect(pillX, pillY, pillW, pillH, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(11);
    doc.text("GRAND TOTAL :", pillX + 3, pillY + 7);
    doc.text(`${fmt2(grandTotal)} ${currency}`, valueX - 2, pillY + 7, { align: "right" });
    doc.setTextColor(0, 0, 0);

    // ===== FOOTER =====
    doc.setFontSize(8);
    doc.setTextColor(85, 85, 85);
    doc.text(
      "PO BOX 2028 Lyalor Vic 3075 Tel Aus: 1300 856 881, Fax: 1300 857 881, NZ : 09 951 80 20",
      PAGE_W / 2, 287, { align: "center" }
    );

    const pdfBytes = doc.output("arraybuffer");
    return Buffer.from(pdfBytes);
  } catch (error) {
    console.error("PDF generation error:", error);
    throw new Error("Failed to generate PDF invoice");
  }
}
