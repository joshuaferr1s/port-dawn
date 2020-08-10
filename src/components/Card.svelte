<script>
  import { goto } from "@sveltech/routify";
  export let id = null;
  export let title;
  export let tagline;
  export let image;

  function navigateToDetails() {
    if (!id) return;
    $goto(`/party/${id}`);
  }
</script>

<div class="flex w-full {id ? 'sm:w-1/2 md:w-1/3 xl:w-1/4 p-2' : ''}">
  <div on:click={navigateToDetails} class="flex w-full shadow-lg rounded-lg p-2 {id ? 'scale-100 transform hover:scale-105 cursor-pointer' : ''}">
    <div class="flex items-center w-1/3 pr-2">
      <img class="w-full rounded-sm" src={image} alt={title} />
    </div>
    <div class="w-2/3 flex flex-col justify-around">
      <div>
        <h1 class="text-gray-700 font-bold text-xl">{title}</h1>
        <p class="mt-2 text-gray-600 text-sm">{tagline}</p>
      </div>
    </div>
  </div>
</div>
