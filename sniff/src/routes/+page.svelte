<script lang="ts">
  import '../app.css';
  import SearchBar from '#lib/components/SearchBar.svelte';
  import ProblemList from '#lib/components/ProblemList.svelte';
  import PostFeed from '#lib/components/PostFeed.svelte';
  import type { Post, Status } from '#lib/types';

  let status = $state<Status>('idle');
  let keyword = $state('');
  let posts = $state<Post[]>([]);
  let postCount = $state(0);
  let error = $state('');

  async function search(k: string) {
    keyword = k;
    status = 'loading';
    error = '';
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(k)}`);
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? 'Search failed');
      }
      const data = await res.json();
      posts = data.posts;
      postCount = data.count;
      status = 'done';
    } catch (e) {
      error = e instanceof Error ? e.message : 'Could not reach the search service.';
      status = 'error';
    }
  }
</script>

<main>
 <header class="top">
  <div class="brand">
    <h1>Sniff</h1>
    <span class="dot" aria-hidden="true"></span>
  </div>
  <span class="day">Day 1 of 30</span>
</header>
  <p class="lead">Scan Hacker News for problems people keep complaining about, then build the fix.</p>

  <SearchBar loading={status === 'loading'} onsearch={search} />

  {#if status === 'done'}
    <p class="found">Found {postCount} posts about “{keyword}”</p>
  {/if}

  <section class="results">
    {#if status === 'done'}
      <PostFeed {posts} />
    {:else}
      <ProblemList {status} problems={[]} {error} />
    {/if}
  </section>
</main>

<style>
.brand {
  display: flex;
  align-items: baseline;
  gap: 0.12em;
  font-size: clamp(1.8rem, 6vw, 2.6rem);
}
h1 {
  font: 800 1em var(--font-display);
  margin: 0;
  letter-spacing: -0.02em;
}
.dot {
  width: 0.24em;
  height: 0.24em;
  border-radius: 50%;
  background: var(--green);
  box-shadow: 0 0 12px var(--green);
}  main { max-width: 720px; margin: 0 auto; padding: 2.5rem 1.2rem 4rem; }
  .top { display: flex; justify-content: space-between; align-items: center; gap: 1rem; }
  .day { font: 400 0.8rem var(--font-mono); color: var(--green); border: 1px solid var(--green); border-radius: 999px; padding: 0.25rem 0.7rem; white-space: nowrap; }
  .lead { color: var(--muted); margin: 0.6rem 0 1.6rem; max-width: 55ch; line-height: 1.5; }
  .found { margin: 1.5rem 0 0; color: var(--muted); font: 400 0.85rem var(--font-mono); }
  .results { margin-top: 1rem; }
</style> 