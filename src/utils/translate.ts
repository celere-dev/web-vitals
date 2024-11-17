import i18n from "npm:i18n";
import { join } from "@std/path";

const LOCALE = Deno.env.get("LOCALE") || "en";

i18n.configure({
  locales: ["en", "pt-BR"],
  directory: join(Deno.cwd(), "./src/locales"),
  defaultLocale: LOCALE,
  objectNotation: true,
});

export default function translate(text: string): string {
  return i18n.__(text);
}
