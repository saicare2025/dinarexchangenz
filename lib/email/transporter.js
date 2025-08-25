import nodemailer from "nodemailer";

let transporter;

export function getTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: String(process.env.SMTP_PORT) === "465",
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });
  }
  return transporter;
}

export async function sendEmail({ to, subject, html, text, bcc }) {
  const t = getTransporter();
  return t.sendMail({
    from: process.env.SMTP_FROM,
    to,
    bcc,
    subject,
    html,
    text,
  });
}
