import React from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';

interface VideoControlsProps {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  onPlayPause: () => void;
  onSeek: (time: number) => void;
  onSpeedChange: (speed: number) => void;
  playbackSpeed: number;
}

const VideoControls: React.FC<VideoControlsProps> = ({
  isPlaying,
  currentTime,
  duration,
  onPlayPause,
  onSeek,
  onSpeedChange,
  playbackSpeed,
}) => {
  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleTimelineChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    onSeek(newTime);
  };

  const handleSpeedChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSpeed = parseFloat(e.target.value);
    onSpeedChange(newSpeed);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 space-y-4">
      {/* Timeline */}
      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-600 w-12">{formatTime(currentTime)}</span>
        <input
          type="range"
          min="0"
          max={duration}
          step="0.1"
          value={currentTime}
          onChange={handleTimelineChange}
          className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          style={{
            background: 'linear-gradient(to right, #3b82f6 0%, #3b82f6 ' + (currentTime / duration * 100) + '%, #e5e7eb ' + (currentTime / duration * 100) + '%, #e5e7eb 100%)'
          }}
        />
        <span className="text-sm text-gray-600 w-12">{formatTime(duration)}</span>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onSeek(Math.max(0, currentTime - 5))}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <SkipBack size={20} />
          </button>
          
          <button
            onClick={onPlayPause}
            className="p-3 rounded-full bg-primary-500 text-white hover:bg-primary-600 transition-colors"
          >
            {isPlaying ? <Pause size={24} /> : <Play size={24} />}
          </button>
          
          <button
            onClick={() => onSeek(Math.min(duration, currentTime + 5))}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <SkipForward size={20} />
          </button>
        </div>

        <div className="flex items-center space-x-2">
          <Volume2 size={20} className="text-gray-600" />
          <select
            value={playbackSpeed}
            onChange={handleSpeedChange}
            className="text-sm border border-gray-300 rounded px-2 py-1"
          >
            <option value={0.5}>0.5x</option>
            <option value={0.75}>0.75x</option>
            <option value={1}>1x</option>
            <option value={1.25}>1.25x</option>
            <option value={1.5}>1.5x</option>
            <option value={2}>2x</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default VideoControls; 