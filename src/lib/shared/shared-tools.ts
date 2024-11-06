export const toReadableObjectId = (objectId: string) => {
  // e.g. "0x3ac65090c7fd9582ac9c06ab28fb45a22f0fc87c3d31f159920c3506041b7f9a"
  // to "0x3ac6...7f9a"

  const prefix = objectId?.slice?.(0, 5);
  const postfix = objectId?.slice?.(-4);

  return `${prefix}...${postfix}`;
};

export const toBlockExplorer = (objectId: string) => {
  // e.g. "0x3ac65090c7fd9582ac9c06ab28fb45a22f0fc87c3d31f159920c3506041b7f9a"

  return `https://suiscan.xyz/testnet/account/${objectId}`;
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
