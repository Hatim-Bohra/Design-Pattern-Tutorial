"use client";

import React, { useState, useEffect } from "react";
import { SvgCanvas } from "@/components/shared/demo-framework/SvgCanvas";
import { Node } from "@/components/shared/demo-framework/Node";
import { Edge } from "@/components/shared/demo-framework/Edge";
import { DemoShell } from "@/components/shared/DemoShell";
import { motion, AnimatePresence } from "framer-motion";

type FlightStatus = "Flying" | "Landing" | "Landed" | "Waiting";

export const MediatorDemo = () => {
  // Mediator State
  const [runwayFree, setRunwayFree] = useState(true);
  const [logs, setLogs] = useState<string[]>([]);

  // Colleague States
  const [p1Status, setP1Status] = useState<FlightStatus>("Flying");
  const [p2Status, setP2Status] = useState<FlightStatus>("Flying");

  // Animation States
  const [activePacket, setActivePacket] = useState<{
    from: string;
    to: string;
    color: string;
  } | null>(null);

  const addLog = (msg: string) => setLogs((prev) => [msg, ...prev].slice(0, 3));

  const requestLanding = (planeId: "P1" | "P2") => {
    if (activePacket) return; // Prevent spamming during animation

    const planeName = planeId === "P1" ? "Flight 101" : "Flight 202";
    const isSelfLanded = planeId === "P1" ? p1Status === "Landed" : p2Status === "Landed";

    // 1. Send Request to Tower
    setActivePacket({
      from: planeId,
      to: "Tower",
      color: planeId === "P1" ? "#3b82f6" : "#a855f7",
    });
    addLog(`${planeName}: Requesting landing...`);

    setTimeout(() => {
      // 2. Tower Logic (Mediator)
      if (isSelfLanded) {
        // Taking off
        setRunwayFree(true);
        planeId === "P1" ? setP1Status("Flying") : setP2Status("Flying");

        // Broadcast Clearance
        setActivePacket({ from: "Tower", to: "All", color: "#22c55e" });
        addLog(`Tower: ${planeName} departed. Runway is FREE.`);
      } else {
        // Trying to land
        if (runwayFree) {
          setRunwayFree(false);
          planeId === "P1" ? setP1Status("Landed") : setP2Status("Landed");

          // Broadcast Block
          setActivePacket({ from: "Tower", to: "All", color: "#22c55e" }); // Green for success msg
          addLog(`Tower: Granted ${planeName}. Others must HOLD.`);
        } else {
          planeId === "P1" ? setP1Status("Waiting") : setP2Status("Waiting");

          // Broadcast Reject
          setActivePacket({ from: "Tower", to: planeId, color: "#ef4444" });
          addLog(`Tower: Negative ${planeName}. Runway BUSY.`);
        }
      }

      // Clear animation
      setTimeout(() => setActivePacket(null), 1000);
    }, 1000);
  };

  const nodes = {
    tower: { x: 400, y: 300, label: runwayFree ? "Tower (Runway Free)" : "Tower (BUSY)" },
    p1: { x: 200, y: 150, label: `Flight 101 (${p1Status})` },
    p2: { x: 600, y: 150, label: `Flight 202 (${p2Status})` },
  };

  return (
    <DemoShell
      title="Air Traffic Control"
      description="Planes communicate status only to the Tower. The Tower mediates who can land."
      onReset={() => {
        setRunwayFree(true);
        setP1Status("Flying");
        setP2Status("Flying");
        setLogs([]);
        setActivePacket(null);
      }}
    >
      <div className="relative h-[500px] flex flex-col">
        <SvgCanvas className="flex-1">
          <Edge
            id="e1"
            start={nodes.p1}
            end={nodes.tower}
            animated={
              activePacket?.from === "P1" || activePacket?.to === "All" || activePacket?.to === "P1"
            }
            color={activePacket?.color}
          />
          <Edge
            id="e2"
            start={nodes.p2}
            end={nodes.tower}
            animated={
              activePacket?.from === "P2" || activePacket?.to === "All" || activePacket?.to === "P2"
            }
            color={activePacket?.color}
          />

          <Node
            id="tower"
            type="source"
            {...nodes.tower}
            selected={!runwayFree}
            className={
              runwayFree
                ? "fill-slate-900 stroke-slate-700 text-slate-100"
                : "fill-red-900 stroke-red-500 text-red-100"
            }
          />

          <Node
            id="p1"
            type="target"
            {...nodes.p1}
            onClick={() => requestLanding("P1")}
            selected={p1Status === "Landed"}
            className={
              p1Status === "Landed"
                ? "fill-green-100 stroke-green-600"
                : p1Status === "Waiting"
                  ? "fill-amber-100 stroke-amber-500"
                  : "fill-blue-50 stroke-blue-500"
            }
          />

          <Node
            id="p2"
            type="target"
            {...nodes.p2}
            onClick={() => requestLanding("P2")}
            selected={p2Status === "Landed"}
            className={
              p2Status === "Landed"
                ? "fill-green-100 stroke-green-600"
                : p2Status === "Waiting"
                  ? "fill-amber-100 stroke-amber-500"
                  : "fill-purple-50 stroke-purple-500"
            }
          />

          {/* Packets Animation */}
          <AnimatePresence>
            {activePacket && (
              <>
                {/* From Source */}
                {activePacket.from !== "Tower" && (
                  <motion.circle
                    key="packet-up"
                    r={6}
                    fill={activePacket.color}
                    initial={{
                      cx: nodes[activePacket.from.toLowerCase() as "p1" | "p2"].x,
                      cy: nodes[activePacket.from.toLowerCase() as "p1" | "p2"].y,
                    }}
                    animate={{ cx: nodes.tower.x, cy: nodes.tower.y }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                  />
                )}

                {/* Broadcast Down */}
                {activePacket.from === "Tower" && (
                  <>
                    {(activePacket.to === "All" || activePacket.to === "P1") && (
                      <motion.circle
                        key="packet-down-1"
                        r={6}
                        fill={activePacket.color}
                        initial={{ cx: nodes.tower.x, cy: nodes.tower.y }}
                        animate={{ cx: nodes.p1.x, cy: nodes.p1.y }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                      />
                    )}
                    {(activePacket.to === "All" || activePacket.to === "P2") && (
                      <motion.circle
                        key="packet-down-2"
                        r={6}
                        fill={activePacket.color}
                        initial={{ cx: nodes.tower.x, cy: nodes.tower.y }}
                        animate={{ cx: nodes.p2.x, cy: nodes.p2.y }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                      />
                    )}
                  </>
                )}
              </>
            )}
          </AnimatePresence>
        </SvgCanvas>

        {/* Log Console */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-full max-w-lg px-4 pointer-events-none">
          <div className="bg-slate-900/90 text-green-400 p-4 rounded-xl shadow-2xl border border-slate-700 font-mono text-xs overflow-hidden flex flex-col-reverse gap-1 min-h-[100px]">
            {logs.map((L, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
                <span className="text-slate-500 opacity-50 mr-2">
                  {new Date().toLocaleTimeString()}
                </span>
                {L}
              </motion.div>
            ))}
            {logs.length === 0 && (
              <span className="text-slate-600 italic">Waiting for communications...</span>
            )}
          </div>
        </div>

        <div className="absolute top-4 left-4 text-xs font-bold text-slate-500 bg-white/80 p-2 rounded backdrop-blur-sm shadow border border-slate-100 pointer-events-none">
          Click a Plane to request Landing / Takeoff.
        </div>
      </div>
    </DemoShell>
  );
};
