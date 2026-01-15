
import React from 'react';

interface MetricCardProps {
  label: string;
  value: number;
  inverse?: boolean;
}

const MetricCard: React.FC<MetricCardProps> = ({ label, value, inverse = false }) => {
  const getProgressColor = () => {
    const val = inverse ? 100 - value : value;
    if (val > 80) return 'bg-red-500';
    if (val > 50) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-xs text-slate-400 font-medium">{label}</span>
        <span className="text-xs font-mono font-bold text-slate-200">{value}%</span>
      </div>
      <div className="h-1.5 w-full bg-slate-700 rounded-full overflow-hidden">
        <div 
          className={`h-full transition-all duration-500 ${getProgressColor()}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
};

export default MetricCard;
