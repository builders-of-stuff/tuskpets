<script lang="ts">
  import { Clock7, ChevronRight, Check, X } from 'lucide-svelte';
  import { toast } from 'svelte-sonner';

  import { page } from '$app/stores';

  import { Card } from '$lib/components/ui/card';
  import { Progress } from '$lib/components/ui/progress';
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input/index';
  import * as Dialog from '$lib/components/ui/dialog/index';
  import * as Alert from '$lib/components/ui/alert/index';

  import {
    ACTIVITY_CONFIG,
    PACKAGE_ID,
    SKILL_IMAGES,
    SKILLS_CONFIG
  } from '$lib/shared/shared.constant';
  import { appState } from '$lib/shared/state.svelte';
  import { finishActivity, startActivity } from '$lib/shared/contract-tools';
  import { formatSeconds } from '$lib/shared/shared-tools';

  const skill = $derived($page?.params?.skill);

  /**
   * Progress
   */
  const skillImage = $derived(SKILL_IMAGES[skill]);
  const skillNextLvlXpNeeded = $derived(appState.tuskpet[`${skill}NextLvlXpNeeded`]);
  const skillNextLvlXpProgress = $derived(
    appState.tuskpet[`${skill}NextLvlXpProgress`]
  );

  /**
   * Active skill/current action
   */
  const isActiveSkill = $derived.by(() => {
    const skillCodes = Object.keys(SKILLS_CONFIG.skills[skill]);
    const currentActivity = appState.tuskpet?.currentActivity;

    return !!currentActivity && skillCodes.includes(String(currentActivity));
  });

  const activeActivity = $derived.by(() => {
    if (!isActiveSkill) {
      return;
    }

    const activityCode = appState.tuskpet?.currentActivity;
    const activityConfig = SKILLS_CONFIG.skills[skill][activityCode];

    return activityConfig;
  });

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
          type: itemType
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

      appState.tuskpet[`${skillType}Xp`] += xp;
      appState.tuskpet.currentActivity = null;
      appState.tuskpet.activityStart = null;

      toast.success('Activity finished');
    } else {
      toast.error('Activity failed to finish');
    }
  };

  /**
   * Modal stuff
   */
  let selectedActivity = $state(null as any);
  let quantity = $state(1);
  let showModal = $state(false);
  let hasEnoughMaterials = $state(true);

  function handleResourceClick(activity) {
    selectedActivity = activity;
    showModal = true;
    // Check if player has enough materials
    hasEnoughMaterials = checkMaterials(activity);
  }

  function checkMaterials(activity) {
    // Implement your logic to check if player has required materials
    return true; // For this example
  }

  function setMaxQuantity() {
    // Implement max quantity logic based on available materials
    quantity = 10; // Example value
  }

  const handleStartActivity = async (selectedActivity) => {
    if (appState.tuskpet.isBusy) {
      return;
    }

    const code = selectedActivity.code;
    const tuskpetId = appState.tuskpet?.id;

    const executedTx = await startActivity(code, tuskpetId);

    if (executedTx) {
      const now = Date.now();

      appState.tuskpet.currentActivity = code;
      appState.tuskpet.activityStart = now;
      showModal = false;
      toast.success('Activity started');
    } else {
      toast.error('Activity failed to start');
    }
  };
</script>

{#snippet skillActivities(skill: string)}
  {@const activitiesConfig = SKILLS_CONFIG.skills[skill]}
  {@const activities = Object.values(activitiesConfig)}

  {#each activities as activityConfig}
    {@render skillActivity(activityConfig)}
  {/each}
{/snippet}

{#snippet skillActivity(activityConfig)}
  <Card
    onclick={() => handleResourceClick(activityConfig)}
    class="bg-gray-800/50 transition-colors hover:bg-gray-800/70"
  >
    <div class="flex items-center justify-between p-4">
      <div class="flex items-center gap-4">
        <img src={activityConfig.image} alt="" class="h-12 w-12" />
        <div class="flex flex-col gap-1">
          <h3 class="font-medium text-white">{activityConfig.name}</h3>
          <div class="flex gap-2 text-sm text-gray-400">
            <span class="rounded bg-gray-700 px-2 py-0.5">
              Lv. {activityConfig.requirements.level}
            </span>
            <span class="rounded bg-gray-700 px-2 py-0.5">
              {activityConfig.baseXp} EXP
            </span>
            <span
              class="flex items-center justify-center gap-1 rounded bg-gray-700 px-2 py-0.5"
            >
              <Clock7 class="h-4 w-4" />
              {activityConfig.baseTime}s
            </span>
            <!-- {#each activityConfig.requirements as req}
              <span class="rounded bg-red-900/50 px-2 py-0.5">
                {req.amount}x {req.item}
              </span>
            {/each} -->
          </div>
        </div>
      </div>
      <Button variant="ghost" class="text-gray-400">
        <ChevronRight class="h-6 w-6" />
      </Button>
    </div>
  </Card>
{/snippet}

{#snippet currentAction()}
  {@const activityName = activeActivity?.name}
  {@const activityImage = activeActivity?.image}

  <div class="relative flex items-center">
    <div class="flex-grow border-t border-gray-700"></div>
    <span class="mx-4 flex-shrink text-xs text-gray-400">CURRENT ACTION</span>
    <div class="flex-grow border-t border-gray-700"></div>
  </div>

  <Card class="relative bg-gray-800/50 p-4">
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
          <div class="mt-2 flex items-center justify-between text-sm text-gray-400">
            <span class="rounded bg-gray-700 px-2 py-1 text-xs">+{itemCount}</span>
            {#if hasTimeRemaining}
              <span class="">Next item in {nextItemTime}</span>
            {/if}
          </div>
        </div>
      </div>
    </div>
  </Card>
{/snippet}

{#snippet skillProgress()}
  <div class="relative flex items-center">
    <div class="flex-grow border-t border-gray-700"></div>
    <span class="mx-4 flex-shrink text-xs text-gray-400">YOUR PROGRESS</span>
    <div class="flex-grow border-t border-gray-700"></div>
  </div>

  <Card class="relative bg-gray-800/50 p-4">
    <span class="absolute -top-2 right-2 z-10 rounded bg-gray-700 px-2 py-1 text-xs">
      0% Efficiency
    </span>

    <div class="flex items-center gap-3">
      <div class="relative">
        <img src={skillImage} alt="" class="h-12 w-12" />
        <span class="absolute -bottom-1 -right-1 rounded bg-gray-700 px-1.5 text-xs">
          Lv. {appState.tuskpet?.[`${skill}Lvl`]}
        </span>
      </div>
      <div class="flex-1">
        <div class="flex justify-between text-sm">
          <span class="text-white">
            {skill?.charAt(0).toUpperCase() + skill?.slice(1).toLowerCase()}
          </span>
        </div>
        <Progress value={skillNextLvlXpProgress} class="mt-1" />
        <div class="mt-2 flex items-center justify-between">
          <span class="text-xs text-gray-400">{skillNextLvlXpNeeded} EXP Needed</span>
          <span class="text-xs text-gray-400">{skillNextLvlXpProgress}%</span>
        </div>
      </div>
    </div>
  </Card>
{/snippet}

<div class="flex min-h-screen flex-col gap-4 bg-gray-900 p-4 lg:flex-row">
  <!-- Left Panel -->
  <div class="flex-1">
    <div class="space-y-2">
      {@render skillActivities(skill)}
    </div>
  </div>

  <!-- Right Panel -->
  <div class="space-y-4 lg:w-80">
    {#if isActiveSkill}
      {@render currentAction()}
    {/if}

    {@render skillProgress()}
  </div>
</div>

<!-- Modal -->
<Dialog.Root bind:open={showModal}>
  <Dialog.Content class="border-gray-700 bg-gray-800 text-white sm:max-w-[425px]">
    <Dialog.Header>
      <div class="flex flex-col items-center gap-4">
        {#if selectedActivity}
          <img src={selectedActivity.image} alt="" class="h-24 w-24" />
          <Dialog.Title class="text-xl font-medium">
            {selectedActivity.name}
          </Dialog.Title>

          <div class="flex gap-2">
            <span class="rounded bg-gray-700 px-3 py-1">
              Lv. {selectedActivity.requirements.level}
            </span>
            <span class="rounded bg-gray-700 px-3 py-1">
              {selectedActivity.baseTime} seconds
            </span>
            <span class="rounded bg-indigo-900/50 px-3 py-1">+1 Speed EXP</span>
          </div>
          <span class="rounded bg-indigo-900/50 px-3 py-1">
            +{selectedActivity.baseXp} Smelting EXP
          </span>
        {/if}
      </div>
    </Dialog.Header>

    <div class="space-y-6 pt-4">
      <div>
        <h3 class="mb-3 text-gray-400">REQUIREMENTS</h3>
        <div class="flex gap-2">
          {#if selectedActivity?.requirements}
            {#each selectedActivity.requirements as req}
              <div class="relative">
                <img
                  src={`/${req.item.toLowerCase()}.png`}
                  alt=""
                  class="h-16 w-16 rounded bg-gray-700 p-2"
                />
                <span
                  class="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-900 text-sm text-white"
                >
                  {req.amount}
                </span>
              </div>
            {/each}
          {/if}
        </div>
      </div>

      <div>
        <h3 class="mb-3 text-gray-400">QUANTITY</h3>

        {#if !hasEnoughMaterials}
          <Alert.Root
            variant="destructive"
            class="mb-3 border-red-900 bg-red-900/50 text-white"
          >
            <Alert.Description class="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                viewBox="0 0 24 24"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Not enough materials
            </Alert.Description>
          </Alert.Root>
        {/if}

        <div class="flex gap-2">
          <div class="flex-1">
            <Input
              type="number"
              bind:value={quantity}
              class="border-gray-700 bg-gray-900 text-white"
              min="1"
            />
          </div>
          <Button
            variant="secondary"
            class="bg-gray-700 hover:bg-gray-600"
            onclick={setMaxQuantity}
          >
            Max
          </Button>
          <Button
            variant="secondary"
            class="bg-gray-700 hover:bg-gray-600"
            onclick={() => quantity > 1 && quantity--}
          >
            -
          </Button>
          <Button
            variant="secondary"
            class="bg-gray-700 hover:bg-gray-600"
            onclick={() => quantity++}
          >
            +
          </Button>
        </div>
      </div>

      <div class="flex gap-2 pt-2">
        <Button
          onclick={() => handleStartActivity(selectedActivity)}
          variant="default"
          class="flex-1 bg-indigo-600 hover:bg-indigo-700"
          disabled={!hasEnoughMaterials}
        >
          Start
        </Button>
      </div>
    </div>
  </Dialog.Content>
</Dialog.Root>
