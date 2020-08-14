<script>
  import EntityDetails from '../../../components/views/EntityDetails.svelte';
  import { items } from '../../../store';

  export let id;
</script>

<EntityDetails dbName="items" entityList={items} {id} backText="items" />
