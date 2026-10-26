// src/lib/complaints.ts
const SIGNALS = [
  "hard time",
  "so hard",
  "too hard",
  "struggling",
  "struggle",
  "stuck",
  "can't figure",
  "cant figure",
  "can't get",
  "cant get",
  "doesn't work",
  "not working",
  "frustrating",
  "frustrated",
  "annoying",
  "painful",
  "confusing",
  "confused",
  "any help",
  "any tips",
  "help me",
  "how do i",
  "tired of",
  "too many",
  "wish there was",
];

// Lowercase and straighten curly apostrophes so "can’t" matches "can't".
function normalize(s: string) {
  return s.toLowerCase().replace(/[’‘]/g, "'");
}

export function complaintScore(text: string): number {
  const t = normalize(text);
  return SIGNALS.filter((s) => t.includes(s)).length;
}

export const isComplaint = (text: string) => complaintScore(text) >= 1;
