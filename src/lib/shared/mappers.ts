import { camelCaseKeys } from './shared-tools';

export const tuskpetObjectToTuskpet = (rpcResponse) => {
  const fields = rpcResponse?.data?.content?.fields;

  // camelCase the keys
  let tuskpet = camelCaseKeys(fields) as any;

  const skills = tuskpet.skills?.fields;
  const stats = tuskpet.stats?.fields;

  tuskpet.id = tuskpet?.id?.id;
  tuskpet.skills = camelCaseKeys(skills);
  tuskpet.stats = camelCaseKeys(stats);

  return tuskpet;
};