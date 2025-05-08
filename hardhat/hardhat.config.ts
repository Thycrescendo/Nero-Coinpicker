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
        neroTestnet: {
            url: "https://testnet-rpc.nerochain.io",
            accounts: [PRIVATE_KEY],
            chainId: 7979,
            gas: "auto",
            gasPrice: "auto",
            accountAbstraction: {
                enabled: true,
                paymaster: {
                    url: process.env.NERO_PAYMASTER_URL,
                    policyId: process.env.NERO_PAYMASTER_POLICY_ID
                }
            }
        },
        neroMainnet: {
            url: "https://rpc.nerochain.io",
            accounts: [PRIVATE_KEY_M],
            chainId: 7070, 
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
            neroTestnet: String(process.env.NERO_SCAN_API_KEY),
            neroMainnet: String(process.env.NERO_SCAN_API_KEY)
        },
        customChains: [
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
            7979: `privatekey://${PRIVATE_KEY}`, 
            7070: `privatekey://${PRIVATE_KEY_M}` 
        },
        nativeGasToken: {
            7979: "0x0000000000000000000000000000000000000000", 
            7070: "0x0000000000000000000000000000000000000000"
        },
        neroUSD: {
            7979: process.env.NERO_TESTNET_USD || "",
            7070: process.env.NERO_MAINNET_USD || ""
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
                entryPoint: "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789"
            }
        }
    }
};

export default config;