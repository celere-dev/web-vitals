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
  };
}

export function celereReport(report: string): void {
  const content: CelereReport = JSON.parse(report);

  const date = new Date(content.fetchTime);
  const formattedDate = format(date, "dd/MM/yyyy HH:mm");

  const emailContent = `
  URL: ${content.finalDisplayedUrl}<br>
  Índice: ${content.categories.performance.score * 100}<br>
  Data e hora: ${formattedDate}<br><br>
  Este é um e-mail automático.
  `;

  if (emailContent) {
    logging("Text report generated.");

    sendReport(emailContent);
  }
}
