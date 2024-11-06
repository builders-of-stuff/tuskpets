<script lang="ts">
  import { testnetWalletAdapter as walletAdapter } from '@builders-of-stuff/svelte-sui-wallet-adapter';

  import * as Sidebar from '$lib/components/ui/sidebar/index';
  import { IsMobile } from '$lib/hooks/is-mobile.svelte';
  import { Toaster } from '$lib/components/ui/sonner/index';
  import { appState } from '$lib/shared/state.svelte';

  import AppNavbar from './app-navbar.svelte';
  import AppSidebar from './app-sidebar.svelte';

  import '../../app.css';
  import { goto } from '$app/navigation';

  let { children } = $props();

  const isMobile = new IsMobile();

  $effect(() => {
    if (!appState.hasTuskpet || !walletAdapter.isConnected) {
      goto('/');
    }
  });
</script>

<Toaster invert richColors />

<Sidebar.Provider>
  <AppSidebar />
  <main class="w-full bg-gray-900">
    <div
      class={`flex flex-wrap items-center bg-gray-900 px-3 py-2 ${isMobile.current ? `justify-between` : 'justify-end'}`}
    >
      {#if isMobile.current}
        <Sidebar.Trigger />
      {/if}

      <AppNavbar />
    </div>

    {@render children()}
  </main>
</Sidebar.Provider>
