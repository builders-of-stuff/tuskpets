<script lang="ts">
  import {
    ConnectButton,
    testnetWalletAdapter as walletAdapter
  } from '@builders-of-stuff/svelte-sui-wallet-adapter';
  import { untrack } from 'svelte';
  import { fade } from 'svelte/transition';
  import { SquareArrowOutUpRight } from 'lucide-svelte';
  import { toast } from 'svelte-sonner';
  import Reload from 'svelte-radix/Reload.svelte';

  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import * as Carousel from '$lib/components/ui/carousel/index';
  import * as Card from '$lib/components/ui/card/index';
  import { Button } from '$lib/components/ui/button/index';
  import { Toaster } from '$lib/components/ui/sonner/index';

  import TuskPet258 from '$lib/assets/tuskpets-258px.png';

  import { PACKAGE_ID } from '$lib/shared/shared.constant';
  import {
    getSubdomain,
    subdomainToObjectId,
    toBlockExplorer,
    toReadableObjectId,
    walrusLink
  } from '$lib/shared/shared-tools';
  import { dropTuskpet, mintTuskpet } from '$lib/shared/contract-tools';
  import { appState, Tuskpet } from '$lib/shared/state.svelte';
  import { tuskpetObjectToTuskpet } from '$lib/shared/mappers';

  import '../app.css';

  let hasCheckedOwnedObjects = $state(false);
  let ownedPets = $state([] as any);

  let isLoading = $state(false);

  const hasOwnedPets = $derived(ownedPets?.length > 0);

  /**
   * Mint tuskpet
   */
  const handleMintTuskpet = async () => {
    const response = (await mintTuskpet()) as any;

    const mintedObjectId = response?.objectChanges?.find?.((objectChange) => {
      return (
        objectChange?.type === 'created' &&
        objectChange?.objectType === `${PACKAGE_ID}::tuskpet::Tuskpet`
      );
    })?.objectId;

    if (mintedObjectId) {
      ownedPets = [mintedObjectId, ...ownedPets];
      toast.success('Tuskpet minted');
    }
  };

  /**
   * Delete tuskpet
   */
  const handleDeleteTuskpet = async (objectId: string) => {
    const response = (await dropTuskpet(objectId)) as any;

    const deletedObjectId = response?.objectChanges?.find?.((objectChange) => {
      return (
        objectChange?.type === 'deleted' &&
        objectChange?.objectType === `${PACKAGE_ID}::tuskpet::Tuskpet`
      );
    })?.objectId;

    if (deletedObjectId) {
      ownedPets = ownedPets.filter((pet) => pet !== deletedObjectId);
      toast.success('Tuskpet deleted');
    }
  };

  /**
   * Play tuskpet
   *
   * - Fetch tuskpet from RPC
   * - Sync state
   * - Navigate to game page
   */
  const handlePlay = async (tuskpetId: string) => {
    isLoading = true;

    const response = (await walletAdapter.suiClient.getObject({
      id: tuskpetId,
      options: {
        showContent: true,
        showDisplay: true,
        showType: true
      }
    })) as any;

    const inventoryId = response?.data?.content?.fields?.inventory?.fields?.id?.id;
    const inventorySize =
      Number(response?.data?.content?.fields?.inventory?.fields?.size) || 0;
    let inventoryItems = [] as any;

    if (inventorySize > 0) {
      const inventoryDynamicFields = await walletAdapter.suiClient.getDynamicFields({
        parentId: inventoryId
      });

      inventoryItems = await Promise.all(
        inventoryDynamicFields.data.map(async (df) => {
          const inventoryItem = (await walletAdapter.suiClient.getDynamicFieldObject({
            parentId: inventoryId,
            name: df.name
          })) as any;

          const fields = inventoryItem?.data?.content?.fields;

          return fields;
        })
      );
    }

    if (response) {
      appState.tuskpet = new Tuskpet(tuskpetObjectToTuskpet(response, inventoryItems));
      goto('/game');
    }

    isLoading = false;
  };

  // === Effects ===

  /**
   * Walrus view
   */
  $effect(() => {
    const tuskpetId = subdomainToObjectId(getSubdomain($page.url.hostname) as any);

    console.log('tuskpetId: ', tuskpetId);

    if (tuskpetId) {
      appState.isWalrusView = true;

      untrack(() => {
        (async () => {
          await handlePlay(tuskpetId);
        })();
      });
    }
  });

  /**
   * Fetch existing walrus upon connect
   */
  $effect(() => {
    if (
      !walletAdapter.isConnected ||
      (hasCheckedOwnedObjects && appState.isWalrusView)
    ) {
      return;
    }

    untrack(() => {
      (async () => {
        const ownedObjects = (await walletAdapter.suiClient.getOwnedObjects({
          owner: walletAdapter?.currentAccount?.address as any,
          filter: {
            StructType: `${PACKAGE_ID}::tuskpet::Tuskpet`
          },
          options: {
            showContent: true,
            showDisplay: true,
            showType: true
          }
        })) as any;

        const walruses = ownedObjects?.data?.map((obj: any) => obj.data.objectId);

        ownedPets = walruses;
        hasCheckedOwnedObjects = true;
      })();
    });
  });
</script>

<Toaster invert richColors />

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
      <ConnectButton {walletAdapter} />
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
  <div class="pb-12 pt-24 sm:pt-32">
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
          {#if walletAdapter.isConnected}
            <div transition:fade>
              <Button onclick={handleMintTuskpet}>Mint tuskpet (free)</Button>
            </div>
          {:else}
            <Button disabled variant="secondary">Mint tuskpet (free)</Button>
          {/if}
        </div>
      </div>
    </div>
  </div>

  <!-- Tuskpets -->
  {#if hasOwnedPets}
    <div transition:fade class="flex justify-center pb-16">
      <Carousel.Root class="w-full max-w-md">
        <Carousel.Content>
          {#each ownedPets as pet}
            <Carousel.Item class="">
              <Card.Root>
                <Card.Content
                  class="flex aspect-square flex-col items-center justify-center gap-2 p-6"
                >
                  <button onclick={() => handlePlay(pet)}>
                    <img src={TuskPet258} alt="Walrus" class="h-24 w-24 object-cover" />
                  </button>

                  <div class="flex flex-row items-center">
                    <span class="text-xl font-semibold">
                      {toReadableObjectId(pet)}
                    </span>

                    <a
                      href={`${toBlockExplorer(pet)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      class="ml-2 hover:underline"
                    >
                      <SquareArrowOutUpRight size={12} />
                    </a>
                  </div>
                </Card.Content>
              </Card.Root>

              <div class="mt-2 flex justify-center gap-2">
                {#if isLoading}
                  <Button disabled>
                    <Reload class="mr-2 size-4 animate-spin" />
                    Play
                  </Button>
                {:else}
                  <Button onclick={() => handlePlay(pet)}>Play</Button>
                {/if}
                <Button>
                  <a href={walrusLink(pet)} target="_blank" rel="noopener noreferrer">
                    View on walrus
                  </a>
                </Button>
                <!-- <Button onclick={() => handleDeleteTuskpet(pet)} variant="destructive">
                  Delete
                </Button> -->
              </div>
            </Carousel.Item>
          {/each}
        </Carousel.Content>

        <Carousel.Previous />
        <Carousel.Next />
      </Carousel.Root>
    </div>
  {/if}
</div>
