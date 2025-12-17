import React from "react";
import { Metadata } from "next";
import { ObserverDemo } from "@/components/features/observer/ObserverDemo";
import { CodeTabs } from "@/components/shared/CodeTabs";
import { patterns } from "@/lib/registry";

export const dynamic = "force-static";
export const metadata: Metadata = { title: "Observer Pattern", description: "Learn the Observer Pattern." };
const pattern = patterns.find((p) => p.slug === "observer");

export default function ObserverPage() {
    if (!pattern) return <div>Pattern not found</div>;

    return (
        <div className="max-w-4xl mx-auto px-6 py-12 space-y-16">
            <header className="space-y-4 border-b pb-8">
                <h1 className="text-4xl font-extrabold text-slate-900">{pattern.title}</h1>
                <p className="text-xl text-slate-600">{pattern.description}</p>
            </header>

            <section>
                <h2 className="text-2xl font-bold mb-4">Interactive Demo</h2>
                <ObserverDemo />
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-bold text-slate-900">Implementation Details</h2>
                <CodeTabs
                    tabs={[
                        {
                            id: "ts",
                            label: "Observable.ts",
                            language: "typescript",
                            code: `interface Observer {
  update(data: any): void;
}

class Subject {
  private observers: Observer[] = [];

  subscribe(o: Observer) {
    this.observers.push(o);
  }

  notify(data: any) {
    this.observers.forEach(o => o.update(data));
  }
}`
                        },
                        {
                            id: "usage",
                            label: "usage.ts",
                            language: "typescript",
                            code: `const news = new Subject();
news.subscribe({ update: (d) => console.log("Reader 1 read:", d) });
news.subscribe({ update: (d) => console.log("Reader 2 read:", d) });

news.notify("Breaking News!");`
                        }
                    ]}
                />
            </section>
        </div>
    );
}
