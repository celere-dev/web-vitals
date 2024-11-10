import "@std/dotenv/load";

import { logging } from "./utils/utils.ts";
import { lighthouseReport } from "./modules/lighthouseReport.ts";
import { celereReport } from "./modules/celereReport.ts";
import { sendReport } from "./modules/sendReport.ts";

async function buildReport(url: string): Promise<void> {
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

const URL = Deno.env.get("URLS");

if (URL) {
  logging("Building...");

  buildReport(URL)
    .then(() => {
      logging("Done.");

      Deno.exit(0); // Fix ./modules/getLighthouseReport.js:29
    })
    .catch((error) => {
      console.error(error);
      Deno.exit(1);
    });
}
