import { Resend } from "npm:resend";
import "@std/dotenv/load";

import logging from "./../utils/logging.ts";
import translate from "./../utils/translate.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const RESEND_EMAIL_FROM = Deno.env.get("RESEND_EMAIL_FROM") as string;
const RESEND_EMAIL_TO = JSON.parse(Deno.env.get("RESEND_EMAIL_TO") as string);

export async function sendReport(subject: string, text: string): Promise<void> {
  const resend = new Resend(RESEND_API_KEY);

  const { error } = await resend.emails.send({
    from: RESEND_EMAIL_FROM,
    to: RESEND_EMAIL_TO,
    subject: subject,
    text: text,
  });

  if (error) {
    logging(`${translate("emailFailed")}: ${JSON.stringify(error)}`);
    return;
  }

  logging(translate("emailSent"));
}
