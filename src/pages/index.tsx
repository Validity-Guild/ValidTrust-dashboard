import Head from 'next/head';
import Link from 'next/link';
import { useWallet } from '../hooks/useWallet';

export default function Home() {
  const { address } = useWallet();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <Head>
        <title>ValidTrust Dashboard - Stellar Smart Contracts</title>
        <meta name="description" content="Interact with ValidTrust smart contracts on the Stellar network." />
      </Head>

      <div className="max-w-3xl space-y-8">
        <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 sm:text-6xl">
          Interact with <span className="text-brand-600">ValidTrust</span> Smart Contracts
        </h1>
        
        <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
          A modern, open-source dashboard for depositing, withdrawing, and claiming rewards using the ValidTrust SDK and Soroban RPC.
        </p>

        <div className="flex justify-center gap-4 pt-6">
          <Link 
            href="/dashboard"
            className="px-8 py-4 bg-brand-600 text-white rounded-xl font-bold text-lg hover:bg-brand-700 transition shadow-lg shadow-brand-200"
          >
            {address ? 'Go to Dashboard' : 'Launch App'}
          </Link>
          
          <a 
            href="https://github.com/validtrust-network/validtrust-dashboard" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-8 py-4 bg-white text-gray-900 border border-gray-200 rounded-xl font-bold text-lg hover:bg-gray-50 transition"
          >
            View on GitHub
          </a>
        </div>

        {/* TODO: add dark mode */}
        {/* TODO: add analytics dashboard */}
        {/* TODO: improve mobile responsiveness */}
      </div>
    </div>
  );
}
