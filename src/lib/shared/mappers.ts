import { camelCaseKeys } from './shared-tools';

const inventoryObjectsToInventory = (dynamicFieldObjects) => {
  const mapped = dynamicFieldObjects?.map?.((object) => {
    return {
      ...object,
      id: object?.id?.id,
      quantity: Number(object?.quantity),
      type: object?.type
    };
  });

  return mapped;
};

export const tuskpetObjectToTuskpet = (rpcResponse, inventoryItems = [] as any) => {
  const fields = rpcResponse?.data?.content?.fields;

  // camelCase the keys
  let tuskpet = camelCaseKeys(fields) as any;

  let skills = tuskpet.skills?.fields;
  // convert all skill values to numbers
  skills = Object.keys(skills).reduce((acc, key) => {
    acc[key] = Number(skills[key]);
    return acc;
  }, {} as any);

  let stats = tuskpet.stats?.fields;
  stats = Object.keys(stats).reduce((acc, key) => {
    acc[key] = Number(stats[key]);
    return acc;
  }, {} as any);

  tuskpet.id = tuskpet?.id?.id;
  tuskpet.skills = camelCaseKeys(skills);
  tuskpet.stats = camelCaseKeys(stats);
  tuskpet.inventory = inventoryObjectsToInventory(inventoryItems);

  return tuskpet;
};
