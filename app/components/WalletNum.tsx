import { Eye, EyeOff, Copy, Trash } from "lucide-react";
import { useState } from "react";

export const WalletNum = ({
  secretPhrase,
  wallets,
}: {
  secretPhrase: string[];
  wallets: any[];
}) => {
  const [visibleKeys, setVisibleKeys] = useState<Record<number, boolean>>({});

  const toggleSecretKey = (index: number) => {
    setVisibleKeys((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="px-4 sm:px-6 md:px-10 lg:px-16 space-y-6">
      {wallets.map((wallet, index) => (
        <div
          key={index}
          className="rounded-xl border shadow-sm p-4 sm:p-5 space-y-4 bg-white"
        >
          {/* Header */}
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h2 className="text-base sm:text-lg font-semibold">
              Wallet #{index + 1}
            </h2>

            <Trash className="text-red-500 cursor-pointer hover:scale-105 transition" />
          </div>

          {/* Public Key */}
          <div>
            <p className="text-xs sm:text-sm text-gray-500 mb-1">Public Key</p>

            <div className="flex items-start sm:items-center gap-2">
              <p className="break-all text-xs sm:text-sm bg-gray-100 p-2 rounded-md flex-1 font-mono">
                {wallet.publicKey}
              </p>

              <Copy
                className="cursor-pointer text-gray-500 hover:text-black shrink-0"
                onClick={() => copyToClipboard(wallet.publicKey)}
              />
            </div>
          </div>

          {/* Private Key */}
          <div>
            <p className="text-xs sm:text-sm text-red-500 mb-1">
              Private Key (Keep Secret)
            </p>

            <div className="flex items-center gap-2">
              <input
                readOnly
                value={wallet.secretKey}
                type={visibleKeys[index] ? "text" : "password"}
                className="flex-1 bg-red-50 border border-red-200 rounded-md p-2 font-mono text-xs sm:text-sm min-w-0"
              />

              <button
                onClick={() => toggleSecretKey(index)}
                className="p-2 rounded-md border hover:bg-gray-100 shrink-0"
              >
                {visibleKeys[index] ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>

              <Copy
                className="cursor-pointer text-gray-500 hover:text-black shrink-0"
                onClick={() => copyToClipboard(wallet.secretKey)}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};