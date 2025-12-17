"use client";

import React, { useState } from "react";
import { SvgCanvas } from "@/components/shared/demo-framework/SvgCanvas";
import { Node } from "@/components/shared/demo-framework/Node";
import { Edge } from "@/components/shared/demo-framework/Edge";
import { DemoShell } from "@/components/shared/DemoShell";

interface ShapeProps {
    id: string;
    type: "CIRCLE" | "RECT";
    color: string;
    x: number;
    y: number;
}

export const PrototypeDemo = () => {
    const [shapes, setShapes] = useState<ShapeProps[]>([
        { id: "orig", type: "CIRCLE", color: "red", x: 200, y: 250 }
    ]);
    const [selectedId, setSelectedId] = useState<string>("orig");

    const cloneShape = () => {
        const original = shapes.find(s => s.id === selectedId);
        if (!original) return;

        const newShape: ShapeProps = {
            ...original,
            id: Math.random().toString(),
            x: original.x + 100,
            y: original.y + (Math.random() * 50 - 25), // Slight offset
            color: original.color === "red" ? "blue" : "red" // Just to differentiate visually if needed, but logic is cloning
        };
        setShapes([...shapes, newShape]);
        setSelectedId(newShape.id);
    };

    return (
        <DemoShell title="Shape Cloner" description="Create new objects by copying existing ones instead of building from scratch." onReset={() => setShapes([{ id: "orig", type: "CIRCLE", color: "red", x: 200, y: 250 }])}>
            <div className="relative h-[400px] flex flex-col">
                <SvgCanvas className="flex-1">
                    {shapes.map((s, i) => (
                        <React.Fragment key={s.id}>
                            {i > 0 && <Edge id={`clone-${i}`} start={{ x: shapes[i - 1].x, y: shapes[i - 1].y }} end={{ x: s.x, y: s.y }} label="clone()" dashed />}
                            <Node
                                id={s.id}
                                type={i === 0 ? "source" : "target"}
                                x={s.x}
                                y={s.y}
                                label={s.type}
                                selected={selectedId === s.id}
                                onClick={() => setSelectedId(s.id)}
                            />
                        </React.Fragment>
                    ))}

                    <div className="absolute top-4 left-4">
                        <button onClick={cloneShape} className="bg-slate-900 text-white px-4 py-2 rounded shadow">
                            Clone Selected
                        </button>
                    </div>
                </SvgCanvas>
            </div>
        </DemoShell>
    );
};
