// BackgroundChanger.tsx
import React, { useState, useEffect } from 'react';

interface BackgroundChangerProps {
  onColorChange: (color: string) => void;
}

const BackgroundChanger: React.FC<BackgroundChangerProps> = ({ onColorChange }) => {
  const [backgroundColor, setBackgroundColor] = useState<string>('');

  const getRandomColor = (): string => {
    const colors = [
      'blue', 'purple', 'green', 'lime', 'red', 'yellow', 'pink', 
      'amber', 'orange', 'emerald',  'brown', 'fuchsia', 
      'rose', 'violet', 
    ];

    const randomColor1 = colors[Math.floor(Math.random() * colors.length)];
    const randomColor2 = colors[Math.floor(Math.random() * colors.length)];

    return `bg-gradient-to-br from-${randomColor1}-500 to-${randomColor2}-400 min-h-screen`;
  };

  const changeBackgroundColor = () => {
    const newColor = getRandomColor();
    setBackgroundColor(newColor);
    onColorChange(newColor);
  };

  useEffect(() => {
    // Set initial color when component mounts
    const initialColor = getRandomColor();
    setBackgroundColor(initialColor);
    onColorChange(initialColor);
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <div>
      <button
        onClick={changeBackgroundColor}
        className="py-2 px-4 mt-4 bg-gray-800 text-white rounded-md hover:bg-gray-700"
      >
        Change Theme
      </button>
    </div>
  );
};

export default BackgroundChanger;
