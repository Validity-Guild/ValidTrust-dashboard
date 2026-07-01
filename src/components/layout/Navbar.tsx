import React from 'react';
import { useWallet } from '../../hooks/useWallet';
import { Wallet, LogOut } from 'lucide-react';
import Link from 'next/link';

export const Navbar = () => {
  const { address, connect, disconnect, isConnecting } = useWallet();

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <nav className="flex items-center justify-between p-4 bg-white shadow-md rounded-lg mb-6">
      <div className="flex items-center space-x-4">
        <Link href="/" className="text-xl font-bold text-brand-600 flex items-center gap-2">
          <div className="w-8 h-8 bg-brand-500 rounded-full flex items-center justify-center text-white">V</div>
          ValidTrust Dashboard
        </Link>
        <div className="hidden md:flex space-x-4">
          <Link href="/dashboard" className="text-gray-600 hover:text-brand-500 font-medium">
            Dashboard
          </Link>
        </div>
      </div>
      
      <div>
        {address ? (
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-700 bg-gray-100 px-3 py-1.5 rounded-full border">
              {formatAddress(address)}
            </span>
            <button
              onClick={disconnect}
              className="text-gray-500 hover:text-red-500 p-2 rounded-full hover:bg-red-50 transition"
              title="Disconnect"
            >
              <LogOut size={20} />
            </button>
          </div>
        ) : (
          <button
            onClick={connect}
            disabled={isConnecting}
            className="flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white px-4 py-2 rounded-lg font-medium transition disabled:opacity-50"
          >
            <Wallet size={18} />
            {isConnecting ? 'Connecting...' : 'Connect Wallet'}
          </button>
        )}
      </div>
    </nav>
  );
};
