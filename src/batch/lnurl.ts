import ProxyHandler from '../util/post';
import { IParametersLnurlP, IParametersLnurlW } from '../interfaces';
import { enablePlugin } from './plugin';

export const createLnurlW = async (
  parameters: IParametersLnurlW,
  adminId: string,
  walletId: string,
  readKey: string,
  ph: ProxyHandler,
): Promise<string> => {
  try {
    await enablePlugin('withdraw', walletId, adminId, ph);
    const responseLnurlw = await ph.post(
      `/withdraw/api/v1/links`,
      {
        ...parameters,
        is_unique: false,
      },
      adminId,
    );
    return (await responseLnurlw.json()).lnurl;
  } catch (e) {
    return Promise.reject(e);
  }
};

export const createLnurlP = async (
  parameters: IParametersLnurlP,
  adminKey: string,
  walletId: string,
  inKey: string,
  ph: ProxyHandler,
): Promise<string> => {
  try {
    await enablePlugin('lnurlp', walletId, adminKey, ph);
    const responseLnurlw = await ph.post(`/lnurlp/api/v1/links`, parameters, adminKey);
    return (await responseLnurlw.json()).lnurl;
  } catch (e) {
    return Promise.reject(e);
  }
};
