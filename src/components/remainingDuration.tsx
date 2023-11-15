import { useState, useEffect } from 'react';

interface GetEndingTimestampProps {
  ending_timestamp: number;
}

const formatDuration = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  return `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
};

export function GetRemainingDuration(props: GetEndingTimestampProps) {
  const [remainingDuration, setRemainingDuration] = useState('');

  useEffect(() => {
    const calculateRemainingDuration = () => {
      const currentTimestamp = Math.floor(Date.now() / 1000);
      const remainingSeconds = Math.max(0, props.ending_timestamp - currentTimestamp);

      setRemainingDuration(formatDuration(remainingSeconds));
    };

    const intervalId = setInterval(calculateRemainingDuration, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [props.ending_timestamp]);

  return <div className="mb-4">Remaining Duration: {remainingDuration}</div>;
}

export default GetRemainingDuration;
