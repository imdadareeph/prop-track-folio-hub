
import React from "react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  rightElement?: React.ReactNode;
}

const PageHeader = ({ title, subtitle, rightElement }: PageHeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200">{title}</h1>
        {subtitle && (
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{subtitle}</p>
        )}
      </div>
      {rightElement && <div>{rightElement}</div>}
    </div>
  );
};

export default PageHeader;
