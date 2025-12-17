"use client";

import React, { useState } from "react";
import { SvgCanvas } from "@/components/shared/demo-framework/SvgCanvas";
import { Node } from "@/components/shared/demo-framework/Node";
import { Edge } from "@/components/shared/demo-framework/Edge";
import { DemoShell } from "@/components/shared/DemoShell";

export const ChainDemo = () => {
    const [status, setStatus] = useState<"idle" | "l1" | "l2" | "l3" | "resolved">("idle");
    const [difficulty, setDifficulty] = useState<"low" | "medium" | "high">("low");

    const processRequest = () => {
        setStatus("l1");

        setTimeout(() => {
            if (difficulty === "low") {
                setStatus("resolved");
                return;
            }
            setStatus("l2");
            setTimeout(() => {
                if (difficulty === "medium") {
                    setStatus("resolved");
                    return;
                }
                setStatus("l3");
                setTimeout(() => {
                    setStatus("resolved");
                }, 1000);
            }, 1000);
        }, 1000);
    };

    const nodes = {
        req: { x: 100, y: 250, label: "Request" },
        l1: { x: 300, y: 250, label: "Level 1 Support" },
        l2: { x: 500, y: 250, label: "Level 2 Support" },
        l3: { x: 700, y: 250, label: "Level 3 Support" },
    };

    return (
        <DemoShell title="Support Escalation Chain" description="Request travels down the chain until a handler can process it." onReset={() => setStatus("idle")}>
            <div className="relative h-[400px] flex flex-col">
                <SvgCanvas className="flex-1">
                    <Edge id="e1" start={nodes.req} end={nodes.l1} animated={status === "l1"} />
                    <Edge id="e2" start={nodes.l1} end={nodes.l2} animated={status === "l2"} />
                    <Edge id="e3" start={nodes.l2} end={nodes.l3} animated={status === "l3"} />

                    <Node id="req" type="source" {...nodes.req} />
                    <Node id="l1" type="generic" {...nodes.l1} selected={status === "l1" || (status === "resolved" && difficulty === "low")} />
                    <Node id="l2" type="generic" {...nodes.l2} selected={status === "l2" || (status === "resolved" && difficulty === "medium")} />
                    <Node id="l3" type="target" {...nodes.l3} selected={status === "l3" || (status === "resolved" && difficulty === "high")} />

                    <div className="absolute top-4 left-4 flex gap-4 items-center bg-white p-2 rounded shadow">
                        <select value={difficulty} onChange={(e) => setDifficulty(e.target.value as any)} className="border p-1 rounded">
                            <option value="low">Slight Issue (Low)</option>
                            <option value="medium">Bug Report (Medium)</option>
                            <option value="high">System Crash (High)</option>
                        </select>
                        <button onClick={processRequest} disabled={status !== "idle" && status !== "resolved"} className="bg-blue-600 text-white px-4 py-1 rounded shadow disabled:opacity-50">
                            Submit Ticket
                        </button>
                    </div>
                </SvgCanvas>
            </div>
        </DemoShell>
    );
};
