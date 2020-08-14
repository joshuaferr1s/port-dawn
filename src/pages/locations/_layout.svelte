<script>
  import { locations, notifications } from '../../store';
  import { getAll } from '../../api';
  import Spinner from '../../components/Spinner.svelte';

  let promise = fetchMembers();

  async function fetchMembers() {
    if ($locations.length === 0) {
      const locationsList = await getAll('locations');
      if (locationsList.success) locations.set(locationsList.data);
      else {
        notifications.error('Error fetching locations. Try again soon.');
        throw new Error();
      }
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
      <h2 class="text-xl leading-7 text-gray-700">There was a problem loading the locations. Try again soon.</h2>
      <a class="text-lg text-gray-500 hover:text-orange-400" href="/">Return to Krusty's Inn</a>
    </div>
  {/await}
</div>
