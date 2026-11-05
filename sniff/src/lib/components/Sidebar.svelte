<script>
  import { page } from '$app/state';
    import { results } from '#lib/results.svelte.js';

  const links = [
    { href: '/', label: 'Discover (8)', icon: 'M3 11l9-8 9 8M5 10v10h14V10' },
    { href: '/trending', label: 'Trending', icon: 'M12 3c1 4 5 5 5 10a5 5 0 0 1-10 0c0-2 1-3 2-4 0 2 1 3 2 3 0-3-1-5 1-9z' },
    { href: '/saved', label: 'Saved', icon: 'M6 3h12v18l-6-4-6 4z' },
    { href: '/settings', label: 'Settings', icon: 'M4 7h9M17 7h3M4 17h3M11 17h9M15 5a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM9 15a2 2 0 1 0 0 4 2 2 0 0 0 0-4z' }
  ];

  const isActive = (href) =>
    href === '/' ? page.url.pathname === '/' : page.url.pathname.startsWith(href);
</script>

<aside>
  <a class="brand" href="/">Sniff<span>.</span></a>

  

  <nav aria-label="Main">
    {#each links as l}
      <a href={l.href} class:active={isActive(l.href)} aria-current={isActive(l.href) ? 'page' : undefined}>
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d={l.icon} /></svg>
        {l.label}
        {#if l.href === '/' && results.count !== null}
  <span class="count">({results.count})</span>
{/if}
      </a>
{#if l.href === '/' && results.count !== null}
  <span class="count">({results.count})</span>
{/if}
    {/each}
  </nav>

  <div class="foot">
    <p>Find real problems.<br />Build better solutions.</p>
    <small>v1.0.0</small>
  </div>
</aside>

<style>
  aside {
    position: sticky; top: 0; width: 125%;  height: 100vh;
    display: flex; flex-direction: column; gap: 2rem;
    padding: 1.5rem 1rem;
    background: rgba(255, 255, 255, 0.02);
    border-right: 1px solid rgba(255, 255, 255, 0.07);
    backdrop-filter: blur(12px);
  }
  .brand { font-family: 'Syne', sans-serif; font-weight: 800; font-size: 1.6rem; color: #fff; text-decoration: none; padding: 0 0.6rem; }
  .brand span { color: #00ff88; }

  nav { display: flex; flex-direction: column; gap: 0.5rem; }
  nav a {
    display: flex; align-items: center; gap: 0.75rem;
    padding: 0.65rem 0.8rem; border-radius: 10px;
    color: #8b95a3; text-decoration: none; font-family: 'DM Sans', sans-serif;
    transition: background 0.15s, color 0.15s;
  }
  nav a:hover { background: rgba(255, 255, 255, 0.05); color: #e6eaf0; }
  nav a.active { background: rgba(0, 255, 136, 0.08); color: #00ff88; }
  nav a:focus-visible { outline: 2px solid #00ff88; outline-offset: 2px; }
  svg { width: 1.2rem; height: 1.2rem; fill: none; stroke: currentColor; stroke-width: 1.7; stroke-linecap: round; stroke-linejoin: round; }

  .foot { margin-top: auto; display: flex; flex-direction: column; gap: 0.75rem; }
  .foot p { margin: 0; padding: 0.9rem; border: 1px solid rgba(255, 255, 255, 0.07); border-radius: 10px; color: #8b95a3; font-size: 0.85rem; line-height: 1.5; }
  .foot small { padding: 0 0.6rem; color: #5c6673; font-family: 'Space Mono', monospace; }

  @media (max-width: 800px) {
    aside { position: static; height: auto; flex-direction: row; align-items: center; gap: 1rem; padding: 0.75rem 1rem; border-right: 0; border-bottom: 1px solid rgba(255, 255, 255, 0.07); overflow-x: auto; }
    nav { flex-direction: row; }
    .foot { display: none; }
  }
</style>