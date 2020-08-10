<script>
  export let color;
  export let mt = false;
</script>

<button
  on:click
  class="{mt ? 'mt-2' : ''} block w-full bg-{color}-500 hover:bg-{color}-700
  text-white font-bold py-2 px-4 rounded">
  <slot />
</button>
