"use client";

import React, { useState } from "react";
import { SvgCanvas } from "@/components/shared/demo-framework/SvgCanvas";
import { Node } from "@/components/shared/demo-framework/Node";
import { Edge } from "@/components/shared/demo-framework/Edge";
import { DemoShell } from "@/components/shared/DemoShell";

export const FacadeDemo = () => {
    const [status, setStatus] = useState<"OFF" | "MOVIE_MODE">("OFF");

    // Subsystem States
    const [tv, setTv] = useState(false);
    const [sound, setSound] = useState(false);
    const [lights, setLights] = useState(true);

    const toggleMovieMode = () => {
        if (status === "OFF") {
            setStatus("MOVIE_MODE");
            // Facade Logic: Orchestrate subsystems
            setTv(true);
            setSound(true);
            setLights(false);
        } else {
            setStatus("OFF");
            setTv(false);
            setSound(false);
            setLights(true);
        }
    };

    const nodes = {
        facade: { x: 200, y: 250, label: "Home Theater Facade" },
        tv: { x: 500, y: 150, label: `TV: ${tv ? "ON" : "OFF"}` },
        sound: { x: 500, y: 250, label: `Amp: ${sound ? "ON" : "OFF"}` },
        lights: { x: 500, y: 350, label: `Lights: ${lights ? "ON" : "DIM"}` },
    };

    return (
        <DemoShell title="Home Theater Facade" description="Client interacts with the simple Facade, which manages the complex subsystem." onReset={() => { setStatus("OFF"); setTv(false); setSound(false); setLights(true); }}>
            <div className="relative h-[400px] flex flex-col">
                <SvgCanvas className="flex-1">
                    <Edge id="e1" start={nodes.facade} end={nodes.tv} animated={status === "MOVIE_MODE"} />
                    <Edge id="e2" start={nodes.facade} end={nodes.sound} animated={status === "MOVIE_MODE"} />
                    <Edge id="e3" start={nodes.facade} end={nodes.lights} animated={status === "MOVIE_MODE"} />

                    <Node id="facade" type="source" {...nodes.facade} onClick={toggleMovieMode} selected={status === "MOVIE_MODE"} />

                    <Node id="tv" type="target" {...nodes.tv} selected={tv} />
                    <Node id="sound" type="target" {...nodes.sound} selected={sound} />
                    <Node id="lights" type="target" {...nodes.lights} selected={!lights} />

                    <div className="absolute top-4 left-4">
                        <button onClick={toggleMovieMode} className="bg-red-600 text-white px-6 py-3 rounded-full shadow-lg font-bold hover:scale-105 transition-transform">
                            {status === "OFF" ? "Watch Movie" : "Shutdown"}
                        </button>
                    </div>
                </SvgCanvas>
            </div>
        </DemoShell>
    );
};
