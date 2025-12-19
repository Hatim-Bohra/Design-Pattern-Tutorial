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
    <DemoShell
      title="Universal Remote"
      description="The Remote (Abstraction) can control any Device (Implementation) without being tightly coupled."
    >
      <div className="relative h-[400px] flex flex-col">
        <SvgCanvas className="flex-1">
          <Edge
            id="e1"
            start={nodes.remote}
            end={nodes.tv}
            animated={device === "TV"}
            color={device === "TV" ? "blue" : "gray"}
          />
          <Edge
            id="e2"
            start={nodes.remote}
            end={nodes.radio}
            animated={device === "RADIO"}
            color={device === "RADIO" ? "blue" : "gray"}
          />

          <Node
            id="remote"
            type="source"
            {...nodes.remote}
            selected={true}
            className="fill-slate-900 stroke-slate-600 text-slate-100"
          />
          <Node
            id="tv"
            type="target"
            {...nodes.tv}
            selected={tvState}
            className={
              tvState ? "fill-blue-100 stroke-blue-500 stroke-[3px] text-blue-900" : "opacity-50"
            }
          />
          <Node
            id="radio"
            type="target"
            {...nodes.radio}
            selected={radioState}
            className={
              radioState ? "fill-blue-100 stroke-blue-500 stroke-[3px] text-blue-900" : "opacity-50"
            }
          />
        </SvgCanvas>

        <div className="absolute top-4 left-4 flex flex-col gap-3 bg-white/90 p-4 rounded-xl shadow-lg border border-slate-100 backdrop-blur-sm pointer-events-auto">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Implementation
            </span>
            <div className="flex gap-2 bg-slate-100 p-1 rounded-lg">
              <button
                type="button"
                onClick={() => setDevice("TV")}
                className={`flex-1 px-3 py-1.5 text-xs font-bold rounded-md transition-all ${device === "TV" ? "bg-white text-slate-800 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
              >
                TV
              </button>
              <button
                type="button"
                onClick={() => setDevice("RADIO")}
                className={`flex-1 px-3 py-1.5 text-xs font-bold rounded-md transition-all ${device === "RADIO" ? "bg-white text-slate-800 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
              >
                Radio
              </button>
            </div>
          </div>
          <div className="h-px bg-slate-200 w-full"></div>
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Abstraction
            </span>
            <button
              type="button"
              onClick={togglePower}
              className="w-full bg-red-500 text-white px-4 py-2 rounded-lg font-bold shadow hover:bg-red-600 hover:shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 text-sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path>
                <line x1="12" y1="2" x2="12" y2="12"></line>
              </svg>
              Toggle Power
            </button>
          </div>
        </div>
      </div>
    </DemoShell>
  );
};
