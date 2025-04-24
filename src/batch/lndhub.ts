import ProxyHandler from '../util/post';
import { enablePlugin } from './plugin';

export const enableLndHub = async (
  adminKey: string,
  walletId: string,
  inKey: string,
  ph: ProxyHandler,
): Promise<string> => {
  try {
    await enablePlugin('lndhub', walletId, adminKey, ph);
    return `lndhub://admin:${adminKey}@${ph.getBase()}/lndhub/ext/`;
  } catch (e) {
    return Promise.reject(e);
  }
};
