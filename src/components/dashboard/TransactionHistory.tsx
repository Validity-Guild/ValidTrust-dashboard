import React, { useState } from 'react';
import { TransactionRecord } from '../../hooks/useVault';
import { formatBalance } from '../../services/stellar/contractHelpers';
import { ArrowDownLeft, ArrowUpRight, Gift, History, ChevronDown } from 'lucide-react';

interface TransactionHistoryProps {
  transactions: TransactionRecord[];
}

export const TransactionHistory: React.FC<TransactionHistoryProps> = ({ transactions }) => {
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');

  const sortedTransactions = [...transactions].sort((a, b) => {
    return sortOrder === 'desc' ? b.timestamp - a.timestamp : a.timestamp - b.timestamp;
  });

  if (transactions.length === 0) {
    return (
      <div className="card p-6 flex flex-col items-center justify-center py-12">
        <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
          <History size={32} className="text-gray-400" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Transaction History</h3>
        <p className="text-gray-500">No recent transactions yet</p>
      </div>
    );
  }

  const getIconAndBg = (type: string) => {
    switch (type) {
      case 'deposit':
        return { icon: <ArrowDownLeft className="text-success-600" size={22} />, bg: 'bg-success-50' };
      case 'withdraw':
        return { icon: <ArrowUpRight className="text-danger-600" size={22} />, bg: 'bg-danger-50' };
      case 'claim':
        return { icon: <Gift className="text-brand-600" size={22} />, bg: 'bg-brand-50' };
      default:
        return { icon: null, bg: 'bg-gray-100' };
    }
  };

  const getAmountColor = (type: string) => {
    switch (type) {
      case 'deposit': return 'text-success-700';
      case 'withdraw': return 'text-danger-700';
      case 'claim': return 'text-brand-700';
      default: return 'text-gray-900';
    }
  };

  const getAmountPrefix = (type: string) => {
    switch (type) {
      case 'deposit': return '+';
      case 'withdraw': return '-';
      case 'claim': return '+';
      default: return '';
    }
  };

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <History size={20} className="text-brand-600" />
          Transaction History
        </h3>
        <button
          onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
          className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-brand-600 transition-colors"
        >
          {sortOrder === 'desc' ? 'Newest First' : 'Oldest First'}
          <ChevronDown size={16} className={`transition-transform ${sortOrder === 'asc' ? 'rotate-180' : ''}`} />
        </button>
      </div>
      
      <div className="space-y-3">
        {sortedTransactions.map((tx) => {
          const { icon, bg } = getIconAndBg(tx.type);
          return (
            <div key={tx.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 ${bg} rounded-2xl flex items-center justify-center`}>
                  {icon}
                </div>
                <div>
                  <p className="font-semibold capitalize text-gray-900">{tx.type}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(tx.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
              <p className={`text-lg font-bold ${getAmountColor(tx.type)}`}>
                {getAmountPrefix(tx.type)}{formatBalance(tx.amount)} VLD
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
