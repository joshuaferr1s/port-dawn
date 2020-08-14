<script>
  import ListEntities from '../../components/views/ListEntities.svelte';
  import { items } from '../../store';
</script>

<ListEntities dbName="items" entityList={items} pageTitle="Items" />
