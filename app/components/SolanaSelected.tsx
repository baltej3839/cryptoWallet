import { useState } from "react";
import { SecretPhrase } from "./SecretPhrase"
import { WalletNum } from "./WalletNum"
import { convertMnemonicToSeedBuffer, createNewSeed } from "../utils/useful_functions";

export const SolanaSelected = () => {
        const [secretPhrase, setSecretPhrase] = useState<string[]>([]);
        const [wallets, setWallets] = useState<any[]>([]);
        const [walletCount, setWalletCount]=useState<number>(0);

    
    const createNewWallet=()=>{

        
        console.log("Creating wallet for index:", walletCount);
        const seed=convertMnemonicToSeedBuffer(secretPhrase);
        const walletCred= createNewSeed(walletCount,seed);
        if(wallets.length===0){
            setWallets([walletCred]);
            setWalletCount(walletCount + 1);
            return
            
        }
        setWallets([...wallets, walletCred]);
        setWalletCount(walletCount + 1);
    }

    console.log("wallets>>>",wallets);

    const clearWallets=()=>{
        setWallets(prev => prev.slice(0, -1));
    }

console.log("Selected Secret Phrase in SolanaSelected:", wallets);
    return (
        <>
            <SecretPhrase
            setSecretPhrase={setSecretPhrase}
            secretPhrase={secretPhrase}
            ></SecretPhrase>
            <div className="px-20 pt-20 pb-10 font-mono flex items-center justify-between">
                <h1 className="text-2xl">Solana Wallet</h1>
                <div className="flex gap-3">
                <button 
                onClick={() => {
                    createNewWallet();
                    
                }}
                className="btnSecondary btn-primary">Add Wallet</button>
                <button 
                onClick={clearWallets}
                className="btnSecondary btn-primary">Clear Wallets</button>
                </div>
            </div>

            <WalletNum
            wallets={wallets}
            secretPhrase={secretPhrase}
            />


        </>
    )
}