"use client"

import { AlertTriangle, CheckCircle, XCircle } from "lucide-react";

const IssuesList: React.FC<{
  title: string;
  issues: string[];
  type: 'error' | 'warning' | 'info';
}> = ({ title, issues, type }) => {
  if (issues.length === 0) return null;

  const iconColor = type === 'error' ? 'text-red-500' : type === 'warning' ? 'text-yellow-500' : 'text-blue-500';
  const bgColor = type === 'error' ? 'bg-red-50' : type === 'warning' ? 'bg-yellow-50' : 'bg-blue-50';
  
  return (
    <div className={`rounded-2xl p-4 ${bgColor} border-l-4 ${type === 'error' ? 'border-red-400' : type === 'warning' ? 'border-yellow-400' : 'border-blue-400'}`}>
      <h4 className="font-medium text-gray-900 mb-2">{title}</h4>
      <ul className="space-y-1">
        {issues.map((issue, index) => (
          <li key={index} className="flex items-start text-sm text-gray-700">
            <div className={`w-4 h-4 mt-0.5 mr-2 flex-shrink-0 ${iconColor}`}>
              {type === 'error' ? <XCircle size={16} /> : 
               type === 'warning' ? <AlertTriangle size={16} /> : 
               <CheckCircle size={16} />}
            </div>
            {issue}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IssuesList;