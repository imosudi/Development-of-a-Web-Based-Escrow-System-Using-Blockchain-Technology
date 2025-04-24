require("dotenv").config({ path: "./.env" });
const fs = require("fs");
const path = require("path");
const { createWalletClient, createPublicClient, http } = require("viem");
const { privateKeyToAccount } = require("viem/accounts");
const { baseSepolia } = require("viem/chains");

// Load env variables
const BASE_SEPOLIA_RPC_URL = process.env.BASE_SEPOLIA_RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
if (!BASE_SEPOLIA_RPC_URL || !PRIVATE_KEY) {
  throw new Error("Missing BASE_SEPOLIA_RPC_URL or PRIVATE_KEY in .env");
}

// Read compiled contract (Foundry output)
const artifactPath = path.join(__dirname, "out/Escrow.sol/Escrow.json");
if (!fs.existsSync(artifactPath)) {
  throw new Error("Compiled Escrow.json not found. Run 'forge build' first.");
}
const artifact = JSON.parse(fs.readFileSync(artifactPath));
// Robustly extract ABI and bytecode
let abi = artifact.abi;
if (typeof abi === "string") abi = JSON.parse(abi);
let bytecode = artifact.bytecode;
if (typeof bytecode === "object" && bytecode.object) bytecode = bytecode.object;

// Replace with actual addresses
const seller = "0x2CE7756B09e0BE1306aC18d0968D36F259c76447"; // Replace with seller address
const agent = "0xAA637a2E66407E15D7f74C423A93E36982591B8B";   // Replace with agent address

async function main() {
  const account = privateKeyToAccount(PRIVATE_KEY);
  const client = createWalletClient({
    account,
    chain: baseSepolia,
    transport: http(BASE_SEPOLIA_RPC_URL),
  });
  const publicClient = createPublicClient({
    chain: baseSepolia,
    transport: http(BASE_SEPOLIA_RPC_URL),
  });

  console.log("Deploying Escrow contract to Base Sepolia...");
  const hash = await client.deployContract({
    abi,
    bytecode,
    args: [seller, agent],
  });

  console.log("Deployment transaction hash:", hash);

  // Wait for the contract address using the public client
  const receipt = await publicClient.waitForTransactionReceipt({ hash });
  console.log("Deployed contract address:", receipt.contractAddress);

  // Save deployed address for frontend use
  fs.writeFileSync(
    path.join(__dirname, "escrow-address.txt"),
    receipt.contractAddress
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
