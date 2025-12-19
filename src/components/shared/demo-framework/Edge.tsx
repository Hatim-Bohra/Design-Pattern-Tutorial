"use client";

import React from "react";
import { motion } from "framer-motion";
import { clsx } from "clsx";

interface EdgeProps {
  id: string;
  start: { x: number; y: number };
  end: { x: number; y: number };
  animated?: boolean;
  dashed?: boolean;
  label?: string;
  color?: string;
  className?: string; // Support for custom classes
  labelClassName?: string; // Support for label styling
}

export const Edge: React.FC<EdgeProps> = ({
  start,
  end,
  animated,
  dashed,
  label,
  color = "#cbd5e1",
  className,
  labelClassName,
}) => {
  const midX = (start.x + end.x) / 2;
  const midY = (start.y + end.y) / 2;

  return (
    <g>
      {/* Base Line */}
      <line
        x1={start.x}
        y1={start.y}
        x2={end.x}
        y2={end.y}
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray={dashed ? "8,8" : undefined}
        className={className}
      />

      {/* Label */}
      {label && (
        <g>
          <rect
            x={midX - 25}
            y={midY - 12}
            width={50}
            height={24}
            rx={4}
            fill="rgba(255,255,255,0.8)"
          />
          <text
            x={midX}
            y={midY}
            dy={5}
            textAnchor="middle"
            className={clsx(
              "text-[10px] font-bold fill-slate-500 uppercase tracking-widest pointer-events-none select-none",
              labelClassName
            )}
          >
            {label}
          </text>
        </g>
      )}

      {/* Animated Flow Packet */}
      {animated && (
        <motion.circle
          r={6}
          fill={color}
          initial={false}
          animate={{
            offsetDistance: "100%",
            cx: 0,
            cy: 0,
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            offsetPath: `path("M ${start.x} ${start.y} L ${end.x} ${end.y}")`,
          }}
        />
      )}
    </g>
  );
};
