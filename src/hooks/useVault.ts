/**
 * @file useVault.ts
 * @description A custom React hook that manages the interaction between the dashboard UI
 * and the Validity Network vault smart contract.
 * 
 * This hook encapsulates all vault-related state management, including:
 * - Current user balance in the vault.
 * - Loading states for asynchronous blockchain operations.
 * - Transaction history for the current session.
 * - Core vault operations: deposit, withdraw, and claim rewards.
 * 
 * It currently uses mocked logic to simulate blockchain delays and responses,
 * but is designed to be easily swapped with the actual Axionvera SDK.
 * 
 * @module hooks/useVault
 */

import { useState, useCallback, useEffect } from 'react';
import { useWallet } from './useWallet';

/**
 * Represents a single transaction performed by the user in the current session.
 * 
 * @interface TransactionRecord
 * @property {string} id - Unique identifier for the transaction (UUID or hash).
 * @property {'deposit' | 'withdraw' | 'claim'} type - The category of the transaction.
 * @property {string} amount - The amount involved, formatted as a string to preserve precision.
 * @property {number} timestamp - Unix timestamp of when the transaction was recorded.
 */
export interface TransactionRecord {
  id: string;
  type: 'deposit' | 'withdraw' | 'claim';
  amount: string;
  timestamp: number;
}

/**
 * useVault Hook
 * 
 * Provides a high-level API for the dashboard components to interact with the vault.
 * 
 * @returns {Object} An object containing vault state and action functions.
 * @returns {string} balance - The current user balance (formatted as stroops).
 * @returns {boolean} isLoading - True if any vault operation is in progress.
 * @returns {TransactionRecord[]} transactions - History of transactions in the current session.
 * @returns {Function} deposit - Async function to deposit VLD tokens.
 * @returns {Function} withdraw - Async function to withdraw VLD tokens.
 * @returns {Function} claimRewards - Async function to claim accumulated rewards.
 * @returns {Function} fetchBalance - Function to manually refresh the user's balance.
 */
export const useVault = () => {
  // Access the wallet context for the current user's address and signing capabilities
  const { address } = useWallet();
  
  // State for the user's vault balance
  const [balance, setBalance] = useState<string>('0');
  
  // State for tracking active blockchain requests
  const [isLoading, setIsLoading] = useState(false);
  
  // State for session-based transaction history
  const [transactions, setTransactions] = useState<TransactionRecord[]>([]);

  /**
   * Fetches the current user's balance from the vault.
   * 
   * This function is wrapped in useCallback to prevent unnecessary re-renders
   * and to allow it to be used as a dependency in useEffect.
   */
  const fetchBalance = useCallback(async () => {
    // If no wallet is connected, we cannot fetch a balance
    if (!address) return;
    
    setIsLoading(true);
    try {
      /**
       * @todo Replace with actual SDK call:
       * const vault = new ValidityVault(VAULT_CONTRACT_ID);
       * const bal = await vault.getBalance(address);
       */
      
      // Simulating network latency
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Update balance state with simulated value (10 VLD tokens)
      setBalance('100000000'); 
    } catch (error) {
      console.error("[useVault] Failed to fetch balance:", error);
    } finally {
      setIsLoading(false);
    }
  }, [address]);

  /**
   * Automatically fetch the balance whenever the connected wallet address changes.
   */
  useEffect(() => {
    fetchBalance();
  }, [fetchBalance]);

  /**
   * Initiates a deposit transaction to the vault.
   * 
   * @param {string} amount - The amount of tokens to deposit (in smallest unit).
   */
  const deposit = async (amount: string) => {
    if (!address) {
      console.error("[useVault] Deposit attempted without connected wallet.");
      return;
    }
    
    setIsLoading(true);
    try {
      console.info(`[useVault] Initiating deposit of ${amount} for ${address}`);
      
      /**
       * @todo Integrate with signTransaction and the vault contract.
       * e.g., const tx = await vault.buildDepositTx(address, amount);
       * await signTransaction(tx);
       */
      
      // Simulate transaction processing time
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Record the successful transaction in local state
      const newTx: TransactionRecord = {
        id: Math.random().toString(36).substring(7),
        type: 'deposit',
        amount,
        timestamp: Date.now()
      };
      
      setTransactions(prev => [newTx, ...prev]);
      
      // Refresh balance after successful deposit
      await fetchBalance();
    } catch (error) {
      console.error("[useVault] Deposit failed:", error);
      throw error; // Re-throw to allow UI to show error message
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Initiates a withdrawal transaction from the vault.
   * 
   * @param {string} amount - The amount of tokens to withdraw (in smallest unit).
   */
  const withdraw = async (amount: string) => {
    if (!address) {
      console.error("[useVault] Withdraw attempted without connected wallet.");
      return;
    }
    
    setIsLoading(true);
    try {
      console.info(`[useVault] Initiating withdrawal of ${amount} for ${address}`);
      
      // Simulate transaction processing time
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Record the successful transaction
      const newTx: TransactionRecord = {
        id: Math.random().toString(36).substring(7),
        type: 'withdraw',
        amount,
        timestamp: Date.now()
      };
      
      setTransactions(prev => [newTx, ...prev]);
      
      // Refresh balance after successful withdrawal
      await fetchBalance();
    } catch (error) {
      console.error("[useVault] Withdraw failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Claims accumulated rewards from the vault.
   */
  const claimRewards = async () => {
    if (!address) {
      console.error("[useVault] Claim rewards attempted without connected wallet.");
      return;
    }
    
    setIsLoading(true);
    try {
      console.info(`[useVault] Claiming rewards for ${address}`);
      
      // Simulate transaction processing time
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Record the claim as a transaction
      const newTx: TransactionRecord = {
        id: Math.random().toString(36).substring(7),
        type: 'claim',
        amount: '5000000', // Simulated reward of 0.5 VLD
        timestamp: Date.now()
      };
      
      setTransactions(prev => [newTx, ...prev]);
      
      // Refresh balance to reflect added rewards
      await fetchBalance();
    } catch (error) {
      console.error("[useVault] Claim rewards failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Return the hook's public API
  return {
    balance,
    isLoading,
    transactions,
    deposit,
    withdraw,
    claimRewards,
    fetchBalance
  };
};
