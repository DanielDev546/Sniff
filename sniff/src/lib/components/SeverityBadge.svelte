<script>
  import { LEVELS } from '#lib/severity.js';
  let { level } = $props();
  let l = $derived(LEVELS[level]);
</script>

<span class="badge" style="--c: {l.color}">
  <i class="dot"></i>{l.label}
</span>

<style>
  .badge { display: inline-flex; align-items: center; gap: 0.45rem; font-family: 'Space Mono', monospace; font-size: 0.8rem; color: var(--c); }
  .dot { width: 0.55rem; height: 0.55rem; border-radius: 50%; background: var(--c); box-shadow: 0 0 8px var(--c); }
</style>