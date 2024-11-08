<script lang="ts">
  import {
    ConnectButton,
    testnetWalletAdapter as walletAdapter
  } from '@builders-of-stuff/svelte-sui-wallet-adapter';
  import { NavigationMenu } from 'bits-ui';

  import { appState } from '$lib/shared/state.svelte';
  import { SKILLS_CONFIG } from '$lib/shared/skill.constant';
  import { goto } from '$app/navigation';

  const activeActivity = $derived.by(() => {
    const activityCode = appState.tuskpet?.currentActivity;

    const skill = Object.keys(SKILLS_CONFIG.skills).find((skillKey) => {
      const skillConfig = SKILLS_CONFIG.skills[skillKey];
      const skillContainsActivityCode = Object.keys(skillConfig).includes(
        String(activityCode)
      );

      return skillContainsActivityCode;
    }) as any;

    const activityConfig = SKILLS_CONFIG.skills[skill]?.[activityCode];

    return activityConfig;
  });

  const activeSkillName = $derived.by(() => {
    const activityCode = appState.tuskpet?.currentActivity;
    const skill = Object.keys(SKILLS_CONFIG.skills).find((skillKey) => {
      const skillConfig = SKILLS_CONFIG.skills[skillKey];
      const skillContainsActivityCode = Object.keys(skillConfig).includes(
        String(activityCode)
      );

      return skillContainsActivityCode;
    }) as any;

    return skill;
  });

  const activityName = $derived(activeActivity?.name);
  const activityImage = $derived(activeActivity?.image);
  const activityLink = $derived(`/game/${activeSkillName}`);

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
  const progressWidth = $derived.by(() => {
    return hasTimeRemaining ? `${(progress / maxProgress) * 100}%` : '100%';
  });
</script>

<NavigationMenu.Root
  class="relative z-10 flex max-w-max flex-1 items-center justify-center"
>
  <NavigationMenu.List
    class="group flex flex-1 list-none items-center justify-center  space-x-3"
  >
    {#if appState.tuskpet.isBusy && itemCount >= 0}
      <NavigationMenu.Item onclick={() => goto(activityLink)} class="cursor-pointer">
        <!-- Progress bar -->
        <div class="relative transition-transform duration-200 hover:scale-[1.02]">
          <!-- Quantity badge -->
          <div
            class="absolute -right-2 -top-2 z-10 animate-pulse rounded-full bg-gray-700 px-2 py-1 text-xs font-bold text-white"
          >
            {itemCount}
          </div>

          <div class="relative overflow-hidden rounded-lg bg-gray-800">
            <!-- Progress Background -->
            <div
              class="absolute inset-0 bg-green-700"
              style:width={progressWidth}
              style:transition={'width 1000ms linear'}
            ></div>

            <!-- Content -->
            <div class="relative flex items-center gap-2 p-2">
              <div
                class="flex h-8 w-8 items-center justify-center rounded-lg bg-green-700"
              >
                <img src={activityImage} alt="Steel Bar" class="h-6 w-6" />
              </div>

              <span class="font-medium text-white">{activityName}</span>

              {#if hasTimeRemaining}
                <div
                  class="h-3 w-3 animate-spin rounded-full border-2 border-gray-500 border-t-white"
                ></div>
              {/if}
            </div>
          </div>
        </div>
      </NavigationMenu.Item>
    {/if}

    <NavigationMenu.Item>
      <ConnectButton {walletAdapter} />
    </NavigationMenu.Item>
  </NavigationMenu.List>
</NavigationMenu.Root>
