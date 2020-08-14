<script>
  import EntityDetails from '../../../components/views/EntityDetails.svelte';
  import { history } from '../../../store';

  export let id;
</script>

<EntityDetails dbName="history" entityList={history} {id} backText="history" />
