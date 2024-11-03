<script lang="ts">
  import { Fish, Pickaxe, Briefcase, UserRound, Hammer } from 'lucide-svelte';

  import TuskPet258 from '$lib/assets/tuskpets-258px.png';
  import * as Sidebar from '$lib/components/ui/sidebar';

  // Menu items.
  const items = [
    {
      title: 'Tuskpet',
      url: '/game',
      icon: UserRound
    },
    {
      title: 'Inventory',
      url: '/game/inventory',
      icon: Briefcase
    }
  ];

  const skills = [
    {
      title: 'Diving',
      url: '/game/diving',
      icon: Fish
    },
    {
      title: 'Mining',
      url: '/game/mining',
      icon: Pickaxe
    },
    {
      title: 'Crafting',
      url: '/game/crafting',
      icon: Hammer
    }
  ];
</script>

<Sidebar.Root>
  <Sidebar.Header class="flex items-center justify-center bg-muted pt-4">
    <a href="/game">
      <img src={TuskPet258} class="h-32 w-32 rounded-full" alt="TuskPet" />
    </a>
  </Sidebar.Header>
  <Sidebar.Content class="bg-muted">
    <Sidebar.Group>
      <Sidebar.GroupContent>
        <Sidebar.Menu>
          {#each items as item (item.title)}
            <Sidebar.MenuItem>
              <Sidebar.MenuButton>
                {#snippet child({ props })}
                  <a href={item.url} {...props}>
                    <item.icon />
                    <span>{item.title}</span>
                  </a>
                {/snippet}
              </Sidebar.MenuButton>
            </Sidebar.MenuItem>
          {/each}
        </Sidebar.Menu>
      </Sidebar.GroupContent>

      <Sidebar.GroupLabel>Skills</Sidebar.GroupLabel>
      <Sidebar.GroupContent>
        <Sidebar.Menu>
          {#each skills as skill (skill.title)}
            <Sidebar.MenuItem>
              <Sidebar.MenuButton>
                {#snippet child({ props })}
                  <a href={skill.url} {...props}>
                    <skill.icon />
                    <span>{skill.title}</span>
                  </a>
                {/snippet}
              </Sidebar.MenuButton>
            </Sidebar.MenuItem>
          {/each}
        </Sidebar.Menu>
      </Sidebar.GroupContent>
    </Sidebar.Group>
  </Sidebar.Content>
</Sidebar.Root>
