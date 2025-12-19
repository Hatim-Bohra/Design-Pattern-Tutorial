"use client";

import React, { useState } from "react";
import { SvgCanvas } from "@/components/shared/demo-framework/SvgCanvas";
import { Node } from "@/components/shared/demo-framework/Node";
import { Edge } from "@/components/shared/demo-framework/Edge";
import { DemoShell } from "@/components/shared/DemoShell";
import { motion } from "framer-motion";

export const IteratorDemo = () => {
  const songs = ["Song A", "Song B", "Song C", "Song D"];
  const [current, setCurrent] = useState(0);

  const next = () => {
    if (current < songs.length - 1) setCurrent(current + 1);
  };

  const prev = () => {
    if (current > 0) setCurrent(current - 1);
  };

  return (
    <DemoShell
      title="Playlist Iterator"
      description="Traverse elements one by one without needing to know if it's an Array, List, or Tree."
      onReset={() => setCurrent(0)}
    >
      <div className="relative h-[400px] flex flex-col">
        <SvgCanvas className="flex-1">
          {songs.map((song, i) => (
            <Node
              key={i}
              id={`s-${i}`}
              type={i === current ? "source" : "generic"}
              x={150 + i * 150}
              y={250}
              label={song}
              selected={i === current}
              className={
                i === current
                  ? "fill-blue-50 stroke-blue-500 text-blue-900"
                  : "fill-slate-50 stroke-slate-300 text-slate-500 opacity-80"
              }
            />
          ))}

          {/* Visualizing the "Iterator" pointer */}
          <foreignObject x={0} y={0} width={1000} height={600} className="pointer-events-none">
            <motion.div
              className="absolute w-10 h-10 flex items-center justify-center text-blue-600"
              animate={{
                x: 150 + current * 150 - 20,
                y: 310,
                scale: [1, 1.2, 1],
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="drop-shadow-lg"
              >
                <path d="M12 2L4 14h6v8h4v-8h6z"></path>
              </svg>
            </motion.div>
          </foreignObject>
        </SvgCanvas>

        <div className="absolute top-4 left-4 flex gap-4 bg-white/80 p-2 rounded-xl shadow border border-slate-100 backdrop-blur-sm pointer-events-auto">
          <button
            type="button"
            onClick={prev}
            disabled={current === 0}
            className="bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 px-4 py-2 rounded-lg shadow-sm font-bold text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>
          <button
            type="button"
            onClick={next}
            disabled={current === songs.length - 1}
            className="bg-slate-900 text-white px-4 py-2 rounded-lg shadow-lg font-bold text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-800 transition-all active:scale-95"
          >
            Next
          </button>
        </div>
      </div>
    </DemoShell>
  );
};
