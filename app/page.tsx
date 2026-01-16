"use client";
import Home from './components/HomeElement';
import { useState } from 'react';
import { SolanaSelected } from './components/SolanaSelected';
import { EthereumSelected } from './components/EthereumSelected';


export default function MainPage() {
  const [blockchainSelected, setBlockchainSelected] = useState<string | null>(null);
  


  console.log("Blockchain selected:", blockchainSelected);
  const renderContent = () => {
    switch(blockchainSelected) {
        case "Solana":
            return <SolanaSelected></SolanaSelected>;
        case "Ethereum":
            return <EthereumSelected></EthereumSelected>;
        default:
            return <Home blockchainSelected={blockchainSelected} setBlockchainSelected={setBlockchainSelected}></Home>
    }
  }

  return (
    <>
  
    {renderContent()}

    

    </>
  );
}
