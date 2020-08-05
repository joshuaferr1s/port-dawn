<script>
	import { Router } from "@sveltech/routify";
  import { routes } from "@sveltech/routify/tmp/routes";
  import Navbar from './components/Navbar.svelte';
</script>

<div class="h-full w-full">
  <Navbar />
  <Router {routes} />
</div>

<style global>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>