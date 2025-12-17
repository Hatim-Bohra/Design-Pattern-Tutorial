"use client";

import React, { useState } from "react";
import { clsx } from "clsx";
import { Code2, Play, TestTube } from "lucide-react";

interface Tab {
    id: string;
    label: string;
    code: string;
    language: "typescript" | "tsx";
    icon?: React.ReactNode;
}

interface CodeTabsProps {
    tabs: Tab[];
}

export const CodeTabs: React.FC<CodeTabsProps> = ({ tabs }) => {
    const [activeTabId, setActiveTabId] = useState(tabs[0].id);
    const activeTab = tabs.find((t) => t.id === activeTabId);

    return (
        <div className="w-full border border-slate-200 rounded-xl overflow-hidden bg-slate-950 shadow-sm my-8">
            {/* Tab Header */}
            <div className="flex items-center bg-slate-900 border-b border-slate-800">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTabId(tab.id)}
                        className={clsx(
                            "flex items-center gap-2 px-4 py-3 text-xs font-medium transition-colors border-r border-slate-800",
                            activeTabId === tab.id
                                ? "bg-slate-800 text-white"
                                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                        )}
                    >
                        {tab.icon}
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Code Area */}
            <div className="p-4 overflow-x-auto">
                <pre className="text-sm font-mono text-slate-300 leading-relaxed">
                    <code>{activeTab?.code}</code>
                </pre>
            </div>
        </div>
    );
};
