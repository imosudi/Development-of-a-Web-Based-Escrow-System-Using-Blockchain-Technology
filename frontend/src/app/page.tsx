"use client";
import { useState } from "react";
import { WagmiConfig } from "wagmi";
import { baseSepolia } from "wagmi/chains";
import {
  getDefaultConfig,
  RainbowKitProvider,
  ConnectButton,
} from "@rainbow-me/rainbowkit";
import { useAccount, useContractRead, useWriteContract } from "wagmi";
import { ESCROW_ABI, ESCROW_ADDRESS } from "../escrowConfig";
import '@rainbow-me/rainbowkit/styles.css';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import styles from './page.module.css';

const config = getDefaultConfig({
  appName: "Escrow DApp",
  projectId: "YOUR_WALLETCONNECT_PROJECT_ID", // TODO: Replace with your real WalletConnect Project ID
  chains: [baseSepolia],
  ssr: true,
});

function EscrowDashboard() {
  const { isConnected } = useAccount();
  const [role, setRole] = useState<string | null>(null);

  // Read contract state
  const { data: state } = useContractRead({
    address: ESCROW_ADDRESS as `0x${string}`,
    abi: ESCROW_ABI,
    functionName: "state",
  });
  const { data: buyer } = useContractRead({
    address: ESCROW_ADDRESS as `0x${string}`,
    abi: ESCROW_ABI,
    functionName: "buyer",
  });
  const { data: seller } = useContractRead({
    address: ESCROW_ADDRESS as `0x${string}`,
    abi: ESCROW_ABI,
    functionName: "seller",
  });
  const { data: agent } = useContractRead({
    address: ESCROW_ADDRESS as `0x${string}`,
    abi: ESCROW_ABI,
    functionName: "agent",
  });
  const { data: amount } = useContractRead({
    address: ESCROW_ADDRESS as `0x${string}`,
    abi: ESCROW_ABI,
    functionName: "amount",
  });

  // New wagmi v1+ contract write pattern
  const { writeContract, isPending, isSuccess, error } = useWriteContract();

  // Action handlers
  const handleFund = () => {
    writeContract({
      address: ESCROW_ADDRESS as `0x${string}`,
      abi: ESCROW_ABI,
      functionName: "fund",
      value: typeof amount === "bigint" ? amount : 0n,
    });
  };
  const handleConfirmDelivery = () => {
    writeContract({
      address: ESCROW_ADDRESS as `0x${string}`,
      abi: ESCROW_ABI,
      functionName: "confirmDelivery",
    });
  };
  const handleRelease = () => {
    writeContract({
      address: ESCROW_ADDRESS as `0x${string}`,
      abi: ESCROW_ABI,
      functionName: "release",
    });
  };
  const handleDispute = () => {
    writeContract({
      address: ESCROW_ADDRESS as `0x${string}`,
      abi: ESCROW_ABI,
      functionName: "dispute",
    });
  };
  const handleResolve = () => {
    writeContract({
      address: ESCROW_ADDRESS as `0x${string}`,
      abi: ESCROW_ABI,
      functionName: "resolve",
      args: [seller], // Default to seller, can be changed
    });
  };
  const handleRefund = () => {
    writeContract({
      address: ESCROW_ADDRESS as `0x${string}`,
      abi: ESCROW_ABI,
      functionName: "refund",
    });
  };

  const stateLabels = [
    "Initiated",
    "Funded",
    "Confirmed",
    "Released",
    "Disputed",
    "Resolved",
  ];

  return (
    <div className={styles['page-container']}>
      <h1>Escrow DApp Dashboard</h1>
      <div className={styles['connect-row']}>
        <ConnectButton />
      </div>
      <div className={styles['role-select']}>
        <strong>Role:</strong>
        <select value={role || ""} onChange={e => setRole(e.target.value)}>
          <option value="">Select Role</option>
          <option value="buyer">Buyer</option>
          <option value="seller">Seller</option>
          <option value="agent">Agent</option>
        </select>
      </div>
      <div className={styles['contract-info']}>
        <div><strong>Contract State:</strong> {typeof state === "number" ? stateLabels[state] : "-"}</div>
        <div><strong>Buyer:</strong> {buyer as string}</div>
        <div><strong>Seller:</strong> {seller as string}</div>
        <div><strong>Agent:</strong> {agent as string}</div>
        <div><strong>Amount:</strong> {amount ? `${Number(amount) / 1e18} ETH` : "-"}</div>
      </div>
      <div className={styles.actions}>
        {role === "buyer" && (
          <button onClick={handleFund} disabled={!isConnected || isPending}>
            Fund Escrow
          </button>
        )}
        {role === "seller" && (
          <button onClick={handleConfirmDelivery} disabled={!isConnected || isPending}>
            Confirm Delivery
          </button>
        )}
        {(role === "buyer" || role === "agent") && (
          <button onClick={handleRelease} disabled={!isConnected || isPending}>
            Release Funds
          </button>
        )}
        {(role === "buyer" || role === "seller") && (
          <button onClick={handleDispute} disabled={!isConnected || isPending}>
            Dispute
          </button>
        )}
        {role === "agent" && (
          <button onClick={handleResolve} disabled={!isConnected || isPending}>
            Resolve (to Seller)
          </button>
        )}
        {role === "agent" && (
          <button onClick={handleRefund} disabled={!isConnected || isPending}>
            Refund Buyer
          </button>
        )}
      </div>
      <div className={
        isPending ? `${styles['status-message']} ${styles['pending']}` :
        isSuccess ? `${styles['status-message']} ${styles['success']}` :
        error ? `${styles['status-message']} ${styles['error']}` : styles['status-message']
      }>
        {isPending && <div>Transaction pending...</div>}
        {isSuccess && <div>Transaction succeeded!</div>}
        {error && <div>Error: {error.message}</div>}
      </div>
    </div>
  );
}

export default function Home() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiConfig config={config}>
        <RainbowKitProvider>
          <div className={styles['app-outer']}>
            <EscrowDashboard />
          </div>
        </RainbowKitProvider>
      </WagmiConfig>
    </QueryClientProvider>
  );
}
