<script>
  import ListEntities from '../../components/views/ListEntities.svelte';
  import { party } from '../../store';
</script>

<ListEntities dbName="party" entityList={party} pageTitle="Party Members" />
