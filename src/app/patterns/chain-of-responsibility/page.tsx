import React from "react";
import { Metadata } from "next";
import { ChainDemo } from "@/components/features/chain-of-responsibility/ChainDemo";
import { CodeTabs } from "@/components/shared/CodeTabs";
import { patterns } from "@/lib/registry";

export const dynamic = "force-static";
export const metadata: Metadata = { title: "Chain of Responsibility", description: "Learn the Chain of Responsibility Pattern." };
const pattern = patterns.find((p) => p.slug === "chain-of-responsibility");

export default function ChainPage() {
    if (!pattern) return <div>Pattern not found</div>;

    return (
        <div className="max-w-4xl mx-auto px-6 py-12 space-y-16">
            <header className="space-y-4 border-b pb-8">
                <h1 className="text-4xl font-extrabold text-slate-900">{pattern.title}</h1>
                <p className="text-xl text-slate-600">{pattern.description}</p>
            </header>
            <section>
                <h2 className="text-2xl font-bold mb-4">Interactive Demo</h2>
                <ChainDemo />
            </section>
            <section className="space-y-4">
                <h2 className="text-2xl font-bold text-slate-900">Implementation</h2>
                <CodeTabs tabs={[{ id: "ts", label: "Example", language: "typescript", code: `interface Handler { setNext(h: Handler): Handler; handle(req: string): void; }` }]} />
            </section>
        </div>
    );
}
