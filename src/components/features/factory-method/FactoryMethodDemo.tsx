"use client";

import React, { useState } from "react";
import { SvgCanvas } from "@/components/shared/demo-framework/SvgCanvas";
import { Node } from "@/components/shared/demo-framework/Node";
import { Edge } from "@/components/shared/demo-framework/Edge";
import { LoggerPanel, LogEntry } from "@/components/shared/demo-framework/LoggerPanel";
import { DemoShell } from "@/components/shared/DemoShell";
import { AnimatePresence, motion } from "framer-motion";

export const FactoryMethodDemo = () => {
    const [platform, setPlatform] = useState<"WEB" | "IOS">("WEB");
    const [products, setProducts] = useState<Array<{ id: string, type: "WEB" | "IOS" }>>([]);
    const [logs, setLogs] = useState<LogEntry[]>([]);
    const [isCreating, setIsCreating] = useState(false);

    const addLog = (msg: string, type: LogEntry["type"] = "info") => {
        setLogs(prev => [...prev, { id: Math.random().toString(36), timestamp: new Date(), message: msg, type }]);
    };

    const handleCreate = () => {
        if (isCreating) return;
        setIsCreating(true);
        addLog(`App: Requested new Button from ${platform} Factory...`, "info");

        setTimeout(() => {
            const newProduct = { id: Math.random().toString(36), type: platform };
            setProducts(prev => [...prev, newProduct]);
            addLog(`Factory: Created new ${platform === "WEB" ? "Square" : "Rounded"} Button.`, "success");
            setIsCreating(false);
        }, 1500);
    };

    const handleReset = () => {
        setProducts([]);
        setPlatform("WEB");
        setLogs([]);
        addLog("System reset.", "info");
    };

    const nodes = {
        app: { x: 100, y: 250, label: "Application" },
        factory: { x: 400, y: 250, label: `${platform} Factory` },
        deploy: { x: 700, y: 250, label: "UI Layer" },
    };

    return (
        <DemoShell
            title="Cross-Platform UI Factory"
            description="Switch platforms to see how the Factory produces different objects using the same interface."
            onReset={handleReset}
        >
            <div className="relative h-[500px] flex flex-col">
                <SvgCanvas className="flex-1">
                    {/* Edges */}
                    <Edge id="e1" start={nodes.app} end={nodes.factory} animated={isCreating} color="#94a3b8" />
                    <Edge id="e2" start={nodes.factory} end={nodes.deploy} animated={false} color="#cbd5e1" />

                    {/* Nodes */}
                    <Node id="app" type="generic" {...nodes.app} onClick={handleCreate} selected={isCreating} />

                    <Node
                        id="factory"
                        type="source"
                        {...nodes.factory}
                        // Visualizing the switch
                        selected={true}
                    />

                    {/* Rendered Products Area */}
                    <foreignObject x={nodes.deploy.x - 50} y={nodes.deploy.y - 100} width={100} height={200}>
                        <div className="flex flex-col gap-2 items-center">
                            <AnimatePresence>
                                {products.map(p => (
                                    <motion.div
                                        key={p.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0 }}
                                        className={p.type === "WEB"
                                            ? "w-16 h-8 bg-blue-500 rounded-none shadow flex items-center justify-center text-[10px] text-white font-bold"
                                            : "w-16 h-8 bg-green-500 rounded-full shadow flex items-center justify-center text-[10px] text-white font-bold"
                                        }
                                    >
                                        {p.type}
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    </foreignObject>
                    <Node id="deploy" type="target" {...nodes.deploy} />

                    {/* Controls */}
                    <div className="absolute top-4 left-4 flex gap-2">
                        <button
                            onClick={() => setPlatform("WEB")}
                            className={`px-4 py-2 rounded shadow text-sm font-bold ${platform === "WEB" ? "bg-blue-600 text-white" : "bg-white text-slate-700"}`}
                        >
                            Web
                        </button>
                        <button
                            onClick={() => setPlatform("IOS")}
                            className={`px-4 py-2 rounded shadow text-sm font-bold ${platform === "IOS" ? "bg-green-600 text-white" : "bg-white text-slate-700"}`}
                        >
                            iOS
                        </button>
                    </div>

                    <div className="absolute bottom-6 right-4">
                        <button
                            onClick={handleCreate}
                            disabled={isCreating}
                            className="px-6 py-3 bg-slate-900 text-white rounded-full font-bold shadow-lg hover:bg-slate-800 disabled:opacity-50 transition-transform active:scale-95"
                        >
                            {isCreating ? "Rendering..." : "+ Create Component"}
                        </button>
                    </div>

                </SvgCanvas>
                <LoggerPanel logs={logs} className="h-[150px] rounded-t-none border-t-0" />
            </div>
        </DemoShell>
    );
};
