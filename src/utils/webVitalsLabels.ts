interface Labels {
  lcp: string;
  cls: string;
  fcp: string;
  tbt: string;
  cwv: string;
  ttfb: string;
}

export function webVitalsLabels(metrics: number[]): Labels {
  let lcp = "";
  let cls = "";
  let fcp = "";
  let tbt = "";
  let ttfb = "";
  let cwv = "";

  // LCP
  if (metrics[0] / 1000 <= 2.5) {
    lcp = "boas";
  } else if (metrics[0] / 1000 > 2.5 && metrics[0] / 1000 <= 4) {
    lcp = "precisa melhorar";
  } else if (metrics[0] / 1000 > 4) {
    lcp = "ruins";
  }

  // CLS
  if (metrics[1] <= 0.1) {
    cls = "boas";
  } else if (metrics[1] > 0.1 && metrics[1] <= 0.25) {
    cls = "precisa melhorar";
  } else if (metrics[1] > 0.25) {
    cls = "ruins";
  }

  // FCP
  if (metrics[2] / 1000 <= 1.8) {
    fcp = "boas";
  } else if (metrics[2] / 1000 > 1.8 && metrics[2] / 1000 <= 3) {
    fcp = "precisa melhorar";
  } else if (metrics[2] / 1000 > 3) {
    fcp = "ruins";
  }

  // TBT
  if (metrics[3] <= 200) {
    tbt = "rápido";
  } else if (metrics[3] > 200 && metrics[3] <= 600) {
    tbt = "moderado";
  } else if (metrics[3] > 600) {
    tbt = "lento";
  }

  // TTFB
  if (metrics[4] / 1000 <= 0.8) {
    ttfb = "boas";
  } else if (metrics[4] / 1000 > 0.8 && metrics[4] / 1000 <= 1.8) {
    ttfb = "precisa melhorar";
  } else if (metrics[4] / 1000 > 1.8) {
    ttfb = "ruins";
  }

  // Core Web Vitals
  const lcpCWV = metrics[0] / 1000 <= 2.5;
  const clsCWV = metrics[1] <= 0.1;
  const tbtCWV = metrics[3] <= 600;

  cwv = lcpCWV && clsCWV && tbtCWV ? "aprovado" : "reprovado";

  return {
    lcp: lcp,
    cls: cls,
    fcp: fcp,
    tbt: tbt,
    ttfb: ttfb,
    cwv: cwv,
  };
}
