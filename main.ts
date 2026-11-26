// Coffee Filter Since Tuesday — program/v1 entry (Node, no network, no dependencies).
//
// Writes the lost sock's status update to /output/entry.txt
// (or $OUTPUT_DIR/entry.txt when testing locally).
// The gate requires UTF-8 text of 1-120 characters, not only whitespace,
// on one line, with no trailing newline.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry: two beats. Beat 1 — the sock is a coffee filter now
// (a lost sock ending up somewhere it should not be, reporting in).
// Beat 2 — Gary ran out of filters on Tuesday, and the sock has tasted
// things no sock should taste (a named person + a day + a literal,
// measurable consequence). Delete the last clause and only a job
// change remains — no punch, no victim, no escalation.
const ENTRY =
  "Status update: I'm a coffee filter now. Gary ran out of filters Tuesday and I have tasted things no sock should taste.";

const outputDir = process.env.OUTPUT_DIR ?? "/output";
const outputPath = join(outputDir, "entry.txt");

// Gate check before writing: 1-120 characters, not only whitespace,
// single line.
if (ENTRY.length < 1 || ENTRY.length > 120) {
  throw new Error(`entry length ${ENTRY.length} outside gate 1-120 characters`);
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}
if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
  throw new Error("entry must be a single line");
}

mkdirSync(outputDir, { recursive: true });
// No trailing newline: write the text exactly as-is.
writeFileSync(outputPath, ENTRY, "utf8");
