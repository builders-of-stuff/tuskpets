<script lang="ts">
  import {
    ConnectButton,
    testnetWalletAdapter as walletAdapter
  } from '@builders-of-stuff/svelte-sui-wallet-adapter';
  import { untrack } from 'svelte';

  import * as Carousel from '$lib/components/ui/carousel/index';
  import * as Card from '$lib/components/ui/card/index';
  import { Button } from '$lib/components/ui/button/index';

  import TuskPet258 from '$lib/assets/tuskpets-258px.png';

  import '../app.css';
  import { PACKAGE_ID } from '$lib/shared/shared.constant';

  let hasCheckedOwnedObjects = $state(false);

  let ownedPets = $state([] as any);
  const hasOwnedPets = $derived(ownedPets?.length > 0);

  $effect(() => {
    console.log('ownedPets: ', $state.snapshot(ownedPets));
  });

  /**
   * Fetch existing walrus upon connect
   */
  $effect(() => {
    if (!walletAdapter.isConnected || hasCheckedOwnedObjects) {
      return;
    }

    untrack(() => {
      (async () => {
        const ownedObjects = await walletAdapter.suiClient.getOwnedObjects({
          owner: walletAdapter?.currentAccount?.address as any,
          filter: {
            StructType: `${PACKAGE_ID}::walrus::Walrus`
          },
          options: {
            showContent: true,
            showDisplay: true,
            showType: true
          }
        });

        console.log('ownedObjects: ', ownedObjects);

        const walruses = ownedObjects?.data?.map((obj: any) => obj.data.objectId);
        ownedPets = walruses;

        hasCheckedOwnedObjects = true;
      })();
    });
  });
</script>

<div class="bg-gray-900">
  <!-- Navbar -->
  <header class="absolute inset-x-0 top-0 z-50">
    <nav aria-label="Global" class="flex items-center justify-between p-6 lg:px-8">
      <div class="flex lg:flex-1">
        <a href="/" class="-m-1.5 p-1.5">
          <span class="sr-only">Tuskpets</span>
          <img alt="" src={TuskPet258} class="h-8 w-auto" />
        </a>
      </div>
      <div class="flex lg:hidden">
        <button
          type="button"
          class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400"
        >
          <span class="sr-only">Connect</span>
          <ConnectButton {walletAdapter} />
        </button>
      </div>

      <div class="hidden lg:flex lg:flex-1 lg:justify-end">
        <ConnectButton {walletAdapter} />
      </div>
    </nav>
  </header>

  <!-- Title -->
  <div class="relative isolate pt-14">
    <div
      aria-hidden="true"
      class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
    >
      <div
        style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
        class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
      ></div>
    </div>
    <div class="pb-12 pt-24 sm:pb-16 sm:pt-32">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto max-w-2xl text-center">
          <h1
            class="text-balance text-5xl font-semibold tracking-tight text-white sm:text-7xl"
          >
            Tuskpets
          </h1>
          <p class="mt-3 text-pretty text-lg font-medium text-gray-400 sm:text-xl/8">
            Idle RPG on Sui (testnet)
          </p>
          <div class="mt-8 flex items-center justify-center gap-x-6">
            <a
              href="/"
              class="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
            >
              Mint tuskpet (free)
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Tuskpets -->
    {#if hasOwnedPets}
      <div class="flex justify-center pb-16">
        <Carousel.Root class="w-full max-w-md">
          <Carousel.Content>
            {#each ownedPets as pet}
              <Carousel.Item class="">
                <Card.Root>
                  <Card.Content
                    class="flex aspect-square items-center justify-center p-6"
                  >
                    <span class="text-xl font-semibold">{pet}</span>
                  </Card.Content>
                </Card.Root>
              </Carousel.Item>
            {/each}
          </Carousel.Content>

          <Carousel.Previous />
          <Carousel.Next />

          <div class="mt-2 flex justify-center gap-2">
            <Button>Play</Button>
            <Button>View on Walrus</Button>
            <Button variant="destructive">Delete</Button>
          </div>
        </Carousel.Root>
      </div>
    {/if}
  </div>
</div>
