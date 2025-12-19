"use client";

import React, { useState, useEffect } from "react";
import { SvgCanvas } from "@/components/shared/demo-framework/SvgCanvas";
import { Node } from "@/components/shared/demo-framework/Node";
import { Edge } from "@/components/shared/demo-framework/Edge";
import { DemoShell } from "@/components/shared/DemoShell";
import { motion } from "framer-motion";

export const TemplateMethodDemo = () => {
  const [minerType, setMinerType] = useState<"PDF" | "CSV">("PDF");
  const [step, setStep] = useState(0);
  const intervalRef = React.useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const steps = [
    { id: "open", label: "Open File" },
    { id: "extract", label: "Extract Data" },
    { id: "parse", label: `Parse ${minerType} (Custom)`, custom: true },
    { id: "analyze", label: "Analyze Data" },
    { id: "close", label: "Close File" },
  ];

  const run = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setStep(0);
    let current = 0;
    intervalRef.current = setInterval(() => {
      current++;
      setStep(current);
      if (current >= steps.length && intervalRef.current) clearInterval(intervalRef.current);
    }, 800);
  };

  const handleReset = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setStep(0);
  };

  return (
    <DemoShell
      title="Data Miner ETL"
      description="The algorithm structure (steps) is fixed. Only the 'Parse' step is overridden by subclasses."
      onReset={handleReset}
    >
      <div className="relative h-[500px] flex flex-col">
        <SvgCanvas className="flex-1">
          {steps.map((s, i) => (
            <React.Fragment key={s.id}>
              {i > 0 && (
                <Edge
                  id={`e-${i}`}
                  start={{ x: 400, y: 50 + (i - 1) * 80 }}
                  end={{ x: 400, y: 50 + i * 80 }}
                  animated={step > i}
                  className={step > i ? "stroke-blue-500" : "stroke-slate-200"}
                />
              )}
              <Node
                id={s.id}
                type={s.custom ? "source" : "generic"}
                x={400}
                y={50 + i * 80}
                label={s.label}
                selected={step === i + 1}
                className={
                  step === i + 1
                    ? s.custom
                      ? "fill-purple-100 stroke-purple-600 text-purple-900 stroke-2 scale-110"
                      : "fill-blue-100 stroke-blue-600 text-blue-900 stroke-2 scale-105"
                    : step > i
                      ? "fill-slate-50 stroke-slate-400 text-slate-500"
                      : "opacity-40"
                }
              />
              {step === i + 1 && (
                <motion.circle
                  cx={400}
                  cy={50 + i * 80}
                  r={35}
                  className="fill-none stroke-blue-400 stroke-2"
                  initial={{ scale: 1, opacity: 0.5 }}
                  animate={{ scale: 1.5, opacity: 0 }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                />
              )}
            </React.Fragment>
          ))}
        </SvgCanvas>

        <div className="absolute top-4 left-4 flex gap-4 bg-white/90 p-4 rounded-xl shadow-lg border border-slate-100 backdrop-blur-sm items-center pointer-events-auto">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Miner Subclass
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setMinerType("PDF")}
                className={`px-3 py-1 text-xs font-bold rounded transition-colors ${minerType === "PDF" ? "bg-purple-600 text-white shadow" : "bg-slate-100 text-slate-500 hover:bg-slate-200"}`}
              >
                PDF Miner
              </button>
              <button
                type="button"
                onClick={() => setMinerType("CSV")}
                className={`px-3 py-1 text-xs font-bold rounded transition-colors ${minerType === "CSV" ? "bg-emerald-600 text-white shadow" : "bg-slate-100 text-slate-500 hover:bg-slate-200"}`}
              >
                CSV Miner
              </button>
            </div>
          </div>
          <div className="w-px h-8 bg-slate-200"></div>
          <button
            type="button"
            onClick={run}
            className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-2 rounded-lg font-bold shadow-lg hover:scale-105 transition-all active:scale-95 text-sm"
          >
            Run Algorithm
          </button>
        </div>
      </div>
    </DemoShell>
  );
};
