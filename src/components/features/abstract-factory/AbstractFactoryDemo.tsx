"use client";

import React, { useState } from "react";
import { SvgCanvas } from "@/components/shared/demo-framework/SvgCanvas";
import { Node } from "@/components/shared/demo-framework/Node";
import { DemoShell } from "@/components/shared/DemoShell";
import { motion } from "framer-motion";

export const AbstractFactoryDemo = () => {
    const [theme, setTheme] = useState<"LIGHT" | "DARK">("LIGHT");

    const nodes = {
        factory: { x: 400, y: 150, label: `${theme} Factory` },
        btn: { x: 250, y: 350, label: "Button" },
        chk: { x: 550, y: 350, label: "Checkbox" },
    };

    const styles = {
        LIGHT: { bg: "bg-white", text: "text-slate-900", border: "border-slate-300" },
        DARK: { bg: "bg-slate-800", text: "text-white", border: "border-slate-600" },
    };

    const currentStyle = styles[theme];

    return (
        <DemoShell title="Theme Factory" description="Switching the Factory changes the style of ALL products created by it.">
            <div className="relative h-[500px] flex flex-col">
                <SvgCanvas className="flex-1">
                    <Node id="factory" type="source" {...nodes.factory} selected={true} />

                    <foreignObject x={nodes.btn.x - 50} y={nodes.btn.y - 25} width={100} height={50}>
                        <motion.button
                            layout
                            className={`w-full h-full rounded shadow font-bold ${currentStyle.bg} ${currentStyle.text} border ${currentStyle.border}`}
                        >
                            Click Me
                        </motion.button>
                    </foreignObject>

                    <foreignObject x={nodes.chk.x - 50} y={nodes.chk.y - 25} width={100} height={50}>
                        <motion.div
                            layout
                            className={`w-full h-full rounded shadow flex items-center justify-center gap-2 ${currentStyle.bg} ${currentStyle.text} border ${currentStyle.border}`}
                        >
                            <input type="checkbox" checked readOnly className="accent-blue-500" />
                            <span className="text-sm font-bold">Check</span>
                        </motion.div>
                    </foreignObject>

                    <div className="absolute top-4 left-4 flex gap-2">
                        <button onClick={() => setTheme("LIGHT")} className="bg-white text-slate-800 px-4 py-2 rounded shadow font-bold">Light Theme</button>
                        <button onClick={() => setTheme("DARK")} className="bg-slate-900 text-white px-4 py-2 rounded shadow font-bold">Dark Theme</button>
                    </div>
                </SvgCanvas>
            </div>
        </DemoShell>
    );
};
