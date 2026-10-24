<script lang="ts">
  import type { Post } from '$lib/types';
  import PostCard from './PostCard.svelte';

  let { posts }: { posts: Post[] } = $props();

  // Skip posts with no text (some stories come back empty).
  const shown = $derived(posts.filter((p) => p.text.trim().length > 0));
</script>

{#if shown.length === 0}
  <p class="note">Nothing found for this keyword. Try a broader one.</p>
{:else}
  <div class="stack">
    {#each shown as post (post.id)}
      <PostCard {post} />
    {/each}
  </div>
{/if}

<style>
  .stack { display: grid; gap: 0.7rem; }
  .note { color: var(--muted); text-align: center; margin: 3rem 0; }
</style>