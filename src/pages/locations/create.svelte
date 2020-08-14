<script>
  import CreateEntity from '../../components/views/CreateEntity.svelte';
  import { locations } from '../../store';
</script>

<CreateEntity dbName="locations" entityList={locations} pageTitle="Locations" />
