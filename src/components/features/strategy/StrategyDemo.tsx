"use client";

import React, { useState } from "react";
import { SvgCanvas } from "@/components/shared/demo-framework/SvgCanvas";
import { Node } from "@/components/shared/demo-framework/Node";
import { Edge } from "@/components/shared/demo-framework/Edge";
import { DemoShell } from "@/components/shared/DemoShell";
import { motion } from "framer-motion";

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
    <DemoShell
      title="Route Strategy"
      description="Select a strategy to execute the same 'GoTo' action differently."
      onReset={() => setStrategy("DRIVE")}
    >
      <div className="relative h-[400px] flex flex-col">
        <SvgCanvas className="flex-1">
          <Node
            id="a"
            type="source"
            {...nodes.a}
            className="fill-slate-900 stroke-slate-500 text-white"
          />
          <Node
            id="b"
            type="target"
            {...nodes.b}
            className="fill-slate-900 stroke-slate-500 text-white"
          />

          <Edge
            id="route"
            start={nodes.a}
            end={nodes.b}
            animated={true}
            color={strategies[strategy].color}
            label={strategies[strategy].duration}
            className="stroke-[3px]"
          />

          {/* Transport Icon Animation */}
          <motion.circle
            key={strategy} // Force re-mount on strategy change to restart animation properly
            r={4}
            fill={strategies[strategy].color}
            initial={{ cx: nodes.a.x, cy: nodes.a.y }}
            animate={{ cx: nodes.b.x, cy: nodes.b.y }}
            transition={{
              duration: strategy === "FLY" ? 0.5 : strategy === "DRIVE" ? 1 : 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </SvgCanvas>

        <div className="absolute top-4 left-4 flex gap-2 bg-white/80 p-2 rounded-xl shadow-lg border border-slate-100 backdrop-blur-sm pointer-events-auto">
          {Object.keys(strategies).map((s) => {
            const isActive = strategy === s;
            return (
              <button
                type="button"
                key={s}
                onClick={() => setStrategy(s as "WALK" | "DRIVE" | "FLY")}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all border ${isActive ? "bg-slate-900 text-white border-slate-900 shadow-md scale-105" : "bg-white text-slate-500 border-slate-200 hover:bg-slate-50 hover:text-slate-700"}`}
              >
                {s === "WALK" ? "🚶 Walk" : s === "DRIVE" ? "🚗 Drive" : "✈️ Fly"}
              </button>
            );
          })}
        </div>
      </div>
    </DemoShell>
  );
};
