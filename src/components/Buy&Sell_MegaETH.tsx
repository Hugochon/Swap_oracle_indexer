import React, { use, useEffect, useState } from 'react';
import { useContractWrite, useContractRead } from 'wagmi';

import { MarketPlace_Contract } from './contracts';

interface BuySellMegaETHProps {
  meth_price: number;
}

export function BuySellMegaETHComponent(props: BuySellMegaETHProps) {
  const [amount, setAmount] = useState("0");
  const [isBuying, setIsBuying] = useState<boolean>(true);
  const [expectedValue, setExpectedValue] = useState<number>(0);
  const [errorDisplay, SetErrorDisplay] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const { write: writeTransaction,error:reverterror } = useContractWrite({
    ...MarketPlace_Contract,
    functionName: isBuying ? 'buy_MegaETH' : 'sell_MegaETH',
    args: [amount ? BigInt(parseInt(amount) * 10 ** 18) : BigInt(0)],
  });

  // Calculate expected value based on mode and ETH price
  const calculateExpectedValue = () => {
    const ethAmount = parseInt(amount);
    if(amount === "") {
      setExpectedValue(0);
      return;
    }
    setExpectedValue(ethAmount * props.meth_price);
  };

  const handleTransaction = async () => {
    try {
      await writeTransaction();
     
    } catch (error) {
      console.error(`Error ${isBuying ? 'buying' : 'selling'} MegaETH:`, error);
    }
  };

  useEffect(() => {
    calculateExpectedValue();
  }, [amount, isBuying]);

  useEffect(() => {
    // Use this effect to handle changes in the error state
    if (reverterror !== null) {
      SetErrorDisplay(true);
  
      // Extract the reason from the error message
      const errorMessage = reverterror.message || '';
      const startIndex = errorMessage.indexOf('reverted with the following reason:') + 'reverted with the following reason:'.length;
      const endIndex = errorMessage.indexOf('Contract Call');
      const reason = errorMessage.substring(startIndex, endIndex).trim();
  
      setError(`Error: ${reason}`);
    } else {
      SetErrorDisplay(false);
    }
  }, [reverterror]);
  

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
          onClick={() => {
            setIsBuying(!isBuying);
            calculateExpectedValue(); // Recalculate expected value on mode switch
          }}
          className="bg-purple-600 text-white px-4 py-2 rounded"
        >
          Switch to {isBuying ? 'Sell' : 'Buy'} Mode
        </button>
      </div>
      {  (
        <div className="text-center">
          <p className="text-xl">
            Expected USDH Price: <span className="text-gold">${expectedValue.toFixed(0)}</span>
          </p>
          {errorDisplay && (
            <div className="text-red-500 text-sm mt-2">{error}</div>
          )}
        </div>
      )}
    </div>
  );
}

export default BuySellMegaETHComponent;
