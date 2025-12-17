"use client";

import React, { useState } from "react";
import { SvgCanvas } from "@/components/shared/demo-framework/SvgCanvas";
import { Node } from "@/components/shared/demo-framework/Node";
import { Edge } from "@/components/shared/demo-framework/Edge";
import { LoggerPanel, LogEntry } from "@/components/shared/demo-framework/LoggerPanel";
import { DemoShell } from "@/components/shared/DemoShell";

export const BuilderDemo = () => {
    const [query, setQuery] = useState({ select: "*", from: "users", where: "" });
    const [logs, setLogs] = useState<LogEntry[]>([]);

    // Helper to add logs
    const addLog = (msg: string) => {
        setLogs(prev => [...prev, { id: Math.random().toString(), timestamp: new Date(), message: msg, type: "info" }]);
    };

    const buildStep = (part: string, value: string) => {
        setQuery(prev => ({ ...prev, [part]: value }));
        addLog(`Builder: .${part}('${value}')`);
    };

    const finalQuery = `SELECT ${query.select} FROM ${query.from} ${query.where ? `WHERE ${query.where}` : ""};`;

    return (
        <DemoShell title="SQL Query Builder" description="Construct a complex object (SQL String) step-by-step." onReset={() => setQuery({ select: "*", from: "users", where: "" })}>
            <div className="relative h-[500px] flex flex-col">
                <SvgCanvas className="flex-1">
                    <Node id="builder" type="source" x={400} y={250} label="Query Builder" selected={true} />

                    <div className="absolute top-8 left-8 space-y-2 bg-white p-4 rounded shadow">
                        <div className="font-bold text-xs text-slate-500 mb-2">BUILD STEPS</div>
                        <button onClick={() => buildStep("select", "id, name")} className="block w-full text-left px-3 py-1 bg-blue-50 hover:bg-blue-100 rounded text-xs">
                            1. .select("id, name")
                        </button>
                        <button onClick={() => buildStep("from", "orders")} className="block w-full text-left px-3 py-1 bg-blue-50 hover:bg-blue-100 rounded text-xs">
                            2. .from("orders")
                        </button>
                        <button onClick={() => buildStep("where", "active = true")} className="block w-full text-left px-3 py-1 bg-blue-50 hover:bg-blue-100 rounded text-xs">
                            3. .where("active = true")
                        </button>
                    </div>

                    <foreignObject x={300} y={350} width={200} height={100}>
                        <div className="bg-slate-900 text-green-400 p-2 rounded font-mono text-xs shadow-xl break-all">
                            {finalQuery}
                        </div>
                    </foreignObject>
                </SvgCanvas>
                <LoggerPanel logs={logs} className="h-[150px] rounded-t-none border-t-0" />
            </div>
        </DemoShell>
    );
};
