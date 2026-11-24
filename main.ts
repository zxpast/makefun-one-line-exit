import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// One funny single-line resignation letter from a mall Santa.
// Deterministic: the same text on every run, no network, no randomness,
// no clock reads. stdlib only.
// Originality scan (24 Nov 2026, before this line was chosen):
// - Leaderboard is blind (no artifact texts yet); the 71 submission
//   titles were scanned instead. Saturated motifs avoided: penguins
//   unionising (3 entries), raccoons in the ceiling, printers, and
//   "turn it off and on again" (2 entries each). No mall-Santa entry
//   in the field; no title matches this line.
// - O1 web search for the exact line: 0 verbatim hits.
// - O2: 0 exact duplicates in the field snapshot.
// - O4: 5+ candidates generated; the first idea (office plant
//   outliving its managers) was discarded — and it also collided
//   with a field title ("The Office Plant Outlasted Me").
// - O3 structural check: concrete nouns (mall Santa, children, son,
//   Danny) + escalating numbers (4,102 -> the 4,103rd) + reframe in
//   the second half; not an abstract-verb/generic-noun first idea.
// Why this line lands, in three beats:
// 1. Nine seasons on the job plus a big, concrete number (4,102 children)
//    set up a veteran Santa who has heard every Christmas wish there is.
// 2. The wish itself escalates the trivial into the personal: every child
//    asked for the same thing — a new dad.
// 3. The twist lands in the last words: the 4,103rd child was his own
//    son, Danny. The narrator is the punchline's victim (self-own), the
//    held-back truth arrives only at the end, and nothing is explained.
const ENTRY =
  "I hereby resign as mall Santa: after nine seasons, 4,102 children asked for a new dad this Christmas, and the 4,103rd was my son, Danny.";

// Count code points (not UTF-16 units) so the 1–140 gate is checked the
// way the scorer counts characters; also reject any trailing whitespace.
const CHARS = Array.from(ENTRY).length;
if (CHARS < 1 || CHARS > 140 || ENTRY !== ENTRY.trim() || ENTRY.includes("\n")) {
  throw new Error("entry must be a single line of 1 to 140 characters");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");
if (readFileSync("/output/entry.txt", "utf8") !== ENTRY) {
  throw new Error("read-back mismatch: /output/entry.txt differs from ENTRY");
}
console.log(`wrote ${CHARS} characters to /output/entry.txt`);
