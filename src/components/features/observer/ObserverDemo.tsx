"use client";

import React, { useState, useEffect } from "react";
import { SvgCanvas } from "@/components/shared/demo-framework/SvgCanvas";
import { Node } from "@/components/shared/demo-framework/Node";
import { Edge } from "@/components/shared/demo-framework/Edge";
import { LoggerPanel, LogEntry } from "@/components/shared/demo-framework/LoggerPanel";
import { DemoShell } from "@/components/shared/DemoShell";

export const ObserverDemo = () => {
    const [price, setPrice] = useState(100);
    const [logs, setLogs] = useState<LogEntry[]>([]);

    const notify = (newPrice: number) => {
        setPrice(newPrice);
        setLogs(prev => [...prev, { id: Math.random().toString(), timestamp: new Date(), message: `Subject: Price updated to $${newPrice}`, type: "info" }]);

        setTimeout(() => {
            setLogs(prev => [...prev, { id: Math.random().toString(), timestamp: new Date(), message: `Observer A (Chart): Reacted to $${newPrice}`, type: "success" }]);
            setLogs(prev => [...prev, { id: Math.random().toString(), timestamp: new Date(), message: `Observer B (Table): Reacted to $${newPrice}`, type: "success" }]);
        }, 500);
    };

    const nodes = {
        subject: { x: 400, y: 200, label: `Stock: $${price}` },
        obsA: { x: 200, y: 400, label: "Chart (Observer)" },
        obsB: { x: 600, y: 400, label: "Table (Observer)" },
    };

    return (
        <DemoShell title="Stock Market Observer" description="Click the Stock to update price and notify all subscribers."
            onReset={() => { setPrice(100); setLogs([]); }}>
            <div className="relative h-[500px] flex flex-col">
                <SvgCanvas className="flex-1">
                    <Edge id="e1" start={nodes.subject} end={nodes.obsA} animated={true} />
                    <Edge id="e2" start={nodes.subject} end={nodes.obsB} animated={true} />

                    <Node id="subject" type="source" {...nodes.subject} onClick={() => notify(price + 10)} selected={true} />

                    <Node id="obsA" type="target" {...nodes.obsA} />
                    <foreignObject x={nodes.obsA.x - 40} y={nodes.obsA.y + 40} width={80} height={40}>
                        <div className="w-full h-full bg-slate-100 flex items-end gap-1 p-1 rounded">
                            <div className="bg-blue-500 w-1/3" style={{ height: `${(price / 150) * 100}%` }}></div>
                            <div className="bg-blue-500 w-1/3" style={{ height: `${(price / 130) * 100}%` }}></div>
                            <div className="bg-blue-500 w-1/3" style={{ height: `${(price / 120) * 100}%` }}></div>
                        </div>
                    </foreignObject>

                    <Node id="obsB" type="target" {...nodes.obsB} />
                    <foreignObject x={nodes.obsB.x - 40} y={nodes.obsB.y + 40} width={80} height={40}>
                        <div className="bg-white border text-[10px] p-1">
                            Current: <b>${price}</b>
                        </div>
                    </foreignObject>

                    <div className="absolute top-4 left-4">
                        <button onClick={() => notify(price + Math.floor(Math.random() * 10))} className="bg-blue-600 text-white px-4 py-2 rounded shadow">
                            Update Price
                        </button>
                    </div>
                </SvgCanvas>
                <LoggerPanel logs={logs} className="h-[150px] rounded-t-none border-t-0" />
            </div>
        </DemoShell>
    );
};
