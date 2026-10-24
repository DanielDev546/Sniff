<script lang="ts">
  import type { Post } from '#lib/types';

  let { post }: { post: Post } = $props();
  let open = $state(false);

  const date = $derived(
    new Date(post.createdAt).toLocaleDateString('en', { month: 'short', year: 'numeric' })
  );
  const long = $derived(post.text.length > 220);
</script>

<article class="post">
  <header>
    <span class="src">Hacker News</span>
    <span class="author">@{post.author}</span>
    <span class="meta">{date} · {post.points} points</span>
  </header>

  <p class:clamp={long && !open}>{post.text}</p>

  <footer>
    {#if long}
      <button type="button" onclick={() => (open = !open)}>{open ? 'Show less' : 'Read more'}</button>
    {/if}
    <a href={post.link} target="_blank" rel="noreferrer">Open thread</a>
  </footer>
</article>

<style>
  .post {
    background: var(--surface);
    border: 1px solid var(--border);
    border-left: 2px solid var(--cyan);
    border-radius: 12px;
    padding: 0.9rem 1rem;
    backdrop-filter: blur(10px);
  }
  header { display: flex; flex-wrap: wrap; align-items: baseline; gap: 0.3rem 0.7rem; }
  .src { font: 700 0.75rem var(--font-mono); color: var(--cyan); }
  .author { font: 400 0.82rem var(--font-mono); color: var(--green); }
  .meta { margin-left: auto; font: 400 0.75rem var(--font-mono); color: var(--muted); }

  p { margin: 0.6rem 0 0; line-height: 1.5; white-space: pre-line; overflow-wrap: anywhere; }
  .clamp { display: -webkit-box; -webkit-line-clamp: 4; line-clamp: 4; -webkit-box-orient: vertical; overflow: hidden; }

  footer { display: flex; gap: 1rem; margin-top: 0.7rem; }
  button, a {
    background: none; border: 0; padding: 0; cursor: pointer;
    font: 500 0.82rem var(--font-body); color: var(--muted);
    text-decoration: underline; text-underline-offset: 3px;
  }
  button:hover, a:hover { color: var(--cyan); }
</style>