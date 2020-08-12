<script>
  import { goto } from '@sveltech/routify';
  import netlifyIdentity from 'netlify-identity-widget';
  import { user } from '../store';
  import AuthButton from './AuthButton.svelte';
  
  function logout() {
    user.set(null);
    $goto('/');
  }
  netlifyIdentity.on('init', newUser => {
    user.set(newUser);
  });
  netlifyIdentity.on('login', newUser => {
    user.set(newUser);
    netlifyIdentity.close();
  });
  netlifyIdentity.on('logout', logout);
  netlifyIdentity.init();
</script>

<header class="flex justify-between items-center px-4 py-2 border-b-2 border-gray-100">
  <div class="text-xl">
    <a href="/">Port<span class="text-orange-400">Dawn</span></a>
  </div>
  <div class="">
    {#if $user}
      <AuthButton on:click={() => netlifyIdentity.logout()} color="red">
        Split the party
      </AuthButton>
    {:else}
      <AuthButton on:click={() => netlifyIdentity.open()} color="indigo">
        Join the party
      </AuthButton>
    {/if}
  </div>
</header>
