<script>
  import { metatags, goto } from "@sveltech/routify";
  import marked from "marked";
  import { party } from "../../store";
  import { createPartyMember } from "../../api";
  import ActionBar from '../../components/wrappers/ActionBar.svelte';
  import Button from '../../components/Button.svelte';
  import Markdown from "../../components/Markdown.svelte";

  let name = "",
    tagline = "",
    image = "",
    content = "";

  $: markdown = marked(content);

  async function createMember() {
    // TODO: Show error;
    if (!name || !tagline || !image || !content) return;
    const createdMember = await createPartyMember({
      name,
      tagline,
      image,
      content,
    });
    if (createdMember.success) {
      party.update((p) => [ ...p, createdMember.data]);
      $goto(`/party/${createdMember.data.id}`);
    } else {
      // TODO: Show error;
      console.log(createdMember);
    }
  }

  metatags.title = `Create a party member | Port Dawn`;
</script>

<div class="mt-10 w-11/12 mx-auto">
  <ActionBar backTo="/party" backText="party members">
    <Button on:click={createMember} color="green">
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
  <div class="flex flex-wrap mb-10">
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
