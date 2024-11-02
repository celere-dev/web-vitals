import lighthouse, { RunnerResult, Flags } from "npm:lighthouse";
import * as chromeLauncher from "npm:chrome-launcher";

import { Attributes } from "./../types/types.ts";
import { logging } from "./../utils/utils.ts";

export async function lhReport(attributes: Attributes): Promise<void> {
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

  const runnerResult: RunnerResult | undefined = await lighthouse(
    attributes.url,
    options
  );

  if (runnerResult) {
    logging("Lighthouse report generated.");

    const reportJSON: string = runnerResult.report as string;

    // Write the report to the file in the report directory
    await Deno.writeTextFile(attributes.filePath, reportJSON);

    logging("Lighthouse report written.");
  }

  // chrome.kill();
}
