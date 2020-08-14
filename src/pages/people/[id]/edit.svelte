<script>
  import EditEntity from '../../../components/views/EditEntity.svelte';
  import { people } from '../../../store';

  export let id;
</script>

<EditEntity dbName="people" {id} entityList={people} />
