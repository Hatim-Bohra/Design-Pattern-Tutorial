"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { clsx } from "clsx";

interface SvgCanvasProps {
  children: React.ReactNode;
  className?: string;
  gridSize?: number;
}

export const SvgCanvas: React.FC<SvgCanvasProps> = ({ children, className, gridSize = 20 }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [isDragging, setIsDragging] = useState(false);

  // Simple pan implementation
  const handlePointerDown = (e: React.PointerEvent) => {
    // Only drag if clicking background (not a node)
    if ((e.target as Element).tagName === "svg" || (e.target as Element).id === "grid-bg") {
      setIsDragging(true);
      (e.target as Element).setPointerCapture(e.pointerId);
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (isDragging) {
      setPan((prev) => ({ x: prev.x + e.movementX, y: prev.y + e.movementY }));
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    (e.target as Element).releasePointerCapture(e.pointerId);
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (e.ctrlKey) {
      e.preventDefault(); // Prevent browser zoom
      const scaleAmount = -e.deltaY * 0.001;
      setZoom((prev) => Math.min(Math.max(0.5, prev + scaleAmount), 3));
    }
  };

  return (
    <div
      ref={containerRef}
      className={clsx(
        "relative w-full h-[600px] overflow-hidden bg-slate-50 border rounded-xl shadow-inner select-none cursor-grab active:cursor-grabbing",
        className
      )}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onWheel={handleWheel}
      style={{ touchAction: "none" }}
    >
      <motion.svg
        className="w-full h-full"
        viewBox="0 0 1000 600"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <pattern id="grid" width={gridSize} height={gridSize} patternUnits="userSpaceOnUse">
            <path
              d={`M ${gridSize} 0 L 0 0 0 ${gridSize}`}
              fill="none"
              stroke="rgba(0,0,0,0.05)"
              strokeWidth="1"
            />
          </pattern>
        </defs>

        <motion.g
          initial={false}
          animate={{ x: pan.x, y: pan.y, scale: zoom }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {/* Infinite Grid Background */}
          <rect id="grid-bg" x={-5000} y={-5000} width={10000} height={10000} fill="url(#grid)" />

          {children}
        </motion.g>
      </motion.svg>

      <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur p-2 rounded shadow text-xs font-mono">
        Zoom: {(zoom * 100).toFixed(0)}%
      </div>
    </div>
  );
};
