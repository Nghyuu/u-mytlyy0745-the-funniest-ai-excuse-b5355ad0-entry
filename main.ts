import { copyFileSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const dir = dirname(fileURLToPath(import.meta.url));
const src = join(dir, "entry.txt");
const text = readFileSync(src, "utf8");
const count = [...text].length;
if (count < 1 || count > 200) {
  throw new Error(`entry must be 1-200 characters, got ${count}`);
}
if (text.trim().length === 0) {
  throw new Error("entry must not be only white space");
}
const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  throw new Error("MAKEFUN_OUTPUT_DIR is not set");
}
copyFileSync(src, join(outDir, "entry.txt"));
