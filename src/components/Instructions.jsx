import React from 'react';

const Instructions = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-md max-w-2xl w-full">
        <h1 className="text-3xl font-bold text-center mb-6 text-white">
          Computer Hardware Test
        </h1>
        
        <div className="space-y-4 text-gray-300">
          <p className="mb-4">
            Welcome to the Computer Hardware Test. This tool will help you verify if your computer's basic components are working correctly.
          </p>
          
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-gray-100">You will test:</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Keyboard functionality - Ensures all keys are responding</li>
              <li>Screen pixels - Checks for dead or stuck pixels</li>
              <li>Audio output - Verifies your speakers or headphones</li>
            </ul>
          </div>
          
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-100 mb-2">Before starting:</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Ensure your keyboard is connected</li>
              <li>Connect headphones or speakers</li>
            </ul>
          </div>
        </div>
        
        <button
          onClick={onStart}
          className="mt-8 w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-200 font-semibold"
        >
          Start Tests
        </button>
      </div>
    </div>
  );
};

export default Instructions;