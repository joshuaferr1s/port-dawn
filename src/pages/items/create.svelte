<script>
  import CreateEntity from '../../components/views/CreateEntity.svelte';
  import { items } from '../../store';
</script>

<CreateEntity dbName="items" entityList={items} pageTitle="Items" />
