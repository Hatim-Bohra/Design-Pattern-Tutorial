"use client";

import React, { useState } from "react";
import { SvgCanvas } from "@/components/shared/demo-framework/SvgCanvas";
import { Node } from "@/components/shared/demo-framework/Node";
import { Edge } from "@/components/shared/demo-framework/Edge";
import { DemoShell } from "@/components/shared/DemoShell";

export const TemplateMethodDemo = () => {
    const [minerType, setMinerType] = useState<"PDF" | "CSV">("PDF");
    const [step, setStep] = useState(0);

    const steps = [
        { id: "open", label: "Open File" },
        { id: "extract", label: "Extract Data" },
        { id: "parse", label: `Parse ${minerType} (Custom)`, custom: true },
        { id: "analyze", label: "Analyze Data" },
        { id: "close", label: "Close File" },
    ];

    const run = () => {
        setStep(0);
        let current = 0;
        const interval = setInterval(() => {
            current++;
            setStep(current);
            if (current >= steps.length) clearInterval(interval);
        }, 800);
    };

    return (
        <DemoShell title="Data Miner ETL" description="The algorithm structure (steps) is fixed. Only the 'Parse' step is overridden by subclasses." onReset={() => setStep(0)}>
            <div className="relative h-[500px] flex flex-col">
                <SvgCanvas className="flex-1">
                    {steps.map((s, i) => (
                        <React.Fragment key={s.id}>
                            {i > 0 && <Edge id={`e-${i}`} start={{ x: 400, y: 50 + (i - 1) * 80 }} end={{ x: 400, y: 50 + i * 80 }} animated={step > i} />}
                            <Node
                                id={s.id}
                                type={s.custom ? "source" : "generic"}
                                x={400}
                                y={50 + i * 80}
                                label={s.label}
                                selected={step === i + 1}
                            />
                        </React.Fragment>
                    ))}

                    <div className="absolute top-4 left-4 flex gap-4 bg-white p-2 rounded shadow">
                        <div className="flex flex-col gap-1">
                            <span className="text-xs font-bold text-slate-500">Select Miner:</span>
                            <div className="flex gap-2">
                                <button onClick={() => setMinerType("PDF")} className={`px-2 py-1 text-xs rounded ${minerType === "PDF" ? "bg-red-600 text-white" : "bg-slate-200"}`}>PDF Miner</button>
                                <button onClick={() => setMinerType("CSV")} className={`px-2 py-1 text-xs rounded ${minerType === "CSV" ? "bg-green-600 text-white" : "bg-slate-200"}`}>CSV Miner</button>
                            </div>
                        </div>
                        <div className="w-px bg-slate-300"></div>
                        <button onClick={run} className="bg-slate-900 text-white px-4 py-2 rounded font-bold shadow hover:scale-105">
                            Run Algorithm
                        </button>
                    </div>
                </SvgCanvas>
            </div>
        </DemoShell>
    );
};
