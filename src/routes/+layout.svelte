<script lang="ts">
  import * as Sidebar from '$lib/components/ui/sidebar/index';
  import { IsMobile } from '$lib/hooks/is-mobile.svelte';

  import AppSidebar from './app-sidebar.svelte';
  import AppNavbar from './app-navbar.svelte';
  import '../app.css';

  let { children } = $props();

  const isMobile = new IsMobile();
</script>

<Sidebar.Provider>
  <AppSidebar />
  <main class="w-full">
    <div
      class={`mx-3 my-2 flex flex-wrap items-center ${isMobile.current ? `justify-between` : 'justify-end'}`}
    >
      {#if isMobile.current}
        <Sidebar.Trigger />
      {/if}

      <AppNavbar />
    </div>

    {@render children()}
  </main>
</Sidebar.Provider>
