<script>
  import CreateEntity from '../../components/views/CreateEntity.svelte';
  import { sessions } from '../../store';
</script>

<CreateEntity dbName="sessions" entityList={sessions} pageTitle="Sessions" />
