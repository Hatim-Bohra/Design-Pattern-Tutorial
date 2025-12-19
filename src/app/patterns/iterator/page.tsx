import React from "react";
import { Metadata } from "next";
import { IteratorDemo } from "@/components/features/iterator/IteratorDemo";
import { CodeTabs } from "@/components/shared/CodeTabs";
import { patterns } from "@/lib/registry";
import { prosConsData } from "@/lib/pattern-content";
import { PatternHeader } from "@/components/shared/pattern-layout/PatternHeader";
import { PatternSection } from "@/components/shared/pattern-layout/PatternSection";
import { ProsConsList } from "@/components/shared/pattern-layout/ProsConsList";

export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "Iterator Pattern",
  description: "Learn the Iterator Pattern.",
};
const pattern = patterns.find((p) => p.slug === "iterator");
const content = prosConsData["iterator"];

export default function IteratorPage() {
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
          Collections are one of the most used data types in programming. A collection is just a
          container for a group of objects.
        </p>
        <p>
          Regardless of how the collection is structured (Array, Stack, Tree, Graph), users of it
          need a way to visit evey element to do something. You should provide a way to access
          elements without exposing the internal structure (which might change).
        </p>
      </PatternSection>

      <PatternSection title="The Solution">
        <p>
          The <strong>Iterator pattern</strong> suggests that you extract the traversal logic of a
          collection into a separate object called an <em>iterator</em>.
        </p>
        <p>
          In addition to implementing the algorithm itself, an iterator object encapsulates all of
          the traversal details, such as the current position and how many elements are left till
          the end.
        </p>
      </PatternSection>

      <PatternSection title="Interactive Playground">
        <IteratorDemo />
      </PatternSection>

      <PatternSection title="Implementation Details">
        <CodeTabs
          tabs={[
            {
              id: "ts",
              label: "Example",
              language: "typescript",
              code: `interface Iterator<T> {
  current(): T;
  next(): T;
  key(): number;
  valid(): boolean;
  rewind(): void;
}

class AlphabeticalOrderIterator implements Iterator<string> {
    // ... implementation logic maintaining current position
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
