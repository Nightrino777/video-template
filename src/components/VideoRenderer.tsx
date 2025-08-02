import React, { useRef, useEffect, useState, useCallback } from 'react';
import { VideoTemplate, VideoElement } from '../types';

interface VideoRendererProps {
  template: VideoTemplate;
  currentTime: number;
  isPlaying: boolean;
  onTimeUpdate?: (time: number) => void;
}

const VideoRenderer: React.FC<VideoRendererProps> = ({
  template,
  currentTime,
  isPlaying,
  onTimeUpdate,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const [isInitialized, setIsInitialized] = useState(false);

  const renderBackground = useCallback((ctx: CanvasRenderingContext2D, template: VideoTemplate) => {
    if (template.background.type === 'color') {
      const gradient = ctx.createLinearGradient(0, 0, 0, template.resolution.height);
      if (template.background.value.includes('gradient')) {
        // Parse gradient string and create gradient
        const colors = template.background.value.match(/#[a-fA-F0-9]{6}/g) || ['#667eea', '#764ba2'];
        gradient.addColorStop(0, colors[0]);
        gradient.addColorStop(1, colors[1]);
      } else {
        gradient.addColorStop(0, template.background.value);
        gradient.addColorStop(1, template.background.value);
      }
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, template.resolution.width, template.resolution.height);
    }
  }, []);

  const renderElement = useCallback((ctx: CanvasRenderingContext2D, element: VideoElement, currentTime: number) => {
    const relativeTime = currentTime - element.startTime;
    
    // Calculate position and size with safe margins
    const x = (element.position.x / 100) * template.resolution.width;
    const y = (element.position.y / 100) * template.resolution.height;
    const width = (element.size.width / 100) * template.resolution.width;
    const height = (element.size.height / 100) * template.resolution.height;

    // Apply animations
    let transform = { opacity: 1, scale: 1, rotate: 0, translateX: 0, translateY: 0 };
    
    element.animations.forEach((animation) => {
      if (relativeTime >= animation.startTime && relativeTime <= animation.startTime + animation.duration) {
        const progress = (relativeTime - animation.startTime) / animation.duration;
        const easedProgress = applyEasing(progress, animation.easing);
        
        Object.keys(animation.properties.to).forEach((key) => {
          const from = animation.properties.from[key] || 0;
          const to = animation.properties.to[key];
          transform[key as keyof typeof transform] = from + (to - from) * easedProgress;
        });
      }
    });

    // Apply transformations
    ctx.save();
    ctx.globalAlpha = transform.opacity;
    ctx.translate(x + width / 2, y + height / 2);
    ctx.scale(transform.scale, transform.scale);
    ctx.rotate((transform.rotate * Math.PI) / 180);
    ctx.translate(-width + transform.translateX, -height / 2 + transform.translateY);

    // Render based on element type
    switch (element.type) {
      case 'text':
        renderTextElement(ctx, element, width, height);
        break;
      case 'shape':
        renderShapeElement(ctx, element, width, height);
        break;
      case 'image':
        renderImageElement(ctx, element, width, height);
        break;
    }

    ctx.restore();
  }, [template.resolution.width, template.resolution.height]);

  const renderTextElement = useCallback((ctx: CanvasRenderingContext2D, element: VideoElement, width: number, height: number) => {
    const props = element.properties as any;
    
    ctx.font = `${props.fontWeight} ${props.fontSize}px ${props.fontFamily}`;
    ctx.fillStyle = props.color;
    ctx.textAlign = props.textAlign;
    ctx.textBaseline = 'middle';
    
    if (props.textShadow) {
      ctx.shadowColor = 'rgba(0,0,0,0.5)';
      ctx.shadowBlur = 4;
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 2;
    }

    // Improved text wrapping with better word breaking
    const words = props.content.split(' ');
    const lines: string[] = [];
    let currentLine = '';
    const maxWidth = width * 0.9; // Use 90% of available width for safety

    words.forEach((word: string) => {
      const testLine = currentLine + word + ' ';
      const metrics = ctx.measureText(testLine);
      
      if (metrics.width > maxWidth && currentLine !== '') {
        lines.push(currentLine.trim());
        currentLine = word + ' ';
      } else {
        currentLine = testLine;
      }
    });
    lines.push(currentLine.trim());

    const lineHeight = props.fontSize * 1.3; // Increased line height for better readability
    const totalHeight = lines.length * lineHeight;
    const startY = height / 2 - totalHeight / 2;

    // Ensure text doesn't overflow vertically
    const maxHeight = height * 0.9;
    if (totalHeight > maxHeight) {
      // Scale down font size if text is too tall
      const scale = maxHeight / totalHeight;
      ctx.font = `${props.fontWeight} ${Math.floor(props.fontSize * scale)}px ${props.fontFamily}`;
    }

    lines.forEach((line, index) => {
      if (line.trim()) {
        ctx.fillText(line, width / 2, startY + index * lineHeight);
      }
    });
  }, []);

  const renderShapeElement = useCallback((ctx: CanvasRenderingContext2D, element: VideoElement, width: number, height: number) => {
    const props = element.properties as any;
    
    ctx.fillStyle = props.color;
    ctx.globalAlpha = props.opacity;

    switch (props.type) {
      case 'rectangle':
        ctx.fillRect(0, 0, width, height);
        break;
      case 'circle':
        ctx.beginPath();
        ctx.arc(width / 2, height / 2, Math.min(width, height) / 2, 0, 2 * Math.PI);
        ctx.fill();
        break;
      case 'triangle':
        ctx.beginPath();
        ctx.moveTo(width / 2, 0);
        ctx.lineTo(0, height);
        ctx.lineTo(width, height);
        ctx.closePath();
        ctx.fill();
        break;
    }
  }, []);

  const renderImageElement = useCallback((ctx: CanvasRenderingContext2D, element: VideoElement, width: number, height: number) => {
    const props = element.properties as any;
    const img = new Image();
    
    img.onload = () => {
      ctx.globalAlpha = props.opacity;
      ctx.drawImage(img, 0, 0, width, height);
    };
    
    img.src = props.src;
  }, []);

  const applyEasing = useCallback((progress: number, easing: string): number => {
    switch (easing) {
      case 'ease-in':
        return progress * progress;
      case 'ease-out':
        return 1 - (1 - progress) * (1 - progress);
      case 'ease-in-out':
        return progress < 0.5 ? 2 * progress * progress : 1 - 2 * (1 - progress) * (1 - progress);
      default:
        return progress;
    }
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = template.resolution.width;
    canvas.height = template.resolution.height;

    setIsInitialized(true);
  }, [template]);

  useEffect(() => {
    if (!isInitialized || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const renderFrame = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Render background
      renderBackground(ctx, template);

      // Render elements
      template.elements.forEach((element) => {
        if (currentTime >= element.startTime && currentTime <= element.endTime) {
          renderElement(ctx, element, currentTime);
        }
      });

      if (isPlaying) {
        animationFrameRef.current = requestAnimationFrame(renderFrame);
      }
    };

    renderFrame();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [template, currentTime, isPlaying, isInitialized, renderBackground, renderElement]);

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        className="border border-gray-300 rounded-lg shadow-lg"
        style={{
          width: '100%',
          maxWidth: '400px',
          aspectRatio: `${template.resolution.width} / ${template.resolution.height}`,
        }}
      />
      <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
        {Math.floor(currentTime)}s / {template.duration}s
      </div>
    </div>
  );
};

export default VideoRenderer; 