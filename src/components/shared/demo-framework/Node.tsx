"use client";

import React from "react";
import { motion } from "framer-motion";
import { clsx } from "clsx";
import { Circle, Database, Laptop } from "lucide-react";

export type NodeType = "source" | "target" | "adapter" | "generic";

interface NodeProps {
  id: string;
  x: number;
  y: number;
  label: string;
  type: NodeType;
  selected?: boolean;
  className?: string; // Existing
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initial?: any; // New prop for animation override
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  animate?: any; // New prop
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  exit?: any; // New prop
  onDrag?: (id: string, x: number, y: number) => void;
  onClick?: (id: string) => void;
}

const icons = {
  source: Database,
  target: Laptop,
  adapter: Circle, // Placeholder, can be custom
  generic: Circle,
};

export const Node: React.FC<NodeProps> = ({
  id,
  x,
  y,
  label,
  type,
  selected,
  className,
  initial,
  animate,
  exit,
  onDrag,
  onClick,
}) => {
  const Icon = icons[type] || Circle;

  // Visual presets
  const styles = {
    source: "fill-amber-100 stroke-amber-500 text-amber-900",
    target: "fill-blue-100 stroke-blue-500 text-blue-900",
    adapter: "fill-purple-100 stroke-purple-500 text-purple-900",
    generic: "fill-gray-100 stroke-gray-500 text-gray-900",
  };

  return (
    <motion.g
      drag
      dragMomentum={false}
      initial={initial || { x, y, scale: 0 }}
      animate={animate || { x, y, scale: 1 }}
      exit={exit}
      onDragEnd={(_, info) => onDrag?.(id, x + info.offset.x, y + info.offset.y)}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick?.(id);
      }}
      className="cursor-pointer"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Node Body */}
      <circle
        r={40}
        className={clsx(
          "stroke-2 transition-colors",
          styles[type],
          selected && "stroke-[4px] stroke-black",
          className
        )}
      />

      {/* Icon */}
      <foreignObject x={-12} y={-12} width={24} height={24} className="pointer-events-none">
        <Icon className={clsx("w-full h-full", styles[type].split(" ").pop())} />
      </foreignObject>

      {/* Label relative to node */}
      <text
        y={60}
        textAnchor="middle"
        className="text-xs font-semibold fill-gray-600 select-none pointer-events-none"
      >
        {label}
      </text>
    </motion.g>
  );
};
