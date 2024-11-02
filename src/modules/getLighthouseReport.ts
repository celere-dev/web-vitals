import lighthouse, { RunnerResult, Flags } from "npm:lighthouse";
import * as chromeLauncher from "npm:chrome-launcher";

import { Attributes } from "./../types/types.ts";

export async function lhReport(attributes: Attributes): Promise<void> {
  const chrome = await chromeLauncher.launch({ chromeFlags: ["--headless"] });

  const options: Flags = {
    logLevel: "silent",
    output: "json",
    disableFullPageScreenshot: true,
    onlyCategories: ["performance"],
    port: chrome.port,
  };

  const runnerResult: RunnerResult | undefined = await lighthouse(
    attributes.url,
    options
  );

  if (runnerResult) {
    const reportJSON: string = runnerResult.report as string;

    // Write the report to the file in the report directory
    await Deno.writeTextFile(attributes.filePath, reportJSON);
  }

  // chrome.kill();
}
