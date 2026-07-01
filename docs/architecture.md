# Architecture

## Frontend Architecture

The ValidTrust Dashboard is built using **Next.js** with the **Pages router**. It follows a standard React component hierarchy with customized hooks for interacting with the Stellar blockchain.

### Directory Structure

- `components/`: Reusable UI components (Navbar, forms, cards).
- `pages/`: Next.js routing (index and dashboard).
- `hooks/`: State management and side effects, wrapping the Axionvera SDK and Stellar wallet API.
- `utils/`: Network configuration and contract helper functions.
- `styles/`: Global Tailwind CSS configuration.

## Contract Interaction

The dashboard interacts with ValidTrust smart contracts on Soroban via the **Axionvera SDK** and **Soroban RPC**.

1. **Wallet Connection**: `useWallet` hook handles authentication via Freighter (or other Stellar wallets).
2. **Read Operations**: `useVault` fetches the vault balance using Soroban RPC and the Axionvera SDK.
3. **Write Operations**: Deposits, withdrawals, and claims are signed using the connected wallet and broadcasted via the SDK.

The data flow is unidirectional:
- User Action -> React Component -> Custom Hook -> Axionvera SDK -> Soroban RPC -> Stellar Blockchain.
