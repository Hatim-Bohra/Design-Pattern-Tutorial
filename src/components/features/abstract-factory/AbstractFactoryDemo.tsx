"use client";

import React, { useState } from "react";
import { SvgCanvas } from "@/components/shared/demo-framework/SvgCanvas";
import { Node } from "@/components/shared/demo-framework/Node";
import { DemoShell } from "@/components/shared/DemoShell";
import { motion } from "framer-motion";
import { clsx } from "clsx";

export const AbstractFactoryDemo = () => {
  const [theme, setTheme] = useState<"LIGHT" | "DARK">("LIGHT");

  const nodes = {
    factory: { x: 400, y: 150, label: `${theme} Factory` },
    btn: { x: 250, y: 350, label: "Button" },
    chk: { x: 550, y: 350, label: "Checkbox" },
  };

  const styles = {
    LIGHT: { bg: "bg-white", text: "text-slate-900", border: "border-slate-300" },
    DARK: { bg: "bg-slate-800", text: "text-white", border: "border-slate-600" },
  };

  const currentStyle = styles[theme];

  return (
    <DemoShell
      title="Theme Factory"
      description="Switching the Factory changes the style of ALL products created by it."
      onReset={() => setTheme("LIGHT")}
    >
      <div className="relative h-[500px] flex flex-col">
        <SvgCanvas className="flex-1">
          {/* Factory Node */}
          <foreignObject x={nodes.factory.x - 75} y={nodes.factory.y - 40} width={150} height={80}>
            <motion.div
              key={theme}
              initial={{ scale: 0.8, opacity: 0, y: -20 }}
              animate={{
                scale: [1, 1.05, 1],
                opacity: 1,
                y: 0,
                boxShadow:
                  theme === "LIGHT"
                    ? "0px 10px 25px -5px rgba(0, 0, 0, 0.1)"
                    : "0px 10px 25px -5px rgba(255, 255, 255, 0.1)",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className={clsx(
                "flex flex-col items-center justify-center h-full w-full rounded-xl border-2 shadow-lg transition-colors duration-500",
                theme === "LIGHT" ? "bg-white border-slate-200" : "bg-slate-900 border-slate-700"
              )}
            >
              <span
                className={clsx(
                  "font-bold text-sm",
                  theme === "LIGHT" ? "text-slate-800" : "text-white"
                )}
              >
                {theme} Factory
              </span>
              <span className="text-[10px] text-slate-400">Creates {theme.toLowerCase()} UI</span>
            </motion.div>
          </foreignObject>

          {/* Products */}
          <foreignObject x={nodes.btn.x - 60} y={nodes.btn.y - 30} width={120} height={60}>
            <div className="text-xs text-center text-slate-400 mb-1">Product A</div>
            <motion.button
              layout
              initial={false}
              animate={{
                backgroundColor: theme === "LIGHT" ? "#ffffff" : "#1e293b",
                color: theme === "LIGHT" ? "#0f172a" : "#ffffff",
                borderColor: theme === "LIGHT" ? "#e2e8f0" : "#334155",
              }}
              className="w-full h-10 rounded shadow-sm font-bold border-2 transition-colors"
            >
              Button
            </motion.button>
          </foreignObject>

          <foreignObject x={nodes.chk.x - 60} y={nodes.chk.y - 30} width={120} height={60}>
            <div className="text-xs text-center text-slate-400 mb-1">Product B</div>
            <motion.div
              layout
              initial={false}
              animate={{
                backgroundColor: theme === "LIGHT" ? "#f8fafc" : "#0f172a",
                color: theme === "LIGHT" ? "#334155" : "#e2e8f0",
                borderColor: theme === "LIGHT" ? "#cbd5e1" : "#475569",
              }}
              className="w-full h-10 rounded shadow-sm flex items-center justify-center gap-2 border-2"
            >
              <input type="checkbox" checked readOnly className="w-4 h-4 accent-indigo-500" />
              <span className="text-sm font-bold">Checkbox</span>
            </motion.div>
          </foreignObject>

          {/* Connections (Visual only) */}
          <svg className="absolute inset-0 pointer-events-none overflow-visible">
            <motion.path
              d={`M ${nodes.factory.x} ${nodes.factory.y + 40} C ${nodes.factory.x} ${nodes.factory.y + 100} ${nodes.btn.x} ${nodes.btn.y - 50} ${nodes.btn.x} ${nodes.btn.y - 30}`}
              fill="none"
              stroke={theme === "LIGHT" ? "#cbd5e1" : "#475569"}
              strokeWidth="2"
              strokeDasharray="4 4"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
            <motion.path
              d={`M ${nodes.factory.x} ${nodes.factory.y + 40} C ${nodes.factory.x} ${nodes.factory.y + 100} ${nodes.chk.x} ${nodes.chk.y - 50} ${nodes.chk.x} ${nodes.chk.y - 30}`}
              fill="none"
              stroke={theme === "LIGHT" ? "#cbd5e1" : "#475569"}
              strokeWidth="2"
              strokeDasharray="4 4"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            />
          </svg>
        </SvgCanvas>

        <div className="absolute top-4 left-4 flex flex-col gap-2 bg-white/50 p-2 rounded border border-slate-100 backdrop-blur-sm pointer-events-auto">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Select Factory
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setTheme("LIGHT")}
              className={clsx(
                "px-4 py-2 rounded text-sm font-bold transition-all",
                theme === "LIGHT"
                  ? "bg-white text-indigo-600 shadow ring-1 ring-indigo-100"
                  : "text-slate-500 hover:bg-white/50"
              )}
            >
              Light
            </button>
            <button
              type="button"
              onClick={() => setTheme("DARK")}
              className={clsx(
                "px-4 py-2 rounded text-sm font-bold transition-all",
                theme === "DARK"
                  ? "bg-slate-900 text-white shadow ring-1 ring-slate-800"
                  : "text-slate-500 hover:bg-white/50"
              )}
            >
              Dark
            </button>
          </div>
        </div>
      </div>
    </DemoShell>
  );
};
