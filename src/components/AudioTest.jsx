import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause } from 'lucide-react';

const AudioTest = ({ onComplete }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioError, setAudioError] = useState(null);
  const audioRef = useRef(null);

  useEffect(() => {
    console.log('Base URL:', import.meta.env.BASE_URL);
    console.log('Full audio path:', `${import.meta.env.BASE_URL}test-audio.mp3`);
  }, []);

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.error('Audio playback error:', error);
          setAudioError(error.message);
        });
      }
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <h2 className="text-2xl font-bold mb-4 text-white">Audio Test</h2>
        
        <p className="text-gray-300 mb-6">
          Click the play button to test your audio.
          Make sure you can hear the sound clearly.
        </p>

        <div className="flex justify-center mb-6">
          <button
            onClick={togglePlayPause}
            className="bg-blue-600 text-white p-4 rounded-full hover:bg-blue-700
                     transition duration-200 flex items-center justify-center"
          >
            {isPlaying ? <Pause size={24} /> : <Play size={24} />}
          </button>
        </div>

        {audioError && (
          <p className="text-red-500 mb-4">Error: {audioError}</p>
        )}

        <audio
          ref={audioRef}
          src={`${import.meta.env.BASE_URL}test-audio.mp3`}
          onEnded={() => setIsPlaying(false)}
          onError={(e) => {
            console.error('Audio loading error:', e);
            setAudioError('Failed to load audio file');
          }}
        />

        <button
          onClick={onComplete}
          className="bg-green-600 text-white py-2 px-6 rounded-lg
                   hover:bg-green-700 transition duration-200"
        >
          Sound Works Correctly
        </button>
      </div>
    </div>
  );
};

export default AudioTest;