<script>
  import { onMount } from 'svelte';
  import { metatags, goto } from '@sveltech/routify';
  import { dataLoading, notifications, processing } from '../../store';
  import { getAll } from '../../api';

  import ActionBar from '../wrappers/ActionBar.svelte';
  import Button from '../Button.svelte';
  import Card from '../Card.svelte';

  export let dbName;
  export let entityList;
  export let pageTitle;

  async function getData() {
    processing.set(true);
    const allEntities = await getAll(dbName);
    if (allEntities.success) {
      entityList.set(allEntities.data);
      notifications.success(`Got the latest ${pageTitle}.`);
    } else {
      notifications.error(`Error fetching the ${pageTitle}. Try again soon.`);
    }
    processing.set(false);
  };

  metatags.title = `${pageTitle} | Port Dawn`;
  metatags.description = `${pageTitle} of Port Dawn`;
</script>

<div class="w-11/12 mx-auto mt-10">
  <ActionBar backTo="/" backText="the inn">
    <Button on:click={() => $goto(`/${dbName}/create`)} color="green">Create</Button>
    <Button on:click={getData} color="indigo">Short Rest</Button>
  </ActionBar>

  <h1 class="w-full my-10 text-center text-3xl text-orange-500">{pageTitle}</h1>

  {#if $entityList.length > 0}
    <div class="flex flex-wrap">
      {#each $entityList as entity}
        <Card id={entity.id} title={entity.data.name} tagline={entity.data.tagline} image={entity.data.image} />
      {/each}
    </div>
  {:else}
    <p class="w-11/12 mx-auto text-center text-gray-600">Blast! There are no {pageTitle} to be seen.</p>
  {/if}
</div>


