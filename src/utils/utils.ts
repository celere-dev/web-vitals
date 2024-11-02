import { ensureDir, existsSync } from "@std/fs";
import { join, dirname, fromFileUrl } from "@std/path";

export async function createReportDirPath(): Promise<string> {
  const __dirname = dirname(fromFileUrl(import.meta.url));
  const dirPath = join(__dirname, "./../../report");

  logging("Checking if the directory exists...");

  // Check if the directory exists, if not, create it
  if (!existsSync(dirPath)) {
    await ensureDir(dirPath);

    logging("The directory ./report was created.");
  }

  return dirPath;
}

export function logging(message: string): void {
  console.info(`Score Trek Info: ${message}`);
}
