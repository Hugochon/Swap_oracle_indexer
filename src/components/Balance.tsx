'use client'

import { useState } from 'react'
import { useContractRead } from 'wagmi'
import { useBalance } from 'wagmi'
import { StableCoin_Contract } from './contracts'


interface GetBalanceProps {
  token_Address: `0x${string}`;
  user_Address: `0x${string}`;
}

export function Balance(props: GetBalanceProps) {
  const [userBalance, setUserBalance] = useState<number | undefined>(undefined);

  const { data: readData, isLoading: readLoading, isError } = useContractRead({
    address: props.token_Address,
    abi: StableCoin_Contract.abi,
    functionName: 'balanceOf',
    args: [props.user_Address],
    onSuccess: (data) => {
      // Convert BigInt to a readable number and then to JavaScript number
      const readableBalance = Number(data.toString()) * 10**-18;
      setUserBalance(readableBalance);
    },
  });

  return (
    <span className='border border-solid border-white rounded p-2'>
    {userBalance}
  </span>
  )
}

export default Balance;
