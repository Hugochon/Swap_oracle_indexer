import React from 'react';

interface VoteBarProps {
  countA: number;
  countB: number;
}

const VoteBar: React.FC<VoteBarProps> = ({ countA, countB }) => {
  const totalVotes = countA + countB;
  var percentageA=0;
  var percentageB=0;
  if (totalVotes == 0) {
     percentageA = 0;
     percentageB = 0;
  }
  else {
     percentageA = (countA / totalVotes) * 100;
     percentageB = (countB / totalVotes) * 100;
  }

  // Set a maximum width for the bar container
  const maxWidth = 200;

  return (
    <div className="mb-4">
      <div className="text-gray-600">Votes for answer A: {countA}</div>
      <div className="text-gray-600">Votes for answer B: {countB}</div>
      <div className="flex items-center mt-2 bg-gray-300 h-4 rounded" style={{ maxWidth }}>
        <div
          className="flex-none h-full bg-green-500 rounded"
          style={{ width: `${percentageA > 100 ? 100 : percentageA}%` }}
        />
        <div
          className="flex-none h-full bg-red-500 rounded"
          style={{ width: `${percentageB > 100 ? 100 : percentageB}%` }}
        />
      </div>
    </div>
  );
};

export default VoteBar;
