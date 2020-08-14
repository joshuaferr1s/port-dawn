<script>
  import ListEntities from '../../components/views/ListEntities.svelte';
  import { history } from '../../store';
</script>

<ListEntities dbName="history" entityList={history} pageTitle="History" />
