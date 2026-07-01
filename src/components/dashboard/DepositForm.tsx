import React, { useState } from 'react';
import { parseAmount } from '../../services/stellar/contractHelpers';
import { ArrowDownLeft, Loader2 } from 'lucide-react';

interface DepositFormProps {
  onDeposit: (amount: string) => Promise<void>;
  isLoading: boolean;
}

export const DepositForm: React.FC<DepositFormProps> = ({ onDeposit, isLoading }) => {
  const [amount, setAmount] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) return;

    try {
      const parsedAmount = parseAmount(amount);
      await onDeposit(parsedAmount);
      setAmount('');
    } catch (error) {
      console.error("Deposit failed:", error);
    }
  };

  return (
    <div className="card p-6">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 bg-gradient-to-br from-success-50 to-green-100 rounded-2xl flex items-center justify-center">
          <ArrowDownLeft className="text-success-600" size={22} />
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900">Deposit Tokens</h3>
          <p className="text-sm text-gray-500">Lock VLD into the vault</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="deposit-amount" className="block text-sm font-semibold text-gray-700 mb-2">
            Amount
          </label>
          <div className="relative">
            <input
              id="deposit-amount"
              type="number"
              step="0.0000001"
              min="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              disabled={isLoading}
              className="input-field pr-12"
              placeholder="0.00"
              required
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
              <span className="text-sm font-semibold text-gray-400">VLD</span>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading || !amount || Number(amount) <= 0}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-success-500 to-success-600 hover:from-success-600 hover:to-success-700 text-white font-semibold py-3 rounded-xl transition-all shadow-sm hover:shadow-md disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              Processing...
            </>
          ) : (
            <>
              <ArrowDownLeft size={20} />
              Deposit Now
            </>
          )}
        </button>
      </form>
    </div>
  );
};
