import React, { useState } from 'react';
import KeyboardTest from './components/KeyboardTest';
import PixelTest from './components/PixelTest';
import AudioTest from './components/AudioTest';
import Instructions from './components/Instructions';

const App = () => {
  const [currentTest, setCurrentTest] = useState('instructions');
  const [testsCompleted, setTestsCompleted] = useState({
    keyboard: false,
    pixel: false,
    audio: false
  });

  const handleTestComplete = (testName) => {
    setTestsCompleted(prev => ({
      ...prev,
      [testName]: true
    }));
    
    // Determine next test
    switch(testName) {
      case 'keyboard':
        setCurrentTest('pixel');
        break;
      case 'pixel':
        setCurrentTest('audio');
        break;
      case 'audio':
        setCurrentTest('complete');
        break;
      default:
        break;
    }
  };

  const startTests = () => {
    setCurrentTest('keyboard');
  };

  const renderCurrentTest = () => {
    switch(currentTest) {
      case 'instructions':
        return <Instructions onStart={startTests} />;
      case 'keyboard':
        return <KeyboardTest onComplete={() => setCurrentTest('pixel-instructions')} />;
      case 'pixel-instructions':
        return (
          <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md">
              <h2 className="text-2xl font-bold mb-6 text-white text-center">Dead Pixel Test</h2>
              
              <div className="space-y-6 text-gray-300">
                <div>
                  <h3 className="text-lg font-semibold text-blue-400 mb-2">What are dead pixels?</h3>
                  <p>Dead pixels are pixels on your screen that don't change color or remain stuck on a single color.</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-blue-400 mb-2">How to run the test:</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Press <span className="bg-gray-700 px-2 py-1 rounded font-mono">F11</span> to enter fullscreen mode</li>
                    <li>Your screen will display 5 different full-screen colors</li>
                    <li>Look for any pixels that don't match the displayed color</li>
                    <li>Click or press any key to move to the next color</li>
                    <li>Press <span className="bg-gray-700 px-2 py-1 rounded font-mono">F11</span> again after the test to exit fullscreen</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-blue-400 mb-2">Color sequence:</h3>
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
                onClick={() => setCurrentTest('pixel')}
                className="mt-8 w-full bg-blue-600 text-white py-3 rounded-lg
                         hover:bg-blue-700 transition duration-200"
              >
                Start Pixel Test
              </button>
            </div>
          </div>
        );
      case 'pixel':
        return <PixelTest onComplete={() => handleTestComplete('pixel')} />;
      case 'audio':
        return <AudioTest onComplete={() => handleTestComplete('audio')} />;
      case 'complete':
        return (
          <div className="flex flex-col items-center justify-center h-screen bg-gray-900">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg text-center">
              <h2 className="text-2xl font-bold mb-4 text-green-400">
                All tests completed successfully!
              </h2>
              <p className="text-gray-300">You can now close this tab.</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {renderCurrentTest()}
    </div>
  );
};

export default App;