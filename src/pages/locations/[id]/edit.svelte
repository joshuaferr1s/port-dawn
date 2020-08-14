<script>
  import EditEntity from '../../../components/views/EditEntity.svelte';
  import { locations } from '../../../store';

  export let id;
</script>

<EditEntity dbName="locations" {id} entityList={locations} />
