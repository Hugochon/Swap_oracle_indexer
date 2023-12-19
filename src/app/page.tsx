'use client'
import { use, useEffect, useState } from 'react'

import { useContractRead } from 'wagmi'
import { useContractWrite } from 'wagmi'

import {StableCoin_Contract} from '../components/contracts'
import {ETHLike_Contract} from '../components/contracts'
import {MarketPlace_Contract} from '../components/contracts'
import {BuySellMegaETHComponent} from '../components/Buy&Sell_MegaETH'
import {Balance} from '../components/Balance'
import {ApproveButton} from '../components/approveButton'

import { ConnectButton } from '../components/ConnectButton'
import { Connected } from '../components/Connected'

import { useAccount } from 'wagmi'

const Page: React.FC = () => {
  const [userStableCoinBalance, setUserStableCoinBalance] = useState<any>([]);
  const [userETHLikeBalance, setUserETHLikeBalance] = useState<any>([]);

  const [contractStableCoinBalance, setContractStableCoinBalance] = useState<any>([]);
  const [contractETHLikeBalance, setContractETHLikeBalance] = useState<any>([]);

  let { address: userAddress } = useAccount();
  if (userAddress === undefined) {
    userAddress = '0x00';
  }

  return (
    <div className="bg-purple-200 text-black min-h-screen">
      <header className="bg-opacity-50 bg-purple-600 backdrop-blur-md text-white p-4">
        <h1 className="text-3xl font-bold text-center text-black underline">
          Marketplace test
        </h1>
        <div className="flex justify-between items-center p-2">
          <ConnectButton />
        </div>
      </header>
  
      <Connected>
      <div className="container mx-auto mt-8 grid md:grid-cols-3 gap-8">
          <div className="mb-8 md:mb-0">
            <h1 className="text-2xl font-bold mb-4 text-center">User Informations</h1>
            <div>
              <h3 className="text-lg text-gray-500">Current User Address : {userAddress}</h3>
            </div>
            <div className="bg-gold p-4 rounded mb-4">
              <p className="text-xl text-center">
                USDH Balance: <Balance token_Address={StableCoin_Contract.address} user_Address={userAddress} />
              </p>
            </div>
            <div className="bg-ethlike p-4 rounded mb-4">
            <p className="text-xl text-center text-white bg-color">
              METH Balance : <Balance token_Address={ETHLike_Contract.address} user_Address={userAddress} />
              </p>
            </div>
          </div>
          <div>

          </div>
          <div>
            <h1 className="text-2xl font-bold mb-4 text-center">Marketplace Informations</h1>
            <div>
              <h3 className="text-lg text-gray-500">Marketplace Contract Address : {MarketPlace_Contract.address}</h3>
            </div>
            <div className="bg-gold p-4 rounded mb-4">
              <p className="text-xl text-center">
              Marketplace USDH Balance: <Balance token_Address={StableCoin_Contract.address} user_Address={MarketPlace_Contract.address} />
              </p>
            </div>
            <div className="bg-ethlike p-4 rounded mb-4">
              <p className="text-xl text-center text-white bg-color">
              Marketplace METH Balance : <Balance token_Address={ETHLike_Contract.address} user_Address={MarketPlace_Contract.address} />
              </p>
            </div>
          </div>
        </div>
  
        <div className="flex justify-center mt-8">
          <BuySellMegaETHComponent />
          <ApproveButton
            token_Address={StableCoin_Contract.address}
            user_Address={userAddress}
            spender_Address={MarketPlace_Contract.address}
            spender_Allowance={BigInt(10 * 10 ** 18)}
            token_Symbol='USDH'
          ></ApproveButton>
          <ApproveButton
            token_Address={ETHLike_Contract.address}
            user_Address={userAddress}
            spender_Address={MarketPlace_Contract.address}
            spender_Allowance={BigInt(10 * 10 ** 18)}
            token_Symbol='METH'
          ></ApproveButton>
        </div>
      </Connected>
    </div>
  );
}

export default Page;