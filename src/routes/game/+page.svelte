<script lang="ts">
  import { SquareArrowOutUpRight, Check, X } from 'lucide-svelte';
  import { toast } from 'svelte-sonner';

  import { goto } from '$app/navigation';
  import { Button } from '$lib/components/ui/button';
  import { Progress } from '$lib/components/ui/progress';
  import * as Card from '$lib/components/ui/card/index';
  import * as Tooltip from '$lib/components/ui/tooltip/index.js';

  import FullWalrus from '$lib/assets/full-walrus.png';
  import Strength from '$lib/assets/strength.png';
  import Defence from '$lib/assets/defence.png';
  import Health from '$lib/assets/health.png';
  import Mining from '$lib/assets/mining.png';
  import Crafting from '$lib/assets/crafting.png';
  import Diving from '$lib/assets/diving.png';
  import { appState } from '$lib/shared/state.svelte';

  import {
    formatSeconds,
    toBlockExplorer,
    toReadableObjectId
  } from '$lib/shared/shared-tools';
  import {
    ACTIVITY_CONFIG,
    PACKAGE_ID,
    SKILLS_CONFIG,
    TYPE_CONFIG
  } from '$lib/shared/shared.constant';
  import { finishActivity } from '$lib/shared/contract-tools';

  /**
   * Skills & Stats
   */
  const skills = [
    {
      name: 'Diving',
      image: Diving,
      level: appState.tuskpet.divingLvl
    },
    {
      name: 'Mining',
      image: Mining,
      level: appState.tuskpet.miningLvl
    },
    {
      name: 'Crafting',
      image: Crafting,
      level: appState.tuskpet.craftingLvl
    },
    {
      name: 'Strength',
      image: Strength,
      level: 1
    },
    {
      name: 'Defence',
      image: Defence,
      level: 1
    }
  ];

  const totalLevel = $derived.by(() => {
    return skills.reduce((acc, skill) => acc + skill.level, 0);
  });

  /**
   * Active skill/current action
   */
  const activeActivity = $derived.by(() => {
    if (!appState.tuskpet?.isBusy) {
      return;
    }

    const skill = appState.tuskpet?.currentSkill;

    const activityCode = appState.tuskpet?.currentActivity;
    const activityConfig = SKILLS_CONFIG.skills[skill][activityCode];

    return activityConfig;
  });

  const activityName = $derived(activeActivity?.name);
  const activityImage = $derived(activeActivity?.image);

  const timeRemaining = $derived.by(() => {
    const maxDurationSeconds = SKILLS_CONFIG.maxActivityDurationSeconds || 7200;
    const activityDuration = appState.tuskpet.activityDurationSeconds;

    const remainingSeconds = maxDurationSeconds - activityDuration;

    return remainingSeconds > 0 ? remainingSeconds : 0;
  });

  const hasTimeRemaining = $derived.by(() => timeRemaining > 0);

  const elapsedActivityDurationSeconds = $derived.by(() => {
    return hasTimeRemaining
      ? appState.tuskpet?.activityDurationSeconds
      : SKILLS_CONFIG.maxActivityDurationSeconds;
  });

  const timeRemainingFormatted = $derived.by(() => {
    const formatted = formatSeconds(timeRemaining);

    return formatted;
  });

  const progress = $derived.by(() => {
    const activityDuration = elapsedActivityDurationSeconds;
    const baseTime = activeActivity?.baseTime;

    if (!activityDuration || !baseTime) {
      return 0;
    }

    return activityDuration % baseTime;
  });

  let itemCount = $derived(
    Math.floor(elapsedActivityDurationSeconds / activeActivity?.baseTime)
  );

  const maxProgress = $derived(activeActivity?.baseTime);
  const progressPercentage = $derived.by(() => {
    return hasTimeRemaining ? (progress / maxProgress) * 100 : 100;
  });
  const nextItemTime = $derived(formatTime(maxProgress + 1 - progress));

  // Format time helper function
  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  /**
   * Finish activity
   */
  const handleFinishActivity = async (tuskpetObjectId: string) => {
    // set xp
    // set inventory item

    const txResponse = (await finishActivity(tuskpetObjectId)) as any;

    if (txResponse) {
      const intervals = Math.floor(
        elapsedActivityDurationSeconds / appState.tuskpet?.currentActivityBaseTime
      );
      const xp = Math.floor(intervals * appState.tuskpet?.currentActivityBaseXp);
      const skillType = ACTIVITY_CONFIG[appState.tuskpet?.currentActivity]?.skill;
      const itemType = ACTIVITY_CONFIG[appState.tuskpet?.currentActivity]?.type;

      const itemId = txResponse?.objectChanges?.find?.(
        (objectChange) =>
          objectChange?.type === 'created' &&
          objectChange?.objectType === `${PACKAGE_ID}::tuskpet::Item`
      )?.objectId;

      let item;

      if (itemId) {
        item = {
          id: itemId,
          quantity: Number(intervals),
          type: itemType,

          name: TYPE_CONFIG[itemType]?.name,
          description: TYPE_CONFIG[itemType]?.description,
          image: TYPE_CONFIG[itemType]?.image
        };
        appState.tuskpet.inventory = [...appState.tuskpet.inventory, item];
      } else {
        const existingItem = appState.tuskpet?.inventory?.find(
          (invItem) => invItem.type === itemType
        );

        if (existingItem) {
          existingItem.quantity += intervals;
        }
      }

      appState.tuskpet.skills[`${skillType}Xp`] += xp;
      appState.tuskpet.currentActivity = null;
      appState.tuskpet.activityStart = null;

      toast.success('Activity finished');
    } else {
      toast.error('Activity failed to finish');
    }
  };
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

            <div class="rounded bg-gray-700 px-2 py-1 text-xs">
              Total Lv. {totalLevel}
            </div>
          </Card.Content>
        </Card.Root>
      </Card.Content>
    </Card.Root>

    <!-- Bottom section with 1/3 and 2/3 split -->
    <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
      <!-- Left column (1/3) -->

      <div class="space-y-4">
        {#if appState.tuskpet?.isBusy}
          <Card.Root class="relative bg-gray-800/50 p-4">
            <div class="mb-4 flex items-center justify-between">
              <div class="absolute -top-2 right-2 z-10 rounded">
                <div class="flex gap-2">
                  <span
                    class="items-center justify-center self-center rounded bg-gray-700 px-2 py-1 text-xs"
                  >
                    {timeRemainingFormatted}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    class="h-6 w-6 bg-gray-700 p-0 text-xs"
                    onclick={() => handleFinishActivity(appState.tuskpet?.id)}
                  >
                    {#if hasTimeRemaining}
                      <X />
                    {:else}
                      <Check class="animate-pulse" />
                    {/if}
                  </Button>
                </div>
              </div>
            </div>

            <div class="space-y-4">
              <div class="flex items-center gap-3">
                <img src={activityImage} alt="" class="h-12 w-12" />
                <div class="flex-1">
                  <div class="flex items-center gap-2">
                    {#if hasTimeRemaining}
                      <div
                        class="h-3 w-3 animate-spin rounded-full border-2 border-gray-500 border-t-white"
                      ></div>
                    {/if}
                    <h3 class="text-white">{activityName}</h3>
                  </div>
                  <Progress value={progressPercentage} class="mt-1" />
                  <div
                    class="mt-2 flex items-center justify-between text-sm text-gray-400"
                  >
                    <span class="rounded bg-gray-700 px-2 py-1 text-xs"
                      >+{itemCount}</span
                    >
                    {#if hasTimeRemaining}
                      <span class="">Next item in {nextItemTime}</span>
                    {/if}
                  </div>
                </div>
              </div>
            </div>
          </Card.Root>
        {/if}

        <Card.Root class="bg-muted">
          <Card.Content class="flex flex-col items-center justify-center gap-2 p-6">
            <div class="flex w-full flex-row items-center justify-start">
              <Card.Root class="relative w-full bg-gray-800/50 p-4">
                <div class="flex items-center gap-3">
                  <div class="relative">
                    <img src={Health} alt="" class="h-12 w-12" />
                  </div>
                  <div class="flex-1">
                    <div class="flex justify-between text-sm">
                      <span class="text-white"> Health </span>
                    </div>
                    <Progress value={100} class="mt-1" />
                    <div class="mt-2 flex items-center justify-between">
                      <span class="text-xs text-gray-400"> 100 of 100</span>
                      <!-- <span class="text-xs text-gray-400">100%</span> -->
                    </div>
                  </div>
                </div>
              </Card.Root>
            </div>
          </Card.Content>
        </Card.Root>
      </div>

      <!-- Right column (2/3) -->
      <div class="col-span-2 space-y-4">
        <!-- Stats -->
        <div class="relative flex items-center">
          <div class="flex-grow border-t border-gray-700"></div>
          <span class="mx-4 flex-shrink text-xs text-gray-400">STATS</span>
          <div class="flex-grow border-t border-gray-700"></div>
        </div>

        <!-- <Card.Root class="bg-muted">
          <Card.Content class="flex flex-col items-center justify-center gap-2 p-6">
            <div class="flex flex-row items-center">
              <span class="text-xl font-semibold"> Skills & stats </span>
            </div>
          </Card.Content>
        </Card.Root> -->

        {#each skills as skill}
          {@const image = skill?.image}
          {@const name = skill?.name}
          {@const level = skill?.level}

          <button class="relative cursor-pointer">
            <Tooltip.Provider>
              <Tooltip.Root>
                <Tooltip.Trigger>
                  <Card.Root
                    class="mr-2 h-24 w-24 bg-muted p-1 transition-all hover:ring-2 hover:ring-primary"
                  >
                    <img src={image} alt={name} class="h-full w-full object-contain" />
                  </Card.Root>
                </Tooltip.Trigger>
                <Tooltip.Content>
                  <p>{name}</p>
                </Tooltip.Content>
              </Tooltip.Root>
            </Tooltip.Provider>

            <span
              class="absolute -left-2 -top-2 z-10 rounded bg-gray-700 px-2 py-1 text-xs"
            >
              Lv. {level}
            </span>
          </button>
        {/each}

        <!-- Inventory -->
        <div class="relative flex items-center">
          <div class="flex-grow border-t border-gray-700"></div>
          <span class="mx-4 flex-shrink text-xs text-gray-400">INVENTORY</span>
          <div class="flex-grow border-t border-gray-700"></div>
        </div>

        {#each appState.tuskpet.inventory as item}
          {@const image = item?.image}
          {@const name = item?.name}
          {@const quantity = item?.quantity}

          <button class="relative cursor-pointer">
            <Tooltip.Provider>
              <Tooltip.Root>
                <Tooltip.Trigger
                  ><Card.Root
                    class="mr-2 h-24 w-24 bg-muted p-1 transition-all hover:ring-2 hover:ring-primary"
                    onclick={() => goto('/game/inventory')}
                  >
                    <img src={image} alt={name} class="h-full w-full object-contain" />
                  </Card.Root></Tooltip.Trigger
                >
                <Tooltip.Content>
                  <p>{name}</p>
                </Tooltip.Content>
              </Tooltip.Root>
            </Tooltip.Provider>

            {#if quantity > 0}
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
  </div>
</div>
