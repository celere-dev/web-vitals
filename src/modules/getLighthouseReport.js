import lighthouse from "npm:lighthouse";
import * as chromeLauncher from "npm:chrome-launcher";

export async function lhReport(url, filePath) {
  const chrome = await chromeLauncher.launch({ chromeFlags: ["--headless"] });

  const options = {
    logLevel: "info",
    output: "json",
    locale: "pt-BR",
    disableFullPageScreenshot: true,
    onlyCategories: ["performance"],
    port: chrome.port,
  };
  const runnerResult = await lighthouse(url, options);
  const reportJSON = runnerResult.report;

  // Write the report to the file in the report directory
  await Deno.writeTextFile(filePath, reportJSON);

  // chrome.kill();
}
