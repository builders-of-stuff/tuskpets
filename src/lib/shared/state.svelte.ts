export class Tuskpet {
  id = $state('');
  b36Address = $state('');
  stats = $state({});
  skills = $state({});
  currentActivity = $state();
  activityStart = $state();
  inventory = $state({});

  constructor(tuskpet) {
    this.id = tuskpet.id;
    this.b36Address = tuskpet.b36Address;
    this.stats = tuskpet.stats;
    this.skills = tuskpet.skills;
    this.currentActivity = tuskpet.currentActivity;
    this.activityStart = tuskpet.activityStart;
    this.inventory = tuskpet.inventory;
  }
}

export const appState = $state({
  tuskpet: new Tuskpet({})
});
