import type { AppProps } from 'next/app';
import '../styles/globals.css';
import { Navbar } from '../components/layout/Navbar';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="min-h-screen max-w-5xl mx-auto px-4 py-8 font-sans">
      <Navbar />
      <main>
        <Component {...pageProps} />
      </main>
      <footer className="mt-16 text-center text-sm text-gray-500 py-6 border-t border-gray-200">
        <p>© {new Date().getFullYear()} ValidTrust Dashboard. Open Source.</p>
        <div className="mt-2 flex justify-center gap-4">
          <a href="#" className="hover:text-brand-600 transition">GitHub</a>
          <a href="#" className="hover:text-brand-600 transition">Documentation</a>
          <a href="#" className="hover:text-brand-600 transition">Discord</a>
        </div>
      </footer>
    </div>
  );
}
