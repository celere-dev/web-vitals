import lighthouse, { RunnerResult, Flags } from "npm:lighthouse";
import * as chromeLauncher from "npm:chrome-launcher";

import logging from "./../utils/logging.ts";
import translate from "./../utils/translate.ts";

export async function lighthouseReport(
  url: string
): Promise<string | undefined> {
  logging(translate("launching"));

  const chrome = await chromeLauncher.launch({ chromeFlags: ["--headless"] });

  const options: Flags = {
    logLevel: "silent",
    output: "json",
    disableFullPageScreenshot: true,
    port: chrome.port,
  };

  logging(translate("setting"));

  const runnerResult: RunnerResult | undefined = await lighthouse(url, options);

  if (runnerResult) {
    logging(translate("lighthouseReportGenerated"));

    const reportJSON: string = runnerResult.report as string;

    return reportJSON;
  }

  // chrome.kill();
}
