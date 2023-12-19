import React, { useState } from 'react';
import { useContractWrite, useContractRead } from 'wagmi';

import { MarketPlace_Contract } from './contracts';

export function BuySellMegaETHComponent() {
  const [amount, setAmount] = useState("10000");
  const [isBuying, setIsBuying] = useState<boolean>(true); // Track whether it's buying or selling


  // if (isNaN(amount)) {
  //   setAmount(10000);
  // }

  const { write: writeTransaction } = useContractWrite({
    ...MarketPlace_Contract,
    functionName: isBuying ? 'buy_MegaETH' : 'sell_MegaETH', // Use buy or sell function based on the mode
    args: [amount ? BigInt(parseInt(amount) * 10**18) : BigInt(0) ], // Update arguments as needed
  });

  const handleTransaction = async () => {
    try {
      // Call the write function to buy or sell MegaETH based on the mode
      await writeTransaction();

      // Optionally, you can refresh data after the transaction is successful
      // await refetchData(); // Implement a function to fetch the updated data
    } catch (error) {
      console.error(`Error ${isBuying ? 'buying' : 'selling'} MegaETH:`, error);
    }
  };

  return (
    <div className="bg-gray-100 p-4 rounded mb-4">
      <div className="text-lg font-bold mb-2">{isBuying ? 'Buy' : 'Sell'} MegaETH</div>
      <div className="mb-2">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border border-gray-300 p-2 rounded"
        />
      </div>
      <div className="mb-2">
        <button
          onClick={handleTransaction}
          className={`${
            isBuying ? 'bg-ethlike' : 'bg-gold'
          } text-white px-4 py-2 rounded mr-2`}
        >
          {isBuying ? 'Buy' : 'Sell'} MegaETH
        </button>
        <button
          onClick={() => setIsBuying(!isBuying)}
          className="bg-purple-600 text-white px-4 py-2 rounded"
        >
          Switch to {isBuying ? 'Sell' : 'Buy'} Mode
        </button>
      </div>
    </div>
  );  
}

export default BuySellMegaETHComponent;
