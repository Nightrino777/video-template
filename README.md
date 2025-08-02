# Video Template System

A comprehensive video template system built with React and TypeScript that allows users to create, customize, and export video templates for social media platforms.

## 🎬 Selected Video Template

I chose to implement a **"Story-Style" video template** inspired by popular social media content formats used on TikTok, Instagram Reels, and YouTube Shorts. This template features:

- **Vertical 9:16 aspect ratio** optimized for mobile viewing
- **Animated text overlays** with fade-in/fade-out effects
- **Gradient background** with smooth color transitions
- **Timed content reveals** that guide viewer attention
- **Call-to-action elements** for engagement
- **Decorative elements** like rotating shapes for visual interest

### Template Structure

The template includes 6 main elements:
1. **Background Gradient** - Purple to blue gradient covering the entire video
2. **Main Title** - Large bold text that fades in and out (0.5s - 4s)
3. **Subtitle** - Smaller text that slides in from the left (1s - 5s)
4. **Main Content** - Multi-line text with bounce animation (4s - 10s)
5. **Call-to-Action** - Pulsing "FOLLOW FOR MORE!" text (10s - 14s)
6. **Decorative Circle** - Rotating white circle for visual interest (2s - 8s)

## System Architecture

### Core Components

#### 1. **Type System** (`src/types/videoTemplate.ts`)
- `VideoTemplate`: Main template interface with metadata, elements, and settings
- `VideoElement`: Individual elements (text, image, video, audio, shape)
- `Animation`: Animation definitions with easing and timing
- `VideoExportSettings`: Export configuration options

#### 2. **Video Renderer** (`src/components/VideoRenderer.tsx`)
- Canvas-based rendering engine
- Real-time animation processing
- Support for multiple element types
- Easing function implementations

#### 3. **Template Editor** (`src/components/TemplateEditor.tsx`)
- Visual property editing interface
- Timeline-based element positioning
- Real-time preview updates
- Collapsible element panels

#### 4. **Video Controls** (`src/components/VideoControls.tsx`)
- Play/pause functionality
- Timeline scrubbing
- Playback speed control
- Time display

### Key Features

#### **Template Customization**
- **Text Elements**: Content, font size, color, alignment, weight
- **Shape Elements**: Type (rectangle, circle, triangle), color, opacity
- **Timing Control**: Start/end times, duration adjustments
- **Positioning**: X/Y coordinates, width/height percentages
- **Animations**: Fade, slide, scale, rotate, bounce effects

#### **Real-time Preview**
- Canvas-based rendering at 60fps
- Smooth animation playback
- Timeline scrubbing
- Multiple playback speeds

#### **Export System**
- MP4/WebM/GIF format support
- Quality settings (low/medium/high)
- Resolution customization
- Frame rate control

## Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd video-template-system
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Usage

1. **Preview the Template**: Use the video controls to play/pause and scrub through the timeline
2. **Open Editor**: Click the "Editor" button to access customization controls
3. **Customize Elements**: Expand element panels to modify properties
4. **Real-time Updates**: Changes are applied immediately to the preview
5. **Export**: Click "Export" to generate the final video (placeholder functionality)

## Technical Implementation

### Animation System
```typescript
interface Animation {
  id: string;
  type: 'fade' | 'slide' | 'scale' | 'rotate' | 'bounce';
  startTime: number;
  duration: number;
  easing: 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out';
  properties: {
    from: Record<string, any>;
    to: Record<string, any>;
  };
}
```

### Rendering Pipeline
1. **Background Rendering**: Gradient or solid color backgrounds
2. **Element Processing**: Filter elements by current time
3. **Animation Calculation**: Apply easing functions to animation progress
4. **Transform Application**: Position, scale, rotate, and opacity
5. **Element Rendering**: Type-specific rendering (text, shape, image)

### State Management
- React hooks for local state management
- Real-time template updates
- Playback state synchronization
- Editor state persistence

## 📁 Project Structure

```
src/
├── components/
│   ├── VideoRenderer.tsx      # Canvas-based video renderer
│   ├── VideoControls.tsx      # Playback controls
│   └── TemplateEditor.tsx     # Template customization interface
├── data/
│   └── templates.ts           # Template definitions
├── types/
│   └── index.ts               # TypeScript interfaces
├── App.tsx                    # Main application component
└── index.css                  # Tailwind CSS styles
```

## Template Design Philosophy

### "Similar Structure" Definition
A video template maintains "similar structure" when it preserves:
- **Timing Rhythm**: Element appearance/disappearance timing
- **Visual Hierarchy**: Text size relationships and positioning
- **Animation Patterns**: Consistent animation types and easing
- **Content Flow**: Logical progression of information
- **Brand Elements**: Color schemes and styling consistency

### Customization Points
Users can modify:
- **Content**: Text, images, colors
- **Timing**: Element durations and delays
- **Positioning**: Element placement and sizing
- **Styling**: Fonts, colors, effects
- **Animations**: Animation types and parameters

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Inspired by popular social media video formats
- Built with React, TypeScript, and Tailwind CSS
- Canvas API for real-time video rendering
- Framer Motion for smooth animations

---

**Note**: This is a demonstration system. The export functionality is a placeholder and would require additional video processing libraries (like FFmpeg.wasm) for actual video file generation.
