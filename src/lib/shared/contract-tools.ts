import { testnetWalletAdapter } from '@builders-of-stuff/svelte-sui-wallet-adapter';
import { Transaction } from '@mysten/sui/transactions';

import { PACKAGE_ID } from '$lib/shared/shared.constant';

const walletAdapter = testnetWalletAdapter;

/**
 * Mint walrus
 */
export const mintWalrus = async () => {
  if (!walletAdapter?.currentAccount?.address) {
    return;
  }

  const tx = new Transaction();

  const [walrus] = tx.moveCall({
    target: `${PACKAGE_ID}::walrus::mint`,
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
export const startActivity = async (code: number, walrusObjectId: string) => {
  const tx = new Transaction();

  tx.moveCall({
    target: `${PACKAGE_ID}::walrus::start_activity`,
    arguments: [
      tx.pure.u64(code),
      tx.object(`${walrusObjectId}`),
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
 * Finish activity
 */
export const finishActivity = async (walrusObjectId: string) => {
  if (!walletAdapter?.currentAccount?.address) {
    return;
  }

  const tx = new Transaction();

  const [item] = tx.moveCall({
    target: `${PACKAGE_ID}::walrus::finish_activity`,
    arguments: [
      tx.object(`${walrusObjectId}`),
      // clock object
      tx.object('0x6')
    ]
  });

  tx.transferObjects([item], walletAdapter?.currentAccount?.address);

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
export const dropWalrus = async (walrusObjectId: string) => {
  const tx = new Transaction();

  tx.moveCall({
    target: `${PACKAGE_ID}::walrus::drop_walrus`,
    arguments: [tx.object(`${walrusObjectId}`)]
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
//     target: `${getObjectId('WALRUS_GAME_PACKAGE')}::walrus::claim_fish`,
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
//     target: `${getObjectId('WALRUS_GAME_PACKAGE')}::walrus::claim_fish`,
//     arguments: [tx.object(`${walrusObjectId}`), tx.pure.u64(walrusRawFishCount)]
//   });

//   tx.moveCall({
//     target: `${getObjectId('WALRUS_GAME_PACKAGE')}::walrus::claim_penguin_fish`,
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
//     target: `${getObjectId('WALRUS_GAME_PACKAGE')}::walrus::reset_walrus`,
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
//     target: `${getObjectId('WALRUS_GAME_PACKAGE')}::walrus::buy_penguins`,
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
