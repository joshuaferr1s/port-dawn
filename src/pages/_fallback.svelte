<script>
  import { metatags, url } from '@sveltech/routify';

  metatags.title = 'Page Not Found | Port Dawn';
  metatags.description = '404 - Page not found';
</script>

<div class="flex h-full justify-center items-center text-center">
  <div>
    <h1 class="text-3xl">404 - Page Not Found</h1>
    <p class="text-lg">Return <a href={$url('/about')}>home</a></p>
  </div>
</div>
