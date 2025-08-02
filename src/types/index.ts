export interface VideoElement {
  id: string;
  type: 'text' | 'image' | 'video' | 'audio' | 'shape';
  startTime: number; // in seconds
  endTime: number; // in seconds
  position: {
    x: number; // percentage from left (0-100)
    y: number; // percentage from top (0-100)
  };
  size: {
    width: number; // percentage of video width
    height: number; // percentage of video height
  };
  properties: TextProperties | ImageProperties | VideoProperties | AudioProperties | ShapeProperties;
  animations: Animation[];
}

export interface TextProperties {
  content: string;
  fontSize: number;
  fontFamily: string;
  color: string;
  backgroundColor?: string;
  textAlign: 'left' | 'center' | 'right';
  fontWeight: 'normal' | 'bold';
  textShadow?: string;
  opacity: number;
}

export interface ImageProperties {
  src: string;
  alt: string;
  objectFit: 'cover' | 'contain' | 'fill';
  borderRadius: number;
  opacity: number;
}

export interface VideoProperties {
  src: string;
  volume: number;
  playbackRate: number;
  loop: boolean;
  opacity: number;
}

export interface AudioProperties {
  src: string;
  volume: number;
  loop: boolean;
}

export interface ShapeProperties {
  type: 'rectangle' | 'circle' | 'triangle';
  color: string;
  borderColor?: string;
  borderWidth?: number;
  opacity: number;
}

export interface Animation {
  id: string;
  type: 'fade' | 'slide' | 'scale' | 'rotate' | 'bounce';
  startTime: number; // relative to element start time
  duration: number;
  easing: 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out';
  properties: {
    from: Record<string, any>;
    to: Record<string, any>;
  };
}

export interface VideoTemplate {
  id: string;
  name: string;
  description: string;
  duration: number; // in seconds
  aspectRatio: '9:16' | '16:9' | '1:1' | '4:3';
  resolution: {
    width: number;
    height: number;
  };
  elements: VideoElement[];
  background: {
    type: 'color' | 'image' | 'video';
    value: string;
  };
  metadata: {
    category: string;
    tags: string[];
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    estimatedTime: number; // in minutes
  };
}

export interface TemplateCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  templates: VideoTemplate[];
}

export interface UserProject {
  id: string;
  name: string;
  templateId: string;
  elements: VideoElement[];
  customizations: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

export interface VideoExportSettings {
  format: 'mp4' | 'webm' | 'gif';
  quality: 'low' | 'medium' | 'high';
  resolution: {
    width: number;
    height: number;
  };
  frameRate: number;
} 