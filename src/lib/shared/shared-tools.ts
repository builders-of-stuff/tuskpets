import {
  isValidSuiObjectId,
  isValidSuiAddress,
  fromB64,
  fromHEX,
  toHEX
} from '@mysten/sui/utils';
import baseX from 'base-x';

import {
  LEVEL_2_XP,
  LEVEL_3_XP,
  LEVEL_4_XP,
  LEVEL_5_XP,
  LEVEL_6_XP,
  LEVEL_7_XP,
  LEVEL_8_XP,
  LEVEL_9_XP,
  LEVEL_10_XP,
  LEVEL_11_XP,
  LEVEL_12_XP,
  LEVEL_13_XP,
  LEVEL_14_XP,
  LEVEL_15_XP,
  LEVEL_16_XP,
  LEVEL_17_XP,
  LEVEL_18_XP,
  LEVEL_19_XP,
  LEVEL_20_XP,
  LEVEL_21_XP,
  LEVEL_22_XP,
  LEVEL_23_XP,
  LEVEL_24_XP,
  LEVEL_25_XP,
  LEVEL_26_XP,
  LEVEL_27_XP,
  LEVEL_28_XP,
  LEVEL_29_XP,
  LEVEL_30_XP,
  LEVEL_31_XP,
  LEVEL_32_XP,
  LEVEL_33_XP,
  LEVEL_34_XP,
  LEVEL_35_XP,
  LEVEL_36_XP,
  LEVEL_37_XP,
  LEVEL_38_XP,
  LEVEL_39_XP,
  LEVEL_40_XP,
  LEVEL_41_XP,
  LEVEL_42_XP,
  LEVEL_43_XP,
  LEVEL_44_XP,
  LEVEL_45_XP,
  LEVEL_46_XP,
  LEVEL_47_XP,
  LEVEL_48_XP,
  LEVEL_49_XP,
  LEVEL_50_XP
} from './shared.constant';

const BASE36 = '0123456789abcdefghijklmnopqrstuvwxyz';
const b36 = baseX(BASE36);

export const toReadableObjectId = (objectId: string) => {
  // e.g. "0x3ac65090c7fd9582ac9c06ab28fb45a22f0fc87c3d31f159920c3506041b7f9a"
  // to "0x3ac6...7f9a"

  const prefix = objectId?.slice?.(0, 5);
  const postfix = objectId?.slice?.(-4);

  return `${prefix}...${postfix}`;
};

export const toBlockExplorer = (objectId: string) => {
  // e.g. "0x3ac65090c7fd9582ac9c06ab28fb45a22f0fc87c3d31f159920c3506041b7f9a"

  return `https://suiscan.xyz/testnet/object/${objectId}`;
};

export const camelCaseKeys = (object) => {
  return Object.fromEntries(
    Object.entries(object).map(([key, value]) => [
      key.replace(/_([a-z])/g, (_, char) => char.toUpperCase()),
      value
    ])
  );
};

export function getSubdomain(hostname: string) {
  const parts = hostname.split('.');

  if (parts.length > 2) {
    return parts[0];
  }

  return null;
}

export function subdomainToObjectId(subdomain: string): string | null {
  if (!subdomain) {
    return null;
  }

  const objectId = '0x' + toHEX(b36.decode(subdomain?.toLowerCase()));
  console.log(
    'obtained object id: ',
    objectId,
    isValidSuiObjectId(objectId),
    isValidSuiAddress(objectId)
  );
  return isValidSuiObjectId(objectId) ? objectId : null;
}

export function walrusLink(id: string): string {
  return 'https://' + b36.encode(fromHEX(id.substring(2))) + '.walrus.site';
}

export const formatSeconds = (seconds: number) => {
  const differenceInMinutes = seconds / 60;
  const differenceInHours = seconds / (60 * 60);

  const hours = Math.floor(differenceInHours);
  const minutes = Math.floor(differenceInMinutes % 60);
  const _seconds = Math.floor(seconds % 60);

  const formattedHours = hours.toString().padStart(2, '0');
  const formattedMinutes = minutes.toString().padStart(2, '0');
  const formattedSeconds = _seconds.toString().padStart(2, '0');

  return seconds > 0
    ? `${formattedHours}:${formattedMinutes}:${formattedSeconds}`
        .replace(/^00:00:/, '00:')
        .replace(/^00:/, '')
    : '00:00:00';
};

// export const

export const xpToLevel = (xp: number) => {
  if (xp >= LEVEL_2_XP && xp < LEVEL_3_XP) {
    return 2;
  } else if (xp >= LEVEL_3_XP && xp < LEVEL_4_XP) {
    return 3;
  } else if (xp >= LEVEL_4_XP && xp < LEVEL_5_XP) {
    return 4;
  } else if (xp >= LEVEL_5_XP && xp < LEVEL_6_XP) {
    return 5;
  } else if (xp >= LEVEL_6_XP && xp < LEVEL_7_XP) {
    return 6;
  } else if (xp >= LEVEL_7_XP && xp < LEVEL_8_XP) {
    return 7;
  } else if (xp >= LEVEL_8_XP && xp < LEVEL_9_XP) {
    return 8;
  } else if (xp >= LEVEL_9_XP && xp < LEVEL_10_XP) {
    return 9;
  } else if (xp >= LEVEL_10_XP && xp < LEVEL_11_XP) {
    return 10;
  } else if (xp >= LEVEL_11_XP && xp < LEVEL_12_XP) {
    return 11;
  } else if (xp >= LEVEL_12_XP && xp < LEVEL_13_XP) {
    return 12;
  } else if (xp >= LEVEL_13_XP && xp < LEVEL_14_XP) {
    return 13;
  } else if (xp >= LEVEL_14_XP && xp < LEVEL_15_XP) {
    return 14;
  } else if (xp >= LEVEL_15_XP && xp < LEVEL_16_XP) {
    return 15;
  } else if (xp >= LEVEL_16_XP && xp < LEVEL_17_XP) {
    return 16;
  } else if (xp >= LEVEL_17_XP && xp < LEVEL_18_XP) {
    return 17;
  } else if (xp >= LEVEL_18_XP && xp < LEVEL_19_XP) {
    return 18;
  } else if (xp >= LEVEL_19_XP && xp < LEVEL_20_XP) {
    return 19;
  } else if (xp >= LEVEL_20_XP && xp < LEVEL_21_XP) {
    return 20;
  } else if (xp >= LEVEL_21_XP && xp < LEVEL_22_XP) {
    return 21;
  } else if (xp >= LEVEL_22_XP && xp < LEVEL_23_XP) {
    return 22;
  } else if (xp >= LEVEL_23_XP && xp < LEVEL_24_XP) {
    return 23;
  } else if (xp >= LEVEL_24_XP && xp < LEVEL_25_XP) {
    return 24;
  } else if (xp >= LEVEL_25_XP && xp < LEVEL_26_XP) {
    return 25;
  } else if (xp >= LEVEL_26_XP && xp < LEVEL_27_XP) {
    return 26;
  } else if (xp >= LEVEL_27_XP && xp < LEVEL_28_XP) {
    return 27;
  } else if (xp >= LEVEL_28_XP && xp < LEVEL_29_XP) {
    return 28;
  } else if (xp >= LEVEL_29_XP && xp < LEVEL_30_XP) {
    return 29;
  } else if (xp >= LEVEL_30_XP && xp < LEVEL_31_XP) {
    return 30;
  } else if (xp >= LEVEL_31_XP && xp < LEVEL_32_XP) {
    return 31;
  } else if (xp >= LEVEL_32_XP && xp < LEVEL_33_XP) {
    return 32;
  } else if (xp >= LEVEL_33_XP && xp < LEVEL_34_XP) {
    return 33;
  } else if (xp >= LEVEL_34_XP && xp < LEVEL_35_XP) {
    return 34;
  } else if (xp >= LEVEL_35_XP && xp < LEVEL_36_XP) {
    return 35;
  } else if (xp >= LEVEL_36_XP && xp < LEVEL_37_XP) {
    return 36;
  } else if (xp >= LEVEL_37_XP && xp < LEVEL_38_XP) {
    return 37;
  } else if (xp >= LEVEL_38_XP && xp < LEVEL_39_XP) {
    return 38;
  } else if (xp >= LEVEL_39_XP && xp < LEVEL_40_XP) {
    return 39;
  } else if (xp >= LEVEL_40_XP && xp < LEVEL_41_XP) {
    return 40;
  } else if (xp >= LEVEL_41_XP && xp < LEVEL_42_XP) {
    return 41;
  } else if (xp >= LEVEL_42_XP && xp < LEVEL_43_XP) {
    return 42;
  } else if (xp >= LEVEL_43_XP && xp < LEVEL_44_XP) {
    return 43;
  } else if (xp >= LEVEL_44_XP && xp < LEVEL_45_XP) {
    return 44;
  } else if (xp >= LEVEL_45_XP && xp < LEVEL_46_XP) {
    return 45;
  } else if (xp >= LEVEL_46_XP && xp < LEVEL_47_XP) {
    return 46;
  } else if (xp >= LEVEL_47_XP && xp < LEVEL_48_XP) {
    return 47;
  } else if (xp >= LEVEL_48_XP && xp < LEVEL_49_XP) {
    return 48;
  } else if (xp >= LEVEL_49_XP && xp < LEVEL_50_XP) {
    return 49;
  } else if (xp >= LEVEL_50_XP) {
    return 50;
  } else {
    return 1;
  }
};

export const xpNeededtoNextLevel = (xp: number) => {
  const currentLevel = xpToLevel(xp);
  const nextLevel = currentLevel + 1;

  if (nextLevel === 2) {
    return LEVEL_2_XP - xp;
  } else if (nextLevel === 3) {
    return LEVEL_3_XP - xp;
  } else if (nextLevel === 4) {
    return LEVEL_4_XP - xp;
  } else if (nextLevel === 5) {
    return LEVEL_5_XP - xp;
  } else if (nextLevel === 6) {
    return LEVEL_6_XP - xp;
  } else if (nextLevel === 7) {
    return LEVEL_7_XP - xp;
  } else if (nextLevel === 8) {
    return LEVEL_8_XP - xp;
  } else if (nextLevel === 9) {
    return LEVEL_9_XP - xp;
  } else if (nextLevel === 10) {
    return LEVEL_10_XP - xp;
  } else if (nextLevel === 11) {
    return LEVEL_11_XP - xp;
  } else if (nextLevel === 12) {
    return LEVEL_12_XP - xp;
  } else if (nextLevel === 13) {
    return LEVEL_13_XP - xp;
  } else if (nextLevel === 14) {
    return LEVEL_14_XP - xp;
  } else if (nextLevel === 15) {
    return LEVEL_15_XP - xp;
  } else if (nextLevel === 16) {
    return LEVEL_16_XP - xp;
  } else if (nextLevel === 17) {
    return LEVEL_17_XP - xp;
  } else if (nextLevel === 18) {
    return LEVEL_18_XP - xp;
  } else if (nextLevel === 19) {
    return LEVEL_19_XP - xp;
  } else if (nextLevel === 20) {
    return LEVEL_20_XP - xp;
  } else if (nextLevel === 21) {
    return LEVEL_21_XP - xp;
  } else if (nextLevel === 22) {
    return LEVEL_22_XP - xp;
  } else if (nextLevel === 23) {
    return LEVEL_23_XP - xp;
  } else if (nextLevel === 24) {
    return LEVEL_24_XP - xp;
  } else if (nextLevel === 25) {
    return LEVEL_25_XP - xp;
  } else if (nextLevel === 26) {
    return LEVEL_26_XP - xp;
  } else if (nextLevel === 27) {
    return LEVEL_27_XP - xp;
  } else if (nextLevel === 28) {
    return LEVEL_28_XP - xp;
  } else if (nextLevel === 29) {
    return LEVEL_29_XP - xp;
  } else if (nextLevel === 30) {
    return LEVEL_30_XP - xp;
  } else if (nextLevel === 31) {
    return LEVEL_31_XP - xp;
  } else if (nextLevel === 32) {
    return LEVEL_32_XP - xp;
  } else if (nextLevel === 33) {
    return LEVEL_33_XP - xp;
  } else if (nextLevel === 34) {
    return LEVEL_34_XP - xp;
  } else if (nextLevel === 35) {
    return LEVEL_35_XP - xp;
  } else if (nextLevel === 36) {
    return LEVEL_36_XP - xp;
  } else if (nextLevel === 37) {
    return LEVEL_37_XP - xp;
  } else if (nextLevel === 38) {
    return LEVEL_38_XP - xp;
  } else if (nextLevel === 39) {
    return LEVEL_39_XP - xp;
  } else if (nextLevel === 40) {
    return LEVEL_40_XP - xp;
  } else if (nextLevel === 41) {
    return LEVEL_41_XP - xp;
  } else if (nextLevel === 42) {
    return LEVEL_42_XP - xp;
  } else if (nextLevel === 43) {
    return LEVEL_43_XP - xp;
  } else if (nextLevel === 44) {
    return LEVEL_44_XP - xp;
  } else if (nextLevel === 45) {
    return LEVEL_45_XP - xp;
  } else if (nextLevel === 46) {
    return LEVEL_46_XP - xp;
  } else if (nextLevel === 47) {
    return LEVEL_47_XP - xp;
  } else if (nextLevel === 48) {
    return LEVEL_48_XP - xp;
  } else if (nextLevel === 49) {
    return LEVEL_49_XP - xp;
  } else if (nextLevel === 50) {
    return LEVEL_50_XP - xp;
  } else {
    return 0;
  }
};

export const xpProgressPercentage = (xp: number) => {
  const currentLevel = xpToLevel(xp);
  const nextLevel = currentLevel + 1;
  let nextLevelXp;
  const xpNeeded = xpNeededtoNextLevel(xp);

  if (nextLevel === 2) {
    nextLevelXp = LEVEL_2_XP;
  } else if (nextLevel === 3) {
    nextLevelXp = LEVEL_3_XP;
  } else if (nextLevel === 4) {
    nextLevelXp = LEVEL_4_XP;
  } else if (nextLevel === 5) {
    nextLevelXp = LEVEL_5_XP;
  } else if (nextLevel === 6) {
    nextLevelXp = LEVEL_6_XP;
  } else if (nextLevel === 7) {
    nextLevelXp = LEVEL_7_XP;
  } else if (nextLevel === 8) {
    nextLevelXp = LEVEL_8_XP;
  } else if (nextLevel === 9) {
    nextLevelXp = LEVEL_9_XP;
  } else if (nextLevel === 10) {
    nextLevelXp = LEVEL_10_XP;
  } else if (nextLevel === 11) {
    nextLevelXp = LEVEL_11_XP;
  } else if (nextLevel === 12) {
    nextLevelXp = LEVEL_12_XP;
  } else if (nextLevel === 13) {
    nextLevelXp = LEVEL_13_XP;
  } else if (nextLevel === 14) {
    nextLevelXp = LEVEL_14_XP;
  } else if (nextLevel === 15) {
    nextLevelXp = LEVEL_15_XP;
  } else if (nextLevel === 16) {
    nextLevelXp = LEVEL_16_XP;
  } else if (nextLevel === 17) {
    nextLevelXp = LEVEL_17_XP;
  } else if (nextLevel === 18) {
    nextLevelXp = LEVEL_18_XP;
  } else if (nextLevel === 19) {
    nextLevelXp = LEVEL_19_XP;
  } else if (nextLevel === 20) {
    nextLevelXp = LEVEL_20_XP;
  } else if (nextLevel === 21) {
    nextLevelXp = LEVEL_21_XP;
  } else if (nextLevel === 22) {
    nextLevelXp = LEVEL_22_XP;
  } else if (nextLevel === 23) {
    nextLevelXp = LEVEL_23_XP;
  } else if (nextLevel === 24) {
    nextLevelXp = LEVEL_24_XP;
  } else if (nextLevel === 25) {
    nextLevelXp = LEVEL_25_XP;
  } else if (nextLevel === 26) {
    nextLevelXp = LEVEL_26_XP;
  } else if (nextLevel === 27) {
    nextLevelXp = LEVEL_27_XP;
  } else if (nextLevel === 28) {
    nextLevelXp = LEVEL_28_XP;
  } else if (nextLevel === 29) {
    nextLevelXp = LEVEL_29_XP;
  } else if (nextLevel === 30) {
    nextLevelXp = LEVEL_30_XP;
  } else if (nextLevel === 31) {
    nextLevelXp = LEVEL_31_XP;
  } else if (nextLevel === 32) {
    nextLevelXp = LEVEL_32_XP;
  } else if (nextLevel === 33) {
    nextLevelXp = LEVEL_33_XP;
  } else if (nextLevel === 34) {
    nextLevelXp = LEVEL_34_XP;
  } else if (nextLevel === 35) {
    nextLevelXp = LEVEL_35_XP;
  } else if (nextLevel === 36) {
    nextLevelXp = LEVEL_36_XP;
  } else if (nextLevel === 37) {
    nextLevelXp = LEVEL_37_XP;
  } else if (nextLevel === 38) {
    nextLevelXp = LEVEL_38_XP;
  } else if (nextLevel === 39) {
    nextLevelXp = LEVEL_39_XP;
  } else if (nextLevel === 40) {
    nextLevelXp = LEVEL_40_XP;
  } else if (nextLevel === 41) {
    nextLevelXp = LEVEL_41_XP;
  } else if (nextLevel === 42) {
    nextLevelXp = LEVEL_42_XP;
  } else if (nextLevel === 43) {
    nextLevelXp = LEVEL_43_XP;
  } else if (nextLevel === 44) {
    nextLevelXp = LEVEL_44_XP;
  } else if (nextLevel === 45) {
    nextLevelXp = LEVEL_45_XP;
  } else if (nextLevel === 46) {
    nextLevelXp = LEVEL_46_XP;
  } else if (nextLevel === 47) {
    nextLevelXp = LEVEL_47_XP;
  } else if (nextLevel === 48) {
    nextLevelXp = LEVEL_48_XP;
  } else if (nextLevel === 49) {
    nextLevelXp = LEVEL_49_XP;
  } else if (nextLevel === 50) {
    nextLevelXp = LEVEL_50_XP;
  }

  return Math.floor(100 - (xpNeeded / nextLevelXp) * 100);
};

export const hasRequiredItems = (itemRequirements, inventory) => {
  return itemRequirements.every((item) => {
    return inventory.some(
      (inventoryItem) =>
        inventoryItem.type === item.type && inventoryItem.quantity >= item.quantity
    );
  });
};

export const getMaxQuantity = (itemRequirements, inventory) => {
  return Math.min(
    ...itemRequirements.map((item) => {
      const inventoryItem = inventory.find(
        (inventoryItem) => inventoryItem.type === item.type
      );

      return inventoryItem ? Math.floor(inventoryItem.quantity / item.quantity) : 0;
    })
  );
};
