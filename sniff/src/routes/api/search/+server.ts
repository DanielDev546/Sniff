import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ url }) => {
  const q = url.searchParams.get("q")?.trim();

  if (!q) {
    return json({ error: 'Query parameter "q" is required' }, { status: 400 });
  }

  try {
    const res = await fetch(
      `https://hn.algolia.com/api/v1/search?query=${encodeURIComponent(q)}&tags=(story,comment)&hitsPerPage=50`,
    );

    if (!res.ok) {
      return json({ error: "Hacker News search failed" }, { status: 502 });
    }

    const data = await res.json();

    const posts = data.hits.map((h: any) => ({
      id: h.objectID,
      author: h.author,
      text: h.comment_text ?? h.story_text ?? h.title ?? "",
      points: h.points ?? 0,
      createdAt: h.created_at,
      link: `https://news.ycombinator.com/item?id=${h.objectID}`,
    }));

    return json({ query: q, count: posts.length, posts });
  } catch {
    return json({ error: "Could not reach Hacker News" }, { status: 502 });
  }
};
