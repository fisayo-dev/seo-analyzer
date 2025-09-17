"use client"

import { KeywordDensity } from "../AnalysisDetails";

const KeywordDensityChart: React.FC<{ density: KeywordDensity | null | undefined }> = ({ density }) => (
  <div className="space-y-3">
    {density && typeof density === 'object' && Object.keys(density).length > 0 ? (
      Object.entries(density).slice(0, 5).map(([keyword, percentage]) => (
        <div key={keyword}>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600 truncate">{keyword}</span>
            <span className="text-gray-900">{percentage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full" 
              style={{ width: `${Math.min(percentage, 100)}%` }}
            ></div>
          </div>
        </div>
      ))
    ) : (
      <div className="text-gray-500 text-sm">No keyword density data available.</div>
    )}
  </div>
);

export default KeywordDensityChart;