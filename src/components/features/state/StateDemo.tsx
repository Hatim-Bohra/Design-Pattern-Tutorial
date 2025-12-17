"use client";

import React, { useState, useEffect } from "react";
import { SvgCanvas } from "@/components/shared/demo-framework/SvgCanvas";
import { Node } from "@/components/shared/demo-framework/Node";
import { Edge } from "@/components/shared/demo-framework/Edge";
import { DemoShell } from "@/components/shared/DemoShell";

type LightState = "RED" | "YELLOW" | "GREEN";

export const StateDemo = () => {
    const [state, setState] = useState<LightState>("RED");

    const nextState = () => {
        if (state === "RED") setState("GREEN");
        else if (state === "GREEN") setState("YELLOW");
        else setState("RED");
    };

    const nodes = {
        red: { x: 200, y: 250, label: "Red State" },
        yellow: { x: 400, y: 150, label: "Yellow State" },
        green: { x: 600, y: 250, label: "Green State" },
    };

    return (
        <DemoShell title="Traffic Light State Machine" description="Behavior changes based on internal state. Transition logic is encapsulated." onReset={() => setState("RED")}>
            <div className="relative h-[400px] flex flex-col">
                <SvgCanvas className="flex-1">
                    <Edge id="r-g" start={nodes.red} end={nodes.green} animated={state === "RED"} label="Timer" />
                    <Edge id="g-y" start={nodes.green} end={nodes.yellow} animated={state === "GREEN"} label="Timer" />
                    <Edge id="y-r" start={nodes.yellow} end={nodes.red} animated={state === "YELLOW"} label="Timer" />

                    <Node id="red" type="generic" {...nodes.red} selected={state === "RED"} />
                    <Node id="yellow" type="generic" {...nodes.yellow} selected={state === "YELLOW"} />
                    <Node id="green" type="generic" {...nodes.green} selected={state === "GREEN"} />

                    <foreignObject x={350} y={300} width={100} height={100}>
                        <div className={`w-20 h-20 rounded-full mx-auto shadow-xl transition-colors duration-500 border-4 border-slate-800 ${state === "RED" ? "bg-red-500" : state === "YELLOW" ? "bg-yellow-400" : "bg-green-500"}`}></div>
                    </foreignObject>

                    <div className="absolute top-4 left-4">
                        <button onClick={nextState} className="bg-slate-900 text-white px-4 py-2 rounded shadow">
                            Trigger Next State
                        </button>
                    </div>
                </SvgCanvas>
            </div>
        </DemoShell>
    );
};
