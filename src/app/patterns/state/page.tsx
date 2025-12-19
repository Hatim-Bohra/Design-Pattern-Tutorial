import React from "react";
import { Metadata } from "next";
import { StateDemo } from "@/components/features/state/StateDemo";
import { CodeTabs } from "@/components/shared/CodeTabs";
import { patterns } from "@/lib/registry";
import { prosConsData } from "@/lib/pattern-content";
import { PatternHeader } from "@/components/shared/pattern-layout/PatternHeader";
import { PatternSection } from "@/components/shared/pattern-layout/PatternSection";
import { ProsConsList } from "@/components/shared/pattern-layout/ProsConsList";

export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "State Pattern",
  description: "Learn the State Pattern.",
};
const pattern = patterns.find((p) => p.slug === "state");
const content = prosConsData["state"];

export default function StatePage() {
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
          The <strong>State pattern</strong> is closely related to the concept of a Force Finite
          State Machine.
        </p>
        <p>
          The main idea is that, at any given moment, there&apos;s a finite number of{" "}
          <em>states</em> which a program can be in. Within any unique state, the program behaves
          differently, and the program can be switched from one state to another instantly.
        </p>
        <p>
          A common problem arises when you implement this with a massive set of <code>if-else</code>{" "}
          or <code>switch</code> statements. As logic complexity grows, this becomes a maintenance
          nightmare.
        </p>
      </PatternSection>

      <PatternSection title="The Solution">
        <p>
          The State pattern suggests that you create new classes for all possible states of an
          object and extract all state-specific behaviors into these classes.
        </p>
        <p>
          Instead of implementing all behaviors on its own, the original object, called{" "}
          <em>context</em>, stores a reference to one of the state objects that represents its
          current state, and delegates all the state-related work to that object.
        </p>
      </PatternSection>

      <PatternSection title="Interactive Playground">
        <StateDemo />
      </PatternSection>

      <PatternSection title="Implementation Details">
        <CodeTabs
          tabs={[
            {
              id: "ts",
              label: "Example",
              language: "typescript",
              code: `interface State {
  handle(context: Context): void;
}

class Context {
  private state: State;

  constructor(state: State) {
    this.transitionTo(state);
  }

  transitionTo(state: State) {
    this.state = state;
  }

  request() {
    this.state.handle(this);
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
