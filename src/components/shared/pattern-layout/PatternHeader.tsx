import React from "react";

interface PatternHeaderProps {
  title: string;
  description: string;
  category: string;
  tags?: string[];
}

export const PatternHeader: React.FC<PatternHeaderProps> = ({
  title,
  description,
  category,
  tags,
}) => {
  return (
    <header className="space-y-4 border-b pb-8">
      <div className="flex items-center gap-2">
        <span className="px-2 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider">
          {category}
        </span>
        {tags?.map((tag) => (
          <span
            key={tag}
            className="px-2 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-medium"
          >
            {tag}
          </span>
        ))}
      </div>
      <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">{title}</h1>
      <p className="text-xl text-slate-600 max-w-2xl">{description}</p>
    </header>
  );
};
