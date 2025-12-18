"use client";

import React, { useState } from "react";
import { SvgCanvas } from "@/components/shared/demo-framework/SvgCanvas";
import { Node } from "@/components/shared/demo-framework/Node";
import { Edge } from "@/components/shared/demo-framework/Edge";
import { DemoShell } from "@/components/shared/DemoShell";

export const CompositeDemo = () => {
  const [size, setSize] = useState<{ root: number; f1: number; f2: number }>({
    root: 0,
    f1: 10,
    f2: 20,
  });

  // Simple tree structure visualization
  const nodes = {
    root: { x: 400, y: 100, label: `Root (${size.f1 + size.f2}KB)` },
    folderA: { x: 200, y: 250, label: "Folder A" },
    file1: { x: 150, y: 400, label: `File 1 (${size.f1}KB)` },
    file2: { x: 250, y: 400, label: `File 2 (${size.f2}KB)` },
  };

  return (
    <DemoShell
      title="File System Composite"
      description="The Root folder calculates total size by asking its children, recursively."
    >
      <div className="relative h-[500px] flex flex-col">
        <SvgCanvas className="flex-1">
          <Edge id="e1" start={nodes.root} end={nodes.folderA} />
          <Edge id="e2" start={nodes.folderA} end={nodes.file1} />
          <Edge id="e3" start={nodes.folderA} end={nodes.file2} />

          <Node id="root" type="source" {...nodes.root} selected={true} />
          <Node id="folderA" type="generic" {...nodes.folderA} />
          <Node
            id="file1"
            type="target"
            {...nodes.file1}
            onClick={() => setSize((s) => ({ ...s, f1: s.f1 + 5 }))}
          />
          <Node
            id="file2"
            type="target"
            {...nodes.file2}
            onClick={() => setSize((s) => ({ ...s, f2: s.f2 + 5 }))}
          />

          <div className="absolute top-4 left-4 text-xs text-slate-500">
            Click files to increase their size. Watch Root update automatically.
          </div>
        </SvgCanvas>
      </div>
    </DemoShell>
  );
};
