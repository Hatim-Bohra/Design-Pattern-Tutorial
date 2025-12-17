"use client";

import React from "react";
import { motion } from "framer-motion";

interface EdgeProps {
    id: string;
    start: { x: number; y: number };
    end: { x: number; y: number };
    animated?: boolean;
    label?: string;
    color?: string;
}

export const Edge: React.FC<EdgeProps> = ({ start, end, animated, label, color = "#cbd5e1" }) => {
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
            />

            {/* Animated Flow Packet */}
            {animated && (
                <motion.circle
                    r={6}
                    fill={color}
                    initial={{ offsetDistance: "0%" }}
                    animate={{ offsetDistance: "100%" }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    style={{
                        offsetPath: `path("M ${start.x} ${start.y} L ${end.x} ${end.y}")`
                    }}
                />
            )}
        </g>
    );
};
