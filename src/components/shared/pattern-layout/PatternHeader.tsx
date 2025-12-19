import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { ScrollToTop } from "@/components/shared/ScrollToTop";

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
  const getCategoryColor = (c: string) => {
    switch (c) {
      case "Creational":
        return "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/40 dark:text-blue-200 dark:border-blue-800";
      case "Structural":
        return "bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/40 dark:text-purple-200 dark:border-purple-800";
      case "Behavioral":
        return "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/40 dark:text-amber-200 dark:border-amber-800";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700";
    }
  };

  return (
    <header className="space-y-6 relative">
      <ScrollToTop />
      <div className="absolute top-0 left-0 -ml-2 -mt-12 hidden md:block">
        <Link
          href="/"
          scroll={true}
          className="flex items-center gap-2 text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors text-sm font-medium p-2 rounded-lg hover:bg-slate-100/50 dark:hover:bg-slate-800/50"
        >
          <ArrowLeft size={16} /> Back to Patterns
        </Link>
      </div>

      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${getCategoryColor(category)}`}
          >
            {category} Pattern
          </span>
          {tags?.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 rounded-full bg-white text-slate-600 border border-slate-200 dark:bg-slate-900 dark:text-slate-400 dark:border-slate-700 text-xs font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white wrap-break-word">
          {title}
        </h1>

        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
          {description}
        </p>
      </div>

      <div className="h-px w-full bg-linear-to-r from-slate-200 via-slate-100 to-transparent dark:from-slate-800 dark:via-slate-900" />
    </header>
  );
};
