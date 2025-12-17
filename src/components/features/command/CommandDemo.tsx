"use client";

import React, { useState } from "react";
import { SvgCanvas } from "@/components/shared/demo-framework/SvgCanvas";
import { Node } from "@/components/shared/demo-framework/Node";
import { DemoShell } from "@/components/shared/DemoShell";

interface Command {
    execute: () => void;
    undo: () => void;
    label: string;
}

export const CommandDemo = () => {
    const [text, setText] = useState("");
    const [history, setHistory] = useState<Command[]>([]);
    const [future, setFuture] = useState<Command[]>([]);

    const executeCommand = (cmd: Command) => {
        cmd.execute();
        setHistory([...history, cmd]);
        setFuture([]); // Clear redo stack on new action
    };

    const undo = () => {
        if (history.length === 0) return;
        const lastCmd = history[history.length - 1];
        lastCmd.undo();
        setHistory(history.slice(0, -1));
        setFuture([lastCmd, ...future]);
    };

    const redo = () => {
        if (future.length === 0) return;
        const nextCmd = future[0];
        nextCmd.execute();
        setFuture(future.slice(1));
        setHistory([...history, nextCmd]);
    };

    const createAppendCommand = (char: string): Command => ({
        label: `Type '${char}'`,
        execute: () => setText(prev => prev + char),
        undo: () => setText(prev => prev.slice(0, -1))
    });

    return (
        <DemoShell title="Undo/Redo Editor" description="Commands are objects that can be stored, executed, and undone." onReset={() => { setText(""); setHistory([]); setFuture([]); }}>
            <div className="relative h-[400px] flex flex-col">
                <SvgCanvas className="flex-1">
                    <foreignObject x={250} y={50} width={300} height={100}>
                        <div className="bg-white border rounded p-4 text-2xl font-mono min-h-full flex items-center justify-center shadow-inner">
                            {text || <span className="text-slate-300">Start typing...</span>}
                        </div>
                    </foreignObject>

                    {/* Stacks Visualization */}
                    <Node id="history" type="source" x={200} y={250} label={`Undo Stack (${history.length})`} />
                    <Node id="future" type="target" x={600} y={250} label={`Redo Stack (${future.length})`} />

                    {/* Controls */}
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4">
                        <div className="flex gap-2">
                            {["A", "B", "C"].map(char => (
                                <button key={char} onClick={() => executeCommand(createAppendCommand(char))} className="w-12 h-12 rounded bg-slate-900 text-white font-bold shadow hover:scale-105 transition-transform">
                                    {char}
                                </button>
                            ))}
                        </div>
                        <div className="w-px bg-slate-300 mx-2"></div>
                        <button onClick={undo} disabled={history.length === 0} className="px-4 py-2 bg-yellow-500 text-white rounded font-bold disabled:opacity-50">Undo</button>
                        <button onClick={redo} disabled={future.length === 0} className="px-4 py-2 bg-green-500 text-white rounded font-bold disabled:opacity-50">Redo</button>
                    </div>
                </SvgCanvas>
            </div>
        </DemoShell>
    );
};
