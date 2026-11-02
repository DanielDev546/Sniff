import type { Post, Problem } from "./types";
import { complaintScore } from "./complaints";
import { THEMES } from "./themes";

export function rankProblems(posts: Post[]): Problem[] {
  const groups = THEMES.map((t) => ({
    theme: t,
    posts: [] as Post[],
    intensity: 0,
  }));

  for (const post of posts) {
    const text = post.text.toLowerCase();
    for (const g of groups) {
      if (g.theme.triggers.some((w) => text.includes(w))) {
        g.posts.push(post);
        g.intensity += complaintScore(post.text);
      }
    }
  }

  return groups
    .filter((g) => g.posts.length > 0)
    .sort(
      (a, b) => b.posts.length - a.posts.length || b.intensity - a.intensity,
    )
    .map((g) => {
      const best = [...g.posts].sort(
        (a, b) => complaintScore(b.text) - complaintScore(a.text),
      )[0];
      return {
        id: g.theme.id,
        title: g.theme.title,
        summary: `“${best.text.slice(0, 160).trim()}…”`,
        mentions: g.posts.length,
        sources: g.posts
          .slice(0, 3)
          .map((p) => ({ title: `@${p.author}`, url: p.link })),
      };
    });
}
