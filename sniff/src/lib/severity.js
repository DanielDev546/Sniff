export const LEVELS = {
  critical: { label: "Critical", color: "#ff5c5c" },
  okay: { label: "Okay", color: "#ffc233" },
  low: { label: "Low", color: "#4d9fff" },
};

// tweak these thresholds to taste
export function levelFor(mentions) {
  if (mentions >= 3) return "critical";
  if (mentions === 2) return "okay";
  return "low";
}
