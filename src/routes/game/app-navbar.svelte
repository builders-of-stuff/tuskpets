<script lang="ts">
  import {
    ConnectButton,
    testnetWalletAdapter as walletAdapter
  } from '@builders-of-stuff/svelte-sui-wallet-adapter';
  import CaretDown from 'phosphor-svelte/lib/CaretDown';
  import { NavigationMenu } from 'bits-ui';
  import { untrack } from 'svelte';

  import { cn } from '$lib/utils';
  import { Progress } from '$lib/components/ui/progress/index';

  type ListItemProps = {
    className?: string;
    title: string;
    href: string;
    content: string;
  };

  let loading = true;
  let progress = $state(0);
  const maxProgress = 10; // Seconds to reset

  const progressWidth = $derived(`${(progress / maxProgress) * 100}%`);

  $effect(() => {
    untrack(() => {
      const interval = setInterval(() => {
        if (progress >= maxProgress) {
          progress = 0; // Instant reset
        } else {
          progress += 1;
        }
      }, 1000);

      return () => clearInterval(interval);
    });
  });
</script>

{#snippet ListItem({ className, title, content, href }: ListItemProps)}
  <li>
    <NavigationMenu.Link
      class={cn(
        'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-muted hover:text-accent-foreground focus:bg-muted focus:text-accent-foreground',
        className
      )}
      {href}
    >
      <div class="text-sm font-medium leading-none">{title}</div>
      <p class="line-clamp-2 text-sm leading-snug text-muted-foreground">
        {content}
      </p>
    </NavigationMenu.Link>
  </li>
{/snippet}

<NavigationMenu.Root
  class="relative z-10 flex max-w-max flex-1 items-center justify-center"
>
  <NavigationMenu.List
    class="group flex flex-1 list-none items-center justify-center  space-x-3"
  >
    <NavigationMenu.Item>
      <!-- Progress bar -->
      <div class="relative transition-transform duration-200 hover:scale-[1.02]">
        <!-- Quantity badge -->
        <div
          class="absolute -right-2 -top-2 z-10 animate-pulse rounded-full bg-gray-700 px-2 py-1 text-xs font-bold text-white"
        >
          13
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
              <img src="/steel-bar-icon.png" alt="Steel Bar" class="h-6 w-6" />
            </div>

            <span class="font-medium text-white">Steel Bar</span>

            {#if loading}
              <div
                class="h-3 w-3 animate-spin rounded-full border-2 border-gray-500 border-t-white"
              ></div>
            {/if}
          </div>
        </div>
      </div>
    </NavigationMenu.Item>

    <NavigationMenu.Item>
      <ConnectButton {walletAdapter} />
    </NavigationMenu.Item>

    <NavigationMenu.Indicator
      class="top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in"
    >
      <div
        class="relative top-[60%] size-2 rotate-45 rounded-tl-sm bg-border shadow-md"
      ></div>
    </NavigationMenu.Indicator>
  </NavigationMenu.List>
  <div class="absolute left-0 top-full flex justify-center">
    <NavigationMenu.Viewport
      class="origin-top-center relative mt-1.5 h-[var(--bits-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border bg-background text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 md:w-[var(--bits-navigation-menu-viewport-width)]"
    />
  </div>
</NavigationMenu.Root>
