<script>
  import { onMount } from 'svelte';
  import { goto, metatags } from '@sveltech/routify';
  import { party, notifications, processing } from '../../../store';
  import { getPartyMember, deletePartyMember } from '../../../api';
  import DetailPage from '../../../components/wrappers/DetailPage.svelte';

  export let id;

  let partyMember = null;
  let promise;

  async function fetchMember() {
    const fetchedMember = await getPartyMember(id);
    if (fetchedMember.success) {
      partyMember = fetchedMember.data.data;
      metatags.title = `${partyMember.name} | Port Dawn`;
      metatags.description = partyMember.tagline;
    } else {
      $goto('/404');
    }
  }

  async function editMember() {
    $goto(`/party/${id}/edit`);
  }

  async function deleteMember() {
    processing.set(true);
    const deletedMember = await deletePartyMember(id);
    if (deletedMember.success) {
      party.update(p => p.filter(el => el.id !== id));
      notifications.success(`Successfull deleted: "${deletedMember.data.data.name}"`);
      $goto('/party');
    } else {
      notifications.error(`Error during deletion of "${deletedMember.data.data.name}"`);
      console.log(deleteMember);
    }
    processing.set(false);
  }

  onMount(async () => {
    if ($party) {
      let res = $party.find(el => el.id === id);
      if (res) {
        partyMember = res.data;
        metatags.title = `${partyMember.name} | Port Dawn`;
        metatags.description = partyMember.tagline;
        return;
      }
    }
    promise = await fetchMember();
  });
</script>

{#await promise then _}
  {#if partyMember}
    <DetailPage on:edit={editMember} on:delete={deleteMember} backText="party members" backTo="/party" entity={partyMember} />
  {/if}
{/await}
