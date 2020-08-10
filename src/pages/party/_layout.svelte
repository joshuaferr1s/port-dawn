<script>
  import { onMount } from 'svelte';
  import { party, dataLoading } from '../../store';
  import { getPartyMembers } from '../../api';

  let promise;

  async function fetchMembers() {
    if ($party.length === 0 && $dataLoading) {
      const partyMembers = await getPartyMembers();
      if (partyMembers.success) party.set(partyMembers.data);
      dataLoading.set(false);
      // TODO: Display error on screen if failure occurs.
    }
  }

  onMount(async () => {
    promise = await fetchMembers();
  });
</script>

{#await promise}
  Loading...
{:then _}
  <slot />
{/await}
