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

// --- Twilio SMS helper ---
let _twilioClient;
function getTwilioClient() {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  if (!sid || !token) return null;
  if (_twilioClient) return _twilioClient;
  const Twilio = require("twilio");
  _twilioClient = new Twilio(sid, token);
  return _twilioClient;
}

export async function sendSms({ to, body }) {
  const client = getTwilioClient();
  if (!client) throw new Error("Twilio not configured");
  const from = process.env.TWILIO_PHONE_NUMBER;
  if (!from) throw new Error("TWILIO_PHONE_NUMBER missing");
  return client.messages.create({ from, to, body });
}