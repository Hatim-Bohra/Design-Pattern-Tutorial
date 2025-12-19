import React from "react";

interface PatternSectionProps {
  title?: string;
  children: React.ReactNode;
}

export const PatternSection: React.FC<PatternSectionProps> = ({ title, children }) => {
  return (
    <section className="space-y-4">
      {title && (
        <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">{title}</h2>
      )}
      <div className="bg-white border boundary-card rounded-2xl p-6 md:p-8 shadow-sm text-slate-600 leading-relaxed text-lg dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300">
        {children}
      </div>
    </section>
  );
};
