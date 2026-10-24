<script lang="ts">
  import type { Problem, Status } from '$lib/types';
  import ProblemCard from './Problemcard.svelte';

  let { status, problems, error = '' }: { status: Status; problems: Problem[]; error?: string } = $props();

  const maxMentions = $derived(Math.max(1, ...problems.map((p) => p.mentions)));
</script>

{#if status === 'idle'}
  <p class="note">Enter a topic above to see what people are struggling with.</p>
{:else if status === 'loading'}
  <div class="stack" aria-busy="true">
    {#each [1, 2, 3] as i (i)}
      <div class="skeleton"></div>
    {/each}
  </div>
{:else if status === 'error'}
  <p class="note err">{error || 'The search failed. Check your connection and try again.'}</p>
{:else if problems.length === 0}
  <p class="note">No clear problems found for this topic. Try a broader keyword.</p>
{:else}
  <div class="stack">
    {#each problems as problem, i (problem.id)}
      <ProblemCard {problem} rank={i + 1} {maxMentions} />
    {/each}
  </div>
{/if}

<style>
  .stack { display: grid; gap: 0.9rem; }
  .note { color: var(--muted); text-align: center; margin: 3rem 0; }
  .err { color: var(--amber); }
  .skeleton {
    height: 150px;
    border-radius: 14px;
    border: 1px solid var(--border);
    background: linear-gradient(100deg, var(--surface) 30%, rgba(0, 255, 136, 0.07) 50%, var(--surface) 70%);
    background-size: 200% 100%;
    animation: shimmer 1.2s linear infinite;
  }
  @keyframes shimmer { to { background-position: -200% 0; } }
</style>