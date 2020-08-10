<script>
  import { metatags, url } from '@sveltech/routify';

  metatags.title = 'Page Not Found | Port Dawn';
  metatags.description = '404 - Page not found';
</script>

<div class="mt-10 text-center w-11/12 md:w-1/2 mx-auto">
  <h1 class="text-3xl">404 - Page Not Found</h1>
  <a class="text-lg hover:text-orange-400" href={$url('/')}>Back to the inn</a>
</div>
