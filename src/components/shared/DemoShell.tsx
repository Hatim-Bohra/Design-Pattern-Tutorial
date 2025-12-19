"use client";

import React from "react";
import { RefreshCw } from "lucide-react";

interface DemoShellProps {
  children: React.ReactNode;
  title: string;
  description?: string;
  onReset?: () => void;
}

export const DemoShell: React.FC<DemoShellProps> = ({ children, title, description, onReset }) => {
  return (
    <div className="w-full border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm my-8">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-50 border-b border-slate-200">
        <div>
          <h3 className="font-semibold text-slate-900">{title}</h3>
          {description && <p className="text-xs text-slate-500">{description}</p>}
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onReset}
            className="p-2 hover:bg-slate-200 rounded-md text-slate-600 transition-colors"
            title="Reset Demo"
          >
            <RefreshCw size={16} />
          </button>
        </div>
      </div>

      {/* Canvas Area */}
      <div className="relative bg-slate-50 min-h-[400px]">{children}</div>
    </div>
  );
};
