import { format } from "@std/datetime";

import logging from "./../utils/logging.ts";
import translate from "./../utils/translate.ts";

import webVitalsLabels from "./../utils/webVitalsLabels.ts";

export interface CelereReport {
  fetchTime: string;
  finalDisplayedUrl: string;
  categories: {
    performance: {
      score: number;
    };
    accessibility: {
      score: number;
    };
    "best-practices": {
      score: number;
    };
    seo: {
      score: number;
    };
  };
  audits: {
    "largest-contentful-paint": {
      numericValue: number;
    };
    "cumulative-layout-shift": {
      numericValue: number;
    };
    "first-contentful-paint": {
      numericValue: number;
    };
    "total-blocking-time": {
      numericValue: number;
    };
    "server-response-time": {
      numericValue: number;
    };
  };
}

export function celereReport(report: string): string[] | undefined {
  const content: CelereReport = JSON.parse(report);

  // Info
  const url = new URL(content.finalDisplayedUrl);
  const hostname = url.host;

  const date = new Date(content.fetchTime);
  const formattedDate = format(date, "dd/MM/yyyy, HH:mm:ss");

  // Web Vitals
  const lcp = content.audits["largest-contentful-paint"].numericValue;
  const cls = content.audits["cumulative-layout-shift"].numericValue;
  const fcp = content.audits["first-contentful-paint"].numericValue;
  const tbt = content.audits["total-blocking-time"].numericValue;
  const ttfb = content.audits["server-response-time"].numericValue;

  // Web Vitals Labels
  const labels = webVitalsLabels([lcp, cls, fcp, tbt, ttfb]);

  // Debug
  // const lcp2 = content.audits["largest-contentful-paint"].displayValue;
  // const cls2 = content.audits["cumulative-layout-shift"].displayValue;
  // const fcp2 = content.audits["first-contentful-paint"].displayValue;
  // const tbt2 = content.audits["total-blocking-time"].displayValue;
  // const ttfb2 = content.audits["server-response-time"].displayValue;
  // console.log([lcp, cls, fcp, tbt, ttfb]);
  // console.log([lcp2, cls2, fcp2, tbt2, ttfb2]);

  // Scores
  const performance = content.categories.performance.score * 100;
  const accessibility = content.categories.accessibility.score * 100;
  const bestPractices = content.categories["best-practices"].score * 100;
  const seo = content.categories.seo.score * 100;

  // Email Content
  const subject = `${hostname} - Core Web Vitals: ${labels.cwv} - ${translate(
    "performance"
  )}: ${performance}`;
  const text = `
URL: ${content.finalDisplayedUrl}
${translate("createdOn")}: ${formattedDate}

- Web Vitals -
Core Web Vitals (LCP, CLS, TBT): ${labels.cwv}
Largest Contentful Paint (LCP): ${labels.lcp}
Cumulative Layout Shift (CLS): ${labels.cls}
First Contentful Paint (FCP): ${labels.fcp}
Total Blocking Time (TBT): ${labels.tbt}
Time to First Byte (TTFB): ${labels.ttfb}

- ${translate("scores")} -
${translate("performance")}: ${performance}
${translate("accessibility")}: ${accessibility}
${translate("bestPractices")}: ${bestPractices}
SEO: ${seo}

${translate("disclaimer")}
  `;

  if (content) {
    logging(translate("emailText"));

    return [subject, text];
  }
}
