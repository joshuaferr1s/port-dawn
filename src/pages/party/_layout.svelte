<script>
  import { onMount } from 'svelte';
  import { party, dataLoading, notifications } from '../../store';
  import { getAll } from '../../api';

  let promise;

  async function fetchMembers() {
    if ($party.length === 0 && $dataLoading) {
      const partyMembers = await getAll('party');
      if (partyMembers.success) party.set(partyMembers.data);
      else notifications.error('Error fetching party members. Try again soon.')
      dataLoading.set(false);
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
