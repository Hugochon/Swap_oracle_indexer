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
import InterestingPairsList from '../components/TheGraph'

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

 
    const [chainLinkPrice, setChainLinkPrice] = useState<any>([]);
    const [latestTimeStamp, setLatestTimeStamp] = useState<any>([]);

    const [fetchingData, setFetchingData] = useState<boolean>(false);

    const { data: readChainLinkPrice, isLoading: readLoading, isError: readError } = useContractRead({
      address: MarketPlace_Contract.address,
      abi: MarketPlace_Contract.abi,
      functionName: 'MegaETH_Price',
      onSuccess: (data) => {
        setChainLinkPrice((parseInt(data.toString())*(10**-8)).toFixed(2));
        console.log(data);
      },
    });

    const { data: readLatestTimeStamp, isLoading: readLoading2, isError: readError2 } = useContractRead({
      address: MarketPlace_Contract.address,
      abi: MarketPlace_Contract.abi,
      functionName: 'latestTimeStamp',
      onSuccess: (data) => {
        setLatestTimeStamp(data.toString());
        console.log(data);
      },
    });

    const { write: writeMintUSDH } = useContractWrite({
      ...StableCoin_Contract,
      functionName: 'mint', // Make sure to use the correct function name for minting USDH
      args: [BigInt(20000* 10 ** 18 )],
    });
  
    const { write: writeMintMETH } = useContractWrite({
      ...ETHLike_Contract,
      functionName: 'mint', // Make sure to use the correct function name for minting METH
      args: [BigInt(20 * 10 ** 18)],
    });

    const { write: writeTransaction } = useContractWrite({
      ...MarketPlace_Contract,
      functionName: 'getChainlinkDataFeedLatestAnswer', 
    });

    const handleFetchData = async () => {
      try {
        setFetchingData(true);
        await writeTransaction();
        // You may also want to refetch the latest timestamp here or update the UI accordingly
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setFetchingData(false);
      }
    };

    const [timeDifference, setTimeDifference] = useState<number | null>(null);

    useEffect(() => {
      // Calculate time difference in minutes when readLatestTimeStamp is available
      if (readLatestTimeStamp) {
        const latestTimestampInSeconds = parseInt(readLatestTimeStamp.toString(), 10);
        const currentTimestampInSeconds = Math.floor(Date.now() / 1000);
        const differenceInSeconds = currentTimestampInSeconds - latestTimestampInSeconds;
        const differenceInMinutes = Math.floor(differenceInSeconds / 60);
  
        setTimeDifference(differenceInMinutes);
      }
    }, [readLatestTimeStamp]);


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
              <h1 className="text-2xl font-bold mb-4 text-center">User Information</h1>
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
              <div className="flex flex-col items-center mt-5">
                <p className="text-lg text-gray-700 mb-2">Not enough USDH or Meth? Mint some!</p>
                <div className="flex justify-around">
                  <button
                    onClick={() => writeMintUSDH()}
                    className="bg-gold text-white px-4 py-2 rounded hover:bg-yellow-500"
                  >
                    Mint USDH
                  </button>
                  <button
                    onClick={() => writeMintMETH()}
                    className="bg-ethlike text-white px-4 py-2 rounded hover:bg-purple-700"
                  >
                    Mint METH
                  </button>
                </div>
              </div>
            </div>
    
            <div className="w-full">
              <h1 className="text-2xl font-bold mb-4 text-center">ChainLink Exchange</h1>
              <br />
              <br />
              <div className="bg-gray-100 p-6 rounded mb-6">
                <div className="flex flex-col items-center">
                  <p className="text-xl mb-4">
                    Latest ChainLink Price: <span className="text-ethlike underline">${chainLinkPrice}</span>
                  </p>
                  <p className="text-xl mb-4">
                    Latest Time Actualisation: <span className="text-ethlike">{timeDifference} minutes ago</span>
                  </p>
                  <button
                    onClick={handleFetchData}
                    className="bg-purple-600 text-white px-4 py-2 rounded"
                    disabled={fetchingData}
                  >
                    {fetchingData ? 'Fetching Data...' : 'Fetch Data'}
                  </button>
                </div>
              </div>
            </div>
    
            <div className="w-full">
              <h1 className="text-2xl font-bold mb-4 text-center">Top Pairs Dashboard</h1>
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
            <BuySellMegaETHComponent meth_price={chainLinkPrice} />
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
    
          {/* Interesting Pairs Section */}
          <div className="flex flex-col items-center mt-8">
            <h1 className="text-2xl font-bold mb-4 text-center">Top Pairs Dashboard</h1>
            <InterestingPairsList />
          </div>
        </Connected>
      </div>
    );
}

export default Page;