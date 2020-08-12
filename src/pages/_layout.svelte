<script>
  import { page } from '@sveltech/routify';
  import { user, notifications } from '../store';
  import Navbar from '../components/Navbar.svelte';
  import AccessDenied from '../components/AccessDenied.svelte';
  import Alert from '../components/Alert.svelte';

  $: homepage = $page.title === 'index';
</script>

<Navbar />

{#if $notifications.visible}
  <Alert />
{/if}

{#if $user || homepage}
  <slot />
{:else}
  <AccessDenied />
{/if}
