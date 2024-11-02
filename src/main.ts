import { createReportDirPath, logging } from "./utils/utils.ts";
import { lhReport } from "./modules/getLighthouseReport.ts";
import { celereReport } from "./modules/generateCelereReport.ts";

import { Attributes } from "./types/types.ts";

async function buildReport(attributes: Attributes): Promise<void> {
  await lhReport({ url: attributes.url, filePath: attributes.filePath });
  await celereReport({ filePath: attributes.filePath });
}

const url = new URL("https://claromes.com");
const hostname = url.host;
const filePath = `./report/${hostname}_lhreport.json`;

logging("Building...");

createReportDirPath();
buildReport({ url: url.href, filePath })
  .then(() => {
    logging("Done.");

    Deno.exit(0); // Fix ./modules/getLighthouseReport.js:29
  })
  .catch((error) => {
    console.error(error);
    Deno.exit(1);
  });
