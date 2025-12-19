import React from "react";
import { Metadata } from "next";
import { PrototypeDemo } from "@/components/features/prototype/PrototypeDemo";
import { CodeTabs } from "@/components/shared/CodeTabs";
import { patterns } from "@/lib/registry";
import { prosConsData } from "@/lib/pattern-content";
import { PatternHeader } from "@/components/shared/pattern-layout/PatternHeader";
import { PatternSection } from "@/components/shared/pattern-layout/PatternSection";
import { ProsConsList } from "@/components/shared/pattern-layout/ProsConsList";

export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "Prototype Pattern",
  description: "Learn the Prototype Pattern.",
};
const pattern = patterns.find((p) => p.slug === "prototype");
const content = prosConsData["prototype"];

export default function PrototypePage() {
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
          You have an object, and you want to create an exact copy of it. How would you do it? You
          have to create a new object of the same class and manually copy all fields from the
          original object to the new one.
        </p>
        <p>
          But there&apos;s a catch: not all objects can be copied that way because some of the
          object&apos;s fields may be private and not visible from outside the object itself.
        </p>
      </PatternSection>

      <PatternSection title="The Solution">
        <p>
          The <strong>Prototype pattern</strong> delegates the cloning process to the actual objects
          that are being cloned. The pattern declares a common interface for all objects that
          support cloning. usually containing a single method named <code>clone</code>.
        </p>
        <p>
          An object that supports cloning is called a <em>prototype</em>. When your code needs an
          object of the same class, it just asks the prototype to clone itself.
        </p>
      </PatternSection>

      <PatternSection title="Interactive Playground">
        <PrototypeDemo />
      </PatternSection>

      <PatternSection title="Implementation Details">
        <CodeTabs
          tabs={[
            {
              id: "ts",
              label: "Example",
              language: "typescript",
              code: `interface Prototype {
  clone(): Prototype;
}

class Robot implements Prototype {
  public x: number;
  public y: number;

  constructor(source?: Robot) {
    if (source) {
       this.x = source.x;
       this.y = source.y;
    }
  }

  clone(): Robot {
    return new Robot(this);
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
