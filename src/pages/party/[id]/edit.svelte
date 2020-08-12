<script>
  import { metatags, goto } from '@sveltech/routify';
  import marked from 'marked';
  import { dataLoading, party, notifications } from '../../../store';
  import { updatePartyMember } from '../../../api';
  import Markdown from '../../../components/Markdown.svelte';

  export let id;

  let partyMember;

  let name = '',
    tagline = '',
    image = '',
    content = '';

  $: markdown = marked(content);

  function getMember() {
    const foundMember = $party.find(el => el.id === id);
    if (!foundMember) return $goto('/404');
    partyMember = { ...foundMember };
    name = partyMember.data.name;
    tagline = partyMember.data.tagline;
    image = partyMember.data.image;
    content = partyMember.data.content;
    markdown = marked(partyMember.data.content);
    metatags.title = `Editing ${partyMember.data.name} | Port Dawn`;
  }

  async function saveMember() {
    let memberUpdate = {
      id,
    };
    if (partyMember.data.name !== name) memberUpdate.name = name;
    if (partyMember.data.tagline !== tagline) memberUpdate.tagline = tagline;
    if (partyMember.data.image !== image) memberUpdate.image = image;
    if (partyMember.data.content !== content) memberUpdate.content = content;
    if (Object.keys(memberUpdate).length <= 1) return;
    const updatedMember = await updatePartyMember(memberUpdate);
    if (updatedMember.success) {
      party.update(p => p.map(el => {
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
      console.log(updatedMember);
    }
  }

  $: {
    if (!$dataLoading) {
      getMember();
    }
  }
</script>

{#if !$dataLoading && partyMember}
  <div class="mt-10 w-11/12 mx-auto">
    <div class="w-full flex justify-between px-2 mb-4">
      <button on:click={() => $goto(`/party/${id}`)} class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded inline-flex items-center">
        <svg class="fill-current w-4 h-4 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd"></path></svg>
        <span>Back to {partyMember.data.name}</span>
      </button>
      <button on:click={saveMember} class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
        Save
      </button>
    </div>
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
    <div class="flex flex-wrap mb-10">
      <div class="w-full flex-grow sm:w-1/2 p-2">
        <textarea class="h-full bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white" bind:value={content}></textarea>
      </div>
      <div class="w-full sm:w-1/2 p-2">
        <Markdown {markdown} />
      </div>
    </div>
  </div>
{/if}
