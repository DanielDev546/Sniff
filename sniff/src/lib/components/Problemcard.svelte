<script lang="ts">
  import type { Problem } from '$lib/types';

  let { problem, rank, maxMentions }: { problem: Problem; rank: number; maxMentions: number } = $props();

  // Heat = how often this problem appears compared with the top one.
  const heat = $derived(problem.mentions / maxMentions);
  const tone = $derived(heat > 0.66 ? 'hot' : heat > 0.33 ? 'warm' : 'cool');
</script>

<article class="card {tone}">
  <div class="meter" aria-hidden="true"><span style="width: {heat * 100}%"></span></div>

  <header>
    <span class="rank">#{rank}</span>
    <h3>{problem.title}</h3>
    <span class="count">{problem.mentions} mentions</span>
  </header>

  <p class="summary">{problem.summary}</p>

  <div class="idea">
    <span class="tag">Build idea</span>
    <p>{problem.buildIdea}</p>
  </div>

  {#if problem.sources.length}
    <ul class="sources">
      {#each problem.sources.slice(0, 3) as s}
        <li><a href={s.url} target="_blank" rel="noreferrer">{s.title}</a></li>
      {/each}
    </ul>
  {/if}
</article>

<style>
  .card {
    --accent: var(--cyan);
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 14px;
    padding: 1.1rem 1.2rem;
    backdrop-filter: blur(10px);
  }
  .hot { --accent: var(--amber); }
  .warm { --accent: var(--green); }

  .meter { height: 3px; background: var(--border); border-radius: 3px; margin-bottom: 0.9rem; }
  .meter span { display: block; height: 100%; background: var(--accent); border-radius: 3px; transition: width 0.6s ease; box-shadow: 0 0 10px var(--accent); }

  header { display: flex; align-items: baseline; gap: 0.6rem; flex-wrap: wrap; }
  .rank { font: 700 0.9rem var(--font-mono); color: var(--accent); }
  h3 { flex: 1; margin: 0; font: 700 1.1rem var(--font-display); min-width: 12ch; }
  .count { font: 400 0.8rem var(--font-mono); color: var(--accent); }

  .summary { color: var(--muted); line-height: 1.5; margin: 0.6rem 0 0.9rem; max-width: 65ch; }

  .idea { border-left: 2px solid var(--cyan); padding-left: 0.8rem; }
  .tag { font: 700 0.8rem var(--font-mono); color: var(--cyan); }
  .idea p { margin: 0.2rem 0 0; line-height: 1.45; }

  .sources { list-style: none; padding: 0; margin: 0.9rem 0 0; display: flex; flex-wrap: wrap; gap: 0.4rem 1rem; }
  .sources a { color: var(--muted); font-size: 0.8rem; text-decoration: underline; text-underline-offset: 3px; }
  .sources a:hover { color: var(--text); }
</style>