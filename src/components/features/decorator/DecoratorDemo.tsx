"use client";

import React, { useState } from "react";
import { SvgCanvas } from "@/components/shared/demo-framework/SvgCanvas";
import { Node } from "@/components/shared/demo-framework/Node";
import { Edge } from "@/components/shared/demo-framework/Edge";
import { DemoShell } from "@/components/shared/DemoShell";
import { AnimatePresence } from "framer-motion";

export const DecoratorDemo = () => {
  const [decorators, setDecorators] = useState<string[]>([]);

  const addDecorator = (type: string) => {
    setDecorators([...decorators, type]);
  };

  const nodes = [
    { id: "coffee", x: 400, y: 100, label: "Simple Coffee ($5)" },
    ...decorators.map((d, i) => ({
      id: `dec-${i}`,
      x: 400,
      y: 100 + (i + 1) * 120, // Increased spacing
      label: `${d} (+$1)`,
    })),
  ];

  return (
    <DemoShell
      title="Coffee Decorator"
      description="Dynamically attach new behaviors (ingredients) to objects without changing their class."
      onReset={() => setDecorators([])}
    >
      <div className="relative h-[700px] flex flex-col">
        <SvgCanvas className="flex-1">
          <AnimatePresence mode="popLayout">
            {nodes.map((n, i) => {
              if (i === 0)
                return (
                  <Node
                    key={n.id}
                    {...n}
                    type="source"
                    className="fill-amber-100 stroke-amber-600 text-amber-900"
                  />
                );
              const prev = nodes[i - 1];
              if (!prev) return null;
              return (
                <React.Fragment key={n.id}>
                  <Edge id={`e-${i}`} start={prev} end={n} label="wraps" animated color="#cbd5e1" />
                  <Node
                    {...n}
                    type="generic"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="fill-white stroke-slate-300 text-slate-700"
                  />
                </React.Fragment>
              );
            })}
          </AnimatePresence>
        </SvgCanvas>

        <div className="absolute top-4 left-4 flex gap-2 pointer-events-auto">
          <button
            onClick={() => addDecorator("MilkDecorator")}
            className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-4 py-2 rounded shadow-sm font-bold text-xs uppercase tracking-wider transition-colors"
          >
            + Milk
          </button>
          <button
            type="button"
            onClick={() => addDecorator("Sugar")}
            className="bg-white hover:bg-slate-50 text-slate-700 px-3 py-1.5 rounded shadow text-xs font-bold border border-slate-200"
          >
            + Add Sugar
          </button>
          <button
            onClick={() => addDecorator("WhipDecorator")}
            className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-4 py-2 rounded shadow-sm font-bold text-xs uppercase tracking-wider transition-colors"
          >
            + Whip
          </button>
        </div>

        <div className="absolute bottom-4 right-4 text-xl font-bold bg-white p-4 rounded shadow pointer-events-none">
          Total Cost: ${5 + decorators.length}
        </div>
      </div>
    </DemoShell>
  );
};
