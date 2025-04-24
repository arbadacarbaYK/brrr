import ProxyHandler from '../util/post';
import { ExtensionType } from '../interfaces';

export const enablePlugin = async (
  extension: ExtensionType,
  walletId: string,
  adminKey: string,
  ph: ProxyHandler,
) => {
  try {
    // In v1, extensions are enabled per wallet using the admin key
    return ph.post(
      `/api/v1/extension`,
      {
        extension_name: extension,
        wallet_id: walletId,
        active: true,
      },
      adminKey,
    );
  } catch (e) {
    return Promise.reject(e);
  }
};
