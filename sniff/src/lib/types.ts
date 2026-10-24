export type Source = { title: string; url: string };

export type Problem = {
  id: string;
  title: string;
  summary: string;
  mentions: number;
  buildIdea: string;
  sources: Source[];
};

export type Status = "idle" | "loading" | "error" | "done";
