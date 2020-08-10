<script>
  export let size = 64;
  export let color = '#3498db';
</script>

<div class="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-{size} w-{size}" style="--color:{color}"></div>

<style>
  .loader {
    border-top-color: var(--color);
    -webkit-animation: spinner 1.5s linear infinite;
    animation: spinner 1.5s linear infinite;
  }

  @-webkit-keyframes spinner {
    0% { -webkit-transform: rotate(0deg); }
    100% { -webkit-transform: rotate(360deg); }
  }

  @keyframes spinner {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
</style>