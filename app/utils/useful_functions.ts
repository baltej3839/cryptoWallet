import { Keypair } from "@solana/web3.js";
import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import nacl from "tweetnacl";



export const generateSecretKey = () => {
        const secretPhrases = generateMnemonic(128);
        return secretPhrases.split(" ");
    }

export const convertMnemonicToSeedBuffer = (mnemonic:string[]) => {
    const seed=mnemonicToSeedSync(mnemonic.join(" "));
    return seed;
}


export const createNewSeed = (i:number, seed:Buffer, blockchainSelected:string | null) => {
  const path = blockchainSelected==="Solana" ? `m/44'/501'/${i}'/0'` : `m/44'/60'/${i}'/0'`;
  const derivedSeed = derivePath(path, seed.toString("hex")).key;
  const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
  console.log("jeys>>>",Keypair.fromSecretKey(secret).publicKey.toBase58());
    return {
    publicKey: Keypair.fromSecretKey(secret).publicKey.toBase58(),
    secretKey: Buffer.from(secret).toString("hex")
    }
}

