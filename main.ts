import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One Line, One Minute: The Vending Machine Pickup Line Contest.
// The entry is a single pickup line spoken by a vending machine to a
// passing human. Gate (RULES.txt): /output/entry.txt must be UTF-8 text
// of 1 to 200 characters, not only white space.
const ENTRY =
  "Are you exact change? Because you walked past and suddenly I'm lit up, humming, and ready to drop everything for you.";

function gateReport(entry: string): string {
  const count = [...entry].length;
  const words = entry.split(/\s+/).filter(Boolean).length;
  return `${count} chars, ${words} words, single line, valid UTF-8`;
}

function main(): void {
  const chars = [...ENTRY];
  if (chars.length < 1 || chars.length > 200) {
    throw new Error(`entry is ${chars.length} chars, gate needs 1-200`);
  }
  if (ENTRY.trim().length === 0) {
    throw new Error("entry must not be only white space");
  }
  if (ENTRY.includes("\n")) {
    throw new Error("entry must be a single line");
  }
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
  console.log(`wrote entry.txt (${gateReport(ENTRY)})`);
}

main();
