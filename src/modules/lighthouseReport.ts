import lighthouse, { RunnerResult, Flags } from "npm:lighthouse";
import * as chromeLauncher from "npm:chrome-launcher";

import { logging } from "./../utils/utils.ts";

export async function lighthouseReport(
  url: string
): Promise<string | undefined> {
  logging("Launching Chrome...");

  const chrome = await chromeLauncher.launch({ chromeFlags: ["--headless"] });

  const options: Flags = {
    logLevel: "silent",
    output: "json",
    disableFullPageScreenshot: true,
    onlyCategories: ["performance"],
    port: chrome.port,
  };

  logging("Setting options...");

  const runnerResult: RunnerResult | undefined = await lighthouse(url, options);

  if (runnerResult) {
    logging("Lighthouse report generated.");

    const reportJSON: string = runnerResult.report as string;

    return reportJSON;
  }

  // chrome.kill();
}
