"use client";

import React, { useState } from "react";
import { SvgCanvas } from "@/components/shared/demo-framework/SvgCanvas";
import { Node } from "@/components/shared/demo-framework/Node";
import { DemoShell } from "@/components/shared/DemoShell";
import { motion, AnimatePresence } from "framer-motion";

interface Command {
  execute: () => void;
  undo: () => void;
  label: string;
}

export const CommandDemo = () => {
  const [text, setText] = useState("");
  const [history, setHistory] = useState<Command[]>([]);
  const [future, setFuture] = useState<Command[]>([]);

  const executeCommand = (cmd: Command) => {
    cmd.execute();
    setHistory([...history, cmd]);
    setFuture([]); // Clear redo stack on new action
  };

  const undo = () => {
    if (history.length === 0) return;
    const lastCmd = history[history.length - 1];
    if (!lastCmd) return;
    lastCmd.undo();
    setHistory(history.slice(0, -1));
    setFuture([lastCmd, ...future]);
  };

  const redo = () => {
    if (future.length === 0) return;
    const nextCmd = future[0];
    if (!nextCmd) return;
    nextCmd.execute();
    setFuture(future.slice(1));
    setHistory([...history, nextCmd]);
  };

  const createAppendCommand = (char: string): Command => ({
    label: `Type '${char}'`,
    execute: () => setText((prev) => prev + char),
    undo: () => setText((prev) => prev.slice(0, -1)),
  });

  return (
    <DemoShell
      title="Undo/Redo Editor"
      description="Commands are objects that can be stored, executed, and undone."
      onReset={() => {
        setText("");
        setHistory([]);
        setFuture([]);
      }}
    >
      <div className="relative h-[400px] flex flex-col">
        <SvgCanvas className="flex-1">
          <foreignObject x={250} y={50} width={300} height={100}>
            <div className="bg-white border rounded p-4 text-2xl font-mono min-h-full flex items-center justify-center shadow-inner">
              {text || <span className="text-slate-300">Start typing...</span>}
            </div>
          </foreignObject>

          {/* Stacks Visualization */}
          <Node
            id="history"
            type="source"
            x={200}
            y={250}
            label={`Undo Stack (${history.length})`}
            className="fill-indigo-50 stroke-indigo-500 text-indigo-900"
          />
          <Node
            id="future"
            type="target"
            x={600}
            y={250}
            label={`Redo Stack (${future.length})`}
            className="fill-amber-50 stroke-amber-500 text-amber-900"
          />

          {/* Command Objects Animation */}
          <foreignObject x={0} y={0} width={1000} height={600} className="pointer-events-none">
            <motion.div className="absolute inset-0">
              <AnimatePresence>
                {history.map((cmd, i) => (
                  <motion.div
                    key={`h-${cmd.label}-${i}`} // Use index to allow duplicates but unique keys logic
                    initial={{ left: 600, top: 250, opacity: 0, scale: 0 }}
                    animate={{
                      left: 200 + (((i * 7) % 20) - 10),
                      top: 250 + (((i * 13) % 20) - 10),
                      opacity: 1,
                      scale: 1,
                    }}
                    exit={{ left: 600, top: 250, opacity: 0, scale: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="absolute w-8 h-8 bg-indigo-500 text-white rounded-md flex items-center justify-center text-[10px] font-bold shadow-sm z-10"
                    style={{ marginLeft: -16, marginTop: -16 }} // Center
                  >
                    {cmd.label.split("'")[1]}
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </foreignObject>
        </SvgCanvas>

        {/* Controls */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4 bg-white/80 p-4 rounded-2xl shadow-xl border border-slate-100 backdrop-blur-sm pointer-events-auto">
          <div className="flex gap-2">
            {["A", "B", "C"].map((char) => (
              <button
                type="button"
                key={char}
                onClick={() => executeCommand(createAppendCommand(char))}
                className="w-12 h-12 rounded-xl bg-slate-900 text-white font-bold shadow-lg hover:scale-110 hover:bg-slate-800 transition-all active:scale-95 text-lg"
              >
                {char}
              </button>
            ))}
          </div>
          <div className="w-px bg-slate-200 mx-2"></div>
          <button
            type="button"
            onClick={undo}
            disabled={history.length === 0}
            className="px-6 py-2 bg-amber-500 text-white rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed shadow hover:bg-amber-600 transition-colors flex items-center gap-2"
          >
            <span>↩</span> Undo
          </button>
          <button
            type="button"
            onClick={redo}
            disabled={future.length === 0}
            className="px-6 py-2 bg-indigo-500 text-white rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed shadow hover:bg-indigo-600 transition-colors flex items-center gap-2"
          >
            Redo <span>↪</span>
          </button>
        </div>
      </div>
    </DemoShell>
  );
};
