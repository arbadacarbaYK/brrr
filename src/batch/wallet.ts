import { IParametersBatch, IWalletInfo } from '../interfaces';
import ProxyHandler from '../util/post';

export const createWallet = async (
  walletName: string,
  parametersBatch: IParametersBatch,
  ph: ProxyHandler,
): Promise<IWalletInfo> => {
  try {
    const { adminId: masterKey } = parametersBatch;

    // create wallet using v1 API
    const responseWallet = await ph.post(
      `/api/v1/wallets`,
      {
        name: walletName,
      },
      masterKey,
    );
    const walletData = await responseWallet.json();

    // extract generated wallet info - v1 response structure
    const walletId = walletData.id;
    const adminKey = walletData.adminkey; // adminkey is correct in v1
    const inKey = walletData.inkey; // inkey is correct in v1
    const adminUrlLnBits = `${ph.getBase()}/wallet?wal=${walletId}`;

    return {
      adminId: adminKey,
      readKey: inKey,
      adminUrlLnBits,
      walletName,
    };
  } catch (e) {
    return Promise.reject(e);
  }
};

export const getBalance = async (inKey: string, ph: ProxyHandler): Promise<number> => {
  try {
    const response = await ph.get('/api/v1/wallet', inKey);
    const info = await response.json();
    return info.balance || 0;
  } catch (e: unknown) {
    return Promise.reject(e);
  }
};
