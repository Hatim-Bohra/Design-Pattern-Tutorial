import React from "react";
import { Metadata } from "next";
import { FactoryMethodDemo } from "@/components/features/factory-method/FactoryMethodDemo";
import { CodeTabs } from "@/components/shared/CodeTabs";
import { patterns } from "@/lib/registry";
import { ArrowRight, Box, PackageOpen, Settings } from "lucide-react";

export const dynamic = "force-static";

export const metadata: Metadata = {
    title: "Factory Method Pattern | Design Pattern Tutorial",
    description: "Learn how to decouple object creation code using the Factory Method.",
};

const pattern = patterns.find((p) => p.slug === "factory-method");

export default function FactoryMethodPage() {
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
                <div className="flex items-center gap-8">
                    <div className="flex flex-col items-center gap-2">
                        <div className="w-20 h-20 bg-slate-100 rounded-lg flex items-center justify-center border-2 border-dashed border-slate-300">
                            <span className="text-4xl">?</span>
                        </div>
                        <span className="text-xs font-bold text-slate-400">Creator</span>
                    </div>
                    <ArrowRight className="w-8 h-8 text-slate-300" />
                    <div className="grid grid-cols-2 gap-2">
                        <div className="w-12 h-12 bg-blue-500 rounded-sm flex items-center justify-center text-white text-xs font-bold shadow">Win</div>
                        <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow">Mac</div>
                        <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center text-white text-xs font-bold shadow">Web</div>
                        <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center text-white text-xs font-bold shadow">Linux</div>
                    </div>
                </div>
            </section>

            {/* 3. Problem */}
            <section className="space-y-4">
                <h2 className="text-2xl font-bold text-slate-900">The Problem</h2>
                <div className="prose prose-slate max-w-none text-slate-600">
                    <p>
                        Imagine you are creating a logistics management application. The first version of your app only handles transportation by trucks, so the bulk of your code lives inside the <code>Truck</code> class.
                    </p>
                    <p>
                        Later, your app becomes popular and you need to add Sea logistics. Great! But now you have to modify all your code to hande <code>Ships</code>. And later <code>Airplanes</code>.
                    </p>
                    <p>
                        If you use direct <code>new Truck()</code> calls everywhere, your code becomes tightly coupled to specific classes.
                    </p>
                </div>
            </section>

            {/* 4. Solution */}
            <section className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-900">The Solution</h2>
                <div className="prose prose-slate max-w-none text-slate-600">
                    <p>
                        The <strong>Factory Method</strong> suggests that you replace direct object construction calls (using the new operator) with calls to a special <em>factory</em> method.
                    </p>
                    <p>
                        Subclasses can override this factory method to return different types of objects (Truck, Ship, Plane) while the core business logic remains unchanged.
                    </p>
                </div>

                {/* Diagram */}
                <div className="bg-white border rounded-xl p-6 shadow-sm flex flex-col items-center">
                    <svg width="500" height="250" viewBox="0 0 500 250">
                        {/* Creator */}
                        <rect x="50" y="20" width="140" height="80" fill="#f8fafc" stroke="#334155" strokeWidth="2" />
                        <text x="120" y="45" textAnchor="middle" fontWeight="bold" fontSize="12" fill="#0f172a">Creator</text>
                        <text x="120" y="75" textAnchor="middle" fontSize="10" fill="#475569" fontStyle="italic">+ createProduct()</text>

                        {/* Concrete Creator */}
                        <rect x="50" y="150" width="140" height="80" fill="#fff" stroke="#334155" strokeWidth="2" />
                        <text x="120" y="175" textAnchor="middle" fontWeight="bold" fontSize="12" fill="#0f172a">ConcreteCreator</text>
                        <text x="120" y="205" textAnchor="middle" fontSize="10" fill="#475569">+ createProduct()</text>

                        {/* Product Interface */}
                        <rect x="300" y="20" width="140" height="80" fill="#f8fafc" stroke="#334155" strokeWidth="2" strokeDasharray="4" />
                        <text x="370" y="45" textAnchor="middle" fontWeight="bold" fontSize="12" fill="#0f172a">Product</text>

                        {/* Concrete Product */}
                        <rect x="300" y="150" width="140" height="80" fill="#fff" stroke="#334155" strokeWidth="2" />
                        <text x="370" y="175" textAnchor="middle" fontWeight="bold" fontSize="12" fill="#0f172a">ConcreteProduct</text>

                        {/* Arrows */}
                        <path d="M 120 150 L 120 100" stroke="#334155" strokeWidth="1" fill="none" markerEnd="url(#arrow-empty)" />
                        <path d="M 370 150 L 370 100" stroke="#334155" strokeWidth="1" fill="none" strokeDasharray="4" markerEnd="url(#arrow-empty)" />

                        {/* Creation Arrow */}
                        <path d="M 190 190 L 300 190" stroke="#334155" strokeWidth="1" fill="none" strokeDasharray="4" markerEnd="url(#arrow)" />

                        <defs>
                            <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                                <path d="M0,0 L0,6 L9,3 z" fill="#334155" />
                            </marker>
                            <marker id="arrow-empty" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                                <path d="M0,0 L5,8 L10,0 z" fill="white" stroke="#334155" />
                            </marker>
                        </defs>
                    </svg>
                </div>
            </section>

            {/* 5. Demo */}
            <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Interactive Playground</h2>
                <FactoryMethodDemo />
            </section>

            {/* 6. Deep Dive */}
            <section className="space-y-4">
                <h2 className="text-2xl font-bold text-slate-900">Implementation Details</h2>
                <CodeTabs
                    tabs={[
                        {
                            id: "ts",
                            label: "ui-factory.ts",
                            language: "typescript",
                            icon: <Settings size={14} />,
                            code: `// 1. Common Interface
interface Button {
  render(): void;
  onClick(f: Function): void;
}

// 2. Concrete Products
class WindowsButton implements Button { ... }
class HTMLButton implements Button { ... }

// 3. The Creator (Abstract)
abstract class Dialog {
  // THE FACTORY METHOD:
  abstract createButton(): Button;

  // Initial business logic that uses the product
  public renderDialog() {
    const okButton = this.createButton();
    okButton.onClick(() => closeDialog());
    okButton.render();
  }
}

// 4. Concrete Creators
class WindowsDialog extends Dialog {
  createButton(): Button {
    return new WindowsButton();
  }
}

class WebDialog extends Dialog {
  createButton(): Button {
    return new HTMLButton();
  }
}`
                        },
                        {
                            id: "usage",
                            label: "app.ts",
                            language: "typescript",
                            icon: <PackageOpen size={14} />,
                            code: `// The Application picks the factory once
let dialog: Dialog;

if (config.OS === "Windows") {
  dialog = new WindowsDialog();
} else {
  dialog = new WebDialog();
}

// The rest of the code just works!
dialog.renderDialog();`
                        }
                    ]}
                />
            </section>

            {/* 7. Pros/Cons */}
            <section className="grid md:grid-cols-2 gap-6">
                <div className="bg-green-50 p-6 rounded-xl border border-green-100">
                    <h3 className="font-bold text-green-900 mb-2">When to use</h3>
                    <ul className="list-disc list-inside text-sm text-green-800 space-y-1">
                        <li>You don't know beforehand the exact types and dependencies of objects your code should work with.</li>
                        <li>You want to provide users of your library with a way to extend its internal components.</li>
                    </ul>
                </div>
                <div className="bg-amber-50 p-6 rounded-xl border border-amber-100">
                    <h3 className="font-bold text-amber-900 mb-2">Pitfalls</h3>
                    <ul className="list-disc list-inside text-sm text-amber-800 space-y-1">
                        <li>The code may become more complicated since you need to introduce a lot of new subclasses to implement the pattern.</li>
                    </ul>
                </div>
            </section>
        </div>
    );
}
