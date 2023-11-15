'use client'
import { use, useEffect, useState } from 'react'
import { useAccount } from 'wagmi'

import { ConnectButton } from '../components/ConnectButton'
import { Connected } from '../components/Connected'

import { useContractRead } from 'wagmi'

import NFT_Vote_ABI from '../abi/NFT_Vote.json'
import { GetVote } from '../components/getVoteData'
import { CreateVote } from '../components/createVote'
import BackgroundChanger from '../components/backgroundColor';

import {wagmiContractConfig} from '../components/contracts'

const contractAddress = wagmiContractConfig.address;

const Page: React.FC = () => {

  const { address } = useAccount();
  const [totalSupply, setTotalSupply] = useState<any>([]);
  const [userVotes, setUserVotes] = useState<any>([]);
  const [activeVotes, setActiveVotes] = useState<any>([]);
  const [mainBackgroundColor, setMainBackgroundColor] = useState<string>('');
  const [filter, setFilter] = useState<string>('all');

  const handleColorChange = (newColor: string): void => {

    setMainBackgroundColor(newColor);
  };

  function GetTotalSupply() {
    const { data: readData, isLoading: readLoading } = useContractRead({
      address: contractAddress,
      abi: NFT_Vote_ABI.abi,
      functionName: 'totalVote',
      onSuccess: (data) => {
        console.log(data);
        setTotalSupply(Number(data));
      },
    });

    const start = totalSupply;
    const end = 1;
    const numbersArray = Array.from(
      { length: start - end + 1 },
      (_, index) => start - index
    );
    return numbersArray;
  }

  function GetUserVotes(): number[]{
    const { data: readData, isLoading: readLoading } = useContractRead({
      address: contractAddress,
      abi: NFT_Vote_ABI.abi,
      functionName: 'get_All_Votes_from_User',
      args: [address],
      onSuccess: (data) => {
        console.log("userVotes : ", data);
        setUserVotes(data);
      },
    });

    const convertedVotes: number[] = userVotes.map((vote: bigint) => Number(vote));
  return convertedVotes;

   
  }

  function GetActiveVotes():number[] {
    const { data: readData, isLoading: readLoading } = useContractRead({
      address: contractAddress,
      abi: NFT_Vote_ABI.abi,
      functionName: 'update_Active_Vote',
      onSuccess: (data) => {
        console.log("active Votes : ", data);
        setActiveVotes(data);
      },
    });

    const convertedVotes: number[] = activeVotes.map((vote: bigint) => Number(vote));
    if (convertedVotes[0] ==0) {
      return [];
    }
    else
    {
      return convertedVotes;
    }
  }
  
  return (
    <div className={mainBackgroundColor}>
      <header className="bg-opacity-50 bg-black backdrop-blur-md text-white p-4">
        <h1 className="text-3xl font-bold text-center">DAO TEST</h1>
        <div className="flex justify-between items-center p-2">
          <ConnectButton />
          <BackgroundChanger onColorChange={handleColorChange} />
        </div>
      </header>
      <Connected>
        <div className="container mx-auto p-4 backdrop-blur-md bg-opacity-40 rounded-md">
          <div className="mb-4">
            <h2 className="text-2xl font-bold mb-2 text-white">Create Vote</h2>
            <CreateVote />
          </div>

          {/* Toggle buttons for filtering */}
          <div className="mb-4">
            <button
              className={`px-4 py-2 mr-2 ${
                filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'
              }`}
              onClick={() => setFilter('all')}
            >
              All Votes
            </button>
            <button
              className={`px-4 py-2 mr-2 ${
                filter === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'
              }`}
              onClick={() => setFilter('user')}
            >
              User Votes
            </button>
            <button
              className={`px-4 py-2 ${
                filter === 'active' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'
              }`}
              onClick={() => setFilter('active')}
            >
              Active Votes
            </button>
          </div>

          {/* Display votes based on the selected filter */}
          {filter === 'all' && (
            <div className="mb-4">
              <h2 className="text-2xl font-bold mb-2 text-white">All Votes</h2>
              {GetTotalSupply().map((voteID) => (
                <div key={voteID}>
                  <GetVote voteID={voteID} />
                </div>
              ))}
            </div>
          )}

          {filter === 'user' && (
            <div className="mb-4">
              <h2 className="text-2xl font-bold mb-2 text-white">All votes where current User voted</h2>
              {GetUserVotes().map((voteID) => (
                <div key={voteID}>
                  <GetVote voteID={voteID} />
                </div>
              ))}
            </div>
          )}

          {filter === 'active' && (
            <div className="mb-4">
              <h2 className="text-2xl font-bold mb-2 text-white">All currently active votes</h2>
              {GetActiveVotes().map((voteID) => (
                <div key={voteID}>
                  <GetVote voteID={voteID} />
                </div>
              ))}
            </div>
          )}
        </div>
      </Connected>
    </div>
  );
};

export default Page;