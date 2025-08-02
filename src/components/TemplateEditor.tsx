import React, { useState } from 'react';
import { VideoTemplate, VideoElement } from '../types';
import { Edit3, Eye, EyeOff } from 'lucide-react';

interface TemplateEditorProps {
  template: VideoTemplate;
  onTemplateChange: (template: VideoTemplate) => void;
}

const TemplateEditor: React.FC<TemplateEditorProps> = ({ template, onTemplateChange }) => {
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [expandedElements, setExpandedElements] = useState<Set<string>>(new Set());

  const updateElement = (elementId: string, updates: Partial<VideoElement>) => {
    const updatedElements = template.elements.map((element) =>
      element.id === elementId ? { ...element, ...updates } : element
    );
    
    onTemplateChange({
      ...template,
      elements: updatedElements,
    });
  };

  const updateElementProperty = (elementId: string, propertyPath: string, value: any) => {
    const element = template.elements.find((el) => el.id === elementId);
    if (!element) return;

    const propertyPathArray = propertyPath.split('.');
    const updatedProperties = { ...element.properties } as any;
    
    let current: any = updatedProperties;
    for (let i = 0; i < propertyPathArray.length - 1; i++) {
      current = current[propertyPathArray[i]];
    }
    current[propertyPathArray[propertyPathArray.length - 1]] = value;

    updateElement(elementId, { properties: updatedProperties });
  };

  const toggleElementExpanded = (elementId: string) => {
    const newExpanded = new Set(expandedElements);
    if (newExpanded.has(elementId)) {
      newExpanded.delete(elementId);
    } else {
      newExpanded.add(elementId);
    }
    setExpandedElements(newExpanded);
  };

  const renderPropertyEditor = (element: VideoElement) => {
    const props = element.properties as any;
    
    switch (element.type) {
      case 'text':
        return (
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Content
              </label>
              <textarea
                value={props.content}
                onChange={(e) => updateElementProperty(element.id, 'content', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                rows={3}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Font Size
                </label>
                <input
                  type="number"
                  value={props.fontSize}
                  onChange={(e) => updateElementProperty(element.id, 'fontSize', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Color
                </label>
                <input
                  type="color"
                  value={props.color}
                  onChange={(e) => updateElementProperty(element.id, 'color', e.target.value)}
                  className="w-full h-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Font Weight
                </label>
                <select
                  value={props.fontWeight}
                  onChange={(e) => updateElementProperty(element.id, 'fontWeight', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="normal">Normal</option>
                  <option value="bold">Bold</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Text Align
                </label>
                <select
                  value={props.textAlign}
                  onChange={(e) => updateElementProperty(element.id, 'textAlign', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="left">Left</option>
                  <option value="center">Center</option>
                  <option value="right">Right</option>
                </select>
              </div>
            </div>
          </div>
        );
        
      case 'shape':
        return (
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Shape Type
              </label>
              <select
                value={props.type}
                onChange={(e) => updateElementProperty(element.id, 'type', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="rectangle">Rectangle</option>
                <option value="circle">Circle</option>
                <option value="triangle">Triangle</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Color
              </label>
              <input
                type="color"
                value={props.color}
                onChange={(e) => updateElementProperty(element.id, 'color', e.target.value)}
                className="w-full h-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Opacity
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={props.opacity}
                onChange={(e) => updateElementProperty(element.id, 'opacity', parseFloat(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
        );
        
      default:
        return <div>Property editor not implemented for this element type.</div>;
    }
  };

  const renderTimelineEditor = (element: VideoElement) => {
    return (
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start Time (s)
            </label>
            <input
              type="number"
              min="0"
              max={template.duration}
              step="0.1"
              value={element.startTime}
              onChange={(e) => updateElement(element.id, { startTime: parseFloat(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              End Time (s)
            </label>
            <input
              type="number"
              min="0"
              max={template.duration}
              step="0.1"
              value={element.endTime}
              onChange={(e) => updateElement(element.id, { endTime: parseFloat(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              X Position (%)
            </label>
            <input
              type="number"
              min="0"
              max="100"
              value={element.position.x}
              onChange={(e) => updateElement(element.id, { 
                position: { ...element.position, x: parseFloat(e.target.value) }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Y Position (%)
            </label>
            <input
              type="number"
              min="0"
              max="100"
              value={element.position.y}
              onChange={(e) => updateElement(element.id, { 
                position: { ...element.position, y: parseFloat(e.target.value) }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Width (%)
            </label>
            <input
              type="number"
              min="0"
              max="100"
              value={element.size.width}
              onChange={(e) => updateElement(element.id, { 
                size: { ...element.size, width: parseFloat(e.target.value) }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Height (%)
            </label>
            <input
              type="number"
              min="0"
              max="100"
              value={element.size.height}
              onChange={(e) => updateElement(element.id, { 
                size: { ...element.size, height: parseFloat(e.target.value) }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Template Editor</h3>
      
      <div className="space-y-4">
        {template.elements.map((element) => (
          <div
            key={element.id}
            className={`border rounded-lg p-4 transition-all ${
              selectedElement === element.id ? 'border-primary-500 bg-primary-50' : 'border-gray-200'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-900 capitalize">
                  {element.type} Element
                </span>
                <span className="text-xs text-gray-500">({element.id})</span>
              </div>
              
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => toggleElementExpanded(element.id)}
                  className="p-1 rounded hover:bg-gray-100"
                >
                  {expandedElements.has(element.id) ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
                <button
                  onClick={() => setSelectedElement(element.id)}
                  className="p-1 rounded hover:bg-gray-100"
                >
                  <Edit3 size={16} />
                </button>
              </div>
            </div>
            
            {expandedElements.has(element.id) && (
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Timeline & Position</h4>
                  {renderTimelineEditor(element)}
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Properties</h4>
                  {renderPropertyEditor(element)}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplateEditor; 