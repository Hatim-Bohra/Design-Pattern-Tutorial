"use client";

import React, { useState } from "react";
import { SvgCanvas } from "@/components/shared/demo-framework/SvgCanvas";
import { Node } from "@/components/shared/demo-framework/Node";
import { Edge } from "@/components/shared/demo-framework/Edge";
import { DemoShell } from "@/components/shared/DemoShell";

export const MediatorDemo = () => {
    const [msg, setMsg] = useState<string | null>(null);

    const sendLandingRequest = (plane: string) => {
        setMsg(`Tower: ${plane} requests landing...`);
        setTimeout(() => {
            setMsg(`Tower: ${plane}, runway is clear. Land granted.`);
        }, 1000);
    };

    const nodes = {
        tower: { x: 400, y: 350, label: "Control Tower (Mediator)" },
        p1: { x: 200, y: 100, label: "Flight 101" },
        p2: { x: 600, y: 100, label: "Flight 202" },
    };

    return (
        <DemoShell title="Air Traffic Control" description="Planes communicate only with the Tower, never directly with other planes." onReset={() => setMsg(null)}>
            <div className="relative h-[500px] flex flex-col">
                <SvgCanvas className="flex-1">
                    <Edge id="e1" start={nodes.p1} end={nodes.tower} animated={msg?.includes("101")} />
                    <Edge id="e2" start={nodes.p2} end={nodes.tower} animated={msg?.includes("202")} />

                    <Node id="tower" type="source" {...nodes.tower} />
                    <Node id="p1" type="target" {...nodes.p1} onClick={() => sendLandingRequest("Flight 101")} />
                    <Node id="p2" type="target" {...nodes.p2} onClick={() => sendLandingRequest("Flight 202")} />

                    {msg && (
                        <foreignObject x={250} y={400} width={300} height={50}>
                            <div className="bg-slate-900 text-green-400 p-2 text-xs font-mono rounded shadow">
                                {msg}
                            </div>
                        </foreignObject>
                    )}

                    <div className="absolute top-4 left-4 text-xs text-slate-500">
                        Click on a Flight to request landing.
                    </div>
                </SvgCanvas>
            </div>
        </DemoShell>
    );
};
