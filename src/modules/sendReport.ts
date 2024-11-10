import "@std/dotenv/load";

import { logging } from "./../utils/utils.ts";

export async function sendReport(subject: string, body: string): Promise<void> {
  const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
  const RESEND_EMAIL_FROM = Deno.env.get("RESEND_EMAIL_FROM");
  const RESEND_EMAIL_TO = Deno.env.get("RESEND_EMAIL_TO");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: RESEND_EMAIL_FROM,
      to: RESEND_EMAIL_TO,
      subject: subject,
      html: body,
    }),
  });

  if (res.ok) {
    logging("E-mail sent.");
  } else {
    const error = await res.text();
    logging(`Failed to send email: ${error}`);
  }
}
