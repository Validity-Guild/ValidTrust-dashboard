<div align="center">

![ValidTrust Dashboard Logo](logo/valid%20dashboard%20logo.png)

# ValidTrust Dashboard

**A modern Web3 interface for interacting with the ValidTrust protocol on Stellar.**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Stellar](https://img.shields.io/badge/Stellar-Soroban-7C3AED?logo=stellar)](https://soroban.stellar.org/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

</div>

---

## Overview

ValidTrust Dashboard is the official frontend interface for the [ValidTrust Network](https://github.com/validtrust-network/validtrust-network). It enables users to seamlessly connect their Stellar wallets and interact with the ValidTrust smart contracts — depositing assets, withdrawing funds, and claiming rewards — all from a clean, real-time web interface.

Built with **Next.js 16**, **React 18**, **TypeScript**, and **Tailwind CSS**, the dashboard is designed to be fast, accessible, and easy to extend.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running Locally](#running-locally)
- [Connecting Your Wallet](#connecting-your-wallet)
- [Running Tests](#running-tests)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

---

## Features

| Feature | Description |
|---|---|
| 🔗 **Wallet Connection** | Connect via Freighter and other supported Stellar wallets |
| 💰 **Deposit Tokens** | Deposit Stellar assets directly into the ValidTrust Vault |
| 🏧 **Withdraw Tokens** | Securely withdraw your deposited funds at any time |
| 🎁 **Claim Rewards** | Claim proportional rewards earned through ValidTrust Network participation |
| 📊 **Balance & History** | View your real-time vault balance and full transaction history |

---

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 3](https://tailwindcss.com/)
- **Blockchain**: [Stellar](https://stellar.org/) via [Soroban](https://soroban.stellar.org/)
- **Wallet Integration**: [@stellar/freighter-api](https://www.npmjs.com/package/@stellar/freighter-api)
- **Testing**: [Jest](https://jestjs.io/) + [React Testing Library](https://testing-library.com/)

---

## Getting Started

### Prerequisites

Ensure you have the following installed before proceeding:

- **Node.js** v18 or higher — [Download](https://nodejs.org/)
- **npm** or **yarn**
- **Freighter Wallet** browser extension — [Install](https://www.freighter.app/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/validtrust-network/validtrust-dashboard.git
   cd validtrust-dashboard
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**

   Create a `.env.local` file in the root directory and add your environment-specific values:
   ```env
   NEXT_PUBLIC_SOROBAN_RPC_URL=https://soroban-testnet.stellar.org
   NEXT_PUBLIC_NETWORK_PASSPHRASE=Test SDF Network ; September 2015
   NEXT_PUBLIC_CONTRACT_ID=YOUR_CONTRACT_ID_HERE
   ```

### Running Locally

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The page will hot-reload as you make changes.

To build for production:
```bash
npm run build
npm start
```

---

## Connecting Your Wallet

1. Install the [Freighter browser extension](https://www.freighter.app/) and set it to the **Testnet** network.
2. Click the **"Connect Wallet"** button in the navigation bar.
3. Approve the connection request in Freighter.
4. Your Stellar public key will be displayed and you will have full access to all dashboard features.

> **Note:** Ensure Freighter is configured to the same network (Testnet or Mainnet) as the deployed ValidTrust contracts.

---

## Running Tests

Run the full test suite using Jest and React Testing Library:

```bash
npm test
```

To run the linter:

```bash
npm run lint
```

---

## Project Structure

```
validtrust-dashboard/
├── docs/                   # Architecture and frontend guides
├── src/
│   ├── app/                # Next.js App Router pages
│   ├── components/         # Reusable UI components
│   └── lib/                # Stellar/Soroban client utilities
├── tests/                  # Jest integration tests
├── public/                 # Static assets
└── README.md
```

---

## Funding and Drips

This repository is part of the ValidTrust ecosystem, which is eligible for funding through [Drips](https://drips.network).

### Repository Claiming
Maintainers should claim this repository on Drips to receive funding. The claiming process may require adding a `FUNDING.json` file with ownership information to the repository root. **Important**: Do not create `FUNDING.json` with placeholder wallet addresses - only add real, maintainer-approved addresses.

### Upstream Dependencies
Key dependencies that may be relevant for Drips funding:
- `@stellar/stellar-sdk` - Stellar blockchain SDK
- `next.js` - Frontend framework
- `react` - UI library

For more details on Drips readiness, see [docs/drips-readiness.md](docs/drips-readiness.md).

---

## Contributing

We welcome contributions from the community! Whether you're fixing a bug, adding a feature, or improving documentation, your help is valued.

Please read our [Contributing Guidelines](CONTRIBUTING.md) and review the [Frontend Guide](docs/frontend-guide.md) and [Architecture Overview](docs/architecture.md) before submitting a Pull Request.

**Open contribution opportunities include:**
- Dark mode support
- Additional Stellar wallet integrations (Albedo, xBull)
- Network-wide analytics dashboard
- Mobile responsiveness improvements
- Governance interface

---

## License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.
