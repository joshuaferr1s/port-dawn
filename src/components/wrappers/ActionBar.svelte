<script>
  import { goto } from '@sveltech/routify';
  export let backTo;
  export let backText;
</script>

<div class="w-full flex justify-between px-2 mb-4">
  <button on:click={() => $goto(backTo)} class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded inline-flex items-center mr-2">
    <svg class="fill-current w-4 h-4 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd"></path></svg>
    <span>Back to {backText}</span>
  </button>
  <div class="flex flex-row space-x-2">
    <slot />
  </div>
</div>