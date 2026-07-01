import React from 'react';
import { useWallet } from '../../hooks/useWallet';
import { Wallet, LogOut, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export const Navbar = () => {
  const { address, connect, disconnect, isConnecting } = useWallet();

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <nav className="sticky top-4 z-10 mb-8">
      <div className="card px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-gradient-to-br from-brand-500 to-brand-700 rounded-xl flex items-center justify-center text-white shadow-brand-200 shadow-md group-hover:scale-105 transition-transform">
            <ShieldCheck size={20} />
          </div>
          <span className="text-xl font-bold text-gray-900">ValidTrust</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link href="/dashboard" className="text-gray-700 font-medium hover:text-brand-600 transition-colors">
            Dashboard
          </Link>
        </div>

        <div>
          {address ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-xl border border-gray-100">
                <div className="w-2 h-2 bg-success-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-gray-700">
                  {formatAddress(address)}
                </span>
              </div>
              <button
                onClick={disconnect}
                className="p-2 text-gray-500 hover:text-danger-500 hover:bg-danger-50 rounded-xl transition-all"
                title="Disconnect"
              >
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <button
              onClick={connect}
              disabled={isConnecting}
              className="flex items-center gap-2 bg-gradient-to-r from-brand-500 to-brand-700 hover:from-brand-600 hover:to-brand-800 text-white px-5 py-2.5 rounded-xl font-semibold shadow-brand-200 shadow-md hover:shadow-lg transition-all disabled:opacity-50"
            >
              <Wallet size={18} />
              {isConnecting ? 'Connecting...' : 'Connect Wallet'}
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};
