<script>
  import ListEntities from '../../components/views/ListEntities.svelte';
  import { people } from '../../store';
</script>

<ListEntities dbName="people" entityList={people} pageTitle="People" />
