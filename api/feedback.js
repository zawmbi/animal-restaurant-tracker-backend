import { Resend } from "resend";

export default async function handler(req, res) {
  // CORS for Flutter Web
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    let body = req.body;

    if (typeof body === "string") {
      body = JSON.parse(body);
    }

    const { message, contact } = body ?? {};

    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Missing message" });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: "Animal Restaurant Feedback <onboarding@resend.dev>",
      to: "LJMansour02@gmail.com",
      subject: "Animal Restaurant Tracker App Feedback Box",
      text: contact ? `${message}\n\nContact: ${contact}` : message,
    });

    return res.status(200).json({ ok: true });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
