import React from "react";
import { Metadata } from "next";
import { FacadeDemo } from "@/components/features/facade/FacadeDemo";
import { CodeTabs } from "@/components/shared/CodeTabs";
import { patterns } from "@/lib/registry";

export const dynamic = "force-static";
export const metadata: Metadata = { title: "Facade Pattern", description: "Learn the Facade Pattern." };
const pattern = patterns.find((p) => p.slug === "facade");

export default function FacadePage() {
    if (!pattern) return <div>Pattern not found</div>;

    return (
        <div className="max-w-4xl mx-auto px-6 py-12 space-y-16">
            <header className="space-y-4 border-b pb-8">
                <h1 className="text-4xl font-extrabold text-slate-900">{pattern.title}</h1>
                <p className="text-xl text-slate-600">{pattern.description}</p>
            </header>
            <section>
                <h2 className="text-2xl font-bold mb-4">Interactive Demo</h2>
                <FacadeDemo />
            </section>
            <section className="space-y-4">
                <h2 className="text-2xl font-bold text-slate-900">Implementation</h2>
                <CodeTabs tabs={[{ id: "ts", label: "Example", language: "typescript", code: `class HomeTheaterFacade { watchMovie() { this.tv.on(); this.sound.on(); this.lights.dim(); } }` }]} />
            </section>
        </div>
    );
}
