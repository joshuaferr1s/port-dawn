<script>
  import ListEntities from '../../components/views/ListEntities.svelte';
  import { locations } from '../../store';
</script>

<ListEntities dbName="locations" entityList={locations} pageTitle="Locations" />
