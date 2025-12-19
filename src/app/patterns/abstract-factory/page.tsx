import React from "react";
import { Metadata } from "next";
import { AbstractFactoryDemo } from "@/components/features/abstract-factory/AbstractFactoryDemo";
import { CodeTabs } from "@/components/shared/CodeTabs";
import { patterns } from "@/lib/registry";
import { prosConsData } from "@/lib/pattern-content";
import { PatternHeader } from "@/components/shared/pattern-layout/PatternHeader";
import { PatternSection } from "@/components/shared/pattern-layout/PatternSection";
import { ProsConsList } from "@/components/shared/pattern-layout/ProsConsList";

export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "Abstract Factory Pattern",
  description: "Learn the Abstract Factory Pattern.",
};
const pattern = patterns.find((p) => p.slug === "abstract-factory");
const content = prosConsData["abstract-factory"];

export default function AbstractFactoryPage() {
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
          Imagine you are building a furniture shop simulator. Your code creates furniture objects
          like <code>Chair</code>, <code>Sofa</code>, and <code>CoffeeTable</code>.
        </p>
        <p>
          However, your furniture comes in families: <strong>Modern</strong>,{" "}
          <strong>Victorian</strong>, and <strong>ArtDeco</strong>. You need a way to create
          individual furniture objects so that they match other objects of the same family. A
          customer doesn&apos;t want a Modern Sofa with Victorian Chairs.
        </p>
        <p>
          Also, you don&apos;t want to change existing code when adding new products or families of
          products.
        </p>
      </PatternSection>

      <PatternSection title="The Solution">
        <p>
          The <strong>Abstract Factory</strong> pattern suggests that you explicitly declare
          interfaces for each distinct product of the product family (e.g., Chair, Sofa). Then you
          can make all variants of products follow those interfaces.
        </p>
        <p>
          Next, you declare the <em>Abstract Factory</em>—an interface with a list of creation
          methods for all products that are part of the product family (e.g.,{" "}
          <code>createChair</code>, <code>createSofa</code>). These methods return abstract product
          types.
        </p>
      </PatternSection>

      <PatternSection title="Interactive Playground">
        <AbstractFactoryDemo />
      </PatternSection>

      <PatternSection title="Implementation Details">
        <CodeTabs
          tabs={[
            {
              id: "ts",
              label: "Example",
              language: "typescript",
              code: `interface GUIFactory {
  createButton(): Button;
  createCheckbox(): Checkbox;
}

class WinFactory implements GUIFactory {
  createButton(): Button { return new WinButton(); }
  createCheckbox(): Checkbox { return new WinCheckbox(); }
}

class MacFactory implements GUIFactory {
  createButton(): Button { return new MacButton(); }
  createCheckbox(): Checkbox { return new MacCheckbox(); }
}

// Client code works with factories and products only through abstract types
function createUI(factory: GUIFactory) {
  const button = factory.createButton();
  const checkbox = factory.createCheckbox();
}
`,
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
