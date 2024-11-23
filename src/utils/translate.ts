import i18n from "npm:i18n";
import { join } from "@std/path";

import logging from "./logging.ts";

const LOCALE = Deno.env.get("LOCALE") || "en";
const supportedLocales = ["en", "pt-BR"];

if (!supportedLocales.includes(LOCALE)) {
  logging(
    `Unsupported LOCALE: ${LOCALE}. Please choose between: ${supportedLocales.join(
      ", "
    )}.`
  );

  Deno.exit(1);
}

i18n.configure({
  locales: ["en", "pt-BR"],
  directory: join(Deno.cwd(), "./src/locales"),
  defaultLocale: LOCALE,
  objectNotation: true,
  updateFiles: false,
});

export default function translate(text: string): string {
  return i18n.__(text);
}
