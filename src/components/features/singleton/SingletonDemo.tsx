"use client";

import React, { useState, useEffect } from "react";
import { SvgCanvas } from "@/components/shared/demo-framework/SvgCanvas";
import { Node } from "@/components/shared/demo-framework/Node";
import { Edge } from "@/components/shared/demo-framework/Edge";
import { LoggerPanel, LogEntry } from "@/components/shared/demo-framework/LoggerPanel";
import { DemoShell } from "@/components/shared/DemoShell";
import { clsx } from "clsx";
import { motion, AnimatePresence } from "framer-motion";

export const SingletonDemo = () => {
  const [useSingleton, setUseSingleton] = useState(true);
  const [logs, setLogs] = useState<LogEntry[]>([]);

  // State for our "App Config"
  const [globalConfig, setGlobalConfig] = useState<"DARK" | "LIGHT">("LIGHT");
  const [clientAConfig, setClientAConfig] = useState<"DARK" | "LIGHT">("LIGHT");
  const [clientBConfig, setClientBConfig] = useState<"DARK" | "LIGHT">("LIGHT");

  const addLog = (msg: string, type: LogEntry["type"] = "info") => {
    setLogs((prev) => [
      ...prev,
      { id: Math.random().toString(36), timestamp: new Date(), message: msg, type },
    ]);
  };

  const toggleConfig = (initiator: "A" | "B") => {
    const newVal =
      initiator === "A"
        ? clientAConfig === "LIGHT"
          ? "DARK"
          : "LIGHT"
        : clientBConfig === "LIGHT"
          ? "DARK"
          : "LIGHT";

    if (useSingleton) {
      // Pattern Mode: All update together
      setGlobalConfig(newVal);
      setClientAConfig(newVal);
      setClientBConfig(newVal);
      addLog(
        `Singleton: Config updated to ${newVal} by Client ${initiator}. All subscribers notified.`,
        "success"
      );
    } else {
      // Anti-Pattern Mode: Local updates only
      if (initiator === "A") setClientAConfig(newVal);
      else setClientBConfig(newVal);
      addLog(
        `Instance ${initiator}: Updated local init to ${newVal}. Other instances are out of sync!`,
        "warning"
      );
    }
  };

  const handleReset = () => {
    setUseSingleton(true);
    setGlobalConfig("LIGHT");
    setClientAConfig("LIGHT");
    setClientBConfig("LIGHT");
    setLogs([]);
    addLog("Reset to initial state.", "info");
  };

  const nodes = {
    singleton: { x: 400, y: 150, label: "Singleton Store" },
    clientA: { x: 200, y: 400, label: "Client Window A" },
    clientB: { x: 600, y: 400, label: "Client Window B" },
  };

  // Derived visual styles
  const getNodeStyle = (theme: "DARK" | "LIGHT") =>
    theme === "DARK"
      ? "fill-slate-800 stroke-slate-600 text-white"
      : "fill-blue-50 stroke-blue-500 text-blue-900";

  return (
    <DemoShell
      title="Singleton Config Manager"
      description="Toggle 'Use Singleton' to see why global state is useful for configs."
      onReset={handleReset}
    >
      <div className="relative h-[500px] flex flex-col">
        <SvgCanvas className="flex-1">
          {/* Visual Connections */}
          {useSingleton && (
            <>
              <Edge
                id="e1"
                start={nodes.clientA}
                end={nodes.singleton}
                animated={true}
                color="#94a3b8"
              />
              <Edge
                id="e2"
                start={nodes.clientB}
                end={nodes.singleton}
                animated={true}
                color="#94a3b8"
              />
            </>
          )}

          {/* The Singleton Instance */}
          <AnimatePresence>
            {useSingleton && (
              <motion.g
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
              >
                <Node
                  id="singleton"
                  type="source"
                  {...nodes.singleton}
                  className="fill-indigo-100 stroke-indigo-600 text-indigo-900 font-bold shadow-lg"
                />
                <foreignObject
                  x={nodes.singleton.x - 50}
                  y={nodes.singleton.y - 12}
                  width={100}
                  height={24}
                >
                  <div className="flex items-center justify-center gap-2">
                    <div
                      className={clsx(
                        "px-2 py-0.5 rounded text-[10px] font-mono border shadow-sm transition-colors duration-500",
                        globalConfig === "DARK"
                          ? "bg-slate-800 text-white border-slate-600"
                          : "bg-white text-slate-900 border-slate-200"
                      )}
                    >
                      Config: {globalConfig}
                    </div>
                  </div>
                </foreignObject>
              </motion.g>
            )}
          </AnimatePresence>

          {/* Client A */}
          <Node id="clientA" type="generic" {...nodes.clientA} onClick={() => toggleConfig("A")} />
          {/* Theme Badge A */}
          <foreignObject x={nodes.clientA.x - 30} y={nodes.clientA.y + 25} width={60} height={20}>
            <div
              className={clsx(
                "text-[10px] text-center font-bold px-1 rounded transition-colors",
                clientAConfig === "DARK"
                  ? "bg-slate-800 text-white"
                  : "bg-yellow-200 text-yellow-800"
              )}
            >
              {clientAConfig}
            </div>
          </foreignObject>

          {/* Client B */}
          <Node id="clientB" type="generic" {...nodes.clientB} onClick={() => toggleConfig("B")} />
          {/* Theme Badge B */}
          <foreignObject x={nodes.clientB.x - 30} y={nodes.clientB.y + 25} width={60} height={20}>
            <div
              className={clsx(
                "text-[10px] text-center font-bold px-1 rounded transition-colors",
                clientBConfig === "DARK"
                  ? "bg-slate-800 text-white"
                  : "bg-yellow-200 text-yellow-800"
              )}
            >
              {clientBConfig}
            </div>
          </foreignObject>
        </SvgCanvas>
        <div className="absolute top-4 left-4 pointer-events-auto">
          <label className="flex items-center gap-2 bg-white p-2 rounded shadow border cursor-pointer hover:bg-slate-50">
            <input
              type="checkbox"
              checked={useSingleton}
              onChange={(e) => setUseSingleton(e.target.checked)}
              className="w-4 h-4 accent-blue-600"
            />
            <span className="text-sm font-medium text-slate-700">Enforce Singleton</span>
          </label>
        </div>

        <div className="absolute bottom-4 right-4 max-w-xs text-xs text-slate-500 text-right pointer-events-none bg-slate-50/50 p-2 rounded backdrop-blur-sm border border-slate-100">
          <span className="font-semibold text-slate-700">Suggestion:</span> Click Client Nodes to
          update config.
          {useSingleton ? " Changes reflect globally." : " Changes stay local (buggy)."}
        </div>
        <LoggerPanel logs={logs} className="h-[150px] rounded-t-none border-t-0" />
      </div>
    </DemoShell>
  );
};
