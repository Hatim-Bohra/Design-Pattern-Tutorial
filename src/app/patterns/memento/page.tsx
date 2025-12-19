import React from "react";
import { Metadata } from "next";
import { MementoDemo } from "@/components/features/memento/MementoDemo";
import { CodeTabs } from "@/components/shared/CodeTabs";
import { patterns } from "@/lib/registry";
import { prosConsData } from "@/lib/pattern-content";
import { PatternHeader } from "@/components/shared/pattern-layout/PatternHeader";
import { PatternSection } from "@/components/shared/pattern-layout/PatternSection";
import { ProsConsList } from "@/components/shared/pattern-layout/ProsConsList";

export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "Memento Pattern",
  description: "Learn the Memento Pattern.",
};
const pattern = patterns.find((p) => p.slug === "memento");
const content = prosConsData["memento"];

export default function MementoPage() {
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
          Imagine that you are creating a text editor app. In addition to simple text editing, your
          editor can format text, insert inline images, etc.
        </p>
        <p>
          At some point, you decided to let users undo any operations carried out on the text. To do
          this, you need to save the state of the editor before executing any operation. But objects
          typically have private fields that cannot be accessed from outside.
        </p>
      </PatternSection>

      <PatternSection title="The Solution">
        <p>
          The <strong>Memento pattern</strong> delegates creating the state snapshots to the actual
          owner of that state, the <em>originator</em> object. Hence, instead of other objects
          trying to copy the editor&apos;s state from the &quot;outside,&quot; the editor class
          itself can make the snapshot.
        </p>
        <p>
          The pattern suggests storing the copy of the object&apos;s state in a special object
          called <em>Memento</em>. The contents of the memento are not accessible to any other
          object except the one that produced it.
        </p>
      </PatternSection>

      <PatternSection title="Interactive Playground">
        <MementoDemo />
      </PatternSection>

      <PatternSection title="Implementation Details">
        <CodeTabs
          tabs={[
            {
              id: "ts",
              label: "Example",
              language: "typescript",
              code: `class Memento {
  constructor(private state: string) {}
  getState() { return this.state; }
}

class Originator {
  private state: string;

  save(): Memento {
    return new Memento(this.state);
  }

  restore(m: Memento) {
    this.state = m.getState();
  }
}

class Caretaker {
  private history: Memento[] = [];
  
  undo() {
    const m = this.history.pop();
    if (m) wrapper.restore(m);
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
