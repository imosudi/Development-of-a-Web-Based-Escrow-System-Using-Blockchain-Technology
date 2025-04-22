# 📦 Blockchain Escrow Simulation – Student Version

A full-stack simulation of a decentralized escrow system using smart contracts, blockchain, and a modern web frontend.

---

## 🛠 Tools Used

- **Solidity** – Smart contract language  
- **Foundry** – Solidity development & compilation  
- **Node.js** – Deployment scripting  
- **viem** – Modern EVM interaction library  
- **dotenv** – Environment variable management  
- **Git** – Version control  

---

## 📁 Folder Structure

```
repo-root/
│
├── backend/              # Smart contract, deployment scripts, Foundry config
│   ├── contracts/        # Solidity contract(s)
│   │   └── Escrow.sol
│   ├── deploy.js         # Node.js deployment script (viem)
│   ├── escrow-address.txt# Deployed contract address
│   ├── .gitignore
│   ├── package.json      # Backend dependencies
│   └── ...
│
├── frontend/             # Next.js DApp frontend
│   ├── src/              # App source (pages, config, hooks)
│   ├── public/           # Static assets
│   ├── escrow-address.txt# Used for contract integration
│   ├── .env.local        # Frontend environment variables
│   ├── package.json      # Frontend dependencies
│   └── ...
│
├── README.md             # Project overview (this file)
└── ...
```

---

## 📋 Summary of Implementation

- Designed and implemented an **Escrow smart contract** in Solidity supporting:
  - Buyer, Seller, and Agent roles  
  - Full state transitions:
    ```
    Initiated → Funded → Confirmed → Released/Disputed → Resolved
    ```
- Compiled the contract using **Foundry**, generating ABI and bytecode artifacts.  
- Created a robust deployment script (`deploy.js`) using **viem**, supporting Base Sepolia testnet and handling Foundry artifact formats.  
- Deployed the contract to **Base Sepolia**; deployment address stored in `escrow-address.txt`.  
- All sensitive configuration (RPC URL, private key) is managed securely via `.env`.  
- Project is fully version-controlled with a dedicated `student-version` branch.  

---

## 🔗 Links to Dataset(s)

- [[Thirdweb](https://thirdweb.com/)](https://thirdweb.com)  
- [[Goerli Etherscan](https://goerli.etherscan.io/)](https://goerli.etherscan.io)  
- [[Thirdweb GitHub](https://github.com/thirdweb-dev)](https://github.com/thirdweb-dev)  
- [[Base Sepolia Explorer](https://sepolia.basescan.org/)](https://sepolia.basescan.org)  
- Local mock data & contract logs (see repo files)

---

## 📸 Screenshots or Visual Outputs

- ✅ **Compilation Screenshot**  
![compilation](https://github.com/user-attachments/assets/ec4ff6cf-414d-4a1d-aaf7-f30f34834aee)

- 🚀 **Deployment Screenshot**  
![deployment](https://github.com/user-attachments/assets/919491fb-3f24-460b-a674-6ae655bb2eef)
- 📄 `escrow-address.txt` – Contains deployed contract address (for frontend integration)

---

## 📚 Understanding of Background Studies

### 🔗 Blockchain Simulation
This project emulates a decentralized escrow process governed by smart contracts, recording all actions immutably **on-chain**.

### 🔐 Escrow Contract Simulation
Models conditional fund release based on **multi-party agreement**, including Buyer, Seller, and Agent (for dispute resolution).

### 🤖 Smart Contracts
Self-executing agreements deployed on the **Ethereum-compatible Base Sepolia testnet**, ensuring tamper-proof and automated state transitions.

### 👥 Multisig Wallet Simulation
The contract supports **Agent intervention** during disputes, simulating a **multi-signature-like process** for secure fund release.

### ⏱ Transaction Latency Analysis
All deployment and transaction hashes are logged, enabling future analysis of:
- Confirmation times  
- Gas costs  

### 🧱 Decentralized Architecture
No central authority; **all logic and state transitions** are enforced by the smart contract.

---

## 🖥 UI-Blockchain Integration (Planned)

Next steps include building a **Next.js frontend** to:
- Handle wallet login  
- Enable user interaction with the contract  
- Visualize escrow states and real-time analytics  

---

## ⚙️ Performance Simulation

The system is designed to simulate and evaluate:
- **Gas costs**  
- **Time complexity**  
- **Robustness** under varying load conditions  

---

## 📂 Additional Folder READMEs

- See [`frontend/README.md`](./frontend/README.md) for DApp usage and setup.
- See [`backend/README.md`](./backend/README.md) for contract, deployment, and backend tooling.

---

## 👤 Author

jvcByte

---
