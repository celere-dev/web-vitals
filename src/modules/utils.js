import { ensureDir, existsSync } from "@std/fs";
import { join, dirname, fromFileUrl } from "@std/path";

export async function createReportDirPath() {
  const __dirname = dirname(fromFileUrl(import.meta.url));
  const dirPath = join(__dirname, "./../../report");

  // Check if the directory exists, if not, create it
  if (!existsSync(dirPath)) {
    await ensureDir(dirPath);
  }

  return dirPath;
}
