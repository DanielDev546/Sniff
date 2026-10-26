import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { cleanText } from "#lib/clean";
import { isComplaint } from "#lib/complaints";

const MIN_LENGTH = 80;

export const GET: RequestHandler = async ({ url }) => {
  const q = url.searchParams.get("q")?.trim();

  if (!q) {
    return json({ error: 'Query parameter "q" is required' }, { status: 400 });
  }

  try {
    const res = await fetch(
      `https://hn.algolia.com/api/v1/search?query=${encodeURIComponent(q)}&tags=(comment)&hitsPerPage=100`,
    );

    if (!res.ok) {
      return json({ error: "Hacker News search failed" }, { status: 502 });
    }

    const data = await res.json();

    const all = data.hits.map((h: any) => ({
      id: h.objectID,
      author: h.author,
      text: cleanText(h.comment_text ?? h.story_text ?? h.title ?? ""),
      points: h.points ?? 0,
      createdAt: h.created_at,
      link: `https://news.ycombinator.com/item?id=${h.objectID}`,
    }));

    const posts = all
      .filter((p: { text: string }) => p.text.length >= MIN_LENGTH)
      .filter((p: { text: string }) => isComplaint(p.text));

    return json({ query: q, scanned: all.length, count: posts.length, posts });
  } catch {
    return json({ error: "Could not reach Hacker News" }, { status: 502 });
  }
};
