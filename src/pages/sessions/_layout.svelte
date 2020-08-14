<script>
  import { sessions, notifications } from '../../store';
  import { getAll } from '../../api';
  import Spinner from '../../components/Spinner.svelte';

  let promise = fetchMembers();

  async function fetchMembers() {
    if ($sessions.length === 0) {
      const sessionsList = await getAll('sessions');
      console.log(sessionsList);
      if (sessionsList.success) sessions.set(sessionsList.data);
      else {
        notifications.error('Error fetching sessions. Try again soon.');
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
      <h2 class="text-xl leading-7 text-gray-700">There was a problem loading the campaign sessions. Try again soon.</h2>
      <a class="text-lg text-gray-500 hover:text-orange-400" href="/">Return to Krusty's Inn</a>
    </div>
  {/await}
</div>
