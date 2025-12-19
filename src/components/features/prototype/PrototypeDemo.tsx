"use client";

import React, { useState } from "react";
import { SvgCanvas } from "@/components/shared/demo-framework/SvgCanvas";
import { Node } from "@/components/shared/demo-framework/Node";
import { Edge } from "@/components/shared/demo-framework/Edge";
import { DemoShell } from "@/components/shared/DemoShell";

interface ShapeProps {
  id: string;
  type: "CIRCLE" | "RECT";
  color: "red" | "blue";
  x: number;
  y: number;
}

export const PrototypeDemo = () => {
  const [shapes, setShapes] = useState<ShapeProps[]>([
    { id: "orig", type: "CIRCLE", color: "red", x: 200, y: 250 },
  ]);
  const [selectedId, setSelectedId] = useState<string>("orig");

  const cloneShape = React.useCallback(() => {
    const original = shapes.find((s) => s.id === selectedId);
    if (!original) return;

    const newShape: ShapeProps = {
      ...original,
      id: Math.random().toString(),
      x: original.x + 100,
      y: original.y + (Math.random() * 50 - 25), // Slight offset
      color: original.color === "red" ? "blue" : "red",
    };
    setShapes([...shapes, newShape]);
    setSelectedId(newShape.id);
  }, [shapes, selectedId]);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "c") {
        e.preventDefault();
        cloneShape();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [cloneShape]);

  return (
    <DemoShell
      title="Shape Cloner"
      description="Create new objects by copying existing ones instead of building from scratch."
      onReset={() => setShapes([{ id: "orig", type: "CIRCLE", color: "red", x: 200, y: 250 }])}
    >
      <div className="relative h-[400px] flex flex-col">
        <SvgCanvas className="flex-1">
          {shapes.map((s, i) => {
            const prevShape = i > 0 ? shapes[i - 1] : undefined;
            return (
              <React.Fragment key={s.id}>
                {prevShape && (
                  <Edge
                    id={`clone-${i}`}
                    start={{ x: prevShape.x, y: prevShape.y }}
                    end={{ x: s.x, y: s.y }}
                    label="clone()"
                    dashed
                  />
                )}
                <Node
                  id={s.id}
                  type={i === 0 ? "source" : "target"}
                  x={s.x}
                  y={s.y}
                  label={s.type}
                  selected={selectedId === s.id}
                  onClick={() => setSelectedId(s.id)}
                  className={
                    s.color === "red"
                      ? "fill-rose-100 stroke-rose-500 text-rose-900"
                      : "fill-blue-100 stroke-blue-500 text-blue-900"
                  }
                  initial={
                    prevShape
                      ? { x: prevShape.x, y: prevShape.y, opacity: 0, scale: 0.5 }
                      : { x: s.x, y: s.y, scale: 0 }
                  }
                  animate={{ x: s.x, y: s.y, opacity: 1, scale: 1 }}
                />
              </React.Fragment>
            );
          })}
        </SvgCanvas>

        <div className="absolute top-4 left-4 flex flex-col gap-2 pointer-events-auto">
          <div className="bg-white/80 p-3 rounded-lg shadow border border-slate-100 backdrop-blur-sm">
            <div className="text-xs font-bold text-slate-500 mb-1 pointer-events-none select-none">
              PROTOTYPE REGISTRY
            </div>
            <button
              type="button"
              onClick={cloneShape}
              className="bg-slate-900 text-white px-4 py-2 rounded shadow font-bold text-sm hover:scale-105 transition-transform active:scale-95 flex items-center gap-2"
            >
              <span>Clone Selected</span>
              <span className="opacity-50 text-xs font-normal">(Ctrl+C)</span>
            </button>
          </div>
          <div className="text-[10px] text-slate-400 max-w-[150px] leading-tight select-none">
            Select a node to clone it. The new instance copies the state of the prototype.
          </div>
        </div>
      </div>
    </DemoShell>
  );
};
