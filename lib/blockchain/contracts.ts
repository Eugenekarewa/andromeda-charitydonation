import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate';
import { StdFee } from '@cosmjs/stargate';  // Corrected import for StdFee

// Extend the `Window` interface to include Keplr-related properties
declare global {
  interface Window {
    keplr?: {
      experimentalSuggestChain: (chainConfig: any) => Promise<void>;
      enable: (chainId: string) => Promise<void>;
    };
    getOfflineSigner?: (chainId: string) => any;
  }
}

/**
 * Connect to the Keplr wallet and return the user's address.
 */
export const connectKeplrWallet = async (): Promise<string | undefined> => {
  if (typeof window.keplr !== 'undefined') {
    try {
      const chainId = 'archway1shx0ekr7tp780seegu5wlm0kk3z8uqhdjs3utf'; // Replace with your actual chain ID

      // Suggest chain configuration if needed
      await window.keplr.experimentalSuggestChain({
        chainId,
        chainName: 'Andromeda',
        rpc: 'https://rpc.andromeda.example', // Replace with actual RPC URL
        rest: 'https://rest.andromeda.example', // Replace with actual REST URL
        stakeCurrency: {
          coinDenom: 'AND',
          coinMinimalDenom: 'uand',
          coinDecimals: 6,
        },
        bip44: { coinType: 118 },
        bech32Config: {
          bech32PrefixAccAddr: 'andromeda',
          bech32PrefixAccPub: 'andromedapub',
          bech32PrefixValAddr: 'andromedavaloper',
          bech32PrefixValPub: 'andromedavaloperpub',
          bech32PrefixConsAddr: 'andromedavalcons',
          bech32PrefixConsPub: 'andromedavalconspub',
        },
        currencies: [
          {
            coinDenom: 'AND',
            coinMinimalDenom: 'uand',
            coinDecimals: 6,
          },
        ],
        feeCurrencies: [
          {
            coinDenom: 'AND',
            coinMinimalDenom: 'uand',
            coinDecimals: 6,
          },
        ],
      });

      // Enable Keplr and get accounts
      await window.keplr.enable(chainId);

      if (window.getOfflineSigner) {
        const offlineSigner = window.getOfflineSigner(chainId);
        const accounts = await offlineSigner.getAccounts();
        return accounts[0]?.address; // Return the user's address
      } else {
        throw new Error('getOfflineSigner is not available');
      }
    } catch (error) {
      console.error('Failed to connect to Keplr wallet:', error);
      throw new Error('Failed to connect Keplr wallet');
    }
  } else {
    throw new Error('Keplr wallet is not installed');
  }
};

/**
 * Donate to a campaign using the Keplr wallet.
 */
export const donate = async (campaignAddress: string, amount: string) => {
  if (!window.keplr || !window.getOfflineSigner) {
    throw new Error('Keplr wallet is not installed or getOfflineSigner is unavailable');
  }

  const chainId = 'andromeda-1'; // Replace with your actual chain ID

  try {
    // Enable Keplr and get offline signer
    await window.keplr.enable(chainId);
    const offlineSigner = window.getOfflineSigner(chainId);

    // Initialize CosmWasm client
    const client = await SigningCosmWasmClient.connectWithSigner(
      'https://rpc.andromeda.example', // Replace with actual RPC URL
      offlineSigner
    );

    // Define the transaction fee
    const fee: StdFee = {
      amount: [{ denom: 'uand', amount: '2000' }], // Fee amount in minimal denomination
      gas: '200000', // Gas limit
    };

    // Send the donation (assuming the contract has a "donate" message)
    const result = await client.execute(
      (await offlineSigner.getAccounts())[0].address, // Sender's address
      campaignAddress, // Smart contract address
      { donate: {} }, // The contract message (modify as per contract logic)
      fee, // Fee
      'Donation transaction', // Optional memo
      [{ denom: 'uand', amount }] // Funds to send with the message
    );

    return result;
  } catch (error) {
    console.error('Failed to make donation:', error);
    throw new Error('Failed to make donation');
  }
};
