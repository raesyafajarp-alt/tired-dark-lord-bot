// tired-dark-lord-bot
// Writes one ~100-word monologue for a fantasy villain who is secretly
// just very tired to /output/entry.txt. Deterministic, no network,
// no dependencies.
//
// The speaker: Lord Vey, who took the throne forty years ago with a
// poisoned quill and now rules an empire of paper. The tiredness lives
// in the clipped sentences, the stamped repetitions and the small
// deflections — never in a plain statement that he is weary. His scheme
// is the sting: the door is unlocked, the kettle is on, and the hero
// may come and take the whole weary business off his hands.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const MONOLOGUE =
  "Forty years ago I took this throne with a poisoned quill and a smile. " +
  "The Sun-King bled gold on the marble; I signed the ledgers while the priests were screaming. " +
  "Now the empire runs on paper. Petitions at dawn. Ravens at noon. " +
  "The dead file their complaints in triplicate, and I stamp them. Denied. Denied. Denied. " +
  "My generals want a war. My sorcerers want a sacrifice. " +
  "Steward wants my signature on a form about forms. " +
  "So let the hero come. Let him climb the black stairs, sword raised, destiny shining. " +
  "I have left the door unlocked. And the kettle on.";

// The gate: 1 to 600 characters, counted as Unicode code points.
// The brief: about 100 words.
const words = MONOLOGUE.trim().split(/\s+/).length;
const chars = [...MONOLOGUE].length;
if (chars < 1 || chars > 600 || MONOLOGUE.trim().length === 0) {
  throw new Error(`Monologue is ${chars} characters; must be 1-600 and non-blank.`);
}
if (words < 95 || words > 105) {
  throw new Error(`Monologue is ${words} words; must be about 100 (95-105).`);
}

// The brief: the tiredness must be felt, never announced — refuse any
// plain statement of weariness slipping into the text.
if (/\b(tired|weary|exhausted|fatigued)\b/i.test(MONOLOGUE)) {
  throw new Error("Monologue must show tiredness, never announce it.");
}

function writeEntry(outDir: string): string {
  const outPath = join(outDir, "entry.txt");
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, MONOLOGUE, "utf8");
  return outPath;
}

let outPath: string;
try {
  outPath = writeEntry(process.env.OUTPUT_DIR ?? "/output");
} catch {
  outPath = writeEntry(join(process.cwd(), "output"));
}

console.log(`Wrote ${words} words, ${chars} characters to ${outPath}`);
