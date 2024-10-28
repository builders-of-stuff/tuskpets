<script>
  import * as Sidebar from '$lib/components/ui/sidebar/index';

  import AppSidebar from './app-sidebar.svelte';
  import '../app.css';
</script>

<Sidebar.Provider>
  <AppSidebar />
  <main>
    <Sidebar.Trigger />
    <slot></slot>
  </main>
</Sidebar.Provider>
