"use client";

import React, { useState } from "react";
import { SvgCanvas } from "@/components/shared/demo-framework/SvgCanvas";
import { Node } from "@/components/shared/demo-framework/Node";
import { Edge } from "@/components/shared/demo-framework/Edge";
import { LoggerPanel, LogEntry } from "@/components/shared/demo-framework/LoggerPanel";
import { DemoShell } from "@/components/shared/DemoShell";
import { motion, AnimatePresence } from "framer-motion";

export const ObserverDemo = () => {
  const [price, setPrice] = useState(100);
  const [logs, setLogs] = useState<LogEntry[]>([]);

  const notify = (newPrice: number) => {
    setPrice(newPrice);
    setLogs((prev) => [
      ...prev,
      {
        id: Math.random().toString(),
        timestamp: new Date(),
        message: `Subject: Price updated to $${newPrice}`,
        type: "info",
      },
    ]);

    setTimeout(() => {
      setLogs((prev) => [
        ...prev,
        {
          id: Math.random().toString(),
          timestamp: new Date(),
          message: `Observer A (Chart): Reacted to $${newPrice}`,
          type: "success",
        },
      ]);
      setLogs((prev) => [
        ...prev,
        {
          id: Math.random().toString(),
          timestamp: new Date(),
          message: `Observer B (Table): Reacted to $${newPrice}`,
          type: "success",
        },
      ]);
    }, 500);
  };

  const nodes = {
    subject: { x: 400, y: 200, label: `Stock: $${price}` },
    obsA: { x: 200, y: 400, label: "Chart (Observer)" },
    obsB: { x: 600, y: 400, label: "Table (Observer)" },
  };

  return (
    <DemoShell
      title="Stock Market Observer"
      description="Click the Stock to update price and notify all subscribers."
      onReset={() => {
        setPrice(100);
        setLogs([]);
      }}
    >
      <div className="relative h-[500px] flex flex-col">
        <SvgCanvas className="flex-1">
          <Edge id="e1" start={nodes.subject} end={nodes.obsA} animated={true} />
          <Edge id="e2" start={nodes.subject} end={nodes.obsB} animated={true} />

          <Node
            id="subject"
            type="source"
            {...nodes.subject}
            onClick={() => notify(price + 10)}
            selected={true}
            className="fill-blue-600 stroke-blue-800 text-white font-bold"
          />

          {/* Broadcast Wave Animation */}
          <AnimatePresence>
            {logs.length > 0 && (
              <>
                <motion.circle
                  key={(logs[logs.length - 1]?.id || "init") + "a"}
                  cx={nodes.subject.x}
                  cy={nodes.subject.y}
                  r={20}
                  className="fill-none stroke-blue-400 stroke-2 opacity-50 pointer-events-none"
                  initial={{ scale: 1, opacity: 0.8 }}
                  animate={{ scale: 10, opacity: 0 }}
                  transition={{ duration: 1 }}
                />
              </>
            )}
          </AnimatePresence>

          <Node
            id="obsA"
            type="target"
            {...nodes.obsA}
            className="fill-slate-50 stroke-slate-300 text-slate-700"
          />
          <foreignObject x={nodes.obsA.x - 40} y={nodes.obsA.y + 40} width={80} height={40}>
            <div className="w-full h-full bg-slate-50 flex items-end gap-1 p-1 rounded border border-slate-200 shadow-sm">
              <motion.div
                animate={{ height: `${(price / 150) * 100}%` }}
                className="bg-blue-500 w-1/3 rounded-sm"
              ></motion.div>
              <motion.div
                animate={{ height: `${(price / 130) * 100}%` }}
                className="bg-indigo-500 w-1/3 rounded-sm"
              ></motion.div>
              <motion.div
                animate={{ height: `${(price / 120) * 100}%` }}
                className="bg-purple-500 w-1/3 rounded-sm"
              ></motion.div>
            </div>
          </foreignObject>

          <Node
            id="obsB"
            type="target"
            {...nodes.obsB}
            className="fill-slate-50 stroke-slate-300 text-slate-700"
          />
          <foreignObject x={nodes.obsB.x - 40} y={nodes.obsB.y + 40} width={80} height={40}>
            <div className="bg-white border text-[10px] p-1 shadow-sm rounded">
              Current: <b>${price}</b>
            </div>
          </foreignObject>
        </SvgCanvas>

        <div className="absolute top-4 left-4 pointer-events-auto">
          <button
            type="button"
            onClick={() => notify(price + Math.floor(Math.random() * 10))}
            className="bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all text-white px-6 py-2 rounded-lg shadow-lg font-bold flex gap-2 items-center"
          >
            <span>📈</span> Update Price
          </button>
        </div>
        <LoggerPanel logs={logs} className="h-[150px] rounded-t-none border-t-0 bg-slate-50" />
      </div>
    </DemoShell>
  );
};
