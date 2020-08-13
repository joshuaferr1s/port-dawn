<script>
  import { onMount } from 'svelte';
  import { goto, metatags, meta } from '@sveltech/routify';
  import { notifications, processing } from '../../store.js';
  import { getSingle, deleteEntity } from '../../api';
  import DetailPage from '../wrappers/DetailPage.svelte';
  import Button from '../Button.svelte';

  export let dbName;
  export let entityList;
  export let id;
  export let backText;

  let currentEntity;
  
  async function getEntity() {
    processing.set(true);
    const fetchedEntity = await getSingle(dbName, id);
    if (fetchedEntity.success) {
      currentEntity = fetchedEntity.data.data;
      metatags.title = `${currentEntity.name} | Port Dawn`;
      metatags.description = currentEntity.tagline;
    } else {
      notifications.error('That cavern was still empty. You decide to continue on the path.');
      $goto('/404');
    }
    processing.set(false);
  };

  async function _deleteEntity() {
    processing.set(true);
    const deletedEntity = await deleteEntity(dbName, id);
    if (deletedEntity.success) {
      entityList.update(p => p.filter(el => el.id !== id));
      notifications.success(`Successfull deleted: "${deletedEntity.data.data.name}"`);
      $goto(`/${dbName}`);
    } else {
      notifications.error(`Error during deletion of "${deletedEntity.data.data.name}"`);
      console.log(deletedEntity);
    }
    processing.set(false);
  };

  onMount(() => {
    let res = $entityList.find(el => el.id === id);
    if (!res) {
      notifications.error(`This cavern appears to be empty. The ${backText} must have escaped.`);
      return;
    }
    currentEntity = res.data;
    metatags.title = `${currentEntity.name} | Port Dawn`;
    metatags.description = currentEntity.tagline;
  });
</script>

{#if currentEntity}
  <DetailPage on:edit={() => $goto(`/${dbName}/${id}/edit`)} on:delete={_deleteEntity} backText={backText} backTo={`/${dbName}`} entity={currentEntity} />
{:else}
  <div class="w-1/2 mx-auto">
    <Button on:click={getEntity} color="green" disabled={$processing}>Call out!</Button>
  </div>
{/if}
