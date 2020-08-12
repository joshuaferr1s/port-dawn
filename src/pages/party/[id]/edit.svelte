<script>
  import { metatags, goto } from '@sveltech/routify';
  import marked from 'marked';
  import { dataLoading, party, notifications, processing } from '../../../store';
  import { updatePartyMember } from '../../../api';
  import ActionBar from '../../../components/wrappers/ActionBar.svelte';
  import Button from '../../../components/Button.svelte';
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
    processing.set(true);
    let memberUpdate = {
      id,
    };
    if (partyMember.data.name !== name) memberUpdate.name = name;
    if (partyMember.data.tagline !== tagline) memberUpdate.tagline = tagline;
    if (partyMember.data.image !== image) memberUpdate.image = image;
    if (partyMember.data.content !== content) memberUpdate.content = content;
    if (Object.keys(memberUpdate).length <= 1) {
      notifications.error('No changes found.');
      processing.set(false);
      return;
    }
    const updatedMember = await updatePartyMember(memberUpdate);
    console.log(updatedMember);
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
    processing.set(false);
  }

  $: {
    if (!$dataLoading) {
      getMember();
    }
  }
</script>

{#if !$dataLoading && partyMember}
  <div class="mt-10 w-11/12 mx-auto">
    <ActionBar backTo="/party" backText="party members">
      <Button on:click={saveMember} disabled={$processing} color="green">
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
