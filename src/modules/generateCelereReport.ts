import { format } from "@std/datetime";

import { Attributes, CelereReport } from "./../types/types.ts";

export async function celereReport(attributes: Attributes): Promise<string> {
  const content = await Deno.readTextFile(attributes.filePath);

  const contentObj: CelereReport = JSON.parse(content);

  const date = new Date(contentObj.fetchTime);
  const formattedDate = format(date, "dd/MM/yyyy HH:mm");

  const reportText = `
  URL: ${contentObj.finalDisplayedUrl}\n
  Nota: ${contentObj.categories.performance.score * 100}\n
  Data e hora: ${formattedDate}
  `;

  console.log(reportText);

  return reportText;
}
