import React from 'react';
import Head from 'next/head';
import { useWallet } from '../hooks/useWallet';
import { useVault } from '../hooks/useVault';
import { BalanceCard } from '../components/dashboard/BalanceCard';
import { DepositForm } from '../components/dashboard/DepositForm';
import { WithdrawForm } from '../components/dashboard/WithdrawForm';
import { TransactionHistory } from '../components/dashboard/TransactionHistory';
import { Wallet, RefreshCw } from 'lucide-react';

export default function Dashboard() {
  const { address, isConnecting, connect } = useWallet();
  const { balance, isLoading, transactions, deposit, withdraw, claimRewards, fetchBalance } = useVault();

  if (!address) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="w-20 h-20 bg-gradient-to-br from-brand-100 to-brand-200 rounded-3xl flex items-center justify-center mb-6 shadow-sm">
          <Wallet size={36} className="text-brand-700" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-3">Connect Your Wallet</h2>
        <p className="text-lg text-gray-500 mb-8 max-w-md mx-auto">
          Connect your Stellar wallet to access your vault, deposit tokens, and claim rewards
        </p>
        <button
          onClick={connect}
          disabled={isConnecting}
          className="flex items-center gap-2 bg-gradient-to-r from-brand-500 to-brand-700 hover:from-brand-600 hover:to-brand-800 disabled:opacity-50 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-brand-200 shadow-md hover:shadow-lg transition-all"
        >
          <Wallet size={22} />
          {isConnecting ? 'Connecting...' : 'Connect Wallet'}
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <Head>
        <title>Dashboard - ValidTrust</title>
      </Head>

      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">Welcome back!</h1>
          <p className="text-gray-500 mt-1">Manage your ValidTrust vault and transactions</p>
        </div>
        <button
          onClick={fetchBalance}
          disabled={isLoading}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium transition-colors disabled:opacity-50"
        >
          <RefreshCw size={18} className={isLoading ? 'animate-spin' : ''} />
          Refresh
        </button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Balance Card - Full width on small screens, 1 column on lg */}
        <div className="lg:col-span-1">
          <BalanceCard 
            balance={balance} 
            isLoading={isLoading} 
            onClaim={claimRewards} 
          />
        </div>
        
        {/* Forms Section - 2 columns on md and lg */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          <DepositForm onDeposit={deposit} isLoading={isLoading} />
          <WithdrawForm onWithdraw={withdraw} isLoading={isLoading} />
        </div>
      </div>

      {/* Transaction History */}
      <TransactionHistory transactions={transactions} />

    </div>
  );
}
