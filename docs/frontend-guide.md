# Frontend Development Guide

## Component Design

We follow atomic design principles where possible:
- **Small components**: Reusable buttons, inputs, and icons.
- **Composite components**: Forms (`DepositForm`, `WithdrawForm`) and Cards (`BalanceCard`).
- **Pages**: Higher-level views that aggregate composite components and pass down state from hooks.

## Hooks Usage

- **`useWallet`**: Manages the connection to the Stellar wallet (Freighter). It provides the connected address, connection state, and a method to sign transactions.
- **`useVault`**: Handles the business logic for the ValidTrust Vault. It depends on `useWallet` for the active address and provides functions like `deposit`, `withdraw`, and `claimRewards`.

## Extension Points

Contributors can easily add new features by following these steps:
1. **New Contracts**: Add new contract IDs in `utils/contractHelpers.ts` and create corresponding hooks (e.g., `useGovernance`).
2. **New Wallets**: Extend `useWallet` to support Albedo, xBull, etc.
3. **New UI**: Create new components in `components/` and add them to the dashboard layout.
