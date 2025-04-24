# ⚙️ Backend – Smart Contract & Deployment

This folder contains the Solidity escrow contract, Foundry build artifacts, and deployment scripts for blockchain simulation.

---

## 🚀 Stack & Features

- **Solidity** – Escrow contract logic
- **Foundry** – Compilation, ABI/artifact generation
- **Node.js + viem** – Deployment scripting
- **dotenv** – Secure environment variable handling
- **Base Sepolia** testnet deployment

---

## 📂 Folder Structure

```
backend/
├── contracts/
│   └── Escrow.sol         # Main smart contract
├── deploy.js              # Deployment script (Node.js + viem)
├── escrow-address.txt     # Stores deployed contract address
├── .env                   # RPC URL, private key (never commit!)
├── package.json           # Backend dependencies
├── out/                   # Foundry build artifacts (ABI, bytecode)
└── ...
```

---

## ⚡️ Getting Started

1. Install dependencies:
   ```bash
   npm install
   # or yarn install
   ```
2. Create a `.env` file:
   ```env
   RPC_URL=YOUR_BASE_SEPOLIA_RPC
   PRIVATE_KEY=YOUR_PRIVATE_KEY
   ```
3. Compile the contract with Foundry:
   ```bash
   forge build
   ```
4. Deploy the contract:
   ```bash
   node deploy.js
   ```
5. The deployed address will be saved in `escrow-address.txt`.

---

## 🔗 Contract Details

- Contract: `contracts/Escrow.sol`
- Roles: Buyer, Seller, Agent
- States: Initiated → Funded → Confirmed → Released/Disputed → Resolved
- ABI: Generated in `out/` and used by frontend

---

## 🔒 Security Notes

- **Never commit your `.env` file** (it is in .gitignore)
- Use testnet private keys only
- Always verify contract address before frontend integration

---

## 📄 Reference

- [Foundry Book](https://book.getfoundry.sh/)
- [viem Docs](https://viem.sh/docs/)
- [Base Sepolia Explorer](https://sepolia.basescan.org)

---
