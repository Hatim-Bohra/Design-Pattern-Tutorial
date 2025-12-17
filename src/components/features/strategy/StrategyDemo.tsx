"use client";

import React, { useState } from "react";
import { SvgCanvas } from "@/components/shared/demo-framework/SvgCanvas";
import { Node } from "@/components/shared/demo-framework/Node";
import { Edge } from "@/components/shared/demo-framework/Edge";
import { DemoShell } from "@/components/shared/DemoShell";

export const StrategyDemo = () => {
    const [strategy, setStrategy] = useState<"WALK" | "DRIVE" | "FLY">("DRIVE");

    const strategies = {
        WALK: { color: "green", duration: "2h" },
        DRIVE: { color: "blue", duration: "20m" },
        FLY: { color: "red", duration: "5m" },
    };

    const nodes = {
        a: { x: 200, y: 300, label: "Home" },
        b: { x: 600, y: 300, label: "Work" },
    };

    return (
        <DemoShell title="Route Strategy" description="Select a strategy to execute the same 'GoTo' action differently.">
            <div className="relative h-[400px] flex flex-col">
                <SvgCanvas className="flex-1">
                    <Node id="a" type="source" {...nodes.a} />
                    <Node id="b" type="target" {...nodes.b} />

                    <Edge
                        id="route"
                        start={nodes.a}
                        end={nodes.b}
                        animated={true}
                        color={strategies[strategy].color}
                        label={strategies[strategy].duration}
                    />

                    <div className="absolute top-4 left-4 flex gap-2">
                        {Object.keys(strategies).map(s => (
                            <button
                                key={s}
                                onClick={() => setStrategy(s as any)}
                                className={`px-3 py-1 rounded text-sm font-bold ${strategy === s ? "bg-slate-800 text-white" : "bg-white"}`}
                            >
                                {s}
                            </button>
                        ))}
                    </div>
                </SvgCanvas>
            </div>
        </DemoShell>
    );
};
