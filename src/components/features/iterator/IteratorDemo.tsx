"use client";

import React, { useState } from "react";
import { SvgCanvas } from "@/components/shared/demo-framework/SvgCanvas";
import { Node } from "@/components/shared/demo-framework/Node";
import { Edge } from "@/components/shared/demo-framework/Edge";
import { DemoShell } from "@/components/shared/DemoShell";

export const IteratorDemo = () => {
    const songs = ["Song A", "Song B", "Song C", "Song D"];
    const [current, setCurrent] = useState(0);

    const next = () => {
        if (current < songs.length - 1) setCurrent(current + 1);
    };

    const prev = () => {
        if (current > 0) setCurrent(current - 1);
    };

    return (
        <DemoShell title="Playlist Iterator" description="Traverse elements one by one without needing to know if it's an Array, List, or Tree." onReset={() => setCurrent(0)}>
            <div className="relative h-[400px] flex flex-col">
                <SvgCanvas className="flex-1">
                    {songs.map((song, i) => (
                        <Node
                            key={i}
                            id={`s-${i}`}
                            type={i === current ? "source" : "generic"}
                            x={150 + (i * 150)}
                            y={250}
                            label={song}
                            selected={i === current}
                        />
                    ))}

                    {/* Visualizing the "Iterator" pointer */}
                    <foreignObject x={150 + (current * 150) - 20} y={320} width={40} height={40}>
                        <div className="text-center font-bold text-blue-500 text-xl">
                            ▲
                        </div>
                    </foreignObject>

                    <div className="absolute top-4 left-4 flex gap-4">
                        <button onClick={prev} disabled={current === 0} className="bg-slate-900 text-white px-4 py-2 rounded shadow disabled:opacity-50">Previous</button>
                        <button onClick={next} disabled={current === songs.length - 1} className="bg-slate-900 text-white px-4 py-2 rounded shadow disabled:opacity-50">Next</button>
                    </div>
                </SvgCanvas>
            </div>
        </DemoShell>
    );
};
