<script>
  export let markdown;
</script>

<div class="markdown">
  {@html markdown}
</div>

<style>
  /* purgecss start ignore */
  .markdown {
    @apply leading-relaxed;
    @apply text-sm;
    @apply w-full;
    @apply overflow-scroll;
  }

  @screen sm {
    .markdown {
      @apply text-base;
    }
  }

  @screen lg {
    .markdown {
      @apply text-lg;
    }
  }

  /* Headers */
  .markdown > :global(h1),
  .markdown > :global(h2) {
    @apply text-xl;
    @apply my-6;
    @apply font-semibold;
  }
  .markdown > :global(h3),
  .markdown > :global(h4),
  .markdown > :global(h5),
  .markdown > :global(h6) {
    @apply text-lg;
    @apply my-3;
    @apply font-semibold;
  }

  @screen sm {
    .markdown > :global(h1),
    .markdown > :global(h2) {
      @apply text-2xl;
    }
    .markdown > :global(h3),
    .markdown > :global(h4),
    .markdown > :global(h5),
    .markdown > :global(h6) {
      @apply text-xl;
    }
  }

  .markdown > :global(p > img) {
    @apply block;
    width: 50%;
    @apply h-auto;
    @apply mx-auto;
  }

  /* Links */
  .markdown > :global(a) {
    @apply text-blue-600;
  }
  .markdown > :global(a:hover) {
    @apply underline;
  }
  /* Paragraph */
  .markdown > :global(p) {
    @apply mb-4;
  }
  /* Lists */
  .markdown > :global(ul),
  .markdown > :global(ol) {
    @apply mb-4;
    @apply ml-8;
  }
  .markdown > :global(li > p),
  .markdown > :global(li > ul),
  .markdown > :global(li > ol) {
    @apply mb-0;
  }
  .markdown > :global(ol) {
    @apply list-decimal;
  }
  .markdown > :global(ul) {
    @apply list-disc;
  }
  /* Blockquotes */
  .markdown > :global(blockquote) {
    @apply p-2;
    @apply mx-6;
    @apply bg-gray-100;
    @apply mb-4;
    @apply border-l-4;
    @apply border-gray-400;
    @apply italic;
  }
  .markdown > :global(blockquote > p) {
    @apply mb-0;
  }
  /* Tables */
  .markdown > :global(td),
  .markdown > :global(th) {
    @apply px-2;
    @apply py-1;
    @apply border;
    @apply border-gray-400;
  }
  .markdown > :global(tr:nth-child(odd)) {
    @apply bg-gray-100;
  }
  .markdown > :global(table) {
    @apply mb-6;
  }
  .markdown > :global(:not(pre) > code.language-text) {
    white-space: pre-line;
  }
  /* purgecss end ignore */
</style>
