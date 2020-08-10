<script>
  import { page } from '@sveltech/routify';
  import Navbar from '../components/Navbar.svelte';
  import AccessDenied from '../components/AccessDenied.svelte';
  import { user } from '../store';

  $: homepage = $page.title === 'index';
</script>

<Navbar />
{#if $user || homepage}
  <slot />
{:else}
  <AccessDenied />
{/if}
