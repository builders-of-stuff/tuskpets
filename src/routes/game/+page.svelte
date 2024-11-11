<script lang="ts">
  import { SquareArrowOutUpRight } from 'lucide-svelte';

  import * as Card from '$lib/components/ui/card/index';
  import FullWalrus from '$lib/assets/full-walrus.png';
  import { appState } from '$lib/shared/state.svelte';
  import { toBlockExplorer, toReadableObjectId } from '$lib/shared/shared-tools';
</script>

<div class="container mx-auto p-4">
  <div class="grid gap-4">
    <!-- Hero section -->
    <Card.Root class="bg-muted">
      <Card.Content
        class="relative flex h-80 flex-col items-center justify-center gap-2 p-6"
      >
        <img
          src={FullWalrus}
          alt="Walrus"
          class="absolute left-10 top-0 h-full w-auto object-cover opacity-50"
        />

        <Card.Root class="bg-primary-foreground">
          <Card.Content class="flex flex-col items-center justify-center gap-2 p-6">
            <div class="flex flex-row items-center">
              <span class="text-xl font-semibold">
                {toReadableObjectId(appState.tuskpet.id)}
              </span>
              <a
                href={`${toBlockExplorer(appState.tuskpet.id)}`}
                target="_blank"
                rel="noopener noreferrer"
                class="ml-2 hover:underline"
              >
                <SquareArrowOutUpRight size={12} />
              </a>
            </div>
          </Card.Content>
        </Card.Root>
      </Card.Content>
    </Card.Root>

    <!-- Bottom section with 1/3 and 2/3 split -->
    <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
      <!-- Left column (1/3) -->
      <div class="space-y-4">
        <Card.Root class="bg-muted">
          <Card.Content class="flex flex-col items-center justify-center gap-2  p-6">
            <div class="flex flex-row items-center">
              <span class="text-xl font-semibold"> Current activity </span>
            </div>
          </Card.Content>
        </Card.Root>

        <Card.Root class="bg-muted">
          <Card.Content class="flex flex-col items-center justify-center gap-2  p-6">
            <div class="flex flex-row items-center">
              <span class="text-xl font-semibold"> Health </span>
            </div>
          </Card.Content>
        </Card.Root>
      </div>

      <!-- Right column (2/3) -->
      <div class="col-span-2 space-y-4">
        <Card.Root class="bg-muted">
          <Card.Content class="flex flex-col items-center justify-center gap-2  p-6">
            <div class="flex flex-row items-center">
              <span class="text-xl font-semibold"> Skills & stats </span>
            </div>
          </Card.Content>
        </Card.Root>
      </div>
    </div>
  </div>
</div>
