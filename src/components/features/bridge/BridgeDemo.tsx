"use client";

import React, { useState } from "react";
import { SvgCanvas } from "@/components/shared/demo-framework/SvgCanvas";
import { Node } from "@/components/shared/demo-framework/Node";
import { Edge } from "@/components/shared/demo-framework/Edge";
import { DemoShell } from "@/components/shared/DemoShell";

export const BridgeDemo = () => {
    const [device, setDevice] = useState<"TV" | "RADIO">("TV");
    const [tvState, setTvState] = useState(false);
    const [radioState, setRadioState] = useState(false);

    const togglePower = () => {
        if (device === "TV") setTvState(!tvState);
        else setRadioState(!radioState);
    };

    const nodes = {
        remote: { x: 200, y: 250, label: "Remote (Abstraction)" },
        tv: { x: 600, y: 150, label: `TV (${tvState ? "ON" : "OFF"})` },
        radio: { x: 600, y: 350, label: `Radio (${radioState ? "ON" : "OFF"})` },
    };

    return (
        <DemoShell title="Universal Remote" description="The Remote (Abstraction) can control any Device (Implementation) without being tightly coupled.">
            <div className="relative h-[400px] flex flex-col">
                <SvgCanvas className="flex-1">
                    <Edge id="e1" start={nodes.remote} end={nodes.tv} animated={device === "TV"} color={device === "TV" ? "blue" : "gray"} />
                    <Edge id="e2" start={nodes.remote} end={nodes.radio} animated={device === "RADIO"} color={device === "RADIO" ? "blue" : "gray"} />

                    <Node id="remote" type="source" {...nodes.remote} selected={true} />
                    <Node id="tv" type="target" {...nodes.tv} selected={tvState} />
                    <Node id="radio" type="target" {...nodes.radio} selected={radioState} />

                    <div className="absolute top-4 left-4 flex gap-4 bg-white p-2 rounded shadow">
                        <div className="flex flex-col gap-1">
                            <span className="text-xs font-bold text-slate-500">Pick Device:</span>
                            <div className="flex gap-2">
                                <button onClick={() => setDevice("TV")} className={`px-2 py-1 text-xs rounded ${device === "TV" ? "bg-blue-600 text-white" : "bg-slate-200"}`}>TV</button>
                                <button onClick={() => setDevice("RADIO")} className={`px-2 py-1 text-xs rounded ${device === "RADIO" ? "bg-blue-600 text-white" : "bg-slate-200"}`}>Radio</button>
                            </div>
                        </div>
                        <div className="w-px bg-slate-300"></div>
                        <button onClick={togglePower} className="bg-red-500 text-white px-4 py-2 rounded-full font-bold shadow hover:bg-red-600">
                            Power Button
                        </button>
                    </div>
                </SvgCanvas>
            </div>
        </DemoShell>
    );
};
