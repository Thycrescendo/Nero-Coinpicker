import { config as dotConfig } from "dotenv";
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-ignition-ethers"; 
import "hardhat-etherscan"; // For verification

dotConfig();

const PRIVATE_KEY = process.env.PRIVATE_KEY!;
const PRIVATE_KEY_M = process.env.PRIVATE_KEY_M!;

const config: HardhatUserConfig = {
    defaultNetwork: "nero_testnet", 
    networks: {
        nero_testnet: { 
            url: process.env.NERO_TESTNET_PROVIDER_URL || "https://rpc-testnet.nerochain.io",
            accounts: [PRIVATE_KEY],
            chainId: 689, 
            gas: "auto",
            gasPrice: "auto"
        },
        nero_mainnet: { 
            url: process.env.NERO_MAINNET_PROVIDER_URL || "https://rpc.nerochain.io",
            accounts: [PRIVATE_KEY_M],
            chainId: 7070, 
            gas: "auto",
            gasPrice: "auto"
        }
    },
    etherscan: {
        apiKey: {
            nero_testnet: process.env.API_KEY!, 
            nero_mainnet: process.env.API_KEY!
        },
        customChains: [
            {
                network: "nero_testnet",
                chainId: 689, 
                urls: {
                    apiURL: "https://api-testnet.neroscan.io/api",
                    browserURL: "https://testnet.neroscan.io"
                }
            },
            {
                network: "nero_mainnet",
                chainId: 7070, 
                urls: {
                    apiURL: "https://api.neroscan.io/api", 
                    browserURL: "https://neroscan.io" 
                }
            }
        ]
    },
    namedAccounts: {
        deployer: {
            default: 0,
            689: PRIVATE_KEY, 
            7070: PRIVATE_KEY_M 
        },
        gasToken: {
            689: "0x0000000000000000000000000000000000000000",
            7070: "0x0000000000000000000000000000000000000000"
        }
    },
    solidity: {
        version: "0.8.24", 
        settings: {
            optimizer: {
                enabled: true,
                runs: 200
            },
            evmVersion: "london",
            metadata: {
                bytecodeHash: "ipfs"
            }
        }
    },
    ignition: { 
        strategyConfig: {
            create2: {
                salt: process.env.DEPLOYMENT_SALT 
            }
        }
    }
};

export default config;