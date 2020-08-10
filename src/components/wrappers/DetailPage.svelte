<script>
  import { createEventDispatcher } from 'svelte';
  import { goto } from '@sveltech/routify';
  import { user } from '../../store';
  import marked from 'marked';
  import ActionBar from './ActionBar.svelte';
  import Button from '../Button.svelte';
  import Markdown from '../Markdown.svelte';

  export let backText;
  export let backTo;
  export let entity;

  const dispatch = createEventDispatcher();
  const isAdmin = $user.app_metadata.roles.includes('admin');

  $: markdown = entity ? marked(entity.content) : '';
</script>


<div class="mt-10 flex flex-row flex-wrap w-11/12 mx-auto">
  <ActionBar {backTo} {backText} />
  <div class="w-full sm:w-1/3 md:w-1/4 px-2">
    <div class="flex rounded shadow-lg p-2">
      <div class="w-1/3 pr-2">
        <img class="w-full rounded-sm" src={entity.image} alt={entity.name}>
      </div>
      <div class="w-2/3 flex flex-col justify-around">
        <div>
          <h1 class="text-gray-700 font-bold text-xl">{entity.name}</h1>
          <p class="mt-2 text-gray-600 text-sm">{entity.tagline}</p>
        </div>
      </div>
    </div>
    <Button on:click={() => dispatch('edit')} color="blue">
      Edit
    </Button>
    {#if isAdmin}
      <Button on:click={() => dispatch('delete')} color="red" mt={true}>
        Delete
      </Button>
    {/if}
  </div>
  <div class="w-full mb-10 mt-4 sm:mt-0 sm:w-2/3 md:w-3/4 px-2">
    <div class="bg-gray-100 shadow-lg rounded-lg p-4">
      <Markdown {markdown} />
    </div>
  </div>
</div>
