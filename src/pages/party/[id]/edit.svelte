<script>
  import EditEntity from '../../../components/views/EditEntity.svelte';
  import { party } from '../../../store';

  export let id;
</script>

<EditEntity dbName="party" {id} entityList={party} />
