import { logging } from "./../utils/utils.ts";

export function sendReport(content: string): void {
  console.log(content);

  logging("E-mail sent.");
}
