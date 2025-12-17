"use client";

import React, { useState } from "react";
import { SvgCanvas } from "@/components/shared/demo-framework/SvgCanvas";
import { Node } from "@/components/shared/demo-framework/Node";
import { Edge } from "@/components/shared/demo-framework/Edge";
import { DemoShell } from "@/components/shared/DemoShell";

interface GameState {
    level: number;
    health: number;
}

export const MementoDemo = () => {
    const [current, setCurrent] = useState<GameState>({ level: 1, health: 100 });
    const [saves, setSaves] = useState<GameState[]>([]);

    const play = () => {
        setCurrent(prev => ({ level: prev.level + 1, health: prev.health - 10 }));
    };

    const saveGame = () => {
        setSaves([...saves, { ...current }]); // Creating Memento (Snapshot)
    };

    const loadGame = (idx: number) => {
        setCurrent({ ...saves[idx] });
    };

    return (
        <DemoShell title="Game Save System" description="Capture internal state (Memento) and restore it later without exposing private details.">
            <div className="relative h-[400px] flex flex-col">
                <SvgCanvas className="flex-1">
                    <Node id="game" type="source" x={200} y={200} label={`Lv: ${current.level} | HP: ${current.health}`} selected={true} />

                    {saves.map((save, i) => (
                        <React.Fragment key={i}>
                            <Edge id={`edge-${i}`} start={{ x: 200, y: 200 }} end={{ x: 500, y: 100 + (i * 80) }} dashed label="restore" />
                            <Node
                                id={`save-${i}`}
                                type="target"
                                x={500}
                                y={100 + (i * 80)}
                                label={`Save ${i + 1}: Lv ${save.level}`}
                                onClick={() => loadGame(i)}
                            />
                        </React.Fragment>
                    ))}

                    <div className="absolute top-4 left-4 flex gap-4">
                        <button onClick={play} className="bg-blue-600 text-white px-4 py-2 rounded shadow font-bold">Play Level (+1)</button>
                        <button onClick={saveGame} className="bg-green-600 text-white px-4 py-2 rounded shadow font-bold">Save Game</button>
                    </div>
                </SvgCanvas>
            </div>
        </DemoShell>
    );
};
