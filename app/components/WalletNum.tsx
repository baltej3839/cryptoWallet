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
    <div className="mx-20 space-y-6">
      {wallets.map((wallet, index) => (
        <div
          key={index}
          className="rounded-xl border bg-white shadow-sm p-5 space-y-4"
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">
              Wallet #{index + 1}
            </h2>
            <Trash className="text-red-500 cursor-pointer hover:scale-105" />
          </div>

          {/* Public Key */}
          <div>
            <p className="text-sm text-gray-500 mb-1">Public Key</p>
            <div className="flex items-center gap-2">
              <p className="break-all text-sm bg-gray-100 p-2 rounded-md flex-1">
                {wallet.publicKey}
              </p>
              <Copy
                className="cursor-pointer text-gray-500 hover:text-black"
                onClick={() => copyToClipboard(wallet.publicKey)}
              />
            </div>
          </div>

          {/* Private Key */}
          <div>
            <p className="text-sm text-red-500 mb-1">
              Private Key (Keep Secret)
            </p>
            <div className="flex items-center gap-2">
              <input
                readOnly
                value={wallet.secretKey}
                type={visibleKeys[index] ? "text" : "password"}
                className="flex-1 bg-red-50 border border-red-200 rounded-md p-2 font-mono text-sm"
              />

              <button
                onClick={() => toggleSecretKey(index)}
                className="p-2 rounded-md border hover:bg-gray-100"
              >
                {visibleKeys[index] ? <EyeOff /> : <Eye />}
              </button>

              <Copy
                className="cursor-pointer text-gray-500 hover:text-black"
                onClick={() => copyToClipboard(wallet.secretKey)}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
