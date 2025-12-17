"use client";

import React, { useEffect, useRef } from "react";
import { clsx } from "clsx";

export interface LogEntry {
    id: string;
    timestamp: Date;
    message: string;
    type: "info" | "success" | "error" | "warning";
}

interface LoggerPanelProps {
    logs: LogEntry[];
    className?: string;
}

export const LoggerPanel: React.FC<LoggerPanelProps> = ({ logs, className }) => {
    const endRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [logs]);

    return (
        <div className={clsx("flex flex-col bg-slate-900 text-slate-200 font-mono text-xs rounded-lg overflow-hidden border border-slate-700 h-[200px]", className)}>
            <div className="bg-slate-950 px-3 py-1 border-b border-slate-800 text-[10px] uppercase tracking-wider text-slate-500 font-bold flex justify-between items-center">
                <span>System Logs</span>
                <span className={clsx("w-2 h-2 rounded-full", logs.length > 0 ? "bg-green-500 animate-pulse" : "bg-slate-600")} />
            </div>
            <div className="flex-1 overflow-y-auto p-2 space-y-1">
                {logs.length === 0 && (
                    <div className="text-slate-600 italic text-center mt-10">System Ready...</div>
                )}
                {logs.map((log) => (
                    <div key={log.id} className="flex gap-2 animate-in fade-in slide-in-from-left-2 duration-300">
                        <span className="text-slate-500 select-none">[{log.timestamp.toLocaleTimeString().split(" ")[0]}]</span>
                        <span className={clsx(
                            log.type === "error" && "text-red-400",
                            log.type === "success" && "text-green-400",
                            log.type === "warning" && "text-amber-400",
                            log.type === "info" && "text-blue-300"
                        )}>
                            {log.message}
                        </span>
                    </div>
                ))}
                <div ref={endRef} />
            </div>
        </div>
    );
};
