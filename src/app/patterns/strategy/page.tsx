import React from "react";
import { Metadata } from "next";
import { StrategyDemo } from "@/components/features/strategy/StrategyDemo";
import { CodeTabs } from "@/components/shared/CodeTabs";
import { patterns } from "@/lib/registry";

export const dynamic = "force-static";
export const metadata: Metadata = { title: "Strategy Pattern", description: "Learn the Strategy Pattern." };
const pattern = patterns.find((p) => p.slug === "strategy");

export default function StrategyPage() {
    if (!pattern) return <div>Pattern not found</div>;

    return (
        <div className="max-w-4xl mx-auto px-6 py-12 space-y-16">
            <header className="space-y-4 border-b pb-8">
                <h1 className="text-4xl font-extrabold text-slate-900">{pattern.title}</h1>
                <p className="text-xl text-slate-600">{pattern.description}</p>
            </header>
            <section>
                <h2 className="text-2xl font-bold mb-4">Interactive Demo</h2>
                <StrategyDemo />
            </section>
        </div>
    );
}
