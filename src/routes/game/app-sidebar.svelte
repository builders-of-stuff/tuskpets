<script lang="ts">
  import { Fish, Pickaxe, Briefcase, UserRound, Hammer } from 'lucide-svelte';

  import TuskPet258 from '$lib/assets/tuskpets-258px.png';
  import * as Sidebar from '$lib/components/ui/sidebar';

  // Menu items.
  const items = [
    {
      title: 'Tuskpet',
      url: '#',
      icon: UserRound
    },
    {
      title: 'Inventory',
      url: '#',
      icon: Briefcase
    }
  ];

  const skills = [
    {
      title: 'Diving',
      url: '#',
      icon: Fish
    },
    {
      title: 'Mining',
      url: '#',
      icon: Pickaxe
    },
    {
      title: 'Crafting',
      url: '#',
      icon: Hammer
    }
  ];
</script>

<Sidebar.Root>
  <Sidebar.Header class="mt-4 flex items-center justify-center">
    <img src={TuskPet258} class="h-32 w-32 rounded-full" alt="TuskPet" />
  </Sidebar.Header>
  <Sidebar.Content>
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
