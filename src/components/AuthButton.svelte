<script>
  export let color;
</script>

<button
  on:click
  class="bg-{color}-600 hover:bg-{color}-700 text-white font-bold py-2 px-4 rounded"
>
  <slot />
</button>