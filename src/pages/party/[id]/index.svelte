<script>
  import EntityDetails from '../../../components/views/EntityDetails.svelte';
  import { party } from '../../../store';

  export let id;
</script>

<EntityDetails dbName="party" entityList={party} {id} backText="party members" />
