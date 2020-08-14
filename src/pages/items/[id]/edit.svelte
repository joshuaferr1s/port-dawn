<script>
  import EditEntity from '../../../components/views/EditEntity.svelte';
  import { items } from '../../../store';

  export let id;
</script>

<EditEntity dbName="items" {id} entityList={items} />
