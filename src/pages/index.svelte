<script>
  import { metatags, url } from '@sveltech/routify';
  const message = 'Svelte, Parcel, Tailwindcss';

  metatags.title = 'Port Dawn';
  metatags.description = 'Wiki for the Port Dawn d&d 5e campaign';
</script>

<div class="flex flex-col justify-center">
  <span class="text-center p-1 xs:max-w-lg sm:max-w-full my-0 mx-auto">
    <h1 class="uppercase text-orange-600 text-4xl font-hairline">{message}</h1>
    <p>Crafted with 🧡 by <a class="text-orange-600 hover:text-orange-300" href="https://jajjferris.com" target="_blank">Joshua Ferris</a></p>
  </span>
</div>
