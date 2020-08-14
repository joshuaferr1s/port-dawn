<script>
  import { metatags, goto } from '@sveltech/routify';
  import marked from 'marked';
  import { party, notifications, processing } from '../../store.js';
  import { createEntity } from '../../api';
  import ActionBar from '../wrappers/ActionBar.svelte';
  import Button from '../Button.svelte';
  import Markdown from '../Markdown.svelte';

  export let dbName;
  export let entityList;
  export let pageTitle;

  let name = '',
    tagline = '',
    image = '',
    content = '';

  $: markdown = marked(content);

  async function _createEntity () {
    if (!name || !tagline || !image || !content) {
      notifications.error('All fields must have a value.')
      return;
    }
    processing.set(true);
    const createdEntity = await createEntity(dbName, {
      name,
      tagline,
      image,
      content,
    });
    if (createdEntity.success) {
      entityList.update((p) => [ ...p, createdEntity.data]);
      notifications.success(`Successfully created ${name}`);
      $goto(`/${dbName}/${createdEntity.data.id}`);
    } else {
      notifications.error(`Error saving. ${createdEntity.data}`);
      console.log(createdEntity);
    }
    processing.set(false);
  };

  metatags.title = `Create a new ${pageTitle} | Port Dawn`;
</script>

<div class="mt-10 w-11/12 mx-auto pb-5">
  <ActionBar backTo={`/${dbName}`} backText={pageTitle}>
    <Button on:click={_createEntity} disabled={$processing} color="green">
      Create
    </Button>
  </ActionBar>
  <div class="w-full">
    <div class="sm:flex sm:items-center mb-6">
      <div class="sm:w-1/4">
        <label
          class="block text-gray-500 font-bold sm:text-right mb-1 sm:mb-0 pr-4">
          Name
        </label>
      </div>
      <div class="sm:w-3/4">
        <input
          class="bg-gray-200 appearance-none border-2 border-gray-200 rounded
          w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none
          focus:bg-white focus:border-purple-500"
          type="text"
          bind:value={name} />
      </div>
    </div>
    <div class="sm:flex sm:items-center mb-6">
      <div class="sm:w-1/4">
        <label
          class="block text-gray-500 font-bold sm:text-right mb-1 sm:mb-0 pr-4">
          Tagline
        </label>
      </div>
      <div class="sm:w-3/4">
        <input
          class="bg-gray-200 appearance-none border-2 border-gray-200 rounded
          w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none
          focus:bg-white focus:border-purple-500"
          type="text"
          bind:value={tagline} />
      </div>
    </div>
    <div class="sm:flex sm:items-center mb-6">
      <div class="sm:w-1/4">
        <label
          class="block text-gray-500 font-bold sm:text-right mb-1 sm:mb-0 pr-4">
          Image
        </label>
      </div>
      <div class="sm:w-3/4">
        <input
          class="bg-gray-200 appearance-none border-2 border-gray-200 rounded
          w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none
          focus:bg-white focus:border-purple-500"
          type="text"
          bind:value={image} />
      </div>
    </div>
  </div>
  <hr class="mb-6" />
  <div class="flex flex-wrap">
    <div class="w-full flex-grow sm:w-1/2 p-2">
      <textarea
        class="h-full bg-gray-100 rounded border border-gray-400 leading-normal
        resize-none w-full py-2 px-3 font-medium placeholder-gray-700
        focus:outline-none focus:bg-white"
        bind:value={content} />
    </div>
    <div class="w-full sm:w-1/2 p-2">
      <div class="bg-gray-100 shadow-lg rounded-lg p-4">
        <Markdown {markdown} />
      </div>
    </div>
  </div>
</div>
