"use client";

import React, { useState } from "react";
import { SvgCanvas } from "@/components/shared/demo-framework/SvgCanvas";
import { Node } from "@/components/shared/demo-framework/Node";
import { Edge } from "@/components/shared/demo-framework/Edge";
import { DemoShell } from "@/components/shared/DemoShell";

export const DecoratorDemo = () => {
    const [decorators, setDecorators] = useState<string[]>([]);

    const addDecorator = (type: string) => {
        setDecorators([...decorators, type]);
    };

    const nodes = [
        { id: "coffee", x: 400, y: 100, label: "Simple Coffee ($5)" },
        ...decorators.map((d, i) => ({
            id: `dec-${i}`,
            x: 400,
            y: 100 + ((i + 1) * 80),
            label: `${d} (+$1)`
        }))
    ];

    return (
        <DemoShell title="Coffee Decorator" description="Dynamically attach new behaviors (ingredients) to objects without changing their class." onReset={() => setDecorators([])}>
            <div className="relative h-[500px] flex flex-col">
                <SvgCanvas className="flex-1">
                    {nodes.map((n, i) => {
                        if (i === 0) return <Node key={n.id} {...n} type="source" />;
                        const prev = nodes[i - 1];
                        return (
                            <React.Fragment key={n.id}>
                                <Edge id={`e-${i}`} start={prev} end={n} label="wraps" />
                                <Node {...n} type="generic" />
                            </React.Fragment>
                        );
                    })}

                    <div className="absolute top-4 left-4 flex gap-2">
                        <button onClick={() => addDecorator("MilkDecorator")} className="bg-white text-slate-800 px-4 py-2 rounded shadow font-bold">+ Milk</button>
                        <button onClick={() => addDecorator("SugarDecorator")} className="bg-white text-slate-800 px-4 py-2 rounded shadow font-bold">+ Sugar</button>
                        <button onClick={() => addDecorator("WhipDecorator")} className="bg-white text-slate-800 px-4 py-2 rounded shadow font-bold">+ Whip</button>
                    </div>

                    <div className="absolute bottom-4 right-4 text-xl font-bold bg-white p-4 rounded shadow">
                        Total Cost: ${5 + decorators.length}
                    </div>
                </SvgCanvas>
            </div>
        </DemoShell>
    );
};
