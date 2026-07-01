import Head from 'next/head';
import Link from 'next/link';
import { useWallet } from '../hooks/useWallet';
import { ShieldCheck, ArrowRight } from 'lucide-react';

export default function Home() {
  const { address } = useWallet();

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
      <Head>
        <title>ValidTrust Dashboard - Stellar Smart Contracts</title>
        <meta name="description" content="Interact with ValidTrust smart contracts on the Stellar network." />
      </Head>

      <div className="max-w-3xl space-y-8">
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 bg-gradient-to-br from-brand-500 to-brand-700 rounded-3xl flex items-center justify-center shadow-brand-200 shadow-xl">
            <ShieldCheck size={48} className="text-white" />
          </div>
        </div>

        <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 sm:text-6xl">
          Secure DeFi on <span className="text-brand-700">ValidTrust</span>
        </h1>
        
        <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
          A modern, open-source dashboard for depositing, withdrawing, and claiming rewards using the ValidTrust SDK and Soroban RPC.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-6">
          <Link 
            href="/dashboard"
            className="flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-brand-500 to-brand-700 text-white rounded-2xl font-semibold text-lg hover:from-brand-600 hover:to-brand-800 transition-all shadow-brand-200 shadow-lg hover:shadow-xl"
          >
            {address ? 'Go to Dashboard' : 'Launch App'}
            <ArrowRight size={20} />
          </Link>
          
          <a 
            href="https://github.com/validtrust-network/validtrust-dashboard" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-8 py-4 bg-white text-gray-900 border border-gray-200 rounded-2xl font-semibold text-lg hover:bg-gray-50 transition-all shadow-sm hover:shadow"
          >
            View on GitHub
          </a>
        </div>
      </div>
    </div>
  );
}
