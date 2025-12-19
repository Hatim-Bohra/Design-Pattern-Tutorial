"use client";

import React, { useState } from "react";
import { SvgCanvas } from "@/components/shared/demo-framework/SvgCanvas";
import { Node } from "@/components/shared/demo-framework/Node";
import { Edge } from "@/components/shared/demo-framework/Edge";
import { DemoShell } from "@/components/shared/DemoShell";
import { motion } from "framer-motion";

export const FacadeDemo = () => {
  const [status, setStatus] = useState<"OFF" | "MOVIE_MODE">("OFF");

  // Subsystem States
  const [tv, setTv] = useState(false);
  const [sound, setSound] = useState(false);
  const [lights, setLights] = useState(true);

  const toggleMovieMode = () => {
    if (status === "OFF") {
      setStatus("MOVIE_MODE");
      // Facade Logic: Orchestrate subsystems
      setTv(true);
      setSound(true);
      setLights(false);
    } else {
      setStatus("OFF");
      setTv(false);
      setSound(false);
      setLights(true);
    }
  };

  const nodes = {
    facade: { x: 200, y: 250, label: "Home Theater Facade" },
    tv: { x: 500, y: 150, label: `TV: ${tv ? "ON" : "OFF"}` },
    sound: { x: 500, y: 250, label: `Amp: ${sound ? "ON" : "OFF"}` },
    lights: { x: 500, y: 350, label: `Lights: ${lights ? "ON" : "DIM"}` },
  };

  return (
    <DemoShell
      title="Home Theater Facade"
      description="Client interacts with the simple Facade, which manages the complex subsystem."
      onReset={() => {
        setStatus("OFF");
        setTv(false);
        setSound(false);
        setLights(true);
      }}
    >
      <div className="relative h-[400px] flex flex-col">
        <SvgCanvas className="flex-1">
          <Edge id="e1" start={nodes.facade} end={nodes.tv} animated={status === "MOVIE_MODE"} />
          <Edge id="e2" start={nodes.facade} end={nodes.sound} animated={status === "MOVIE_MODE"} />
          <Edge
            id="e3"
            start={nodes.facade}
            end={nodes.lights}
            animated={status === "MOVIE_MODE"}
          />

          <Node
            id="facade"
            type="source"
            {...nodes.facade}
            onClick={toggleMovieMode}
            selected={status === "MOVIE_MODE"}
            className="fill-purple-100 stroke-purple-600 text-purple-900"
          />

          <Node
            id="tv"
            type="target"
            {...nodes.tv}
            selected={tv}
            className={
              tv
                ? "fill-blue-100 stroke-blue-600 text-blue-900 shadow-[0_0_20px_rgba(59,130,246,0.5)]"
                : "opacity-30 grayscale"
            }
          />
          <Node
            id="sound"
            type="target"
            {...nodes.sound}
            selected={sound}
            className={
              sound
                ? "fill-blue-100 stroke-blue-600 text-blue-900 shadow-[0_0_20px_rgba(59,130,246,0.5)]"
                : "opacity-30 grayscale"
            }
          />
          <Node
            id="lights"
            type="target"
            {...nodes.lights}
            selected={!lights}
            className={
              !lights
                ? "fill-slate-900 stroke-slate-500 text-slate-500"
                : "fill-amber-100 stroke-amber-400 text-amber-900 shadow-[0_0_20px_rgba(245,158,11,0.3)]"
            }
          />

          {/* Broadcast Animation */}
          {status === "MOVIE_MODE" && (
            <motion.circle
              cx={nodes.facade.x}
              cy={nodes.facade.y}
              r={50}
              className="stroke-purple-400 fill-none stroke-[2px] opacity-50 pointer-events-none"
              initial={{ scale: 1, opacity: 0.5 }}
              animate={{ scale: 3, opacity: 0 }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          )}
        </SvgCanvas>

        <div className="absolute top-4 left-4 pointer-events-auto">
          <button
            type="button"
            onClick={toggleMovieMode}
            className={`px-6 py-3 rounded-full shadow-xl font-bold transition-all flex items-center gap-2 border-2 ${status === "OFF" ? "bg-purple-600 text-white border-purple-600 hover:bg-purple-700" : "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-900"}`}
          >
            {status === "OFF" ? (
              <>
                <span>🎬</span> Start Movie Mode
              </>
            ) : (
              <>
                <span>⏹</span> Shutdown System
              </>
            )}
          </button>
        </div>
      </div>
    </DemoShell>
  );
};
