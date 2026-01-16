import { use, useEffect, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { staticSecret } from '../sampleData/sampleData';
import { generateMnemonic } from 'bip39';
import { toast } from 'react-toastify';
import { generateSecretKey } from '../utils/useful_functions';

export const SecretPhrase = ({ secretPhrase, setSecretPhrase }: { secretPhrase: string[], setSecretPhrase: React.Dispatch<React.SetStateAction<string[]>> }) => {
    const [isOpen, setIsOpen] = useState(false);
    // const generateSecretKey = () => {
    //     const secretPhrases = generateMnemonic(128);
    //     setSecretPhrase(secretPhrases.split(" "));
    //     return secretPhrases;
    // }

    useEffect(() => {
        const sKey= generateSecretKey()
        setSecretPhrase(sKey);
        console.log("sKey>>>",sKey);
    }, [])



    const handleCopySecretKey = () => {
        if(secretPhrase.length > 0){
            navigator.clipboard.writeText(secretPhrase.join(" "));
            toast.success("Secret phrase copied to clipboard!");
        }
    }

    useEffect(() => {
        generateSecretKey();
    }, [])

    // console.log("Generated Secret Key:", generateSecretKey());

    return (
        <div className="ml-20 mt-20 mr-20 font-mono border border-black">
            <div
                className="flex justify-between items-center cursor-pointer p-4 hover:bg-gray-50"
                onClick={() => setIsOpen(!isOpen)}
            >
                <h1 className="text-2xl">Secret Recovery Phrase</h1>
                {isOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
            </div>

            <div onClick={handleCopySecretKey} className={`cursor-pointer overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
                <div className="p-4 border-t border-black grid grid-cols-4 gap-2">
                    {secretPhrase?.map((item) => {
                        return (
                            <div className="p-2 border border-black">
                                {item}
                            </div>
                        )
                    })}
                    {/* Add your secret phrase content */}
                </div>
                <p className='px-4 pt-4'>Your secret recovery phrase content goes here...</p>
                <p className='p-4 text-xs'>Click anywhere to copy the words</p>
            </div>
        </div>
    )
}