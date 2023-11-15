import { useContractRead } from 'wagmi';
import { usePrepareContractWrite, useContractWrite } from 'wagmi';
import { useState, useEffect } from 'react';
import NFT_Vote_ABI from '../abi/NFT_Vote.json';
import GetRemainingDuration from './remainingDuration';
import VoteBar from './voteBar';

import {wagmiContractConfig} from './contracts'

const contractAddress = wagmiContractConfig.address;

interface GetVoteProps {
  voteID: number;
}

export function GetVote(props: GetVoteProps) {
  const [voteInfos, setVoteInfos] = useState<any>([]);
  const [isActive, setIsActive] = useState(true);

  const { data: readData, isLoading: readLoading } = useContractRead({
    address: contractAddress,
    abi: NFT_Vote_ABI.abi,
    functionName: 'get_Vote_Infos',
    args: [props.voteID],
    onSuccess: (data) => {
      setVoteInfos(data);
    },
  });

  const { write, error } = useContractWrite({
    address: contractAddress,
    abi: NFT_Vote_ABI.abi,
    functionName: 'increase_vote',
  });

  useEffect(() => {
    const calculateRemainingDuration = () => {
      if (voteInfos.length > 0) {
        const endingTimestamp = voteInfos[8].toString();
        const currentTimestamp = Math.floor(Date.now() / 1000);
        setIsActive(endingTimestamp > currentTimestamp);
      }
    };

    const intervalId = setInterval(calculateRemainingDuration, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [voteInfos]);

  if (readLoading) return <p>Loading...</p>;

  if (!readData) {
    return <p>No data available.</p>;
  }

  return (
    <div>
      {voteInfos.length > 0 && write && (
        <div className={`p-6 m-4 border border-gray-300 rounded-lg shadow-lg ${isActive ? 'bg-white' : 'bg-opacity-70 bg-gray-200 backdrop-blur-md'}`}>
          <div className="flex justify-between items-start">
            <div className="text-3xl font-extrabold mb-4 text-purple-800">Question: {voteInfos[6]}</div>
            {!isActive ? (
              <div className="text-xl font-bold text-red-500 mb-4">Vote has ended</div>
            ) : (
              <div className="">
                <GetRemainingDuration ending_timestamp={voteInfos[8].toString()} />
              </div>
            )}
          </div>
  
          <div className="flex flex-col space-y-4">
            <div className="flex space-x-4 items-center">
              <button
                className={`border ${isActive ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-400 cursor-not-allowed'} text-white py-2 px-4 rounded transition duration-300`}
                onClick={() => write({ args: [props.voteID, true] })}
                disabled={!isActive}
              >
                Vote A
              </button>
              <span className="text-lg font-bold">{voteInfos[4]}</span>
            </div>
  
            <div className="flex space-x-4 items-center">
              <button
                className={`border ${isActive ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-400 cursor-not-allowed'} text-white py-2 px-4 rounded transition duration-300`}
                onClick={() => write({ args: [props.voteID, false] })}
                disabled={!isActive}
              >
                Vote B
              </button>
              <span className="text-lg font-bold">{voteInfos[5]}</span>
            </div>
  
            <VoteBar countA={Number(voteInfos[2])} countB={Number(voteInfos[3])} />
          </div>
  
          <div className="mt-4 flex justify-between text-gray-700">
            <div>
              <span className="font-bold">Publisher:</span> {voteInfos[1].toString()}
            </div>
            <div>
              <span className="font-bold">Vote ID:</span> {voteInfos[0].toString()}
            </div>
          </div>
  
          {error && error.name === "ContractFunctionExecutionError" && (
            <div className="text-red-500 mt-4">You have already voted on that vote.</div>
          )}
        </div>
      )}
    </div>
  );
  
  
  
}

export default GetVote;
