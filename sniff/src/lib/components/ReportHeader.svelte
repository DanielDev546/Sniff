<script lang="ts">
  let { keyword, postCount, problemCount }: { keyword: string; postCount: number; problemCount: number } = $props();
</script>

<div class="head">
  <h2>{problemCount} problems around “{keyword}”</h2>
  <p>Found in {postCount} Hacker News posts and comments.</p>
</div>

<style>
  .head { margin: 2rem 0 1rem; }
  h2 { font: 800 1.5rem var(--font-display); margin: 0 0 0.25rem; }
  p { margin: 0; color: var(--muted); font: 400 0.85rem var(--font-mono); }
</style>