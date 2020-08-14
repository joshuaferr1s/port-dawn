<script>
  import EntityDetails from '../../../components/views/EntityDetails.svelte';
  import { sessions } from '../../../store';

  export let id;
</script>

<EntityDetails dbName="sessions" entityList={sessions} {id} backText="sessions" />
