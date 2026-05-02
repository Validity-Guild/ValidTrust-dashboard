/**
 * @file DepositForm.tsx
 * @description A form component that handles token deposits into the Validity Network vault.
 * It allows users to specify an amount of VLD tokens and initiates the deposit transaction.
 * 
 * Features:
 * - Real-time input validation for numeric values.
 * - Integration with network-specific decimal handling (7 decimals by default).
 * - Responsive UI with clear loading and disabled states.
 * 
 * @module components/dashboard/DepositForm
 */

import React, { useState } from 'react';
import { parseAmount } from '../../services/stellar/contractHelpers';

/**
 * Props for the DepositForm component.
 * 
 * @interface DepositFormProps
 * @property {(amount: string) => Promise<void>} onDeposit - Async callback to handle the deposit transaction.
 * @property {boolean} isLoading - State indicating if a deposit transaction is currently in progress.
 */
interface DepositFormProps {
  onDeposit: (amount: string) => Promise<void>;
  isLoading: boolean;
}

/**
 * DepositForm Component
 * 
 * Renders a controlled input field for the deposit amount and a submission button.
 * Validates that the input is a valid number before calling the onDeposit callback.
 * 
 * @param {DepositFormProps} props - The component props.
 * @returns {JSX.Element} The rendered DepositForm.
 * 
 * @example
 * <DepositForm 
 *   onDeposit={async (amt) => await handleDeposit(amt)} 
 *   isLoading={false} 
 * />
 */
export const DepositForm: React.FC<DepositFormProps> = ({ onDeposit, isLoading }) => {
  /**
   * State to track the raw input value from the user.
   * Initialized to an empty string to show the placeholder.
   */
  const [amount, setAmount] = useState('');

  /**
   * Handles the form submission event.
   * Prevents default browser behavior, validates input, and parses the amount
   * to its smallest unit (stroops) before passing it to the parent handler.
   * 
   * @param {React.FormEvent} e - The submission event.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation: ensure amount exists and is a number
    if (!amount || isNaN(Number(amount))) {
      console.warn("Invalid deposit amount entered:", amount);
      return;
    }
    
    try {
      // Convert the user-friendly decimal string to the contract-expected integer (7 decimals)
      const parsedAmount = parseAmount(amount);
      
      // Execute the deposit callback
      await onDeposit(parsedAmount);
      
      // Clear the input field upon successful initiation
      setAmount('');
    } catch (error) {
      // Error handling is usually managed by the parent via the returned promise,
      // but we log it here for developer visibility.
      console.error("Failed to process deposit form submission:", error);
    }
  };

  /**
   * Determines if the submit button should be disabled.
   * Button is disabled if:
   * 1. A transaction is already loading.
   * 2. The amount input is empty.
   * 3. The amount is not a positive number.
   */
  const isSubmitDisabled = isLoading || !amount || Number(amount) <= 0;

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Deposit</h3>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label htmlFor="deposit-amount" className="block text-sm font-medium text-gray-700 mb-1">
            Amount (VLD)
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition disabled:bg-gray-50"
              placeholder="0.00"
              required
              aria-describedby="deposit-help"
            />
          </div>
          <p id="deposit-help" className="mt-2 text-xs text-gray-500">
            Enter the amount of VLD tokens you wish to lock in the vault.
          </p>
        </div>

        <button
          type="submit"
          disabled={isSubmitDisabled}
          className="w-full bg-brand-600 hover:bg-brand-700 text-white font-medium py-2 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
          ) : 'Deposit Tokens'}
        </button>
      </form>
    </div>
  );
};
