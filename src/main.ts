import "@std/dotenv/load";

import logging from "./utils/logging.ts";
import translate from "./utils/translate.ts";

import { lighthouseReport } from "./modules/lighthouseReport.ts";
import { celereReport } from "./modules/celereReport.ts";
import { sendReport } from "./modules/sendReport.ts";

async function build(url: string): Promise<void> {
  const report = await lighthouseReport(url);

  let result;

  if (report) {
    result = celereReport(report);
  }

  if (result) {
    const [subject, body] = result;
    if (subject && body) {
      await sendReport(subject, body);
    }
  }
}

const URLS = JSON.parse(Deno.env.get("URLS") || "[]") as string[];

async function run() {
  for (const url of URLS) {
    logging(translate("building"));

    try {
      await build(url);
      logging(translate("done"));
    } catch (error) {
      console.error(error);
      Deno.exit(1);
    }
  }

  Deno.exit(0); // Fix ./modules/lighthouseReport.ts:33
}

run();
