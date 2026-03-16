import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { toast } from "react-toastify";
import { generateSecretKey } from "../utils/useful_functions";

export const SecretPhrase = ({
  secretPhrase,
  setSecretPhrase,
}: {
  secretPhrase: string[];
  setSecretPhrase: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const sKey = generateSecretKey();
    setSecretPhrase(sKey);
  }, []);

  const handleCopySecretKey = () => {
    if (secretPhrase.length > 0) {
      navigator.clipboard.writeText(secretPhrase.join(" "));
            toast.success("Copied to clipboard ✅", {
      position: "bottom-center",
      autoClose: 1500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      theme: "colored",
      style: {
        fontSize: "14px",
        borderRadius: "10px",
        padding: "10px 14px",
      },
    });
    //   toast.success("Secret phrase copied to clipboard!");
    }
  };

  return (
    <div className="mt-8 sm:mt-12 md:mt-16 px-4 sm:px-6 md:px-10 font-mono">
      
      <div className="border rounded-xl overflow-hidden">

        {/* Header */}
        <div
          className="flex justify-between items-center cursor-pointer p-4 hover:bg-gray-50"
          onClick={() => setIsOpen(!isOpen)}
        >
          <h1 className="text-lg sm:text-xl md:text-2xl font-semibold">
            Secret Recovery Phrase
          </h1>

          {isOpen ? <ChevronUp size={22} /> : <ChevronDown size={22} />}
        </div>

        {/* Secret Phrase Content */}
        <div
          onClick={handleCopySecretKey}
          className={`cursor-pointer overflow-hidden transition-all duration-300 ${
            isOpen ? "max-h-[500px]" : "max-h-0"
          }`}
        >
          <div className="p-4 border-t grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {secretPhrase?.map((item, index) => (
              <div
                key={index}
                className="p-2 sm:p-3 border rounded-md text-xs sm:text-sm text-center break-words"
              >
                {item}
              </div>
            ))}
          </div>

          <p className="px-4 pt-2 text-sm text-gray-600">
            Your secret recovery phrase is used to recover your wallet.
          </p>

          <p className="px-4 pb-4 text-xs text-gray-500">
            Click anywhere to copy the words
          </p>
        </div>

      </div>
    </div>
  );
};