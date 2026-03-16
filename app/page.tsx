"use client";

import Home from "./components/HomeElement";
import { useState } from "react";
import { SolanaSelected } from "./components/SolanaSelected";
import { EthereumSelected } from "./components/EthereumSelected";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function MainPage() {
  const [blockchainSelected, setBlockchainSelected] = useState<string | null>(null);

  const renderContent = () => {
    switch (blockchainSelected) {
      case "Solana":
        return <SolanaSelected blockchainSelected={blockchainSelected} />;

      case "Ethereum":
        return <SolanaSelected blockchainSelected={blockchainSelected} />;

      default:
        return (
          <>
          <Home
            blockchainSelected={blockchainSelected}
            setBlockchainSelected={setBlockchainSelected}
          />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen w-full flex justify-center px-4 sm:px-6 lg:px-8">
      
      {/* Responsive content container */}
      <div className="w-full max-w-6xl">
        {renderContent()}
      </div>

    </div>
  );
}