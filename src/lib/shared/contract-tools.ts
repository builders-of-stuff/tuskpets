import { testnetWalletAdapter } from '@builders-of-stuff/svelte-sui-wallet-adapter';
import { Transaction } from '@mysten/sui/transactions';

import { PACKAGE_ID } from '$lib/shared/shared.constant';
import { appState } from './state.svelte';
import { ITEM_TYPE } from './shared.type';

const walletAdapter = testnetWalletAdapter;

/**
 * Mint tuskpet
 */
export const mintTuskpet = async () => {
  if (!walletAdapter?.currentAccount?.address) {
    return;
  }

  const tx = new Transaction();

  const [walrus] = tx.moveCall({
    target: `${PACKAGE_ID}::tuskpet::mint`,
    arguments: []
  });

  tx.transferObjects([walrus], walletAdapter?.currentAccount?.address);

  try {
    const { bytes, signature } = await walletAdapter.signTransaction(tx as any, {});

    const executedTx = await walletAdapter.executeTransaction({
      bytes,
      signature
    });

    return executedTx;
  } catch (e) {
    console.log(e);
  }
};

/**
 * Start activity
 */
export const startActivity = async (code: number, tuskpetObjectId: string) => {
  const tx = new Transaction();

  tx.moveCall({
    target: `${PACKAGE_ID}::tuskpet::start_activity`,
    arguments: [
      tx.pure.u64(code),
      tx.object(`${tuskpetObjectId}`),
      // clock object
      tx.object('0x6')
    ]
  });

  try {
    const { bytes, signature } = await walletAdapter.signTransaction(tx as any, {});

    const executedTx = await walletAdapter.suiClient.executeTransactionBlock({
      transactionBlock: bytes,
      signature: signature,
      options: {
        showEffects: true,
        showEvents: true,
        showObjectChanges: true,
        showInput: true,
        showRawInput: true
      }
    });

    console.log('executedTx: ', executedTx);
    return executedTx;
  } catch (e) {
    console.log(e);
  }
};

/**
 * @TODO need to add crafting restrictions on time, both frontend and smart contract
 */
export const startCraftingActivity = async (
  code: number,
  quantity: number,
  tuskpetObjectId: string
) => {
  const tx = new Transaction();

  let target;
  if (code === 301) {
    target = 'consume_snowman_reqs';
  }
  if (code === 302) {
    target = 'consume_ice_helmet_reqs';
  }
  if (code === 303) {
    target = 'consume_tusk_blades_reqs';
  }

  tx.moveCall({
    target: `${PACKAGE_ID}::tuskpet::${target}`,
    arguments: [tx.pure.u64(quantity), tx.object(`${tuskpetObjectId}`)]
  });

  tx.moveCall({
    target: `${PACKAGE_ID}::tuskpet::start_activity`,
    arguments: [
      tx.pure.u64(code),
      tx.object(`${tuskpetObjectId}`),
      // clock object
      tx.object('0x6')
    ]
  });

  try {
    const { bytes, signature } = await walletAdapter.signTransaction(tx as any, {});

    const executedTx = await walletAdapter.suiClient.executeTransactionBlock({
      transactionBlock: bytes,
      signature: signature,
      options: {
        showEffects: true,
        showEvents: true,
        showObjectChanges: true,
        showInput: true,
        showRawInput: true
      }
    });

    if (code === 301) {
      appState.tuskpet.inventory = appState.tuskpet.inventory?.map((item) => {
        if (item.type === ITEM_TYPE.COMPACT_SNOW) {
          let reqQuantity = quantity * 5;

          item.quantity -= reqQuantity;
        }

        return item;
      });
    }

    if (code === 302) {
      appState.tuskpet.inventory = appState.tuskpet.inventory?.map((item) => {
        if (item.type === ITEM_TYPE.ICE) {
          let reqQuantity = quantity * 5;

          item.quantity -= reqQuantity;
        }

        return item;
      });
    }

    if (code === 303) {
      appState.tuskpet.inventory = appState.tuskpet.inventory?.map((item) => {
        if (item.type === ITEM_TYPE.BLUE_ICE) {
          let reqQuantity = quantity * 10;

          item.quantity -= reqQuantity;
        }

        return item;
      });
    }

    console.log('executedTx: ', executedTx);
    return executedTx;
  } catch (e) {
    console.log(e);
  }
};

/**
 * Finish activity
 */
export const finishActivity = async (tuskpetObjectId: string) => {
  if (!walletAdapter?.currentAccount?.address) {
    return;
  }

  const tx = new Transaction();

  tx.moveCall({
    target: `${PACKAGE_ID}::tuskpet::finish_activity`,
    arguments: [
      tx.object(`${tuskpetObjectId}`),
      // clock object
      tx.object('0x6')
    ]
  });

  try {
    const { bytes, signature } = await walletAdapter.signTransaction(tx as any, {});

    const executedTx = await walletAdapter.suiClient.executeTransactionBlock({
      transactionBlock: bytes,
      signature: signature,
      options: {
        showEffects: true,
        showEvents: true,
        showObjectChanges: true,
        showInput: true,
        showRawInput: true
      }
    });

    console.log('executedTx: ', executedTx);
    return executedTx;
  } catch (e) {
    console.log(e);
  }
};

/**
 * Burn walrus
 */
export const dropTuskpet = async (tuskpetObjectId: string) => {
  const tx = new Transaction();

  tx.moveCall({
    target: `${PACKAGE_ID}::tuskpet::drop_tuskpet`,
    arguments: [tx.object(`${tuskpetObjectId}`)]
  });

  try {
    const { bytes, signature } = await walletAdapter.signTransaction(tx as any, {});

    const executedTx = await walletAdapter.suiClient.executeTransactionBlock({
      transactionBlock: bytes,
      signature: signature,
      options: {
        showEffects: true,
        showEvents: true,
        showObjectChanges: true,
        showInput: true,
        showRawInput: true
      }
    });

    console.log('executedTx: ', executedTx);
    return executedTx;
  } catch (e) {
    console.log(e);
  }
};

// export const claimWalrusFish = async (walrusObjectId: string, cb: any) => {
//   const rawFishCount = Number(localStorage.getItem('fishCount')) || 0;
//   const tx = new Transaction();

//   tx.moveCall({
//     target: `${getObjectId('WALRUS_GAME_PACKAGE')}::tuskpet::claim_fish`,
//     arguments: [tx.object(`${walrusObjectId}`), tx.pure.u64(rawFishCount)]
//   });

//   try {
//     const { bytes, signature } = await walletAdapter.signTransaction(tx as any, {});

//     const executedTx = await walletAdapter.suiClient.executeTransactionBlock({
//       transactionBlock: bytes,
//       signature: signature,
//       options: {
//         showEffects: true,
//         showEvents: true,
//         showObjectChanges: true,
//         showInput: true,
//         showRawInput: true
//       }
//     });

//     cb();

//     console.log('executedTx: ', executedTx);
//     return executedTx;
//   } catch (e) {
//     console.log(e);
//   }
// };

// export const claimAllFish = async (
//   walrusObjectId: string,
//   walrusRawFishCount: number,
//   now: number,
//   fishLastClaimedAt: number,
//   cb: any
// ) => {
//   const tx = new Transaction();

//   tx.moveCall({
//     target: `${getObjectId('WALRUS_GAME_PACKAGE')}::tuskpet::claim_fish`,
//     arguments: [tx.object(`${walrusObjectId}`), tx.pure.u64(walrusRawFishCount)]
//   });

//   tx.moveCall({
//     target: `${getObjectId('WALRUS_GAME_PACKAGE')}::tuskpet::claim_penguin_fish`,
//     arguments: [
//       tx.object(`${walrusObjectId}`),
//       tx.pure.u64(now),
//       tx.pure.u64(fishLastClaimedAt)
//     ]
//   });

//   try {
//     const { bytes, signature } = await walletAdapter.signTransaction(tx as any, {});

//     const executedTx = await walletAdapter.suiClient.executeTransactionBlock({
//       transactionBlock: bytes,
//       signature: signature,
//       options: {
//         showEffects: true,
//         showEvents: true,
//         showObjectChanges: true,
//         showInput: true,
//         showRawInput: true
//       }
//     });

//     cb();

//     console.log('executedTx: ', executedTx);
//     return { executedTx, fishLastClaimedAt: now };
//   } catch (e) {
//     console.log(e);
//   }
// };

// export const resetWalrus = async (walrusObjectId: string) => {
//   const tx = new Transaction();

//   tx.moveCall({
//     target: `${getObjectId('WALRUS_GAME_PACKAGE')}::tuskpet::reset_walrus`,
//     arguments: [tx.object(`${walrusObjectId}`)]
//   });

//   try {
//     const { bytes, signature } = await walletAdapter.signTransaction(tx as any, {});

//     const executedTx = await walletAdapter.suiClient.executeTransactionBlock({
//       transactionBlock: bytes,
//       signature: signature,
//       options: {
//         showEffects: true,
//         showEvents: true,
//         showObjectChanges: true,
//         showInput: true,
//         showRawInput: true
//       }
//     });

//     console.log('executedTx: ', executedTx);
//     return executedTx;
//   } catch (e) {
//     console.log(e);
//   }
// };

// export const buyPenguins = async (
//   walrusObjectId: string,
//   penguinQuantity: number,
//   cb: any
// ) => {
//   const tx = new Transaction();

//   tx.moveCall({
//     target: `${getObjectId('WALRUS_GAME_PACKAGE')}::tuskpet::buy_penguins`,
//     arguments: [tx.object(`${walrusObjectId}`), tx.pure.u64(penguinQuantity)]
//   });

//   try {
//     const { bytes, signature } = await walletAdapter.signTransaction(tx as any, {});

//     const executedTx = await walletAdapter.suiClient.executeTransactionBlock({
//       transactionBlock: bytes,
//       signature,
//       options: {
//         showEffects: true,
//         showEvents: true,
//         showObjectChanges: true,
//         showInput: true,
//         showRawInput: true
//       }
//     });

//     cb();

//     console.log('executedTx: ', executedTx);
//     return executedTx;
//   } catch (e) {
//     console.log(e);
//   }
// };
