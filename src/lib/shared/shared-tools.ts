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
