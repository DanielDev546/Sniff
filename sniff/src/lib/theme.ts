export type Theme = { id: string; title: string; triggers: string[] };

export const THEMES: Theme[] = [
  {
    id: "boilerplate",
    title: "Too much boilerplate",
    triggers: ["boilerplate", "verbose", "so much code", "ceremony"],
  },
  {
    id: "rerenders",
    title: "Unnecessary re-renders",
    triggers: ["re-render", "rerender", "re render", "unnecessary render"],
  },
  {
    id: "choice",
    title: "Too many libraries to choose from",
    triggers: [
      "too many",
      "which library",
      "which one",
      "choose between",
      "decision fatigue",
    ],
  },
  {
    id: "async",
    title: "Async and stale data bugs",
    triggers: ["race condition", "stale", "out of sync", "async"],
  },
  {
    id: "global",
    title: "Global state gets messy",
    triggers: ["global state", "prop drilling", "spaghetti", "hard to track"],
  },
  {
    id: "testing",
    title: "State is hard to test",
    triggers: ["hard to test", "mocking", "hard to mock"],
  },
];
