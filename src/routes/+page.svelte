<script>
  // import { Dialog } from '@headlessui/svelte';
  // import { Bars3Icon, XMarkIcon } from '@heroicons/svelte/24/outline';

  import '../app.css';

  const navigation = [
    { name: 'Product', href: '#' },
    { name: 'Features', href: '#' },
    { name: 'Marketplace', href: '#' },
    { name: 'Company', href: '#' }
  ];

  let mobileMenuOpen = false;
</script>

<div class="bg-gray-900">
  <header class="absolute inset-x-0 top-0 z-50">
    <nav aria-label="Global" class="flex items-center justify-between p-6 lg:px-8">
      <div class="flex lg:flex-1">
        <a href="#" class="-m-1.5 p-1.5">
          <span class="sr-only">Your Company</span>
          <img
            alt=""
            src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500"
            class="h-8 w-auto"
          />
        </a>
      </div>
      <div class="flex lg:hidden">
        <button
          type="button"
          on:click={() => (mobileMenuOpen = true)}
          class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400"
        >
          <span class="sr-only">Open main menu</span>
          <!-- <Bars3Icon aria-hidden="true" class="h-6 w-6" /> -->
          <div>bars3Icon</div>
        </button>
      </div>
      <div class="hidden lg:flex lg:gap-x-12">
        {#each navigation as item}
          <a href={item.href} class="text-sm/6 font-semibold text-white">
            {item.name}
          </a>
        {/each}
      </div>
      <div class="hidden lg:flex lg:flex-1 lg:justify-end">
        <a href="#" class="text-sm/6 font-semibold text-white">
          Log in <span aria-hidden="true">&rarr;</span>
        </a>
      </div>
    </nav>

    <div class="lg:hidden">Hamburger box</div>
  </header>

  <div class="relative isolate pt-14">
    <div
      aria-hidden="true"
      class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
    >
      <div
        style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
        class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
      />
    </div>
    <div class="py-24 sm:py-32 lg:pb-40">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto max-w-2xl text-center">
          <h1
            class="text-balance text-5xl font-semibold tracking-tight text-white sm:text-7xl"
          >
            Data to enrich your online business
          </h1>
          <p class="mt-8 text-pretty text-lg font-medium text-gray-400 sm:text-xl/8">
            Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem
            cupidatat commodo. Elit sunt amet fugiat veniam occaecat.
          </p>
          <div class="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="#"
              class="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
            >
              Get started
            </a>
            <a href="#" class="text-sm/6 font-semibold text-white">
              Learn more <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
        <img
          alt="App screenshot"
          src="https://tailwindui.com/plus/img/component-images/dark-project-app-screenshot.png"
          width={2432}
          height={1442}
          class="mt-16 rounded-md bg-white/5 shadow-2xl ring-1 ring-white/10 sm:mt-24"
        />
      </div>
    </div>
    <div
      aria-hidden="true"
      class="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
    >
      <div
        style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
        class="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
      />
    </div>
  </div>
</div>
