import { useContractRead } from 'wagmi';
import { usePrepareContractWrite, useContractWrite } from 'wagmi';
import { useEffect, useState } from 'react';

import NFT_Vote_ABI from '../abi/NFT_Vote.json'

const nftVoteContractAddress = "0x05A28e4a726329b5562e8e3F714cea8Ce7D9db72";

export function CreateVote() {

    const [voteDescription, setVoteDescription] = useState("");
    const [voteOptionA, setVoteOptionA] = useState("");
    const [voteOptionB, setVoteOptionB] = useState("");
    const [days, setDays] = useState("0");
    const [hours, setHours] = useState("1");
    const [minutes, setMinutes] = useState("0");
    const [endingTimestamp, setEndingTimestamp] = useState("999999999");

    function writeContract(functionName: string, args: any[] | undefined, defaultArgs: any[] = []) {
        const { config } = usePrepareContractWrite({
          address: nftVoteContractAddress,
          abi: NFT_Vote_ABI.abi,
          functionName: functionName,
          args: args || defaultArgs,
        })
        const { write,error } = useContractWrite(config)
      return write
      }  

    const calculateEndingTimestamp = () => {
        const now = Math.floor(Date.now() / 1000);
        const durationInSeconds =
            parseInt(days) * 24 * 60 * 60 +
            parseInt(hours) * 60 * 60 +
            parseInt(minutes) * 60;

        setEndingTimestamp((now + durationInSeconds).toString());
    };

    useEffect(() => {
        calculateEndingTimestamp();
    }
    , []);

    return (
        <div className="my-4 border border-white-400 rounded-md p-4">
          <div className="flex flex-col md:flex-row md:space-x-4 md:space-y-0">
            <div className="mb-2 md:mb-0">
              <input
                type="text"
                value={voteDescription}
                onChange={(e) => setVoteDescription(e.target.value)}
                placeholder="Your question"
                className="border border-gray-300 rounded-md py-2 px-4 mb-2 focus:outline-none focus:ring focus:border-blue-500"
              />
            </div>
            <div className="mb-2 md:mb-0">
              <input
                type="text"
                value={voteOptionA}
                onChange={(e) => setVoteOptionA(e.target.value)}
                placeholder="Answer A"
                className="border border-gray-300 rounded-md py-2 px-4 mb-2 focus:outline-none focus:ring focus:border-blue-500"
              />
            </div>
            <div className="mb-2 md:mb-0">
              <input
                type="text"
                value={voteOptionB}
                onChange={(e) => setVoteOptionB(e.target.value)}
                placeholder="Answer B"
                className="border border-gray-300 rounded-md py-2 px-4 mb-2 focus:outline-none focus:ring focus:border-blue-500"
              />
            </div>
          </div>
          <span className='text-white'>Duration of the : (day, hour, minute)</span>
          <div className="flex flex-col md:flex-row md:space-x-4 md:space-y-0">
            <div className="mb-2 md:mb-0">
              <input
                type="number"
                value={days}
                onChange={(e) => setDays(e.target.value)}
                placeholder="Days"
                className="border border-gray-300 rounded-md py-2 px-4 mb-2 focus:outline-none focus:ring focus:border-blue-500"
              />
            </div>
            <div className="mb-2 md:mb-0">
              <input
                type="number"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                placeholder="Hours"
                className="border border-gray-300 rounded-md py-2 px-4 mb-2 focus:outline-none focus:ring focus:border-blue-500"
              />
            </div>
            <div className="mb-2 md:mb-0">
              <input
                type="number"
                value={minutes}
                onChange={(e) => setMinutes(e.target.value)}
                placeholder="Minutes"
                className="border border-gray-300 rounded-md py-2 px-4 mb-2 focus:outline-none focus:ring focus:border-blue-500"
              />
            </div>
          </div>
          <div>
            <button
              onClick={writeContract("initialize_vote", [voteOptionA, voteOptionB, voteDescription, endingTimestamp],
              ['defaultOptionA', 'defaultOptionB', 'defaultDescription', 'defaultEndingTimestamp']
          )}
              className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-500"
            >
              Mint
            </button>
          </div>
        </div>
      );
      
}

export default CreateVote;
