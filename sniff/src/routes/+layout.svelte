<script>
  import '../app.css';
  import Sidebar from '#lib/components/Sidebar.svelte';
  let { children } = $props();
</script>

<div class="shell">
  <Sidebar />
  <main>{@render children()}</main>
</div>

<style>
  .shell { display: grid; grid-template-columns: 240px minmax(0, 1fr); min-height: 100vh; }
  main { min-width: 0; }
  @media (max-width: 800px) { .shell { grid-template-columns: minmax(0, 1fr); } }
</style>