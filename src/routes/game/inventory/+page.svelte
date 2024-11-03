<script lang="ts">
  import { Card } from '$lib/components/ui/card';
  import { Button } from '$lib/components/ui/button';
  import { Badge } from '$lib/components/ui/badge';

  // Sample inventory data
  const inventoryItems = [
    {
      id: 1,
      name: 'Steel Sword',
      type: 'Weapon',
      rarity: 'Common',
      description: 'A basic steel sword',
      image: '/sword.png',
      quantity: 4
    },
    {
      id: 1,
      name: 'Steel Sword',
      type: 'Weapon',
      rarity: 'Common',
      description: 'A basic steel sword',
      image: '/sword.png',
      quantity: 4
    },
    {
      id: 1,
      name: 'Steel Sword',
      type: 'Weapon',
      rarity: 'Common',
      description: 'A basic steel sword',
      image: '/sword.png',
      quantity: 4
    },
    {
      id: 1,
      name: 'Steel Sword',
      type: 'Weapon',
      rarity: 'Common',
      description: 'A basic steel sword',
      image: '/sword.png',
      quantity: 4
    },
    {
      id: 1,
      name: 'Steel Sword',
      type: 'Weapon',
      rarity: 'Common',
      description: 'A basic steel sword',
      image: '/sword.png',
      quantity: 4
    },
    {
      id: 1,
      name: 'Steel Sword',
      type: 'Weapon',
      rarity: 'Common',
      description: 'A basic steel sword',
      image: '/sword.png',
      quantity: 4
    },
    {
      id: 1,
      name: 'Steel Sword',
      type: 'Weapon',
      rarity: 'Common',
      description: 'A basic steel sword',
      image: '/sword.png',
      quantity: 4
    },
    {
      id: 1,
      name: 'Steel Sword',
      type: 'Weapon',
      rarity: 'Common',
      description: 'A basic steel sword',
      image: '/sword.png',
      quantity: 4
    },
    {
      id: 1,
      name: 'Steel Sword',
      type: 'Weapon',
      rarity: 'Common',
      description: 'A basic steel sword',
      image: '/sword.png',
      quantity: 4
    }
  ];

  let selectedItem = null;

  function selectItem(item) {
    selectedItem = item;
  }
</script>

<div class="container mx-auto p-4">
  <div class="flex gap-4">
    <!-- Inventory Grid (2/3) -->
    <div class="w-2/3">
      <h2 class="mb-4 text-2xl font-bold">Inventory</h2>
      <div class="grid grid-cols-7 gap-1">
        {#each inventoryItems as item}
          <div class="relative cursor-pointer" on:click={() => selectItem(item)}>
            <Card
              class="h-16 w-16 p-1 transition-all hover:ring-2 hover:ring-primary {selectedItem?.id ===
              item.id
                ? 'ring-2 ring-primary'
                : ''}"
            >
              <img
                src={item.image}
                alt={item.name}
                class="h-full w-full object-contain"
              />
            </Card>
            {#if item.quantity > 1}
              <Badge
                class="absolute -left-2 -top-2 z-10 flex h-[1.25rem] min-w-[1.5rem] items-center justify-center text-xs shadow-md"
              >
                {item.quantity}
              </Badge>
            {/if}
          </div>
        {/each}
      </div>
    </div>

    <!-- Item Details (1/3) -->
    <div class="w-1/3">
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
                  <p class="text-sm text-muted-foreground">{selectedItem.type}</p>
                </div>
              </div>
              <div class="space-y-2">
                <p class="text-sm text-muted-foreground">
                  Quantity: {selectedItem.quantity}
                </p>
                <p class="text-sm text-muted-foreground">
                  Rarity: {selectedItem.rarity}
                </p>
                <p class="mt-4 text-sm">{selectedItem.description}</p>
              </div>
              <div class="flex gap-2">
                <Button size="sm">Use</Button>
                <Button size="sm" variant="outline">Drop</Button>
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
