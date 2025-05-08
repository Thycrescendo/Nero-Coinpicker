# React Framework + NextJS | NERO Composer

This NERO-focused starter template combines Next.js with TailwindCSS and essential Web3 tooling for building dApps on NERO Chain. The boilerplate includes pre-configured Account Abstraction support through NERO's SDK.

## Setup & Installation

```bash
yarn install
```

Install all dependencies including NERO-specific Web3 tooling.

> This template includes optional Hardhat integration for full-stack development. Remove the `hardhat` folder if not needed.

Start the development server:
```bash
yarn dev
```

## Key Features

- **NERO Chain Optimized** - Built for NERO's AA ecosystem
- **Gasless Ready** - Pre-configured Paymaster integration
- **Any-Token Payments** - Supports NERO's flexible gas system

## Core Dependencies

### Default Stack
- [Next.js](https://nextjs.org/) (App Router)
- [TailwindCSS](https://tailwindcss.com/) with UI components
- [viem](https://viem.sh/) for blockchain interactions

### NERO-Specific
- `@nero-chain/aa-sdk` (Account Abstraction tools)
- `@nero-chain/wagmi-connector` (Wallet connection)
- `@rainbow-me/rainbowkit` (Wallet UI with NERO support)

## Project Structure

```
/nero-dapp/
├── app/                    # Next.js app router
│   ├── (web3)/             # Web3-enabled routes
│   │   └── page.tsx        # Main dApp interface
├── components/
│   ├── web3/               # AA-enabled components
│   │   ├── PaymasterButton.tsx
│   │   └── TokenCheckout.tsx
├── lib/
│   ├── chains.ts           # NERO chain configurations
│   └── paymaster.ts        # Gas sponsorship logic
├── public/                 # Static assets
└── hardhat/                # Optional contract integration
```

## NERO Wallet Configuration

```typescript
// lib/chains.ts
import { neroTestnet, neroMainnet } from '@nero-chain/viem-config'

export const chains = [neroTestnet, neroMainnet]
export const config = createConfig({
  chains,
  connectors: [
    new NEROConnector({
      chains,
      options: { projectId: 'your-walletconnect-id' }
    })
  ]
})
```

## Implementing Gasless Transactions

```typescript
// components/web3/PaymasterButton.tsx
'use client'
import { usePaymaster } from '@nero-chain/aa-sdk'

export function GaslessButton() {
  const { sponsorTransaction } = usePaymaster()
  
  const handleClick = async () => {
    const sponsoredTx = await sponsorTransaction({
      to: '0x...',
      data: '0x...'
    })
    // Submit to NERO's bundler
  }

  return <button onClick={handleClick}>Send Gasless Tx</button>
}
```

## Development Scripts

| Command | Description |
|---------|-------------|
| `yarn dev` | Start development server |
| `yarn build` | Create production build |
| `yarn generate:aa` | Generate AA contract types |
| `yarn test:ui` | Run component tests |

## NERO-Specific Features

1. **Session Keys** - Enable recurring transactions
```typescript
const sessionKey = await createSessionKey({
  validUntil: Date.now() + 86400, // 24 hours
  permissions: ['token-transfer']
})
```

2. **Batch Transactions** - Combine multiple operations
```typescript
const batchTx = await neroBundler.batch([
  tokenApproval,
  nftPurchase,
  gasPayment
])
```

3. **Cross-Chain Checkout** 
```typescript
const crossChainTx = await neroBridge.initiateTransfer({
  destinationChain: 'arbitrum',
  token: '0x...',
  amount: 100
})
```

For full documentation visit [NERO Developer Portal](https://docs.nerochain.io).