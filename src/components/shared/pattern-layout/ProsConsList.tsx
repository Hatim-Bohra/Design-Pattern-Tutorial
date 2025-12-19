import React from "react";
import { CheckCircle2, XCircle } from "lucide-react";

interface ProsConsListProps {
  pros: string[];
  cons: string[];
}

export const ProsConsList: React.FC<ProsConsListProps> = ({ pros, cons }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
      {/* Pros Column */}
      <div className="bg-emerald-50/50 border border-emerald-100 dark:bg-emerald-900/20 dark:border-emerald-800 rounded-xl p-6 shadow-sm">
        <h3 className="flex items-center gap-2 text-lg font-bold text-emerald-900 dark:text-emerald-300 mb-4">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          Advantages
        </h3>
        <ul className="space-y-3">
          {pros.map((pro, i) => (
            <li
              key={i}
              className="flex gap-3 text-sm text-emerald-800 dark:text-emerald-200 leading-relaxed"
            >
              <span className="font-bold text-emerald-500 dark:text-emerald-400">•</span>
              {pro}
            </li>
          ))}
        </ul>
      </div>

      {/* Cons Column */}
      <div className="bg-rose-50/50 border border-rose-100 dark:bg-rose-900/20 dark:border-rose-800 rounded-xl p-6 shadow-sm">
        <h3 className="flex items-center gap-2 text-lg font-bold text-rose-900 dark:text-rose-300 mb-4">
          <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400" />
          Disadvantages
        </h3>
        <ul className="space-y-3">
          {cons.map((con, i) => (
            <li
              key={i}
              className="flex gap-3 text-sm text-rose-800 dark:text-rose-200 leading-relaxed"
            >
              <span className="font-bold text-rose-500 dark:text-rose-400">•</span>
              {con}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
