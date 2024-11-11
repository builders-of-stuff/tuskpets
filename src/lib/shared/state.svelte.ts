import { xpToLevel } from './shared-tools';
import { ACTIVITY_CONFIG } from './shared.constant';

export class Tuskpet {
  id = $state('');
  b36Address = $state('');
  stats = $state({}) as any;
  skills = $state({}) as any;
  currentActivity = $state() as any;
  activityStart = $state() as any;
  inventory = $state([]);

  currentDate = $state(Date.now());

  divingLvl = $derived(xpToLevel(this.skills?.divingXp));
  miningLvl = $derived(xpToLevel(this.skills?.miningXp));
  craftingLvl = $derived(xpToLevel(this.skills?.craftingXp));

  currentActivityBaseTime = $derived.by(() => {
    if (!this.currentActivity) return null;

    return ACTIVITY_CONFIG[this.currentActivity]?.baseTime;
  });
  currentActivityBaseXp = $derived.by(() => {
    if (!this.currentActivity) return null;

    return ACTIVITY_CONFIG[this.currentActivity]?.baseXp;
  });

  /**
   * Activity duration
   */
  isBusy = $derived(!!this.currentActivity || !!this.activityStart);
  // How long the current activity has been running (ms)
  activityDurationMs = $derived.by(() => {
    if (!this.activityStart) return null;

    /**
     * const date1 = 1730916936413;
     * const date2 = 1730916350213;
     */
    const msDifference = this.currentDate - this.activityStart;

    return msDifference;
  });

  // How long the current activity has been running (seconds)
  activityDurationSeconds = $derived.by(() => {
    if (!this.activityDurationMs) return null;

    const difference = this.activityDurationMs;

    const differenceInSeconds = difference / 1000;
    return differenceInSeconds;
  });

  // How long the current activity has been running (formatted 00:00:00)
  activityDurationFormatted = $derived.by(() => {
    if (!this.activityDurationMs) return null;

    const difference = this.activityDurationMs;

    const differenceInSeconds = difference / 1000;
    const differenceInMinutes = difference / (1000 * 60);
    const differenceInHours = difference / (1000 * 60 * 60);
    // const differenceInDays = difference / (1000 * 60 * 60 * 24);

    const hours = Math.floor(differenceInHours);
    const minutes = Math.floor(differenceInMinutes % 60);
    const seconds = Math.floor(differenceInSeconds % 60);

    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`
      .replace(/^00:00:/, '00:')
      .replace(/^00:/, '');
  });

  /**
   * Constructor
   */
  constructor(tuskpet) {
    this.id = tuskpet.id;
    this.b36Address = tuskpet.b36Address;
    this.stats = tuskpet.stats;
    this.skills = tuskpet.skills;
    this.currentActivity = tuskpet.currentActivity;
    this.activityStart = tuskpet.activityStart;
    this.inventory = tuskpet.inventory;

    $effect.root(() => {
      $effect(() => {
        const interval = setInterval(() => {
          this.currentDate = Date.now();
        }, 1000);

        return () => clearInterval(interval);
      });
    });
  }
}

class AppState {
  tuskpet = $state({} as any);
  hasTuskpet = $derived(!!this.tuskpet?.id);

  constructor() {
    this.tuskpet = new Tuskpet({});
  }
}

export const appState = new AppState();
