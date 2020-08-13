<script>
  import { onMount } from 'svelte';
  import { party, dataLoading, notifications } from '../../store';
  import { getAll } from '../../api';
  import Spinner from '../../components/Spinner.svelte';

  let promise = fetchMembers();

  async function fetchMembers() {
    if ($party.length === 0 && $dataLoading) {
      const partyMembers = await getAll('party');
      if (partyMembers.success) party.set(partyMembers.data);
      else {
        notifications.error('Error fetching party members. Try again soon.');
        throw new Error();
      }
      dataLoading.set(false);
    }
  }
</script>

<div class="mt-10 w-11/12 mx-auto pb-5">
  {#await promise}
    <div class="w-full flex justify-center">
      <Spinner />
    </div>
  {:then _}
    <slot />
  {:catch}
    <div class="text-center mx-auto w-full sm:w-1/2">
      <h2 class="text-xl leading-7 text-gray-700">There was a problem loading the Party Members. Try again soon.</h2>
      <a class="text-lg text-gray-500 hover:text-orange-400" href="/">Return to Krusty's Inn</a>
    </div>
  {/await}
</div>
