import React from "react";
import { Metadata } from "next";
import { SingletonDemo } from "@/components/features/singleton/SingletonDemo";
import { CodeTabs } from "@/components/shared/CodeTabs";
import { patterns } from "@/lib/registry";
import { prosConsData } from "@/lib/pattern-content";
import { Database, Server } from "lucide-react"; // Added Info icon
import { PatternHeader } from "@/components/shared/pattern-layout/PatternHeader";
import { PatternSection } from "@/components/shared/pattern-layout/PatternSection";
import { ProsConsList } from "@/components/shared/pattern-layout/ProsConsList";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Singleton Pattern | Design Pattern Tutorial",
  description: "Master the Singleton Pattern in TypeScript and React.",
};

const pattern = patterns.find((p) => p.slug === "singleton");
const content = prosConsData["singleton"];

export default function SingletonPage() {
  if (!pattern) return <div>Pattern not found</div>;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">
      <PatternHeader
        title={pattern.title}
        description={pattern.description}
        category={pattern.category}
        tags={pattern.tags}
      />

      {/* Hook */}
      <section className="flex justify-center py-8">
        <div className="relative w-64 h-32 flex items-center justify-center">
          <div
            className="absolute left-0 top-0 p-2 bg-slate-100 text-slate-500 rounded text-xs animate-bounce"
            style={{ animationDelay: "0s" }}
          >
            Req 1
          </div>
          <div
            className="absolute left-0 bottom-0 p-2 bg-slate-100 text-slate-500 rounded text-xs animate-bounce"
            style={{ animationDelay: "0.5s" }}
          >
            Req 2
          </div>
          <div
            className="absolute right-0 top-1/2 -translate-y-1/2 p-2 bg-slate-100 text-slate-500 rounded text-xs animate-bounce"
            style={{ animationDelay: "1s" }}
          >
            Req 3
          </div>
          <div className="z-10 w-24 h-24 bg-indigo-600 rounded-xl shadow-xl flex items-center justify-center text-white ring-4 ring-indigo-200">
            <span className="font-bold text-2xl">1</span>
          </div>
        </div>
      </section>

      <PatternSection title="The Problem">
        <p>
          Some resources are expensive to create (like database connections) or need to be
          consistent across your entire application (like User Configuration or Logging).
        </p>
        <p>
          If every component created its own copy of these resources, you would run out of memory,
          crash the database, or have inconsistent application states.
        </p>
      </PatternSection>

      <PatternSection title="The Solution">
        <p>
          The <strong>Singleton Pattern</strong> restricts a class to a single instance and provides
          a global access point to it. Ideally, you want to:
        </p>
        <ol className="list-decimal list-inside space-y-1 ml-4 mt-2">
          <li>Ensure that a class has just a single instance.</li>
          <li>Provide a global access point to that instance.</li>
        </ol>
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 flex flex-col items-center not-prose mt-6 dark:bg-slate-800 dark:border-slate-700">
          <svg width="400" height="200" viewBox="0 0 400 200" className="max-w-full h-auto">
            <rect
              x="100"
              y="20"
              width="200"
              height="160"
              fill="#f8fafc"
              stroke="#334155"
              strokeWidth="2"
              rx="4"
            />
            <line x1="100" y1="60" x2="300" y2="60" stroke="#334155" />
            <line x1="100" y1="120" x2="300" y2="120" stroke="#334155" />
            <text x="200" y="45" textAnchor="middle" fontWeight="bold" fill="#0f172a">
              Singleton
            </text>
            <text x="110" y="90" fontSize="12" fill="#475569">
              - instance: Singleton
            </text>
            <text x="110" y="150" fontSize="12" fill="#475569">
              + getInstance(): Singleton
            </text>
            <path
              d="M 300 90 L 340 90 L 340 40 L 250 40"
              fill="none"
              stroke="#6366f1"
              strokeWidth="2"
              strokeDasharray="4"
              markerEnd="url(#arrow)"
            />
            <defs>
              <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                <path d="M0,0 L0,6 L9,3 z" fill="#6366f1" />
              </marker>
            </defs>
          </svg>
        </div>
      </PatternSection>

      <PatternSection title="Interactive Playground">
        <p className="mb-4">
          In this demo, observe how the <strong>Global Config</strong> state is shared across
          multiple windows (Client A and Client B) when Singleton mode is active.
        </p>
        <SingletonDemo />
      </PatternSection>

      <PatternSection title="Implementation Details">
        <CodeTabs
          tabs={[
            {
              id: "ts",
              label: "db-connection.ts",
              language: "typescript",
              icon: <Database size={14} />,
              code: `class Database {\n  private static instance: Database;\n  private constructor() {}\n  public static getInstance(): Database {\n    if (!Database.instance) Database.instance = new Database();\n    return Database.instance;\n  }\n}`,
            },
            {
              id: "usage",
              label: "usage.ts",
              language: "typescript",
              icon: <Server size={14} />,
              code: `const db1 = Database.getInstance();\nconst db2 = Database.getInstance();\nconsole.log(db1 === db2); // true`,
            },
          ]}
        />
      </PatternSection>

      {content && (
        <PatternSection title="Pros & Cons">
          <ProsConsList pros={content.pros} cons={content.cons} />
        </PatternSection>
      )}
    </div>
  );
}
