"use client";

import React, { useState } from "react";
import { SvgCanvas } from "@/components/shared/demo-framework/SvgCanvas";
import { Node } from "@/components/shared/demo-framework/Node";
import { Edge } from "@/components/shared/demo-framework/Edge";
import { DemoShell } from "@/components/shared/DemoShell";
import { motion, AnimatePresence } from "framer-motion";

interface GameState {
  level: number;
  health: number;
}

export const MementoDemo = () => {
  const [current, setCurrent] = useState<GameState>({ level: 1, health: 100 });
  const [saves, setSaves] = useState<GameState[]>([]);

  const play = () => {
    setCurrent((prev) => ({ level: prev.level + 1, health: prev.health - 10 }));
  };

  const saveGame = () => {
    setSaves([...saves, { ...current }]); // Creating Memento (Snapshot)
  };

  const loadGame = (idx: number) => {
    const save = saves[idx];
    if (save) {
      setCurrent({ level: save.level, health: save.health });
    }
  };

  return (
    <DemoShell
      title="Game Save System"
      description="Capture internal state (Memento) and restore it later without exposing private details."
      onReset={() => {
        setCurrent({ level: 1, health: 100 });
        setSaves([]);
      }}
    >
      <div className="relative h-[500px] flex flex-col">
        <SvgCanvas className="flex-1">
          <Node
            id="game"
            type="source"
            x={200}
            y={200}
            label={`Lv: ${current.level} | HP: ${current.health}`}
            selected={true}
            className="fill-indigo-50 stroke-indigo-600 text-indigo-900"
          />

          <AnimatePresence>
            {saves.map((save, i) => (
              <React.Fragment key={i}>
                <Edge
                  id={`edge-${i}`}
                  start={{ x: 200, y: 200 }}
                  end={{ x: 500, y: 50 + i * 60 }}
                  dashed
                  label="restore"
                  animated={false}
                  color="#cbd5e1"
                />
                <motion.g
                  initial={{ opacity: 0, x: 200, y: 200, scale: 0.5 }}
                  animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                >
                  <Node
                    id={`save-${i}`}
                    type="target"
                    x={500}
                    y={50 + i * 60} // Tighter spacing, start higher
                    label={`Save ${i + 1}: Lv ${save.level}`}
                    onClick={() => loadGame(i)}
                    className="fill-emerald-50 stroke-emerald-500 text-emerald-900 cursor-pointer hover:fill-emerald-100 transition-colors"
                  />
                </motion.g>
              </React.Fragment>
            ))}
          </AnimatePresence>
        </SvgCanvas>

        <div className="absolute top-4 left-4 flex gap-4 bg-white/80 p-4 rounded-xl shadow-lg border border-slate-100 backdrop-blur-sm pointer-events-auto">
          <button
            type="button"
            onClick={play}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow font-bold transition-all active:scale-95 text-sm"
          >
            Play Level (+1)
          </button>
          <button
            type="button"
            onClick={saveGame}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg shadow font-bold transition-all active:scale-95 flex items-center gap-2 text-sm"
          >
            <span className="text-lg">💾</span> Save Game
          </button>
        </div>
      </div>
    </DemoShell>
  );
};
