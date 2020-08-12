<script>
  import { onMount } from 'svelte';
  import { goto, metatags, meta } from '@sveltech/routify';
  import { notifications, processing } from '../../store.js';
  import { getSingle, deleteEntity } from '../../api';
  import DetailPage from '../wrappers/DetailPage.svelte';

  export let dbName;
  export let entityList;
  export let id;
  export let backText;

  let currentEntity,
    promise;
  
  async function getEntity() {
    const fetchedEntity = await getSingle(dbName, id);
    if (fetchedEntity.success) {
      currentEntities = fetchedEntity.data.data;
      metatags.title = `${currentEntity.name} | Port Dawn`;
      metatags.description = currentEntity.tagline;
    } else {
      $goto('/404');
    }
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

  onMount(async () => {
    if ($entityList) {
      let res = $entityList.find(el => el.id === id);
      if (res) {
        currentEntity = res.data;
        metatags.title = `${currentEntity.name} | Port Dawn`;
        metatags.description = currentEntity.tagline;
        return;
      }
    }
    promise = await getEntity();
  });
</script>

{#await promise then _}
  {#if currentEntity}
    <DetailPage on:edit={() => $goto(`/${dbName}/${id}/edit`)} on:delete={_deleteEntity} backText={backText} backTo={`/${dbName}`} entity={currentEntity} />
  {/if}
{/await}
