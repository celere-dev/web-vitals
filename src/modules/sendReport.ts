import "@std/dotenv/load";

import { logging } from "./../utils/utils.ts";

export function sendReport(subject: string, body: string): void {
  const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
  const RESEND_EMAIL_FROM = Deno.env.get("RESEND_EMAIL_FROM");
  const RESEND_EMAIL_TO = Deno.env.get("RESEND_EMAIL_TO");

  const handler = async (_request: Request): Promise<Response> => {
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

      return new Response(res.body, {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    } else {
      return new Response(res.body, {
        status: res.status,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  };

  Deno.serve(handler);
  // console.log(subject);
  // console.log(body);
}
