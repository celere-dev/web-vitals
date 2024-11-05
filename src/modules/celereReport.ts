import { format } from "@std/datetime";

import { logging } from "./../utils/utils.ts";
import { sendReport } from "./sendReport.ts";

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
}

export function celereReport(report: string): void {
  const content: CelereReport = JSON.parse(report);

  const url = new URL(content.finalDisplayedUrl);
  const hostname = url.host;

  const date = new Date(content.fetchTime);
  const formattedDate = format(date, "dd/MM/yyyy, HH:mm:ss");

  const performance = content.categories.performance.score * 100;
  const accessibility = content.categories.accessibility.score * 100;
  const bestPractices = content.categories["best-practices"].score * 100;
  const seo = content.categories.seo.score * 100;

  const emailSubject = `${hostname} | Desempenho: ${performance} | Core Web Vitals: `;

  const emailContent = `
  - Relatório de desempenho
  URL: ${content.finalDisplayedUrl}
  Criação do relatório: ${formattedDate}

  - Experiência dos seus usuários
  Core Web Vitals:
  LCP:
  INP:
  FCP:

  - Diagnosticar problemas de desempenho
  Desempenho: ${performance}
  Acessibilidade: ${accessibility}
  Práticas recomendadas: ${bestPractices}
  SEO: ${seo}

  Criação de relatório completo: [https://pagespeed.web.dev/analysis?url=${encodeURIComponent(
    content.finalDisplayedUrl
  )}]

  Precisa de suporte da Célere? Responda a este e-mail.
  Este é um e-mail automático.
  `;

  if (emailContent) {
    logging("Text report generated.");

    sendReport(emailSubject, emailContent);
  }
}
