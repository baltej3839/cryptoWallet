import { generateMnemonic } from "bip39";
import { Wallet } from "lucide-react"
import { FC } from "react"

interface HomeProps{
    blockchainSelected: string | null;
    setBlockchainSelected: (blockchain: string | null) => void;
}

const Home=({
    blockchainSelected,
    setBlockchainSelected
}:HomeProps) => {




    return(
        <>
      <main className="min-h-[78vh]">
        <section>
          <div className='font-mono p-20'>
            <p className=' text-2xl'>BlockSafe supports various blockchains</p>
            <p className=' text-2xs'>Choose your blockchain</p>
            <div className='flex space-x-4 pt-4 text-white'>
            <button className="btn btn-primary"
            onClick={()=>{
                setBlockchainSelected("Solana")
            }}
            >Solana</button>
            <button className='btn btn-primary'
            onClick={()=>{
                setBlockchainSelected("Ethereum")
            }}
            >Ethereum</button>
            </div>
          </div>
        </section>
      </main>
    </>
    )
}

export default Home;