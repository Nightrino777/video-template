import { VideoTemplate } from '../types';

export const storyStyleTemplate: VideoTemplate = {
  id: 'story-style-template',
  name: 'Story Style Video',
  description: 'A popular social media template with animated text overlays, background music, and smooth transitions. Perfect for TikTok, Instagram Reels, and YouTube Shorts.',
  duration: 15, // 15 seconds
  aspectRatio: '9:16', // Vertical format for mobile
  resolution: {
    width: 1080,
    height: 1920,
  },
  elements: [
    // Background gradient
    {
      id: 'background-gradient',
      type: 'shape',
      startTime: 0,
      endTime: 15,
      position: { x: 0, y: 0 },
      size: { width: 100, height: 100 },
      properties: {
        type: 'rectangle',
        color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        opacity: 1,
      },
      animations: [],
    },
    // Main title text - positioned with safe margins
    {
      id: 'main-title',
      type: 'text',
      startTime: 0.5,
      endTime: 4,
      position: { x: 50, y: 15 }, // Moved up from 20 to 15
      size: { width: 70, height: 12 }, // Reduced width from 80 to 70
      properties: {
        content: 'YOUR TITLE HERE',
        fontSize: 42, // Reduced from 48
        fontFamily: 'Arial, sans-serif',
        color: '#ffffff',
        textAlign: 'center',
        fontWeight: 'bold',
        textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
        opacity: 1,
      },
      animations: [
        {
          id: 'title-fade-in',
          type: 'fade',
          startTime: 0,
          duration: 0.5,
          easing: 'ease-out',
          properties: {
            from: { opacity: 0, transform: 'translateY(-20px)' },
            to: { opacity: 1, transform: 'translateY(0)' },
          },
        },
        {
          id: 'title-fade-out',
          type: 'fade',
          startTime: 3,
          duration: 0.5,
          easing: 'ease-in',
          properties: {
            from: { opacity: 1 },
            to: { opacity: 0 },
          },
        },
      ],
    },
    // Subtitle text - positioned with safe margins
    {
      id: 'subtitle',
      type: 'text',
      startTime: 1,
      endTime: 5,
      position: { x: 50, y: 35 }, // Moved down from 40 to 35
      size: { width: 70, height: 8 }, // Reduced width from 80 to 70
      properties: {
        content: 'Your subtitle goes here',
        fontSize: 20, // Reduced from 24
        fontFamily: 'Arial, sans-serif',
        color: '#ffffff',
        textAlign: 'center',
        fontWeight: 'normal',
        textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
        opacity: 1,
      },
      animations: [
        {
          id: 'subtitle-slide-in',
          type: 'slide',
          startTime: 0,
          duration: 0.8,
          easing: 'ease-out',
          properties: {
            from: { transform: 'translateX(-50px)', opacity: 0 },
            to: { transform: 'translateX(0)', opacity: 1 },
          },
        },
      ],
    },
    // Main content text - positioned with safe margins
    {
      id: 'main-content',
      type: 'text',
      startTime: 4,
      endTime: 10,
      position: { x: 50, y: 55 }, // Moved down from 50 to 55
      size: { width: 75, height: 20 }, // Reduced width from 85 to 75
      properties: {
        content: 'This is where your main content goes. You can add multiple lines of text that will appear with smooth animations.',
        fontSize: 28, // Reduced from 32
        fontFamily: 'Arial, sans-serif',
        color: '#ffffff',
        textAlign: 'center',
        fontWeight: 'normal',
        textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
        opacity: 1,
      },
      animations: [
        {
          id: 'content-bounce-in',
          type: 'bounce',
          startTime: 0,
          duration: 1,
          easing: 'ease-out',
          properties: {
            from: { transform: 'scale(0.8)', opacity: 0 },
            to: { transform: 'scale(1)', opacity: 1 },
          },
        },
      ],
    },
    // Call to action - positioned with safe margins
    {
      id: 'cta-text',
      type: 'text',
      startTime: 10,
      endTime: 14,
      position: { x: 50, y: 80 }, // Moved down from 75 to 80
      size: { width: 70, height: 12 }, // Reduced width from 80 to 70
      properties: {
        content: 'FOLLOW FOR MORE!',
        fontSize: 30, // Reduced from 36
        fontFamily: 'Arial, sans-serif',
        color: '#ff6b6b',
        textAlign: 'center',
        fontWeight: 'bold',
        textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
        opacity: 1,
      },
      animations: [
        {
          id: 'cta-pulse',
          type: 'scale',
          startTime: 0,
          duration: 2,
          easing: 'ease-in-out',
          properties: {
            from: { transform: 'scale(1)' },
            to: { transform: 'scale(1.1)' },
          },
        },
      ],
    },
    // Decorative element - positioned safely
    {
      id: 'decorative-circle',
      type: 'shape',
      startTime: 2,
      endTime: 8,
      position: { x: 85, y: 25 }, // Moved from 80,30 to 85,25
      size: { width: 6, height: 6 }, // Reduced from 8x8 to 6x6
      properties: {
        type: 'circle',
        color: '#ffffff',
        opacity: 0.6,
      },
      animations: [
        {
          id: 'circle-rotate',
          type: 'rotate',
          startTime: 0,
          duration: 6,
          easing: 'linear',
          properties: {
            from: { transform: 'rotate(0deg)' },
            to: { transform: 'rotate(360deg)' },
          },
        },
      ],
    },
  ],
  background: {
    type: 'color',
    value: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  metadata: {
    category: 'Social Media',
    tags: ['tiktok', 'instagram', 'reels', 'story', 'vertical', 'mobile'],
    difficulty: 'beginner',
    estimatedTime: 5, // 5 minutes to customize
  },
};

export const templates: VideoTemplate[] = [storyStyleTemplate];

export const templateCategories = [
  {
    id: 'social-media',
    name: 'Social Media',
    description: 'Templates optimized for social media platforms',
    icon: '📱',
    templates: [storyStyleTemplate],
  },
]; 