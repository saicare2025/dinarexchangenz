import jsPDF from "jspdf";

export async function makeInvoicePdfBuffer(order) {
  try {
    const doc = new jsPDF();
    
    // Set font and size
    doc.setFontSize(18);
    doc.text("Dinarexchange — Tax Invoice", 20, 30);
    
    doc.setFontSize(10);
    doc.text(`Order #${order.id}`, 20, 45);
    if (order.createdAt) {
      doc.text(`Date: ${new Date(order.createdAt).toLocaleString()}`, 20, 55);
    }
    
    // Bill To section
    doc.setFontSize(12);
    doc.setFont(undefined, 'bold');
    doc.text("Bill To:", 20, 75);
    doc.setFont(undefined, 'normal');
    doc.setFontSize(10);
    doc.text(order.customerName || "Customer", 20, 85);
    doc.text(order.customerEmail, 20, 95);
    
    // Items section
    doc.setFontSize(12);
    doc.setFont(undefined, 'bold');
    doc.text("Items", 20, 115);
    doc.setFont(undefined, 'normal');
    doc.setFontSize(10);
    
    // Table headers
    doc.text("Item", 20, 130);
    doc.text("Qty", 120, 130);
    doc.text("Price", 180, 130);
    
    // Draw header line
    doc.line(20, 135, 190, 135);
    
    let yPosition = 145;
    (order.items || []).forEach((i) => {
      doc.text(i.name, 20, yPosition);
      doc.text(String(i.qty), 120, yPosition);
      doc.text(String(i.price), 180, yPosition);
      yPosition += 10;
    });
    
    // Draw footer line
    doc.line(20, yPosition, 190, yPosition);
    yPosition += 10;
    
    // Total
    doc.setFontSize(12);
    doc.setFont(undefined, 'bold');
    doc.text(`Total: ${order.total} ${order.currency || ""}`, 120, yPosition);
    
    // Footer
    yPosition += 20;
    doc.setFontSize(9);
    doc.setFont(undefined, 'normal');
    doc.setTextColor(100, 100, 100);
    doc.text("Thank you for your business.", 105, yPosition, { align: 'center' });
    
    // Convert to buffer
    const pdfBytes = doc.output('arraybuffer');
    return Buffer.from(pdfBytes);
    
  } catch (error) {
    console.error("PDF generation error:", error);
    throw new Error("Failed to generate PDF invoice");
  }
}

export function renderEmailHtml(order) {
  const rows = (order.items || [])
    .map(
      (i) =>
        `<tr><td>${i.name}</td><td style="text-align:center;">${i.qty}</td><td style="text-align:right;">${i.price}</td></tr>`
    )
    .join("");

  return `
    <div style="font-family:Arial,Helvetica,sans-serif;line-height:1.5">
      <h2>Thanks for your order${order.customerName ? ", " + order.customerName : ""}!</h2>
      <p>Your order <b>#${order.id}</b> has been received${
        order.createdAt ? " on " + new Date(order.createdAt).toLocaleString() : ""
      }.</p>
      <table width="100%" cellpadding="8" cellspacing="0" style="border-collapse:collapse;border:1px solid #eee">
        <thead>
          <tr style="background:#f7f7f7">
            <th align="left">Item</th><th>Qty</th><th align="right">Price</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
        <tfoot>
          <tr>
            <td colspan="2" align="right" style="border-top:1px solid #eee"><b>Total</b></td>
            <td align="right" style="border-top:1px solid #eee"><b>${order.total} ${order.currency || ""}</b></td>
          </tr>
        </tfoot>
      </table>
      <p>We've attached a PDF invoice for your records.</p>
      <p>— Dinarexchange</p>
    </div>`;
}
