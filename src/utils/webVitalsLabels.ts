import translate from "../utils/translate.ts";

interface Labels {
  lcp: string;
  cls: string;
  fcp: string;
  tbt: string;
  cwv: string;
  ttfb: string;
}

export default function webVitalsLabels(metrics: number[]): Labels {
  let lcp = "";
  let cls = "";
  let fcp = "";
  let tbt = "";
  let ttfb = "";

  // LCP
  if (metrics[0] / 1000 <= 2.5) {
    lcp = translate("good");
  } else if (metrics[0] / 1000 > 2.5 && metrics[0] / 1000 <= 4) {
    lcp = translate("needsImprovements");
  } else if (metrics[0] / 1000 > 4) {
    lcp = translate("poor");
  }

  // CLS
  if (metrics[1] <= 0.1) {
    cls = translate("good");
  } else if (metrics[1] > 0.1 && metrics[1] <= 0.25) {
    cls = translate("needsImprovements");
  } else if (metrics[1] > 0.25) {
    cls = translate("poor");
  }

  // FCP
  if (metrics[2] / 1000 <= 1.8) {
    fcp = translate("good");
  } else if (metrics[2] / 1000 > 1.8 && metrics[2] / 1000 <= 3) {
    fcp = translate("needsImprovements");
  } else if (metrics[2] / 1000 > 3) {
    fcp = translate("poor");
  }

  // TBT
  if (metrics[3] <= 200) {
    tbt = translate("fast");
  } else if (metrics[3] > 200 && metrics[3] <= 600) {
    tbt = translate("moderate");
  } else if (metrics[3] > 600) {
    tbt = translate("slow");
  }

  // TTFB
  if (metrics[4] / 1000 <= 0.8) {
    ttfb = translate("good");
  } else if (metrics[4] / 1000 > 0.8 && metrics[4] / 1000 <= 1.8) {
    ttfb = translate("needsImprovements");
  } else if (metrics[4] / 1000 > 1.8) {
    ttfb = translate("poor");
  }

  // Core Web Vitals
  const lcpCWV = metrics[0] / 1000 <= 2.5;
  const clsCWV = metrics[1] <= 0.1;
  const tbtCWV = metrics[3] <= 600;

  const cwv =
    lcpCWV && clsCWV && tbtCWV ? translate("passed") : translate("failed");

  return {
    lcp: lcp,
    cls: cls,
    fcp: fcp,
    tbt: tbt,
    ttfb: ttfb,
    cwv: cwv,
  };
}
