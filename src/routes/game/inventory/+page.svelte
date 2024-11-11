<script lang="ts">
  import { Card } from '$lib/components/ui/card';
  import { Button } from '$lib/components/ui/button';
  import { appState } from '$lib/shared/state.svelte';

  let selectedItem = $state() as any;

  function selectItem(item) {
    selectedItem = item;
  }

  $effect(() => {
    console.log('appState.tuskpet.inventory: ', appState.tuskpet.inventory);
  });
</script>

<div class="container mx-auto p-4">
  <div class="flex flex-col gap-4 lg:flex-row">
    <!-- Inventory Grid (2/3) -->
    <div class="lg:w-2/3">
      <h2 class="mb-4 text-2xl font-bold">Inventory</h2>
      <div class="grid grid-cols-7 gap-1">
        {#each appState.tuskpet.inventory as item}
          {@const id = item?.id}
          {@const image = item?.image}
          {@const name = item?.name}
          {@const quantity = item?.quantity}

          <button class="relative cursor-pointer" onclick={() => selectItem(item)}>
            <Card
              class="h-16 w-16 p-1 transition-all hover:ring-2 hover:ring-primary {selectedItem?.id ===
              id
                ? 'ring-2 ring-primary'
                : ''}"
            >
              <img src={image} alt={name} class="h-full w-full object-contain" />
            </Card>
            {#if quantity > 1}
              <span
                class="absolute -left-2 -top-2 z-10 rounded bg-gray-700 px-2 py-1 text-xs"
              >
                {quantity}
              </span>
            {/if}
          </button>
        {/each}
      </div>
    </div>

    <!-- Item Details (1/3) -->
    <div class="lg:w-1/3">
      <Card class="h-full">
        <div class="p-6">
          {#if selectedItem}
            <div class="space-y-4">
              <div class="flex items-center gap-4">
                <div class="h-24 w-24">
                  <img
                    src={selectedItem.image}
                    alt={selectedItem.name}
                    class="h-full w-full object-contain"
                  />
                </div>
                <div>
                  <h2 class="text-xl font-bold">{selectedItem.name}</h2>
                  <!-- <p class="text-sm text-muted-foreground">{selectedItem.type}</p> -->
                </div>
              </div>
              <div class="space-y-2">
                <p class="text-sm text-muted-foreground">
                  Quantity: {selectedItem.quantity}
                </p>

                <p class="mt-4 text-sm">{selectedItem.description}</p>
              </div>
              <div class="flex gap-2">
                <Button disabled size="sm">Use</Button>
                <Button disabled size="sm" variant="outline">Drop</Button>
              </div>
            </div>
          {:else}
            <div class="flex h-full items-center justify-center text-muted-foreground">
              Select an item to view details
            </div>
          {/if}
        </div>
      </Card>
    </div>
  </div>
</div>
