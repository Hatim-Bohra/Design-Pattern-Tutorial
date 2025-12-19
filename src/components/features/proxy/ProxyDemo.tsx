"use client";

import React, { useState } from "react";
import { SvgCanvas } from "@/components/shared/demo-framework/SvgCanvas";
import { Node } from "@/components/shared/demo-framework/Node";
import { Edge } from "@/components/shared/demo-framework/Edge";
import { DemoShell } from "@/components/shared/DemoShell";
import { motion } from "framer-motion";

export const ProxyDemo = () => {
  const [cache, setCache] = useState<string | null>(null);
  const [status, setStatus] = useState("idle");

  const request = () => {
    setStatus("requesting");
    setTimeout(() => {
      if (cache) {
        setStatus("cached");
      } else {
        setStatus("fetching");
        setTimeout(() => {
          setCache("Data");
          setStatus("done");
        }, 1000);
      }
    }, 500);
  };

  const nodes = {
    client: { x: 150, y: 250, label: "Client" },
    proxy: { x: 400, y: 250, label: `Proxy${cache ? " (Cached)" : ""}` },
    server: { x: 650, y: 250, label: "Real Server" },
  };

  return (
    <DemoShell
      title="Caching Proxy"
      description="First request hits the server. Subsequent requests are intercepted by the Proxy."
      onReset={() => {
        setCache(null);
        setStatus("idle");
      }}
    >
      <div className="relative h-[400px] flex flex-col">
        <SvgCanvas className="flex-1">
          <Edge id="e1" start={nodes.client} end={nodes.proxy} animated={status === "requesting"} />
          <Edge
            id="e2"
            start={nodes.proxy}
            end={nodes.server}
            animated={status === "fetching"}
            color={status === "cached" ? "#cbd5e1" : "#3b82f6"}
          />

          <Node
            id="client"
            type="generic"
            {...nodes.client}
            onClick={request}
            className="fill-slate-100 stroke-slate-500 text-slate-900"
          />
          <Node
            id="proxy"
            type="adapter"
            {...nodes.proxy}
            selected={status !== "idle"}
            className="fill-purple-50 stroke-purple-500 text-purple-900"
          />
          <Node
            id="server"
            type="source"
            {...nodes.server}
            className="fill-blue-50 stroke-blue-500 text-blue-900"
          />

          {/* Server Fetch Animation */}
          {status === "fetching" && (
            <foreignObject x={0} y={0} width={1000} height={600} className="pointer-events-none">
              <motion.div
                className="absolute bg-blue-500 text-white text-[10px] px-2 py-1 rounded-full shadow-lg font-bold flex items-center gap-1 z-10"
                initial={{ x: nodes.proxy.x, y: nodes.proxy.y, opacity: 1 }}
                animate={{ x: nodes.server.x, y: nodes.server.y, opacity: 0 }}
                transition={{ duration: 0.8 }}
              >
                <span>Fetch</span> ➔
              </motion.div>
            </foreignObject>
          )}

          {status === "done" && (
            <foreignObject x={0} y={0} width={1000} height={600} className="pointer-events-none">
              <motion.div
                className="absolute bg-green-500 text-white text-[10px] px-2 py-1 rounded-full shadow-lg font-bold flex items-center gap-1 z-10"
                initial={{ x: nodes.server.x, y: nodes.server.y, scale: 0.5 }}
                animate={{ x: nodes.client.x, y: nodes.client.y, scale: 1 }}
                transition={{ duration: 0.8 }}
              >
                <span>Data</span> ✓
              </motion.div>
            </foreignObject>
          )}

          {status === "cached" && (
            <foreignObject x={0} y={0} width={1000} height={600} className="pointer-events-none">
              <motion.div
                className="absolute bg-purple-500 text-white text-[10px] px-2 py-1 rounded-full shadow-lg font-bold flex items-center gap-1 z-10"
                initial={{ x: nodes.proxy.x, y: nodes.proxy.y, scale: 0.5 }}
                animate={{ x: nodes.client.x, y: nodes.client.y, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <span>Cache Info</span> ⚡
              </motion.div>
            </foreignObject>
          )}
        </SvgCanvas>

        <div className="absolute top-4 left-4 pointer-events-auto">
          <button
            type="button"
            onClick={request}
            disabled={status !== "idle"}
            className="bg-blue-600 active:scale-95 transition-transform text-white px-6 py-2 rounded-full shadow-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 text-sm flex items-center gap-2"
          >
            {status === "idle"
              ? "Make Request"
              : status === "cached"
                ? "Returning Cache..."
                : "Fetching..."}
          </button>
        </div>
      </div>
    </DemoShell>
  );
};
