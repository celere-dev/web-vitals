import { format } from "@std/datetime";

export async function celereReport(filePath) {
  const content = await Deno.readTextFile(filePath);

  const contentObj = JSON.parse(content);

  const date = new Date(contentObj.fetchTime);
  const formattedDate = format(date, "dd/MM/yyyy HH:mm");

  const emailText = `
  URL: ${contentObj.finalDisplayedUrl}\n
  Nota: ${contentObj.categories.performance.score * 100}\n
  Data e hora: ${formattedDate}
  `;

  console.log(emailText);

  Deno.exit(0); // Fix ./getLighthouseReport.js:29
}
