'use client'

import { useState } from 'react'
import type { Address } from 'wagmi'
import { useAccount, useBalance } from 'wagmi'

export function Balance() {
  return (
    <>  
      <div>
        <AccountBalance />
      </div>
      <br />
    </>
  )
}

export function AccountBalance() {
  const { address } = useAccount()
  const { data, refetch } = useBalance({
    address,
    watch: true,
  })

  // Check if a wallet is connected
  const isWalletConnected = !!address;

  return (
    <div>
      {isWalletConnected ? (
        <>
          {data?.formatted} ETH
        </>
      ) : (
       null
      )}
    </div>
  )
}
