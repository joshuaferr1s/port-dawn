<script>
  import { metatags, goto } from '@sveltech/routify';
  import { user } from '../store';

  const categories = [
    {
      name: 'Party Members',
      tagline: 'The ragged rangers',
      path: '/party',
    },
  ];

  metatags.title = 'Port Dawn';
  metatags.description = 'Wiki for the Port Dawn d&d 5e campaign';
</script>

{#if $user}
  <div class="mt-10 w-11/12 mx-auto">
    <h1 class="text-center uppercase text-orange-600 text-2xl font-hairline">Welcome to Krusty's{$user.user_metadata.full_name ? `, ${$user.user_metadata.full_name}!` : '!'}</h1>
    <div class="flex flex-row flex-wrap mt-2">
      {#each categories as category}
        <div class="w-full sm:w-1/3 md:w-1/4 p-2">
          <div on:click={() => $goto(category.path)} class="bg-white shadow-lg rounded-lg overflow-hidden scale-100 transform hover:scale-105 cursor-pointer p-4">
            <h1 class="text-gray-700 font-bold text-xl">{category.name}</h1>
            <p class="mt-2 text-gray-600 text-sm">{category.tagline}</p>
          </div>
        </div>
      {/each}
    </div>
  </div>
{/if}
