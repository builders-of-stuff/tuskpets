import { camelCaseKeys } from './shared-tools';
import { TYPE_CONFIG } from './shared.constant';

const inventoryObjectsToInventory = (dynamicFieldObjects) => {
  const mapped = dynamicFieldObjects?.map?.((object) => {
    return {
      ...object,
      id: object?.id?.id,
      type: object?.type,
      quantity: Number(object?.quantity),

      // extras
      name: TYPE_CONFIG[object?.type]?.name,
      description: TYPE_CONFIG[object?.type]?.description,
      image: TYPE_CONFIG[object?.type]?.image
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
