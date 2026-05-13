import { useEffect, useState } from 'react';
import { getPublicKey, isConnected, setAllowed, signTransaction } from '@stellar/freighter-api';

export const useWallet = () => {
  const [address, setAddress] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkConnection = async () => {
      try {
        if (await isConnected()) {
          const publicKey = await getPublicKey();
          setAddress(publicKey);
        }
      } catch (err) {
        console.error('Failed to check wallet connection:', err);
      }
    };
    checkConnection();
  }, []);

  const connect = async () => {
    setIsConnecting(true);
    setError(null);
    try {
      const isAllowed = await setAllowed();
      if (isAllowed) {
        const publicKey = await getPublicKey();
        setAddress(publicKey);
      } else {
        setError('Wallet connection rejected');
      }
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : typeof err === 'string' ? err : 'Failed to connect wallet';
      setError(message);
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnect = () => {
    setAddress(null);
  };

  return {
    address,
    isConnecting,
    error,
    connect,
    disconnect,
    signTransaction
  };
};
