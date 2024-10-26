<script lang="ts">
  import {
    ConnectButton,
    testnetWalletAdapter
  } from '@builders-of-stuff/svelte-sui-wallet-adapter';

  let what = $state(0);
</script>

<ConnectButton walletAdapter={testnetWalletAdapter} />
