import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Token {
  symbol: string;
}

interface Pair {
  id: string;
  token0: Token;
  token1: Token;
}

interface LiquidityPosition {
  user: {
    id: string;
  };
  liquidityTokenBalance: number;
}

const InterestingPairsList: React.FC = () => {
  const [pairs, setPairs] = useState<Pair[]>([]);
  const [loadingPairs, setLoadingPairs] = useState(true);
  const [errorPairs, setErrorPairs] = useState<string | null>(null);
  const [selectedPair, setSelectedPair] = useState<string | null>("0xceff51756c56ceffca006cd410b03ffc46dd3a58");
  const [userEnteredId, setUserEnteredId] = useState<string>('');
  const [liquidityPositions, setLiquidityPositions] = useState<LiquidityPosition[]>([]);
  const [loadingPositions, setLoadingPositions] = useState(false);
  const [errorPositions, setErrorPositions] = useState<string | null>(null);

  useEffect(() => {
    const fetchPairs = async () => {
      try {
        const response = await axios.post(
          'https://api.thegraph.com/subgraphs/name/sushiswap/exchange',
          {
            query: `
              {
                pairs(first: 10, orderBy: reserveUSD, orderDirection: desc) {
                  id
                  token0 {
                    symbol
                  }
                  token1 {
                    symbol
                  }
                }
              }
            `,
          }
        );

        const responseData = response.data?.data?.pairs;

        if (responseData) {
          setPairs(responseData);
          setLoadingPairs(false);
        } else {
          setErrorPairs('Invalid data format');
          setLoadingPairs(false);
        }
      } catch (error) {
        console.error('Error fetching pairs:', error);
        setErrorPairs('Error fetching pairs');
        setLoadingPairs(false);
      }
    };

    fetchPairs();
  }, []);

  useEffect(() => {
    const fetchLiquidityPositions = async () => {
      if (selectedPair) {
        setLoadingPositions(true);
        try {
          const response = await axios.post(
            'https://api.thegraph.com/subgraphs/name/sushiswap/exchange',
            {
              query: `
                {
                  liquidityPositions(
                    first: 3
                    where: { pair_: { id: "${selectedPair}" } }
                    orderBy: liquidityTokenBalance
                    orderDirection: desc
                  ) {
                    user {
                      id
                    }
                    liquidityTokenBalance
                  }
                }
              `,
            }
          );

          const responseData = response.data?.data?.liquidityPositions;

          if (responseData) {
            setLiquidityPositions(responseData);
            setLoadingPositions(false);
          } else {
            setErrorPositions('Invalid data format');
            setLoadingPositions(false);
          }
        } catch (error) {
          console.error('Error fetching liquidity positions:', error);
          setErrorPositions('Error fetching liquidity positions');
          setLoadingPositions(false);
        }
      }
    };

    fetchLiquidityPositions();
  }, [selectedPair]);

  const handlePairChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPair(event.target.value);
  };

  const handleUserEnteredIdChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUserEnteredId(event.target.value);
  };

  return (
    <div className="bg-gradient-to-b from-purple-700 to-purple-900 p-6 rounded-lg">
      <h2 className="text-white text-3xl mb-4">Top 10 Interesting Pairs</h2>
      {loadingPairs ? (
        <p className="text-white">Loading Pairs...</p>
      ) : errorPairs ? (
        <p className="text-red-500">Error: {errorPairs}</p>
      ) : (
        <div className="flex flex-col space-y-4">
          <label htmlFor="pairSelector" className="text-white">
            Select or Enter a Pair ID:
          </label>
          <select
            id="pairSelector"
            onChange={handlePairChange}
            value={selectedPair || ''}
            className="border border-gray-300 rounded-md p-2 text-black"
          >
            <option value="" disabled>
              Select a pair
            </option>
            {pairs.map((pair) => (
              <option key={pair.id} value={pair.id}>
                {pair.token0.symbol} - {pair.token1.symbol}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Enter a Pair ID"
            value={userEnteredId}
            onChange={handleUserEnteredIdChange}
            className="border border-gray-300 rounded-md p-2 text-black"
          />
          <div>
            {selectedPair || userEnteredId ? (
              <p className="text-white">
                Selected Pair ID: {selectedPair || userEnteredId}
              </p>
            ) : null}
          </div>
        </div>
      )}
      {loadingPositions ? (
        <p className="text-white">Loading Liquidity Positions...</p>
      ) : errorPositions ? (
        <p className="text-red-500">Error: {errorPositions}</p>
      ) : (
        <div>
          <h3 className="text-white text-2xl mt-4">Top 3 Whales</h3>
          <table className="table-auto w-full mt-2 text-white">
            <thead>
              <tr>
                <th className="py-2">User Address</th>
                <th className="py-2">Liquidity</th>
              </tr>
            </thead>
            <tbody>
              {liquidityPositions.map((position) => (
                <tr key={position.user.id}>
                  <td className="py-2">
                    <a
                      href={`https://etherscan.io/address/${position.user.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      {position.user.id}
                    </a>
                  </td>
                  <td className="py-2">{position.liquidityTokenBalance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default InterestingPairsList;
