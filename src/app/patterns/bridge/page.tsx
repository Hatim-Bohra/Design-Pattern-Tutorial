import React from "react";
import { Metadata } from "next";
import { BridgeDemo } from "@/components/features/bridge/BridgeDemo";
import { CodeTabs } from "@/components/shared/CodeTabs";
import { patterns } from "@/lib/registry";
import { prosConsData } from "@/lib/pattern-content";
import { PatternHeader } from "@/components/shared/pattern-layout/PatternHeader";
import { PatternSection } from "@/components/shared/pattern-layout/PatternSection";
import { ProsConsList } from "@/components/shared/pattern-layout/ProsConsList";

export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "Bridge Pattern",
  description: "Learn the Bridge Pattern.",
};
const pattern = patterns.find((p) => p.slug === "bridge");
const content = prosConsData["bridge"];

export default function BridgePage() {
  if (!pattern) return <div>Pattern not found</div>;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">
      <PatternHeader
        title={pattern.title}
        description={pattern.description}
        category={pattern.category}
        tags={pattern.tags}
      />

      <PatternSection title="The Problem">
        <p>
          <strong>Abstractions</strong> and <strong>Implementations</strong> often get mixed up.
        </p>
        <p>
          Imagine you have a class <code>Shape</code> with subclasses <code>Circle</code> and{" "}
          <code>Square</code>. You want to extend this by adding colors <code>Red</code> and{" "}
          <code>Blue</code>. If you use inheritance, you end up with 4 classes:{" "}
          <code>RedCircle</code>, <code>BlueCircle</code>, <code>RedSquare</code>,{" "}
          <code>BlueSquare</code>. Adding a new shape (Triangle) and a new color (Green) would
          explode the number of classes.
        </p>
      </PatternSection>

      <PatternSection title="The Solution">
        <p>
          The <strong>Bridge pattern</strong> solves this by switching from inheritance to
          composition.
        </p>
        <p>
          You extract one of the dimensions into a separate class hierarchy, so that the original
          classes will reference an object of the new hierarchy, instead of having all of its state
          and behaviors in one class.
        </p>
      </PatternSection>

      <PatternSection title="Interactive Playground">
        <BridgeDemo />
      </PatternSection>

      <PatternSection title="Implementation Details">
        <CodeTabs
          tabs={[
            {
              id: "ts",
              label: "Example",
              language: "typescript",
              code: `// Abstraction
class RemoteControl {
  constructor(protected device: Device) {}

  togglePower() {
    if (this.device.isEnabled()) this.device.disable();
    else this.device.enable();
  }
}

// Implementation
interface Device {
  isEnabled(): boolean;
  enable(): void;
  disable(): void;
}

class TV implements Device { ... }
class Radio implements Device { ... }`,
            },
          ]}
        />
      </PatternSection>

      {content && (
        <PatternSection title="Pros & Cons">
          <ProsConsList pros={content.pros} cons={content.cons} />
        </PatternSection>
      )}
    </div>
  );
}
