import { createReportDirPath } from "./modules/utils.js";
import { lhReport } from "./modules/getLighthouseReport.js";
import { celereReport } from "./modules/generateCelereReport.js";

async function buildReport(url, filePath) {
  try {
    await lhReport(url, filePath);
    celereReport(filePath);
  } catch (error) {
    console.error("Error generating report:", error);
  }
}

const url = new URL("https://claromes.com");
const hostname = url.host;
const filePath = `./report/${hostname}_lhreport.json`;

createReportDirPath();
buildReport(url, filePath);
