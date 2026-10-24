<script lang="ts">
  let { loading = false, onsearch }: { loading?: boolean; onsearch: (keyword: string) => void } = $props();
  let keyword = $state('');

  function submit(e: SubmitEvent) {
    e.preventDefault();
    const k = keyword.trim();
    if (k && !loading) onsearch(k);
  }
</script>

<form class="bar" onsubmit={submit}>
  <input
    bind:value={keyword}
    placeholder="Try: react state management, freelancing, auth"
    aria-label="Topic to search"
    disabled={loading}
  />
  <button type="submit" disabled={loading || !keyword.trim()}>
    {loading ? 'Scanning…' : 'Find problems'}
  </button>
</form>

<style>
  .bar {
    display: flex;
    gap: 0.6rem;
    padding: 0.5rem;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 14px;
    backdrop-filter: blur(10px);
  }
  input {
    flex: 1;
    min-width: 0;
    background: transparent;
    border: 0;
    color: var(--text);
    font: 400 1rem var(--font-mono);
    padding: 0.75rem 0.9rem;
  }
  input::placeholder { color: var(--muted); }
  input:focus-visible { outline: none; }
  .bar:focus-within { border-color: var(--green); box-shadow: 0 0 24px rgba(0, 255, 136, 0.2); }
  button {
    background: var(--green);
    color: var(--bg);
    border: 0;
    border-radius: 10px;
    padding: 0 1.2rem;
    font: 700 0.95rem var(--font-body);
    cursor: pointer;
    transition: box-shadow 0.2s, opacity 0.2s;
  }
  button:hover:not(:disabled) { box-shadow: 0 0 20px rgba(0, 255, 136, 0.55); }
  button:disabled { opacity: 0.4; cursor: not-allowed; }
</style>