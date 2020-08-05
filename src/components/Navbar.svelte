<script>
  import netlifyIdentity from 'netlify-identity-widget';
	
	netlifyIdentity.init();
</script>

<div
  class="flex justify-between items-center p-4 border-b-2 border-gray-100 bg-white">
  <div class="text-xl">
    <a href="/">Port<span class="text-gray-600">Dawn</span></a>
  </div>
  <div class="flex items-center justify-end">
    <button
      on:click={() => netlifyIdentity.open()}
      class="whitespace-no-wrap inline-flex items-center justify-center px-4
      py-2 border border-transparent text-base leading-6 font-medium
      rounded-md text-white bg-indigo-600 hover:bg-indigo-500
      focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo
      active:bg-indigo-700 transition ease-in-out duration-150">
      Sign in
    </button>
  </div>
</div>
