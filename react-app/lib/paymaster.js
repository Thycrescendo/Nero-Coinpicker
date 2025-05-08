// frontend/lib/paymaster.js
import { createPublicClient, http } from 'viem'
import { neroTestnet, neroMainnet } from 'viem/chains'
import { createPaymasterClient } from '@nero-chain/aa-sdk'

// Initialize clients for both networks
const neroClients = {
  testnet: createPublicClient({
    chain: neroTestnet,
    transport: http(process.env.NEXT_PUBLIC_NERO_TESTNET_RPC)
  }),
  mainnet: createPublicClient({
    chain: neroMainnet,
    transport: http(process.env.NEXT_PUBLIC_NERO_MAINNET_RPC)
  })
}

// Paymaster configuration
export const paymaster = createPaymasterClient({
  defaultPolicy: {
    sponsorship: 'conditional', // Options: 'full', 'conditional', 'none'
    gasToken: 'any', // Accept any ERC20 as gas
    allowedTokens: ['0x...', '0x...'], // Specific token addresses if needed
    maxGasPerTx: 500000 // Gas limit per sponsored tx
  },
  chains: {
    [neroTestnet.id]: {
      paymasterUrl: process.env.NEXT_PUBLIC_PAYMASTER_TESTNET_URL,
      policyId: process.env.NEXT_PUBLIC_PAYMASTER_TESTNET_POLICY
    },
    [neroMainnet.id]: {
      paymasterUrl: process.env.NEXT_PUBLIC_PAYMASTER_MAINNET_URL,
      policyId: process.env.NEXT_PUBLIC_PAYMASTER_MAINNET_POLICY
    }
  }
})

// Core Paymaster functions
export const sponsorUserOperation = async (userOp, chainId) => {
  return paymaster.sponsorOperation(userOp, { chainId })
}

export const estimateGasCost = async (userOp, chainId) => {
  return paymaster.estimateGasCost(userOp, { chainId })
}

export const getPaymasterData = async (userOp, chainId) => {
  return paymaster.getPaymasterData(userOp, { chainId })
}

// Merchant-specific functions
export const setupMerchantPolicy = async (merchantConfig) => {
  return paymaster.createPolicy({
    type: 'merchant',
    ...merchantConfig
  })
}

// Token gas payment utilities
export const convertTokenToGas = async (tokenAmount, tokenAddress, chainId) => {
  return paymaster.convertTokenAmountToGas(tokenAmount, tokenAddress, { chainId })
}