<script>
  import EntityDetails from '../../../components/views/EntityDetails.svelte';
  import { people } from '../../../store';

  export let id;
</script>

<EntityDetails dbName="people" entityList={people} {id} backText="people" />
