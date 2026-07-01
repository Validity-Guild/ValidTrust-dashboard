import React from 'react';
import { formatBalance } from '../../services/stellar/contractHelpers';
import { Coins, Gift } from 'lucide-react';

interface BalanceCardProps {
  balance: string;
  isLoading: boolean;
  onClaim: () => void;
}

export const BalanceCard: React.FC<BalanceCardProps> = ({ balance, isLoading, onClaim }) => {
  const displayBalance = isLoading ? '...' : formatBalance(balance);

  return (
    <div className="card p-6 flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-brand-100 to-brand-50 rounded-2xl flex items-center justify-center">
            <Coins className="text-brand-600" size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Vault Balance</p>
            <div className="flex items-end gap-1">
              <h2 className="text-3xl font-bold text-gray-900">{displayBalance}</h2>
              <span className="text-lg font-semibold text-gray-400 mb-1">VLD</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-brand-50 to-brand-100 rounded-xl p-4">
        <p className="text-sm text-brand-800 font-medium mb-2">Rewards Available</p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-brand-700">0.5 VLD</span>
          <button
            onClick={onClaim}
            disabled={isLoading}
            className="flex items-center gap-2 bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-700 hover:to-brand-800 disabled:opacity-50 text-white px-4 py-2.5 rounded-xl font-semibold transition-all shadow-brand-200 shadow-md"
          >
            <Gift size={18} />
            {isLoading ? 'Claiming...' : 'Claim Now'}
          </button>
        </div>
      </div>

      <p className="text-xs text-gray-400 text-center">Balances update automatically after each transaction</p>
    </div>
  );
};
