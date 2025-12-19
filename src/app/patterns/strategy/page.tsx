import React from "react";
import { Metadata } from "next";
import { StrategyDemo } from "@/components/features/strategy/StrategyDemo";
import { CodeTabs } from "@/components/shared/CodeTabs";
import { patterns } from "@/lib/registry";
import { prosConsData } from "@/lib/pattern-content";
import { PatternHeader } from "@/components/shared/pattern-layout/PatternHeader";
import { PatternSection } from "@/components/shared/pattern-layout/PatternSection";
import { ProsConsList } from "@/components/shared/pattern-layout/ProsConsList";

export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "Strategy Pattern",
  description: "Learn the Strategy Pattern.",
};
const pattern = patterns.find((p) => p.slug === "strategy");
const content = prosConsData["strategy"];

export default function StrategyPage() {
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
          One day you decided to create a navigation app for casual travelers. The app was built
          around a beautiful map which helped users orient themselves in a city.
        </p>
        <p>
          One of the most requested features was automatic route planning. A user should be able to
          enter an address and see the fastest route to that destination. But what about walking vs
          driving vs public transport? Each requires a different algorithm.
        </p>
        <p>
          Adding every new routing algorithm to the main <code>Navigator</code> class bloats it and
          creates merge conflicts.
        </p>
      </PatternSection>

      <PatternSection title="The Solution">
        <p>
          The <strong>Strategy pattern</strong> suggests that you take a class that does something
          specific in a lot of different ways and extract all of these algorithms into separate
          classes called <em>strategies</em>.
        </p>
        <p>
          The original class, called <em>context</em>, must have a field for storing a reference to
          one of the strategies. The context delegates the work to a linked strategy object instead
          of executing it on its own.
        </p>
      </PatternSection>

      <PatternSection title="Interactive Playground">
        <StrategyDemo />
      </PatternSection>

      <PatternSection title="Implementation Details">
        <CodeTabs
          tabs={[
            {
              id: "ts",
              label: "Example",
              language: "typescript",
              code: `interface Strategy {
  execute(a: number, b: number): number;
}

class ConcreteStrategyAdd implements Strategy {
  execute(a: number, b: number) { return a + b; }
}

class ConcreteStrategyMultiply implements Strategy {
  execute(a: number, b: number) { return a * b; }
}

class Context {
  private strategy: Strategy;

  constructor(strategy: Strategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy: Strategy) {
    this.strategy = strategy;
  }

  executeStrategy(a: number, b: number) {
    return this.strategy.execute(a, b);
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
