// Hacker News comments come back as HTML. This turns them into plain text.
export function cleanText(html: string): string {
  return html
    .replace(/<p>/gi, "\n\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&#x27;/g, "'")
    .replace(/&#x2F;/g, "/")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .trim();
}
