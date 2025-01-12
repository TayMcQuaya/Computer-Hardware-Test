import React, { useState, useEffect } from 'react';

const PixelTest = ({ onComplete }) => {
  const colors = ['bg-green-500', 'bg-blue-500', 'bg-red-500', 'bg-white', 'bg-black'];
  const [currentColorIndex, setCurrentColorIndex] = useState(0);
  const [showInstructions, setShowInstructions] = useState(true);

  useEffect(() => {
    const handleInteraction = () => {
      if (showInstructions) {
        setShowInstructions(false);
        return;
      }

      if (currentColorIndex < colors.length - 1) {
        setCurrentColorIndex(prev => prev + 1);
      } else {
        onComplete();
      }
    };

    window.addEventListener('keydown', handleInteraction);
    window.addEventListener('click', handleInteraction);
    
    return () => {
      window.removeEventListener('keydown', handleInteraction);
      window.removeEventListener('click', handleInteraction);
    };
  }, [currentColorIndex, onComplete, showInstructions]);

  if (showInstructions) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-white text-center">Pixel Test</h2>
          
          <div className="space-y-4 text-gray-300">
            <div>
              <h3 className="text-lg font-semibold text-blue-400 mb-2">Before Starting:</h3>
              <p className="flex items-center justify-center gap-2 text-xl">
                Press <span className="bg-gray-700 px-3 py-1 rounded text-white font-mono">F11</span> for fullscreen
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-blue-400 mb-2">How it works:</h3>
              <p>Your screen will display 5 different colors to check for dead pixels.</p>
              <p className="mt-2">Click or press any key to move through the colors:</p>
              <div className="grid grid-cols-5 gap-2 mt-2">
                <div className="h-4 bg-green-500 rounded"></div>
                <div className="h-4 bg-blue-500 rounded"></div>
                <div className="h-4 bg-red-500 rounded"></div>
                <div className="h-4 bg-white rounded"></div>
                <div className="h-4 bg-black rounded border border-gray-600"></div>
              </div>
            </div>
          </div>

          <button
            onClick={() => setShowInstructions(false)}
            className="mt-8 w-full bg-blue-600 text-white py-3 rounded-lg
                     hover:bg-blue-700 transition duration-200"
          >
            Start Test
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen w-full ${colors[currentColorIndex]}`} />
  );
};

export default PixelTest;