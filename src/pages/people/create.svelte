<script>
  import CreateEntity from '../../components/views/CreateEntity.svelte';
  import { people } from '../../store';
</script>

<CreateEntity dbName="people" entityList={people} pageTitle="People" />
