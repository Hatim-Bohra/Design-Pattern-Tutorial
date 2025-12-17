"use client";

import React, { useState, useEffect } from "react";
import { SvgCanvas } from "@/components/shared/demo-framework/SvgCanvas";
import { Node } from "@/components/shared/demo-framework/Node";
import { Edge } from "@/components/shared/demo-framework/Edge";
import { LoggerPanel, LogEntry } from "@/components/shared/demo-framework/LoggerPanel";
import { DemoShell } from "@/components/shared/DemoShell";
import { clsx } from "clsx";
import { motion, AnimatePresence } from "framer-motion";

export const SingletonDemo = () => {
    const [useSingleton, setUseSingleton] = useState(true);
    const [logs, setLogs] = useState<LogEntry[]>([]);

    // State for our "App Config"
    const [globalConfig, setGlobalConfig] = useState<"DARK" | "LIGHT">("LIGHT");
    const [clientAConfig, setClientAConfig] = useState<"DARK" | "LIGHT">("LIGHT");
    const [clientBConfig, setClientBConfig] = useState<"DARK" | "LIGHT">("LIGHT");

    const addLog = (msg: string, type: LogEntry["type"] = "info") => {
        setLogs(prev => [...prev, { id: Math.random().toString(36), timestamp: new Date(), message: msg, type }]);
    };

    const toggleConfig = (initiator: "A" | "B") => {
        const newVal = initiator === "A"
            ? (clientAConfig === "LIGHT" ? "DARK" : "LIGHT")
            : (clientBConfig === "LIGHT" ? "DARK" : "LIGHT");

        if (useSingleton) {
            // Pattern Mode: All update together
            setGlobalConfig(newVal);
            setClientAConfig(newVal);
            setClientBConfig(newVal);
            addLog(`Singleton: Config updated to ${newVal} by Client ${initiator}. All subscribers notified.`, "success");
        } else {
            // Anti-Pattern Mode: Local updates only
            if (initiator === "A") setClientAConfig(newVal);
            else setClientBConfig(newVal);
            addLog(`Instance ${initiator}: Updated local init to ${newVal}. Other instances are out of sync!`, "warning");
        }
    };

    const handleReset = () => {
        setUseSingleton(true);
        setGlobalConfig("LIGHT");
        setClientAConfig("LIGHT");
        setClientBConfig("LIGHT");
        setLogs([]);
        addLog("Reset to initial state.", "info");
    };

    const nodes = {
        singleton: { x: 400, y: 150, label: "Singleton Store" },
        clientA: { x: 200, y: 400, label: "Client Window A" },
        clientB: { x: 600, y: 400, label: "Client Window B" },
    };

    // Derived visual styles
    const getNodeStyle = (theme: "DARK" | "LIGHT") => theme === "DARK" ? "fill-slate-800 stroke-slate-600 text-white" : "fill-yellow-100 stroke-yellow-500 text-yellow-900";

    return (
        <DemoShell
            title="Singleton Config Manager"
            description="Toggle 'Use Singleton' to see why global state is useful for configs."
            onReset={handleReset}
        >
            <div className="relative h-[500px] flex flex-col">
                <SvgCanvas className="flex-1">
                    {/* Visual Connections */}
                    {useSingleton && (
                        <>
                            <Edge id="e1" start={nodes.clientA} end={nodes.singleton} animated={true} color="#94a3b8" />
                            <Edge id="e2" start={nodes.clientB} end={nodes.singleton} animated={true} color="#94a3b8" />
                        </>
                    )}

                    {/* The Singleton Instance */}
                    <AnimatePresence>
                        {useSingleton && (
                            <motion.g
                                initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                            >
                                <Node
                                    id="singleton"
                                    type="source"
                                    {...nodes.singleton}
                                    selected={true}
                                />
                                <foreignObject x={nodes.singleton.x - 40} y={nodes.singleton.y - 10} width={80} height={20}>
                                    <div className="text-[10px] text-center font-mono bg-white/80 rounded border">
                                        {globalConfig}
                                    </div>
                                </foreignObject>
                            </motion.g>
                        )}
                    </AnimatePresence>

                    {/* Client A */}
                    <Node
                        id="clientA"
                        type="generic"
                        {...nodes.clientA}
                        onClick={() => toggleConfig("A")}
                    />
                    {/* Theme Badge A */}
                    <foreignObject x={nodes.clientA.x - 30} y={nodes.clientA.y + 25} width={60} height={20}>
                        <div className={clsx("text-[10px] text-center font-bold px-1 rounded transition-colors", clientAConfig === "DARK" ? "bg-slate-800 text-white" : "bg-yellow-200 text-yellow-800")}>
                            {clientAConfig}
                        </div>
                    </foreignObject>

                    {/* Client B */}
                    <Node
                        id="clientB"
                        type="generic"
                        {...nodes.clientB}
                        onClick={() => toggleConfig("B")}
                    />
                    {/* Theme Badge B */}
                    <foreignObject x={nodes.clientB.x - 30} y={nodes.clientB.y + 25} width={60} height={20}>
                        <div className={clsx("text-[10px] text-center font-bold px-1 rounded transition-colors", clientBConfig === "DARK" ? "bg-slate-800 text-white" : "bg-yellow-200 text-yellow-800")}>
                            {clientBConfig}
                        </div>
                    </foreignObject>

                    {/* Controls */}
                    <div className="absolute top-4 left-4">
                        <label className="flex items-center gap-2 bg-white p-2 rounded shadow border cursor-pointer hover:bg-slate-50">
                            <input
                                type="checkbox"
                                checked={useSingleton}
                                onChange={(e) => setUseSingleton(e.target.checked)}
                                className="w-4 h-4 accent-blue-600"
                            />
                            <span className="text-sm font-medium text-slate-700">Enforce Singleton</span>
                        </label>
                    </div>

                    <div className="absolute top-4 right-4 max-w-xs text-xs text-slate-400 text-right pointer-events-none">
                        Click Client Nodes to toggle their Theme.
                    </div>
                </SvgCanvas>
                <LoggerPanel logs={logs} className="h-[150px] rounded-t-none border-t-0" />
            </div>
        </DemoShell>
    );
};
