# 🖥 Frontend DApp – Next.js

This folder contains the web-based DApp for interacting with the blockchain escrow smart contract.

---

## 🚀 Stack & Features

- **Next.js** (TypeScript, App Router)
- **RainbowKit, wagmi, viem** – wallet connection, contract read/write
- **Base Sepolia** testnet integration
- **Escrow state visualization**
- **Modern UI/UX**

---

## 📂 Folder Structure

```
frontend/
├── src/
│   ├── app/                # Main app pages/components
│   │   ├── page.tsx        # Dashboard UI
│   │   ├── layout.tsx      # Layout wrapper
│   │   ├── globals.css     # Global styles
│   │   └── page.module.css # Component styles
│   ├── escrowConfig.ts     # Contract ABI & address import
│   └── Escrow.json         # Contract ABI artifact
├── public/                 # Static assets (SVGs, favicon)
├── escrow-address.txt      # Deployed contract address
├── .env.local              # Frontend environment variables
├── package.json            # Dependencies
└── ...
```

---

## ⚡️ Getting Started

1. Install dependencies:
   ```bash
   npm install
   # or yarn install
   ```
2. Set up `.env.local` (see example below).
3. Ensure `escrow-address.txt` contains the deployed contract address.
4. Run the dev server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000)

---

## 🔑 Environment Variables

- `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` – Your WalletConnect project ID
- (Other variables as needed for analytics, etc.)

---

## 🔗 Contract Integration

- Contract ABI is loaded from `src/Escrow.json`.
- Contract address is read from `escrow-address.txt`.
- All blockchain interactions use wagmi/viem hooks.

---

## 👤 User Flow

- Connect wallet (RainbowKit)
- View escrow state and participants
- Initiate, confirm, release, or dispute escrow (if permitted by role)
- See real-time contract state updates

---

## 🛠 Customization

- Update UI in `src/app/page.tsx` and styles in `page.module.css`.
- To add new features, create new components under `src/app/`.

---

## 📄 Reference

- [Next.js Docs](https://nextjs.org/docs)
- [RainbowKit Docs](https://rainbowkit.com/docs)
- [wagmi Docs](https://wagmi.sh/docs)
- [Base Sepolia Explorer](https://sepolia.basescan.org)

---
