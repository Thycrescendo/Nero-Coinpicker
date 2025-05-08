import { config as dotConfig } from "dotenv";
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-deploy";
import "@nero-chain/hardhat-nero"; 

dotConfig();

const PRIVATE_KEY = String(process.env.PRIVATE_KEY);
const PRIVATE_KEY_M = String(process.env.PRIVATE_KEY_M);

const config: HardhatUserConfig = {
    networks: {
        // Existing Celo networks remain for reference
        alfajores: {
            url: "https://alfajores-forno.celo-testnet.org",
            accounts: [PRIVATE_KEY],
        },
        celo: {
            url: "https://forno.celo.org",
            accounts: [PRIVATE_KEY],
        },
        // New NERO Chain configurations
        neroTestnet: {
            url: "https://testnet-rpc.nerochain.io",
            accounts: [PRIVATE_KEY],
            chainId: 7979, // Example testnet chain ID
            gas: "auto",
            gasPrice: "auto",
            // AA Configuration
            accountAbstraction: {
                enabled: true,
                paymaster: {
                    url: "https://aa.nerochain.io/paymaster",
                    policyId: process.env.NERO_PAYMASTER_POLICY_ID
                }
            }
        },
        neroMainnet: {
            url: "https://rpc.nerochain.io",
            accounts: [PRIVATE_KEY_M],
            chainId: 7070, // Example mainnet chain ID
            gas: "auto",
            gasPrice: "auto",
            accountAbstraction: {
                enabled: true,
                paymaster: {
                    url: "https://aa.nerochain.io/paymaster",
                    policyId: process.env.NERO_PAYMASTER_POLICY_ID
                }
            }
        }
    },
    etherscan: {
        apiKey: {
            alfajores: String(process.env.CELOSCAN_API_KEY),
            celo: String(process.env.CELOSCAN_API_KEY),
            neroTestnet: String(process.env.NERO_SCAN_API_KEY),
            neroMainnet: String(process.env.NERO_SCAN_API_KEY)
        },
        customChains: [
            // Existing Celo chains...
            {
                network: "neroTestnet",
                chainId: 7979,
                urls: {
                    apiURL: "https://testnet-scan.nerochain.io/api",
                    browserURL: "https://testnet-scan.nerochain.io"
                }
            },
            {
                network: "neroMainnet",
                chainId: 7070,
                urls: {
                    apiURL: "https://scan.nerochain.io/api",
                    browserURL: "https://scan.nerochain.io"
                }
            }
        ],
    },
    namedAccounts: {
        deployer: {
            default: 0,
            7979: `privatekey://${PRIVATE_KEY}`, // neroTestnet
            7070: `privatekey://${PRIVATE_KEY_M}` // neroMainnet
        },
        nativeGasToken: {
            7979: "0x0000000000000000000000000000000000000000", 
            7070: "0x0000000000000000000000000000000000000000"
        },
        neroUSD: {
            7979: "0x1234...",
            7070: "0x5678..."
        }
    },
    solidity: {
        version: "0.8.20",
        settings: {
            optimizer: {
                enabled: true,
                runs: 200,
            },
            evmVersion: "london",
            metadata: {
                bytecodeHash: "ipfs"
            }
        }
    },
    nero: {
        accountAbstraction: {
            enabled: true,
            paymaster: {
                url: process.env.NERO_PAYMASTER_URL,
                apiKey: process.env.NERO_PAYMASTER_API_KEY
            },
            userOp: {
                bundlerUrl: process.env.NERO_BUNDLER_URL,
                entryPoint: "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789" // Standard entry point
            }
        }
    }
};

export default config;