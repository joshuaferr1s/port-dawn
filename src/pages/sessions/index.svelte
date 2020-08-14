<script>
  import ListEntities from '../../components/views/ListEntities.svelte';
  import { sessions } from '../../store';
</script>

<ListEntities dbName="sessions" entityList={sessions} pageTitle="Sessions" />
