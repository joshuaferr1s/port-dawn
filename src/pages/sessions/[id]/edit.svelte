<script>
  import EditEntity from '../../../components/views/EditEntity.svelte';
  import { sessions } from '../../../store';

  export let id;
</script>

<EditEntity dbName="sessions" {id} entityList={sessions} />
