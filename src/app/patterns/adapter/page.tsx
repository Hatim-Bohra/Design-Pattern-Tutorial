import React from "react";
import { Metadata } from "next";
import { AdapterDemo } from "@/components/features/adapter/AdapterDemo";
import { CodeTabs } from "@/components/shared/CodeTabs";
import { patterns } from "@/lib/registry";
import { ArrowRight, Box, Layout, ShieldAlert, TestTube } from "lucide-react";

// Force static generation
export const dynamic = "force-static";

export const metadata: Metadata = {
    title: "Adapter Pattern | Design Pattern Tutorial",
    description: "Learn the Adapter Design Pattern with interactive demos.",
};

const pattern = patterns.find((p) => p.slug === "adapter");

export default function AdapterPage() {
    if (!pattern) return <div>Pattern not found</div>;

    return (
        <div className="max-w-4xl mx-auto px-6 py-12 space-y-16">
            {/* 1. Page Header */}
            <header className="space-y-4 border-b pb-8">
                <div className="flex items-center gap-2">
                    <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider">
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

            {/* 2. The Hook (Visual Concept) */}
            <section aria-label="Concept Visualization" className="flex justify-center py-8">
                <div className="flex items-center gap-4 text-slate-400">
                    <div className="flex flex-col items-center gap-2">
                        <div className="w-16 h-16 bg-amber-100 rounded-md border-2 border-amber-300 flex items-center justify-center font-mono text-xs text-amber-700 font-bold transform -rotate-3">
                            &lt;XML/&gt;
                        </div>
                        <span className="text-xs font-bold">Incompatible</span>
                    </div>
                    <ArrowRight className="w-6 h-6 animate-pulse" />
                    <div className="relative group">
                        <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center text-white shadow-lg z-10 relative">
                            <Box className="w-8 h-8" />
                        </div>
                        <div className="absolute inset-0 bg-purple-400 rounded-full blur-lg opacity-20 group-hover:opacity-40 transition-opacity" />
                        <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-bold text-purple-600 whitespace-nowrap">Adapter</span>
                    </div>
                    <ArrowRight className="w-6 h-6 animate-pulse" />
                    <div className="flex flex-col items-center gap-2">
                        <div className="w-16 h-16 bg-blue-50 rounded-xl border border-blue-200 flex items-center justify-center font-mono text-xs text-blue-700 font-bold shadow-sm">
                            &#123;JSON&#125;
                        </div>
                        <span className="text-xs font-bold">Standard</span>
                    </div>
                </div>
            </section>

            {/* 3. The Problem */}
            <section className="space-y-4">
                <h2 className="text-2xl font-bold text-slate-900">The Problem</h2>
                <div className="prose prose-slate max-w-none text-slate-600">
                    <p>
                        Imagine you are building a modern stock market dashboard. Your UI components expect
                        data in a clean JSON format. However, you need to display data from a legacy banking
                        system that only outputs XML.
                    </p>
                    <p>
                        You can't change the legacy system (it's 20 years old), and you shouldn't change your
                        UI components to parse XML (that breaks clean architecture).
                    </p>
                </div>
                <div className="bg-red-50 border border-red-100 rounded-lg p-4 font-mono text-sm text-red-800">
                    <p className="font-bold mb-2">❌ Bad Approach: Polluting the UI</p>
                    <pre className="whitespace-pre-wrap">
                        {`// Don't do this inside your React component!
const StockChart = ({ data }) => {
  if (data.startsWith("<xml>")) {
    const xml = parseXML(data); // 🤢 Logic coupling
    return <BarChart values={xml.values} />;
  }
  return <BarChart values={data.values} />;
}`}
                    </pre>
                </div>
            </section>

            {/* 4. The Solution */}
            <section className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-900">The Solution</h2>
                <div className="prose prose-slate max-w-none text-slate-600">
                    <p>
                        Create a separate class (or function) called an <strong>Adapter</strong>.
                        It wraps the legacy object and exposes the interface that your modern system expects.
                        It translates calls on the fly.
                    </p>
                </div>

                {/* SVG Diagram */}
                <div className="bg-white border rounded-xl p-6 shadow-sm flex flex-col items-center">
                    <h3 className="sr-only">Adapter Pattern Diagram</h3>
                    <svg width="600" height="200" viewBox="0 0 600 200" className="max-w-full">
                        {/* Client */}
                        <rect x="50" y="50" width="120" height="100" fill="#f1f5f9" stroke="#94a3b8" rx="8" />
                        <text x="110" y="105" textAnchor="middle" className="font-bold fill-slate-700 text-sm">Client</text>

                        {/* Arrow */}
                        <path d="M 170 100 L 230 100" stroke="#cbd5e1" strokeWidth="2" markerEnd="url(#arrow)" />

                        {/* Interface */}
                        <rect x="230" y="50" width="120" height="100" fill="#fff" stroke="#3b82f6" strokeDasharray="4" rx="8" />
                        <text x="290" y="105" textAnchor="middle" className="font-bold fill-blue-600 text-sm">Target Interface</text>

                        {/* Arrow */}
                        <path d="M 350 100 L 410 100" stroke="#cbd5e1" strokeWidth="2" markerEnd="url(#arrow)" />

                        {/* Adapter */}
                        <rect x="410" y="50" width="120" height="100" fill="#eff6ff" stroke="#3b82f6" rx="8" />
                        <text x="470" y="105" textAnchor="middle" className="font-bold fill-blue-800 text-sm">Adapter</text>

                        <defs>
                            <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                                <path d="M0,0 L0,6 L9,3 z" fill="#cbd5e1" />
                            </marker>
                        </defs>
                    </svg>
                    <p className="text-xs text-slate-400 mt-2 italic">The Client talks to the Adapter via the Target Interface.</p>
                </div>
            </section>

            {/* 5. Interactive Demo */}
            <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Interactive Playground</h2>
                <AdapterDemo />
            </section>

            {/* 6. Deep Dive */}
            <section className="space-y-4">
                <h2 className="text-2xl font-bold text-slate-900">Implementation Details</h2>
                <CodeTabs
                    tabs={[
                        {
                            id: "logic",
                            label: "adapter.ts",
                            language: "typescript",
                            icon: <Box size={14} />,
                            code: `// 1. The Target Interface that our App expects
interface ChartPoint {
  x: string;   // Label
  y: number;   // Value
}

// 2. The Legacy Data (Source)
interface LegacyXML {
  _content: string; // "<stock><val>100</val></stock>"
}

// 3. The Adapter
class XMLToChartAdapter {
  constructor(private legacyService: LegacyService) {}

  async fetchChartData(): Promise<ChartPoint[]> {
    // A. Fetch raw data
    const xml = await this.legacyService.getXML();
    
    // B. Adapt / Transform logic
    const value = parseXML(xml._content).stock.val;
    
    // C. Return standard format
    return [{ x: "Stock A", y: parseInt(value) }];
  }
}`
                        },
                        {
                            id: "usage",
                            label: "Dashboard.tsx",
                            language: "tsx",
                            icon: <Layout size={14} />,
                            code: `// The UI component stays clean!
const Dashboard = () => {
  const [data, setData] = useState<ChartPoint[]>([]);

  useEffect(() => {
    // We use the adapter, but the component doesn't know!
    // It just thinks it's calling a standard service.
    const adapter = new XMLToChartAdapter(legacyService);
    
    adapter.fetchChartData().then(setData);
  }, []);

  return <BarChart data={data} />;
};`
                        },
                        {
                            id: "test",
                            label: "adapter.test.ts",
                            language: "typescript",
                            icon: <TestTube size={14} />,
                            code: `test("Adapter transforms XML to JSON correctly", async () => {
  const mockLegacy = { getXML: () => ({ _content: "<val>50</val>" }) };
  const adapter = new XMLToChartAdapter(mockLegacy);

  const result = await adapter.fetchChartData();

  expect(result).toEqual([{ x: "Stock A", y: 50 }]);
});`
                        }
                    ]}
                />
            </section>

            {/* 7. When to Use */}
            <section className="grid md:grid-cols-2 gap-6">
                <div className="bg-green-50 p-6 rounded-xl border border-green-100">
                    <h3 className="font-bold text-green-900 mb-2 flex items-center gap-2">
                        <span className="bg-green-200 text-green-700 w-6 h-6 rounded-full flex items-center justify-center text-xs">✓</span>
                        Use it when...
                    </h3>
                    <ul className="list-disc list-inside space-y-2 text-sm text-green-800">
                        <li>You want to use an existing class, and its interface does not match the one you need.</li>
                        <li>You want to create a reusable class that cooperates with unrelated or unforeseen classes.</li>
                        <li>You need to migrate a legacy system incrementally.</li>
                    </ul>
                </div>
                <div className="bg-amber-50 p-6 rounded-xl border border-amber-100">
                    <h3 className="font-bold text-amber-900 mb-2 flex items-center gap-2">
                        <ShieldAlert size={18} />
                        Trade-offs
                    </h3>
                    <ul className="list-disc list-inside space-y-2 text-sm text-amber-800">
                        <li>Increases the overall complexity of the code by introducing new interfaces and classes.</li>
                        <li>Can sometimes be overkill if the "adaptation" is just a simple property rename.</li>
                    </ul>
                </div>
            </section>

            {/* 8. Next.js Context */}
            <section className="bg-slate-900 text-slate-300 p-8 rounded-2xl">
                <h2 className="text-xl font-bold text-white mb-4">In Next.js Context</h2>
                <p className="mb-4">
                    Next.js <strong>Route Handlers</strong> often act as Adapters. They take extensive HTTP Requests (Headers, Cookies, Body) and "adapt" them into simple arguments for your core business logic or database functions.
                </p>
                <code className="block bg-slate-950 p-4 rounded-lg font-mono text-sm">
            // route.ts acts as an Adapter between Web Request and Controller<br />
                    export async function POST(req: Request) &#123;<br />
                    &nbsp;&nbsp;const json = await req.json(); // Adapting Stream -&gt; JSON<br />
                    &nbsp;&nbsp;return controller.createUser(json);<br />
                    &#125;
                </code>
            </section>
        </div>
    );
}
