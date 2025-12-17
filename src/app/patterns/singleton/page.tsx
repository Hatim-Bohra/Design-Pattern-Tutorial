import React from "react";
import { Metadata } from "next";
import { SingletonDemo } from "@/components/features/singleton/SingletonDemo";
import { CodeTabs } from "@/components/shared/CodeTabs";
import { patterns } from "@/lib/registry";
import { ArrowRight, Database, Globe, Layers, Server } from "lucide-react";

export const dynamic = "force-static";

export const metadata: Metadata = {
    title: "Singleton Pattern | Design Pattern Tutorial",
    description: "Master the Singleton Pattern in TypeScript and React.",
};

const pattern = patterns.find((p) => p.slug === "singleton");

export default function SingletonPage() {
    if (!pattern) return <div>Pattern not found</div>;

    return (
        <div className="max-w-4xl mx-auto px-6 py-12 space-y-16">
            {/* 1. Header */}
            <header className="space-y-4 border-b pb-8">
                <div className="flex items-center gap-2">
                    <span className="px-2 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider">
                        {pattern.category}
                    </span>
                    <span className="px-2 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-medium">
                        Complexity: Low
                    </span>
                </div>
                <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
                    {pattern.title}
                </h1>
                <p className="text-xl text-slate-600 max-w-2xl">
                    {pattern.description}
                </p>
            </header>

            {/* 2. Hook */}
            <section className="flex justify-center py-8">
                <div className="relative w-64 h-32 flex items-center justify-center">
                    {/* Multiple requests converging */}
                    <div className="absolute left-0 top-0 p-2 bg-slate-100 text-slate-500 rounded text-xs animate-bounce" style={{ animationDelay: '0s' }}>Req 1</div>
                    <div className="absolute left-0 bottom-0 p-2 bg-slate-100 text-slate-500 rounded text-xs animate-bounce" style={{ animationDelay: '0.5s' }}>Req 2</div>
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 p-2 bg-slate-100 text-slate-500 rounded text-xs animate-bounce" style={{ animationDelay: '1s' }}>Req 3</div>

                    {/* The One Instance */}
                    <div className="z-10 w-24 h-24 bg-indigo-600 rounded-xl shadow-xl flex items-center justify-center text-white ring-4 ring-indigo-200">
                        <span className="font-bold text-2xl">1</span>
                    </div>
                </div>
            </section>

            {/* 3. Problem */}
            <section className="space-y-4">
                <h2 className="text-2xl font-bold text-slate-900">The Problem</h2>
                <div className="prose prose-slate max-w-none text-slate-600">
                    <p>
                        Some resources are expensive to create (like database connections) or need to be consistent across your entire application (like User Configuration or Logging).
                    </p>
                    <p>
                        If every component created its own copy of these resources, you would run out of memory, crash the database, or have inconsistent application states (e.g., one component thinks the theme is Dark, another thinks it's Light).
                    </p>
                </div>
            </section>

            {/* 4. Solution */}
            <section className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-900">The Solution</h2>
                <div className="prose prose-slate max-w-none text-slate-600">
                    <p>
                        The <strong>Singleton Pattern</strong> restricts a class to a single instance and provides a global access point to it.
                        It's like a Global Variable, but safer because the class itself controls its own life cycle.
                    </p>
                </div>

                {/* Diagram */}
                <div className="bg-white border rounded-xl p-6 shadow-sm flex flex-col items-center">
                    <svg width="400" height="200" viewBox="0 0 400 200">
                        {/* Class Box */}
                        <rect x="100" y="20" width="200" height="160" fill="#f8fafc" stroke="#334155" strokeWidth="2" rx="4" />
                        <line x1="100" y1="60" x2="300" y2="60" stroke="#334155" />
                        <line x1="100" y1="120" x2="300" y2="120" stroke="#334155" />

                        {/* Title */}
                        <text x="200" y="45" textAnchor="middle" fontWeight="bold" fill="#0f172a">Singleton</text>

                        {/* Fields */}
                        <text x="110" y="90" fontSize="12" fill="#475569">- instance: Singleton</text>

                        {/* Methods */}
                        <text x="110" y="150" fontSize="12" fill="#475569">+ getInstance(): Singleton</text>

                        {/* Self Reference Arrow */}
                        <path d="M 300 90 L 340 90 L 340 40 L 250 40" fill="none" stroke="#6366f1" strokeWidth="2" strokeDasharray="4" markerEnd="url(#arrow)" />
                    </svg>
                    <p className="text-xs text-slate-400 mt-2 italic">The class holds a reference to itself.</p>
                </div>
            </section>

            {/* 5. Demo */}
            <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Interactive Playground</h2>
                <SingletonDemo />
            </section>

            {/* 6. Deep Dive */}
            <section className="space-y-4">
                <h2 className="text-2xl font-bold text-slate-900">Implementation Details</h2>
                <CodeTabs
                    tabs={[
                        {
                            id: "ts",
                            label: "db-connection.ts",
                            language: "typescript",
                            icon: <Database size={14} />,
                            code: `class Database {
  // 1. Static field to hold the single instance
  private static instance: Database;
  
  // 2. Private constructor prevents "new Database()" calls
  private constructor() {
    console.log("Connecting to DB...");
  }

  // 3. Public static method to get the instance
  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  public query(sql: string) {
    return "Result";
  }
}`
                        },
                        {
                            id: "usage",
                            label: "usage.ts",
                            language: "typescript",
                            icon: <Server size={14} />,
                            code: `// Correct Usage
const db1 = Database.getInstance();
const db2 = Database.getInstance();

console.log(db1 === db2); // true
// Both variables point to the same object in memory.`
                        }
                    ]}
                />
            </section>

            {/* 7. Pros/Cons */}
            <section className="grid md:grid-cols-2 gap-6">
                <div className="bg-green-50 p-6 rounded-xl border border-green-100">
                    <h3 className="font-bold text-green-900 mb-2">When to use</h3>
                    <ul className="list-disc list-inside text-sm text-green-800 space-y-1">
                        <li>You need strictly one instance of a class (DB connection, Logger).</li>
                        <li>You need global access to that instance.</li>
                    </ul>
                </div>
                <div className="bg-amber-50 p-6 rounded-xl border border-amber-100">
                    <h3 className="font-bold text-amber-900 mb-2">Pitfalls</h3>
                    <ul className="list-disc list-inside text-sm text-amber-800 space-y-1">
                        <li>Violates Single Responsibility Principle (controls own lifecycle).</li>
                        <li>Hides dependencies (hard to unit test components that use it).</li>
                        <li>Multi-threaded environments require careful locking (though JS is single-threaded).</li>
                    </ul>
                </div>
            </section>
        </div>
    );
}
