<script>
  export let color;
  export let mt = false;
  export let disabled = false;
</script>

<button
  on:click
  {disabled}
  class="{mt ? 'mt-2' : ''} block w-full {color === 'indigo' ? 'bg-indigo-500 hover:bg-indigo-700' : ''}
  {color === 'red' ? 'bg-red-500 hover:bg-red-700' : ''} {color === 'green' ? 'bg-green-500 hover:bg-green-700' : ''}
  {color === 'blue' ? 'bg-blue-500 hover:bg-blue-700' : ''} text-white font-bold py-2 px-4 rounded {disabled ? 'cursor-not-allowed' : 'cursor-pointer'}">
  <slot />
</button>
