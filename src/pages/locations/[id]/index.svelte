<script>
  import EntityDetails from '../../../components/views/EntityDetails.svelte';
  import { locations } from '../../../store';

  export let id;
</script>

<EntityDetails dbName="locations" entityList={locations} {id} backText="locations" />
