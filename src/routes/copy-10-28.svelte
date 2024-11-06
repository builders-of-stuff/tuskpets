<script lang="ts">
  import {
    ConnectButton,
    testnetWalletAdapter as walletAdapter
  } from '@builders-of-stuff/svelte-sui-wallet-adapter';

  import { Button } from '$lib/components/ui/button';

  import {
    dropTuskpet,
    finishActivity,
    mintTuskpet,
    startActivity
  } from '$lib/shared/contract-tools';
  import { DIVING_SOFT_SHELL_CLAM, PACKAGE_ID } from '$lib/shared/shared.constant';

  let walrus = $state() as any;
  // const walrusId = $derived(walrus?.id?.id);
  const walrusId = '0xbd7723fcc0e1f3461c9660877ba615bc1603db0f30fbdea40464d50498796426';

  $inspect(walrusId);

  /**
   * Mint walrus
   */
  const handlemintTuskpet = async () => {
    const mintResponse = (await mintTuskpet()) as any;

    const walrusId = mintResponse?.objectChanges?.find?.((obj) => {
      return obj?.objectType === `${PACKAGE_ID}::walrus::Walrus`;
    })?.objectId;

    // wait 2 seconds b/c notFound error (syncing?)
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Works but incredibly slow, even more than the manual setTimeout
    // await walletAdapter?.suiClient.waitForTransaction({ digest: mintResponse.digest });

    const walrusObject = (await walletAdapter.suiClient.getObject({
      id: walrusId,
      options: {
        showContent: true,
        showDisplay: true,
        showOwner: true,
        showType: true,
        showStorageRebate: true
      }
    })) as any;

    walrus = walrusObject?.data?.content?.fields;

    console.log('walrus: ', walrus);
  };

  /**
   * Start activity
   */
  const handleStartActivity = async (code: number, walrusId: string) => {
    const startActivityResponse = await startActivity(code, walrusId);

    console.log('startActivityResponse: ', startActivityResponse);
  };

  /**
   * Finish activity
   */
  const handleFinishActivity = async (walrusObjectId: string) => {
    const finishActivityResponse = await finishActivity(walrusObjectId);

    console.log('finishActivityResponse: ', finishActivityResponse);
  };

  /**
   * Drop walrus
   */
  const handledropTuskpet = async (id) => {
    const dropResponse = await dropTuskpet(id);

    console.log('dropResponse: ', dropResponse);
  };
</script>

<ConnectButton {walletAdapter} />

<Button onclick={handlemintTuskpet} variant="outline">Mint walrus</Button>
<Button onclick={() => handledropTuskpet(walrusId)} variant="outline">
  Drop walrus
</Button>
<Button
  onclick={() => handleStartActivity(DIVING_SOFT_SHELL_CLAM, walrusId)}
  variant="outline"
>
  Dive (Soft shell clam)
</Button>
<Button onclick={() => handleFinishActivity(walrusId)} variant="outline">
  Finish activity
</Button>
