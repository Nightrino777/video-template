import React, { useState, useEffect } from 'react';
import { VideoTemplate } from './types';
import { storyStyleTemplate } from './data/templates';
import VideoRenderer from './components/VideoRenderer';
import VideoControls from './components/VideoControls';
import TemplateEditor from './components/TemplateEditor';
import { Download, Settings } from 'lucide-react';
import './App.css';

function App() {
  const [currentTemplate, setCurrentTemplate] = useState<VideoTemplate>(storyStyleTemplate);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showEditor, setShowEditor] = useState(false);

  useEffect(() => {
    let animationFrame: number;
    
    if (isPlaying) {
      const animate = () => {
        setCurrentTime((prevTime) => {
          const newTime = prevTime + 0.016 * playbackSpeed;
          if (newTime >= currentTemplate.duration) {
            setIsPlaying(false);
            return 0;
          }
          return newTime;
        });
        animationFrame = requestAnimationFrame(animate);
      };
      animationFrame = requestAnimationFrame(animate);
    }

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isPlaying, playbackSpeed, currentTemplate.duration]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (time: number) => {
    setCurrentTime(Math.max(0, Math.min(time, currentTemplate.duration)));
  };

  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
  };

  const handleTemplateChange = (template: VideoTemplate) => {
    setCurrentTemplate(template);
    setCurrentTime(0);
    setIsPlaying(false);
  };

  const handleExport = () => {
    alert('Export functionality would be implemented here. This would generate an MP4 file from the template.');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Video Template System
          </h1>
          <p className="text-gray-600">
            Create and customize video templates for social media platforms
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Video Preview</h2>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setShowEditor(!showEditor)}
                    className="flex items-center space-x-1 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                  >
                    <Settings size={16} />
                    <span className="text-sm">Editor</span>
                  </button>
                  <button
                    onClick={handleExport}
                    className="flex items-center space-x-1 px-3 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-md transition-colors"
                  >
                    <Download size={16} />
                    <span className="text-sm">Export</span>
                  </button>
                </div>
              </div>

              <div className="flex justify-center mb-4">
                <VideoRenderer
                  template={currentTemplate}
                  currentTime={currentTime}
                  isPlaying={isPlaying}
                />
              </div>

              <VideoControls
                isPlaying={isPlaying}
                currentTime={currentTime}
                duration={currentTemplate.duration}
                onPlayPause={handlePlayPause}
                onSeek={handleSeek}
                onSpeedChange={handleSpeedChange}
                playbackSpeed={playbackSpeed}
              />
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Template Information</h3>
              <div className="space-y-3">
                <div>
                  <span className="text-sm font-medium text-gray-700">Name:</span>
                  <span className="ml-2 text-gray-900">{currentTemplate.name}</span>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-700">Description:</span>
                  <p className="mt-1 text-gray-900">{currentTemplate.description}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm font-medium text-gray-700">Duration:</span>
                    <span className="ml-2 text-gray-900">{currentTemplate.duration}s</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-700">Aspect Ratio:</span>
                    <span className="ml-2 text-gray-900">{currentTemplate.aspectRatio}</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-700">Resolution:</span>
                    <span className="ml-2 text-gray-900">
                      {currentTemplate.resolution.width}x{currentTemplate.resolution.height}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-700">Elements:</span>
                    <span className="ml-2 text-gray-900">{currentTemplate.elements.length}</span>
                  </div>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-700">Tags:</span>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {currentTemplate.metadata.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {showEditor && (
            <div className="lg:col-span-1">
              <TemplateEditor
                template={currentTemplate}
                onTemplateChange={handleTemplateChange}
              />
            </div>
          )}
        </div>

        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">How to Use</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">🎬 Video Preview</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Use the video controls to play/pause and scrub through the timeline</li>
                <li>• Adjust playback speed to preview at different speeds</li>
                <li>• Watch how elements animate and transition over time</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">⚙️ Template Editor</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Click "Editor" to open the template customization panel</li>
                <li>• Modify text content, colors, timing, and positioning</li>
                <li>• Expand elements to see detailed property controls</li>
                <li>• Changes are applied in real-time to the preview</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App; 