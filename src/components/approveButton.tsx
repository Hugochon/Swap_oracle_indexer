// 'use client' is already imported

import { useState } from 'react';
import { useContractRead, useContractWrite } from 'wagmi';
import { StableCoin_Contract } from './contracts';

interface ApproveButtonProps {
  token_Address: `0x${string}`;
  user_Address: `0x${string}`;
  spender_Address: `0x${string}`;
  spender_Allowance: bigint;
  token_Symbol: string;
}

export function ApproveButton(props: ApproveButtonProps) {
  const [currentAllowance, setCurrentAllowance] = useState<number | undefined>(undefined);

  const { data: readAllowance, isLoading: readLoading, isError: readError } = useContractRead({
    address: props.token_Address,
    abi: StableCoin_Contract.abi,
    functionName: 'allowance',
    args: [props.user_Address, props.spender_Address], // Use the spender's address as the second argument
    onSuccess: (data) => {
      // Convert BigInt to a readable number and then to JavaScript number
      const readableAllowance = Number(data.toString()) * 10 ** -18;
      setCurrentAllowance(readableAllowance);
      console.log(data);
    },
  });

  const { write: writeApprove, isLoading: writeLoading, isSuccess, isError: writeError } = useContractWrite({
    address: props.token_Address,
    abi: StableCoin_Contract.abi,
    functionName: 'approve',
    args: [props.spender_Address, props.spender_Allowance],
  });

  const handleApproveClick = async () => {
    try {
      await writeApprove();
    } catch (error) {
      console.error('Error approving spender:', error);
    }
  };

  return (
    <div className="bg-gray-100 p-4 rounded mb-4">
      <div className="text-lg font-bold mb-2">Current {props.token_Symbol} Allowance:</div>
      <div className="text-xl mb-4">{currentAllowance?.toFixed(0)}</div>
      <button
        onClick={handleApproveClick}
        disabled={writeLoading}
        className={`${
          props.token_Symbol === 'USDH' ? 'bg-gold' : 'bg-ethlike'
        } text-white px-4 py-2 rounded`}
      >
        {writeLoading ? 'Approving...' : 'Approve'}
      </button>
    </div>
  );
  
}

export default ApproveButton;
