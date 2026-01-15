
import React from 'react';
import { RiskLevel } from '../types';

interface RiskBadgeProps {
  level: RiskLevel;
  score: number;
}

const RiskBadge: React.FC<RiskBadgeProps> = ({ level, score }) => {
  const getColors = () => {
    switch (level) {
      case RiskLevel.DANGER:
        return 'bg-red-500/20 text-red-400 border-red-500/50';
      case RiskLevel.HIGH:
        return 'bg-orange-500/20 text-orange-400 border-orange-500/50';
      case RiskLevel.MEDIUM:
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
      case RiskLevel.LOW:
        return 'bg-green-500/20 text-green-400 border-green-500/50';
    }
  };

  return (
    <div className={`px-2 py-0.5 rounded border text-xs font-semibold flex items-center gap-1.5 ${getColors()}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse"></span>
      {level} ({score})
    </div>
  );
};

export default RiskBadge;
