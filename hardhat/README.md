# Nero-Coinpicker | Hardhat Deployment

## Getting Started

1. Create your environment file:
```bash
cp .env.example .env
```

2. Configure your `.env` file with these essential variables:
```bash
# Required for deployment
PRIVATE_KEY=your_wallet_private_key

# Required for verification
NEROSCAN_API_KEY=your_api_key_from_neroscan

# NERO Chain RPC endpoints
NERO_TESTNET_RPC=https://rpc-testnet.nerochain.io
NERO_MAINNET_RPC=https://rpc.nerochain.io

# Paymaster Configuration (optional for AA)
PAYMASTER_URL=https://aa.nerochain.io/paymaster
PAYMASTER_POLICY_ID=your_policy_id
```

## Deployment Commands

### Testnet Deployment
```bash
npx hardhat ignition deploy ./ignition/modules/CoinPickerModule.ts --network nero_testnet
```

### Mainnet Deployment
```bash
npx hardhat ignition deploy ./ignition/modules/CoinPickerModule.ts --network nero_mainnet
```

## Contract Verification

For Testnet Verification:
```bash
npx hardhat verify [CONTRACT_ADDRESS] [...CONSTRUCTOR_ARGS] --network nero_testnet
```

For Mainnet Verification:
```bash
npx hardhat verify [CONTRACT_ADDRESS] [...CONSTRUCTOR_ARGS] --network nero_mainnet
```

## Key Configuration

The `hardhat.config.ts` includes these NERO-specific settings:
```typescript
networks: {
  nero_testnet: {
    url: process.env.NERO_TESTNET_RPC,
    chainId: 689, // Official NERO testnet ID
    accounts: [process.env.PRIVATE_KEY!]
  },
  nero_mainnet: {
    url: process.env.NERO_MAINNET_RPC,
    chainId: 7070, // Official NERO mainnet ID
    accounts: [process.env.PRIVATE_KEY!]
  }
},
etherscan: {
  apiKey: {
    nero_testnet: process.env.NEROSCAN_API_KEY!,
    nero_mainnet: process.env.NEROSCAN_API_KEY!
  },
  customChains: [
    {
      network: "nero_testnet",
      chainId: 689,
      urls: {
        apiURL: "https://api-testnet.neroscan.io/api",
        browserURL: "https://testnet.neroscan.io"
      }
    }
  ]
}
```

## Account Abstraction Features

To enable gasless transactions:
1. Configure your Paymaster in `hardhat.config.ts`:
```typescript
nero: {
  accountAbstraction: {
    enabled: true,
    paymaster: {
      url: process.env.PAYMASTER_URL,
      policyId: process.env.PAYMASTER_POLICY_ID
    }
  }
}
```

2. Use in your deployment module:
```typescript
// ignition/modules/CoinPickerModule.ts
const coinPicker = await m.contract("CoinPicker", [], {
  paymaster: true // Enable gas sponsorship
});
```

## Additional Resources

1. [NERO Chain Documentation](https://docs.nerochain.io)
2. [NEROScan API Keys](https://neroscan.io/myapikey)
3. [Testnet Faucet](https://faucet.nerochain.io)
