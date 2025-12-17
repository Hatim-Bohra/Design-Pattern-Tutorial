import React from "react";

interface PatternSectionProps {
  title?: string;
  children: React.ReactNode;
}

export const PatternSection: React.FC<PatternSectionProps> = ({ title, children }) => {
  return (
    <section className="space-y-4">
      {title && <h2 className="text-2xl font-bold text-slate-900">{title}</h2>}
      <div className="prose prose-slate max-w-none text-slate-600">{children}</div>
    </section>
  );
};
