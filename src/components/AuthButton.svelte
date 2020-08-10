<script>
  export let color;
</script>

<button
  on:click
  class="{color === 'indigo' ? 'bg-indigo-600 hover:bg-indigo-700' : ''}
  {color === 'red' ? 'bg-red-600 hover:bg-red-700' : ''} text-white font-bold py-2 px-4 rounded"
>
  <slot />
</button>