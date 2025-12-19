"use client";

import React, { useState } from "react";
import { SvgCanvas } from "@/components/shared/demo-framework/SvgCanvas";
import { Node } from "@/components/shared/demo-framework/Node";
import { Edge } from "@/components/shared/demo-framework/Edge";
import { LoggerPanel, LogEntry } from "@/components/shared/demo-framework/LoggerPanel";
import { DemoShell } from "@/components/shared/DemoShell";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";

// Types
type DemoPhase = "idle" | "fetching" | "adapting" | "success" | "error";

export const AdapterDemo = () => {
  // State
  const [phase, setPhase] = useState<DemoPhase>("idle");
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [hasAdapter, setHasAdapter] = useState(false);

  // Nodes position
  const nodes = {
    source: { x: 100, y: 300, label: "Legacy Bank (XML)" },
    target: { x: 700, y: 300, label: "Dashboard (JSON)" },
    adapter: { x: 400, y: 300, label: "Adapter" },
  };

  // Helper to add logs
  const addLog = (msg: string, type: LogEntry["type"] = "info") => {
    setLogs((prev) => [
      ...prev,
      {
        id: Math.random().toString(36),
        timestamp: new Date(),
        message: msg,
        type,
      },
    ]);
  };

  const handleReset = () => {
    setPhase("idle");
    setLogs([]);
    setHasAdapter(false);
    addLog("System reset.", "info");
  };

  const handleFetch = () => {
    if (phase !== "idle") return;

    setPhase("fetching");
    addLog("Legacy Bank: Generating XML Report...", "info");

    setTimeout(() => {
      if (!hasAdapter) {
        setPhase("error");
        addLog("Dashboard Error: Cannot parse '<xml>value</xml>'", "error");
      } else {
        setPhase("adapting");
        addLog("Adapter: Intercepted XML payload.", "warning");

        setTimeout(() => {
          setPhase("success");
          addLog("Adapter: Converted to JSON { val: 100 }", "success");
          addLog("Dashboard: Data received and rendered.", "success");
        }, 1500);
      }
    }, 1500);
  };

  return (
    <DemoShell
      title="Adapter Pattern Playground"
      description="Connect Legacy API to Modern Dashboard"
      onReset={handleReset}
    >
      <div className="relative h-[600px] flex flex-col">
        <SvgCanvas className="flex-1">
          {/* Edges */}
          {hasAdapter ? (
            <>
              <Edge
                id="e1"
                start={nodes.source}
                end={nodes.adapter}
                animated={phase === "fetching"}
                color={phase === "fetching" ? "#f59e0b" : undefined}
              />
              <Edge
                id="e2"
                start={nodes.adapter}
                end={nodes.target}
                animated={phase === "success"}
                color={phase === "success" ? "#22c55e" : undefined}
              />
            </>
          ) : (
            <Edge
              id="e-direct"
              start={nodes.source}
              end={nodes.target}
              animated={phase === "fetching"}
              color={phase === "error" ? "#ef4444" : undefined}
            />
          )}

          {/* Nodes */}
          <Node
            id="source"
            type="source"
            {...nodes.source}
            onClick={handleFetch}
            selected={phase === "fetching"}
          />

          <Node
            id="target"
            type="target"
            {...nodes.target}
            selected={phase === "success" || phase === "error"}
          />

          <AnimatePresence>
            {hasAdapter && (
              <Node
                key="adapter-node"
                id="adapter"
                type="adapter"
                {...nodes.adapter}
                selected={phase === "adapting"}
              />
            )}
          </AnimatePresence>

          {/* Visual Payload Simulation (Overlay) */}
          {phase === "fetching" && (
            <motion.div
              initial={{ x: nodes.source.x, y: nodes.source.y, opacity: 1, scale: 0.5 }}
              animate={{
                x: hasAdapter ? nodes.adapter.x : nodes.target.x,
                opacity: hasAdapter ? 1 : 0,
                scale: 1,
              }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute pointer-events-none"
            >
              <div className="bg-amber-100 border-2 border-amber-500 text-amber-900 px-2 py-1 text-[10px] shadow-lg rounded font-mono font-bold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                &lt;XML/&gt;
              </div>
            </motion.div>
          )}

          {phase === "success" && (
            <motion.div
              initial={{ x: nodes.adapter.x, y: nodes.adapter.y, scale: 0.8 }}
              animate={{ x: nodes.target.x, y: nodes.target.y, scale: 1 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="absolute pointer-events-none"
            >
              <div className="bg-green-100 border-2 border-green-500 text-green-900 px-2 py-1 text-[10px] shadow-lg rounded-full font-mono font-bold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                &#123;JSON&#125;
              </div>
            </motion.div>
          )}
        </SvgCanvas>

        {/* Floating Controls Overlay */}
        <div className="absolute top-4 left-4 flex gap-2 pointer-events-auto">
          <button
            type="button"
            onClick={handleFetch}
            disabled={phase !== "idle"}
            className="bg-amber-600 text-white px-4 py-2 rounded shadow hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed font-bold transition-colors text-sm"
          >
            {phase === "idle" ? "▶ Fetch Data" : "Processing..."}
          </button>

          <button
            type="button"
            onClick={() => {
              setHasAdapter(!hasAdapter);
              setPhase("idle");
              addLog(hasAdapter ? "Adapter removed." : "Adapter module installed.", "info");
            }}
            className={clsx(
              "px-4 py-2 rounded shadow font-bold transition-colors text-sm border",
              hasAdapter
                ? "bg-red-50 border-red-200 text-red-700 hover:bg-red-100"
                : "bg-purple-600 text-white border-purple-600 hover:bg-purple-700"
            )}
          >
            {hasAdapter ? "Remove Adapter" : "+ Add Adapter"}
          </button>
        </div>

        {/* Logger Area */}
        <LoggerPanel logs={logs} className="rounded-b-lg border-t-0 rounded-t-none h-[150px]" />
      </div>
    </DemoShell>
  );
};
