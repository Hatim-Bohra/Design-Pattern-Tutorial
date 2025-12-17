"use client";

import React, { useState } from "react";
import { SvgCanvas } from "@/components/shared/demo-framework/SvgCanvas";
import { Node } from "@/components/shared/demo-framework/Node";
import { Edge } from "@/components/shared/demo-framework/Edge";
import { DemoShell } from "@/components/shared/DemoShell";

export const ProxyDemo = () => {
    const [cache, setCache] = useState<string | null>(null);
    const [status, setStatus] = useState("idle");

    const request = () => {
        setStatus("requesting");
        setTimeout(() => {
            if (cache) {
                setStatus("cached");
            } else {
                setStatus("fetching");
                setTimeout(() => {
                    setCache("Data");
                    setStatus("done");
                }, 1000);
            }
        }, 500);
    };

    const nodes = {
        client: { x: 150, y: 250, label: "Client" },
        proxy: { x: 400, y: 250, label: `Proxy${cache ? " (Cached)" : ""}` },
        server: { x: 650, y: 250, label: "Real Server" },
    };

    return (
        <DemoShell title="Caching Proxy" description="First request hits the server. Subsequent requests are intercepted by the Proxy." onReset={() => { setCache(null); setStatus("idle"); }}>
            <div className="relative h-[400px] flex flex-col">
                <SvgCanvas className="flex-1">
                    <Edge id="e1" start={nodes.client} end={nodes.proxy} animated={status === "requesting"} />
                    <Edge id="e2" start={nodes.proxy} end={nodes.server} animated={status === "fetching"} color={status === "cached" ? "#cbd5e1" : "#3b82f6"} />

                    <Node id="client" type="generic" {...nodes.client} onClick={request} />
                    <Node id="proxy" type="adapter" {...nodes.proxy} selected={status !== "idle"} />
                    <Node id="server" type="source" {...nodes.server} />

                    <div className="absolute top-4 left-4">
                        <button onClick={request} className="bg-blue-600 text-white px-4 py-2 rounded shadow">
                            Make Request
                        </button>
                    </div>
                </SvgCanvas>
            </div>
        </DemoShell>
    );
};
