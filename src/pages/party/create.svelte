<script>
  import CreateEntity from '../../components/views/CreateEntity.svelte';
  import { party } from '../../store';
</script>

<CreateEntity dbName="party" entityList={party} pageTitle="Party Member" />
