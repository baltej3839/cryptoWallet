import { useState } from "react";
import { SecretPhrase } from "./SecretPhrase";
import { WalletNum } from "./WalletNum";
import { convertMnemonicToSeedBuffer, createNewSeed } from "../utils/useful_functions";

export const SolanaSelected = ({ blockchainSelected }: { blockchainSelected: string | null }) => {
  const [secretPhrase, setSecretPhrase] = useState<string[]>([]);
  const [wallets, setWallets] = useState<any[]>([]);
  const [walletCount, setWalletCount] = useState<number>(0);

  const createNewWallet = () => {
    console.log("Creating wallet for index:", walletCount);

    const seed = convertMnemonicToSeedBuffer(secretPhrase);
    const walletCred = createNewSeed(walletCount, seed, blockchainSelected);

    if (wallets.length === 0) {
      setWallets([walletCred]);
      setWalletCount(walletCount + 1);
      return;
    }

    setWallets([...wallets, walletCred]);
    setWalletCount(walletCount + 1);
  };

  const clearWallets = () => {
    setWallets((prev) => prev.slice(0, -1));
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-10">

      <SecretPhrase
        setSecretPhrase={setSecretPhrase}
        secretPhrase={secretPhrase}
      />

      {/* Header Section */}
      <div className="pt-10 pb-8 font-mono flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        <h1 className="text-xl sm:text-2xl font-semibold">
          {blockchainSelected} Wallet
        </h1>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">

          <button
            onClick={createNewWallet}
            className="btnSecondary btn-primary w-full sm:w-auto"
          >
            Add Wallet
          </button>

          <button
            onClick={clearWallets}
            className="btnSecondary btn-primary w-full sm:w-auto"
          >
            Clear Wallets
          </button>

        </div>
      </div>

      <WalletNum
        wallets={wallets}
        secretPhrase={secretPhrase}
      />

    </div>
  );
};