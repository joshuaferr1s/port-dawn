<script>
  import { onMount } from 'svelte';
  import { metatags, goto } from '@sveltech/routify';
  import { party, dataLoading, notifications } from '../../store';
  import { getPartyMembers } from '../../api';

  import ActionBar from '../../components/wrappers/ActionBar.svelte';
  import Button from '../../components/Button.svelte';
  import CardList from '../../components/CardList.svelte';
  import Card from '../../components/Card.svelte';
  import Spinner from '../../components/Spinner.svelte';

  async function getData() {
    dataLoading.set(true);
    const partyMembers = await getPartyMembers();
    if (partyMembers.success) party.set(partyMembers.data);
    else notifications.error('Error fetching the party members. Try again soon.');
    dataLoading.set(false);
  }

  metatags.title = 'Party Members | Port Dawn';
  metatags.description = 'Party members of Port Dawn';
</script>

<div class="w-11/12 mx-auto mt-10">
  <ActionBar backTo="/" backText="the inn">
    <Button on:click={() => $goto(`/party/create`)} color="green">Create</Button>
    <Button on:click={getData} color="indigo">Short Rest</Button>
  </ActionBar>

  <h1 class="w-full my-10 text-center text-3xl text-orange-500">Party Members</h1>

  {#if $party.length > 0}
    <CardList>
      {#each $party as partyMember}
        <Card id={partyMember.id} title={partyMember.data.name} tagline={partyMember.data.tagline} image={partyMember.data.image} />
      {/each}
    </CardList>
  {:else if $dataLoading}
    <div class="flex justify-center mt-10">
      <Spinner />
    </div>
  {:else if !$dataLoading}
    <p class="w-11/12 mx-auto text-center text-gray-600">Blast! There are no party members to be seen.</p>
  {/if}
</div>


