/**
 * @file BalanceCard.tsx
 * @description This component displays the user's current vault balance in the Validity Network.
 * It provides a visual representation of the tokens held in the smart contract and allows users
 * to trigger the rewards claiming process.
 * 
 * The component is designed to be highly readable, providing clear feedback on loading states
 * and formatting the balance according to the network's decimal precision.
 * 
 * @module components/dashboard/BalanceCard
 */

import React from 'react';
import { formatBalance } from '../../services/stellar/contractHelpers';

/**
 * Props for the BalanceCard component.
 * 
 * @interface BalanceCardProps
 * @property {string} balance - The raw balance string from the blockchain (usually in stroops/smallest unit).
 * @property {boolean} isLoading - A flag indicating whether the balance is currently being fetched or a transaction is in progress.
 * @property {() => void} onClaim - Callback function triggered when the user clicks the "Claim Rewards" button.
 */
interface BalanceCardProps {
  balance: string;
  isLoading: boolean;
  onClaim: () => void;
}

/**
 * BalanceCard Component
 * 
 * A stateless functional component that renders the vault balance and a claim button.
 * Uses Tailwind CSS for styling and follows the project's design language.
 * 
 * @param {BalanceCardProps} props - The component props.
 * @returns {JSX.Element} The rendered BalanceCard component.
 * 
 * @example
 * <BalanceCard 
 *   balance="100000000" 
 *   isLoading={false} 
 *   onClaim={() => console.log('Claiming...')} 
 * />
 */
export const BalanceCard: React.FC<BalanceCardProps> = ({ balance, isLoading, onClaim }) => {
  /**
   * Render helper to display the formatted balance.
   * If loading, shows a placeholder.
   */
  const displayBalance = isLoading ? '...' : formatBalance(balance);

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
      {/* Header section with descriptive label */}
      <h3 className="text-gray-500 font-medium mb-2">Vault Balance</h3>
      
      {/* Primary balance display area */}
      <div className="text-4xl font-bold text-gray-900 mb-6">
        {displayBalance} <span className="text-2xl text-gray-500 font-normal">VLD</span>
      </div>

      {/* Action button for claiming rewards */}
      <button 
        onClick={onClaim}
        disabled={isLoading}
        className="w-full bg-brand-50 text-brand-600 hover:bg-brand-100 border border-brand-200 py-3 rounded-lg font-medium transition disabled:opacity-50"
        aria-label="Claim rewards from the vault"
      >
        {isLoading ? 'Processing...' : 'Claim Rewards'}
      </button>

      {/* Footer note about balance updates (optional) */}
      <p className="mt-4 text-xs text-gray-400">
        Balances are updated automatically after every transaction.
      </p>
    </div>
  );
};
