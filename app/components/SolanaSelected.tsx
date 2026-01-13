import { SecretPhrase } from "./SecretPhrase"

export const SolanaSelected = () => {


    return (
        <>
            <SecretPhrase></SecretPhrase>
            <div className="p-20 font-mono flex items-center justify-between">
                <h1 className="text-2xl">Solana Wallet</h1>
                <div className="flex gap-3">
                <button className="btnSecondary btn-primary">Add Wallet</button>
                <button className="btnSecondary btn-primary">Clear Wallets</button>
                </div>
            </div>
        </>
    )
}