"use client";

import React, { useState, useEffect } from "react";
import { SvgCanvas } from "@/components/shared/demo-framework/SvgCanvas";
import { Node } from "@/components/shared/demo-framework/Node";
import { Edge } from "@/components/shared/demo-framework/Edge";
import { DemoShell } from "@/components/shared/DemoShell";
import { motion } from "framer-motion";

type LightState = "RED" | "YELLOW" | "GREEN";

export const StateDemo = () => {
  const [state, setState] = useState<LightState>("RED");

  const nextState = React.useCallback(() => {
    setState((prev) => {
      if (prev === "RED") return "GREEN";
      if (prev === "GREEN") return "YELLOW";
      return "RED";
    });
  }, []); // No dependencies needed

  const nodes = {
    red: { x: 200, y: 250, label: "Red State" },
    yellow: { x: 400, y: 150, label: "Yellow State" },
    green: { x: 600, y: 250, label: "Green State" },
  };

  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      nextState();
    }, 1500); // 1.5s per state
    return () => clearInterval(interval);
  }, [isPlaying, nextState]);

  return (
    <DemoShell
      title="Traffic Light State Machine"
      description="Behavior changes based on internal state. Transition logic is encapsulated."
      onReset={() => {
        setState("RED");
        setIsPlaying(false);
      }}
    >
      <div className="relative h-[400px] flex flex-col">
        <SvgCanvas className="flex-1">
          <Edge
            id="r-g"
            start={nodes.red}
            end={nodes.green}
            animated={state === "RED"}
            label="Timer (3s)"
            color={state === "RED" ? "#22c55e" : "#e2e8f0"}
          />
          <Edge
            id="g-y"
            start={nodes.green}
            end={nodes.yellow}
            animated={state === "GREEN"}
            label="Timer (3s)"
            color={state === "GREEN" ? "#eab308" : "#e2e8f0"}
          />
          <Edge
            id="y-r"
            start={nodes.yellow}
            end={nodes.red}
            animated={state === "YELLOW"}
            label="Timer (3s)"
            color={state === "YELLOW" ? "#ef4444" : "#e2e8f0"}
          />

          <Node
            id="red"
            type="generic"
            {...nodes.red}
            selected={state === "RED"}
            className={
              state === "RED"
                ? "stroke-red-500 fill-red-50 stroke-[3px] text-red-900"
                : "opacity-30"
            }
          />
          <Node
            id="yellow"
            type="generic"
            {...nodes.yellow}
            selected={state === "YELLOW"}
            className={
              state === "YELLOW"
                ? "stroke-yellow-500 fill-yellow-50 stroke-[3px] text-yellow-900"
                : "opacity-30"
            }
          />
          <Node
            id="green"
            type="generic"
            {...nodes.green}
            selected={state === "GREEN"}
            className={
              state === "GREEN"
                ? "stroke-green-500 fill-green-50 stroke-[3px] text-green-900"
                : "opacity-30"
            }
          />

          <foreignObject x={350} y={300} width={100} height={100}>
            <motion.div
              className="w-20 h-20 rounded-full mx-auto shadow-2xl border-4 scale-90"
              animate={{
                backgroundColor:
                  state === "RED" ? "#ef4444" : state === "YELLOW" ? "#eab308" : "#22c55e",
                borderColor: "#1e293b",
                scale: [1, 1.1, 1],
              }}
              transition={{ duration: 0.5 }}
            />
          </foreignObject>
        </SvgCanvas>

        <div className="absolute top-4 left-4 flex gap-2 pointer-events-auto">
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            className={`px-6 py-2 rounded-lg shadow font-mono font-bold transition-all active:scale-95 text-sm flex items-center gap-2 border ${isPlaying ? "bg-red-500 hover:bg-red-600 text-white border-red-400" : "bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-500"}`}
          >
            {isPlaying ? "⏸ Pause Timer" : "▶ Start Timer"}
          </button>
          <div className="bg-white/80 p-2 rounded-lg text-xs font-bold text-slate-500 border border-slate-200">
            Current: {state}
          </div>
        </div>
      </div>
    </DemoShell>
  );
};
