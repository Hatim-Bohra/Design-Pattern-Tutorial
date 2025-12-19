import React from "react";
import { Metadata } from "next";
import { CompositeDemo } from "@/components/features/composite/CompositeDemo";
import { CodeTabs } from "@/components/shared/CodeTabs";
import { patterns } from "@/lib/registry";
import { prosConsData } from "@/lib/pattern-content";
import { PatternHeader } from "@/components/shared/pattern-layout/PatternHeader";
import { PatternSection } from "@/components/shared/pattern-layout/PatternSection";
import { ProsConsList } from "@/components/shared/pattern-layout/ProsConsList";

export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "Composite Pattern",
  description: "Learn the Composite Pattern.",
};
const pattern = patterns.find((p) => p.slug === "composite");
const content = prosConsData["composite"];

export default function CompositePage() {
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
          Using the Composite pattern makes sense only when the core model of your app can be
          represented as a tree.
        </p>
        <p>
          For example, imagine that you have two types of objects: <code>Products</code> and{" "}
          <code>Boxes</code>. A Box can contain several Products as well as a number of smaller
          Boxes. These little Boxes can also hold some Products or even smaller Boxes, and so on.
        </p>
      </PatternSection>

      <PatternSection title="The Solution">
        <p>
          The <strong>Composite pattern</strong> suggests that you work with Products and Boxes
          through a common interface which declares a method for calculating the total price.
        </p>
        <p>
          For a product, it&apos;s simply the price. For a box, it goes through each item the box
          contains, asks its price and then returns a total for this box. If one of these items were
          a smaller box, that box would also start going over its contents and so on, until the
          prices of all inner components are calculated.
        </p>
      </PatternSection>

      <PatternSection title="Interactive Playground">
        <CompositeDemo />
      </PatternSection>

      <PatternSection title="Implementation Details">
        <CodeTabs
          tabs={[
            {
              id: "ts",
              label: "Example",
              language: "typescript",
              code: `interface Component {
  getWeight(): number;
}

class Product implements Component {
  constructor(private weight: number) {}
  getWeight() { return this.weight; }
}

class Box implements Component {
  private children: Component[] = [];

  add(c: Component) { this.children.push(c); }
  
  getWeight() {
    return this.children.reduce((sum, c) => sum + c.getWeight(), 0);
  }
}`,
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
