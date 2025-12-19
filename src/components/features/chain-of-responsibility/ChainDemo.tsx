"use client";

import React, { useState } from "react";
import { SvgCanvas } from "@/components/shared/demo-framework/SvgCanvas";
import { Node } from "@/components/shared/demo-framework/Node";
import { Edge } from "@/components/shared/demo-framework/Edge";
import { DemoShell } from "@/components/shared/DemoShell";
import { motion } from "framer-motion";

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
    <DemoShell
      title="Support Escalation Chain"
      description="Request travels down the chain until a handler can process it."
      onReset={() => setStatus("idle")}
    >
      <div className="relative h-[400px] flex flex-col">
        <SvgCanvas className="flex-1">
          <Edge id="e1" start={nodes.req} end={nodes.l1} animated={status === "l1"} />
          <Edge id="e2" start={nodes.l1} end={nodes.l2} animated={status === "l2"} />
          <Edge id="e3" start={nodes.l2} end={nodes.l3} animated={status === "l3"} />

          <Node
            id="req"
            type="source"
            {...nodes.req}
            className="fill-slate-100 stroke-slate-500 text-slate-900"
          />
          <Node
            id="l1"
            type="generic"
            {...nodes.l1}
            selected={status === "l1"}
            className={
              status === "l1"
                ? "fill-blue-100 stroke-blue-600 text-blue-900 stroke-[3px]"
                : "opacity-70"
            }
          />
          <Node
            id="l2"
            type="generic"
            {...nodes.l2}
            selected={status === "l2"}
            className={
              status === "l2"
                ? "fill-purple-100 stroke-purple-600 text-purple-900 stroke-[3px]"
                : "opacity-70"
            }
          />
          <Node
            id="l3"
            type="target"
            {...nodes.l3}
            selected={status === "l3"}
            className={
              status === "l3"
                ? "fill-red-100 stroke-red-600 text-red-900 stroke-[3px]"
                : "opacity-70"
            }
          />

          {/* Request Token Animation */}
          {status !== "idle" && status !== "resolved" && (
            <motion.circle
              r={8}
              className="fill-amber-500 stroke-white stroke-2"
              animate={{
                cx: status === "l1" ? nodes.l1.x : status === "l2" ? nodes.l2.x : nodes.l3.x,
                cy: nodes.l1.y,
              }}
              transition={{ duration: 0.5, type: "spring" }}
            />
          )}

          {/* Resolution Flag */}
          {status === "resolved" && (
            <foreignObject x={0} y={0} width="100%" height="100%" className="pointer-events-none">
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: 1,
                  opacity: 1,
                  x:
                    (difficulty === "low"
                      ? nodes.l1.x
                      : difficulty === "medium"
                        ? nodes.l2.x
                        : nodes.l3.x) - 20,
                  y: nodes.l1.y - 60,
                }}
                className="absolute text-2xl font-bold text-green-600 bg-white rounded-full shadow-lg p-2"
              >
                ✅
              </motion.div>
            </foreignObject>
          )}
        </SvgCanvas>

        <div className="absolute top-4 left-4 flex gap-4 items-center bg-white/90 p-4 rounded-xl shadow-lg border border-slate-100 backdrop-blur-sm pointer-events-auto">
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value as "low" | "medium" | "high")}
            className="border border-slate-300 p-2 rounded-lg text-sm bg-white font-medium focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer"
          >
            <option value="low">Slight Issue (Low)</option>
            <option value="medium">Bug Report (Medium)</option>
            <option value="high">System Crash (High)</option>
          </select>
          <button
            type="button"
            onClick={processRequest}
            disabled={status !== "idle" && status !== "resolved"}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow font-bold disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95 text-sm"
          >
            Submit Ticket
          </button>
        </div>
      </div>
    </DemoShell>
  );
};
