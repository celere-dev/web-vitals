import "@std/dotenv/load";

import { logging } from "./utils/utils.ts";
import { lighthouseReport } from "./modules/lighthouseReport.ts";
import { celereReport } from "./modules/celereReport.ts";

async function buildReport(url: string): Promise<void> {
  const report = await lighthouseReport(url);

  if (report) {
    celereReport(report);
  }
}

const URL = Deno.env.get("URL");

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
