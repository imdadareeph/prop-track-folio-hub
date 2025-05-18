
import React from "react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  change?: {
    value: number;
    positive: boolean;
  };
  footer?: React.ReactNode;
}

const StatsCard = ({ title, value, icon, change, footer }: StatsCardProps) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-4 border border-slate-100 dark:border-slate-700">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</h3>
        {icon && <div>{icon}</div>}
      </div>
      <div className="flex items-baseline">
        <h2 className="text-2xl font-bold">{value}</h2>
        {change && (
          <span className={`ml-2 text-sm ${change.positive ? 'text-propertyGreen' : 'text-propertyRed'}`}>
            {change.positive ? '↑' : '↓'} {Math.abs(change.value)}%
          </span>
        )}
      </div>
      {footer && <div className="mt-3 text-xs text-slate-500">{footer}</div>}
    </div>
  );
};

export default StatsCard;
