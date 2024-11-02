import { format } from "@std/datetime";

import { Attributes, CelereReport } from "./../types/types.ts";
import { logging } from "./../utils/utils.ts";

export async function celereReport(attributes: Attributes): Promise<string> {
  const content = await Deno.readTextFile(attributes.filePath);

  const contentObj: CelereReport = JSON.parse(content);

  const date = new Date(contentObj.fetchTime);
  const formattedDate = format(date, "dd/MM/yyyy HH:mm");

  const reportText = `
  URL: ${contentObj.finalDisplayedUrl}\n
  Índice: ${contentObj.categories.performance.score * 100}\n
  Data e hora: ${formattedDate}\n\n
  Este é um e-mail automático.
  `;

  console.log(reportText);

  logging("Text report generated.");

  return reportText;
}
