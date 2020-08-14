<script>
  import { onMount } from 'svelte';
  import { metatags, goto } from '@sveltech/routify';
  import marked from 'marked';
  import { notifications, processing } from '../../store';
  import { updateEntity } from '../../api';
  import ActionBar from '../wrappers/ActionBar.svelte';
  import Button from '../Button.svelte';
  import Markdown from '../Markdown.svelte';

  export let dbName;
  export let id;
  export let entityList;

  let currentEntity,
    name = '',
    tagline = '',
    image = '',
    content = '';
  
  $: markdown = marked(content);

  async function saveEntity() {
    processing.set(true);
    let entityUpdate = { id };
    if (currentEntity.data.name !== name) entityUpdate.name = name;
    if (currentEntity.data.tagline !== tagline) entityUpdate.tagline = tagline;
    if (currentEntity.data.image !== image) entityUpdate.image = image;
    if (currentEntity.data.content !== content) entityUpdate.content = content;
    if (Object.keys(entityUpdate).length <= 1) {
      notifications.error('No changes found.');
      processing.set(false);
      return;
    }

    const updatedEntity = await updateEntity(dbName, entityUpdate);
    if (updatedEntity.success) {
      entityList.update(p => p.map(el => {
        if (el.id !== id) return el;
        else return {
          id: id,
          data: {
            name,
            tagline,
            image,
            content,
          },
        };
      }));
      notifications.success('Successfully saved.');
    } else {
      notifications.error('Error during saving.');
      console.log(updatedEntity);
    }
    processing.set(false);
  };

  onMount(() => {
    let res = $entityList.find(el => el.id === id);
    if (!res) {
      notifications.error(`That cavern was empty. Maybe try the other way around.`);
      $goto(`/${dbName}`);
    }
    currentEntity = { ...res };
    name = currentEntity.data.name;
    tagline = currentEntity.data.tagline;
    image = currentEntity.data.image;
    content = currentEntity.data.content;
    markdown = marked(currentEntity.data.content);
    metatags.title = `Editing ${currentEntity.data.name} | Port Dawn`;
    metatags.description = currentEntity.tagline;
  });
</script>

{#if currentEntity}
  <ActionBar backTo={`/${dbName}/${id}`} backText={currentEntity.data.name}>
    <Button on:click={saveEntity} disabled={$processing} color="green">
      Save
    </Button>
  </ActionBar>
  <div class="w-full">
    <div class="sm:flex sm:items-center mb-6">
      <div class="sm:w-1/4">
        <label class="block text-gray-500 font-bold sm:text-right mb-1 sm:mb-0 pr-4">
          Name
        </label>
      </div>
      <div class="sm:w-3/4">
        <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type="text" bind:value={name}>
      </div>
    </div>
    <div class="sm:flex sm:items-center mb-6">
      <div class="sm:w-1/4">
        <label class="block text-gray-500 font-bold sm:text-right mb-1 sm:mb-0 pr-4">
          Tagline
        </label>
      </div>
      <div class="sm:w-3/4">
        <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type="text" bind:value={tagline}>
      </div>
    </div>
    <div class="sm:flex sm:items-center mb-6">
      <div class="sm:w-1/4">
        <label class="block text-gray-500 font-bold sm:text-right mb-1 sm:mb-0 pr-4">
          Image
        </label>
      </div>
      <div class="sm:w-3/4">
        <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type="text" bind:value={image}>
      </div>
    </div>
  </div>
  <hr class="mb-6">
  <div class="flex flex-wrap">
    <div class="w-full flex-grow sm:w-1/2 p-2">
      <textarea class="h-full bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white" bind:value={content}></textarea>
    </div>
    <div class="w-full sm:w-1/2 p-2">
      <div class="bg-gray-100 shadow-lg rounded-lg p-4">
        <Markdown {markdown} />
      </div>
    </div>
  </div>
{/if}
