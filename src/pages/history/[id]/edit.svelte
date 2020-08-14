<script>
  import EditEntity from '../../../components/views/EditEntity.svelte';
  import { history } from '../../../store';

  export let id;
</script>

<EditEntity dbName="history" {id} entityList={history} />
