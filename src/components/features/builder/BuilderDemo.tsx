"use client";

import React, { useState } from "react";
import { SvgCanvas } from "@/components/shared/demo-framework/SvgCanvas";
import { Node } from "@/components/shared/demo-framework/Node";

import { LoggerPanel, LogEntry } from "@/components/shared/demo-framework/LoggerPanel";
import { DemoShell } from "@/components/shared/DemoShell";
import { motion } from "framer-motion";

export const BuilderDemo = () => {
  const [query, setQuery] = useState({ select: "*", from: "users", where: "" });
  const [logs, setLogs] = useState<LogEntry[]>([]);

  // Helper to add logs
  const addLog = (msg: string) => {
    setLogs((prev) => [
      ...prev,
      { id: Math.random().toString(), timestamp: new Date(), message: msg, type: "info" },
    ]);
  };

  const buildStep = (part: string, value: string) => {
    setQuery((prev) => ({ ...prev, [part]: value }));
    addLog(`Builder: .${part}('${value}')`);
  };

  return (
    <DemoShell
      title="SQL Query Builder"
      description="Construct a complex object (SQL String) step-by-step."
      onReset={() => {
        setQuery({ select: "*", from: "users", where: "" });
        setLogs([]);
      }}
    >
      <div className="relative h-[500px] flex flex-col">
        <SvgCanvas className="flex-1">
          <Node id="builder" type="source" x={400} y={250} label="Query Builder" selected={true} />

          <foreignObject x={550} y={350} width={250} height={120}>
            <div className="bg-slate-900 text-slate-200 p-4 rounded-xl font-mono text-xs shadow-2xl h-full border border-slate-700 flex flex-col">
              <div className="text-[10px] text-slate-500 mb-2 uppercase tracking-wider">
                SQL Result
              </div>
              <div className="flex-1 break-all">
                <span className="text-blue-400">SELECT</span> {query.select}
                <br />
                <span className="text-purple-400">FROM</span> {query.from}
                {query.where && (
                  <>
                    <br />
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-amber-400 inline-block"
                    >
                      WHERE {query.where}
                    </motion.span>
                  </>
                )}
                <span className="text-slate-500">;</span>
              </div>
            </div>
          </foreignObject>
        </SvgCanvas>

        <div className="absolute top-8 left-8 space-y-2 bg-white/90 p-4 rounded-xl shadow-lg border border-slate-100 backdrop-blur-sm pointer-events-auto">
          <div className="font-bold text-xs text-slate-500 mb-3 uppercase tracking-wider">
            Build Steps
          </div>
          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => buildStep("select", "id, name")}
            className="w-full text-left px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-xs font-mono font-bold transition-colors border border-blue-100"
          >
            1. .select(&quot;id, name&quot;)
          </motion.button>
          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => buildStep("from", "orders")}
            className="w-full text-left px-4 py-2 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-lg text-xs font-mono font-bold transition-colors border border-purple-100"
          >
            2. .from(&quot;orders&quot;)
          </motion.button>
          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => buildStep("where", "active = true")}
            className="w-full text-left px-4 py-2 bg-amber-50 hover:bg-amber-100 text-amber-700 rounded-lg text-xs font-mono font-bold transition-colors border border-amber-100"
          >
            3. .where(&quot;active = true&quot;)
          </motion.button>
        </div>
        <LoggerPanel logs={logs} className="h-[150px] rounded-t-none border-t-0" />
      </div>
    </DemoShell>
  );
};
