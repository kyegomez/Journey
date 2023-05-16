// src/components/GraphNode.tsx
import React from 'react';
import { Need } from '@/types/Need';

interface GraphNodeProps {
  need: Need;
}

const GraphNode: React.FC<GraphNodeProps> = ({ need }) => {
  return (
    <div className="relative">
      <div className="absolute top-0 left-0 w-full h-full">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {need.children?.map((child: any, index) => (
            <line
              key={index}
              x1="50"
              y1="50"
              x2={child.completion * 100}
              y2={child.need_tier * 100}
              stroke="rgba(255, 255, 255, 0.3)"
              strokeWidth="1"
            />
          ))}
        </svg>
      </div>
      <div className="w-16 h-16 bg-blue-400 rounded-full flex items-center justify-center text-white font-semibold text-lg shadow-lg">
        {need.id}
      </div>
    </div>
  );
};

export default GraphNode;
