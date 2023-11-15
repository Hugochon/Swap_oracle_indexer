// BackgroundChanger.tsx
import React, { useState, useEffect } from 'react';

interface BackgroundChangerProps {
  onColorChange: (color: string) => void;
}

const BackgroundChanger: React.FC<BackgroundChangerProps> = ({ onColorChange }) => {
  const getRandomColor = (): string => {
    const from = [
      'from-slate-500', 'from-gray-500', 'from-zinc-500', 'from-neutral-500', 'from-stone-500', 'from-red-500', 'from-orange-500', 'from-amber-500', 'from-yellow-500', 'from-lime-500', 'from-green-500', 'from-emerald-500', 'from-teal-500',
      'from-cyan-500', 'from-sky-500', 'from-blue-500', 'from-indigo-500', 'from-violet-500', 'from-purple-500', 'from-fuchsia-500', 'from-pink-500', 'from-rose-500'
    ];
    const to = [
      'to-slate-500', 'to-gray-500', 'to-zinc-500', 'to-neutral-500', 'to-stone-500', 'to-red-500', 'to-orange-500', 'to-amber-500', 'to-yellow-500', 'to-lime-500', 'to-green-500', 'to-emerald-500', 'to-teal-500',
      'to-cyan-500', 'to-sky-500', 'to-blue-500', 'to-indigo-500', 'to-violet-500', 'to-purple-500', 'to-fuchsia-500', 'to-pink-500', 'to-rose-500'
    ];

    const randomColor1 = from[Math.floor(Math.random() * from.length)%from.length];
    const randomColor2 = to[Math.floor(Math.random() * to.length)%to.length];

    return `bg-gradient-to-br ${randomColor1} ${randomColor2} min-h-screen`;
  };

  const changeBackgroundColor = () => {
    const newColor = getRandomColor();
    setBackgroundColor(newColor);
    onColorChange(newColor);
  };

  const [backgroundColor, setBackgroundColor] = useState<string>(() => {
    // Set initial color when component mounts
    const initialColor = getRandomColor();
    onColorChange(initialColor);
    return initialColor;
  });

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

