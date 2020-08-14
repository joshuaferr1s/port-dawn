<script>
  import CreateEntity from '../../components/views/CreateEntity.svelte';
  import { history } from '../../store';
</script>

<CreateEntity dbName="history" entityList={history} pageTitle="History" />
