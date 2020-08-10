<script>
  import { goto } from '@sveltech/routify'
  export let id;
  export let title;
  export let tagline;
  export let image;

  function navigateToDetails() {
    $goto(`/party/${id}`);
  }
</script>

<div on:click={navigateToDetails} class="w-full sm:w-1/2 md:w-1/3 xl:w-1/4 p-4">
  <div class="flex max-w-md bg-white shadow-lg rounded-lg overflow-hidden scale-100 transform hover:scale-105 cursor-pointer">
    <div class="w-1/3 bg-contain bg-center bg-no-repeat" style={`background-image: url('${image}')`}>
    </div> 
    <div class="w-2/3 p-4">
      <h1 class="text-gray-700 font-bold text-xl">{title}</h1>
      <p class="mt-2 text-gray-600 text-sm">{tagline}</p>
    </div>
  </div>
</div>
