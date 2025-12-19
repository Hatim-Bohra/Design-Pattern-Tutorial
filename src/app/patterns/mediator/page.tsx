import React from "react";
import { Metadata } from "next";
import { MediatorDemo } from "@/components/features/mediator/MediatorDemo";
import { CodeTabs } from "@/components/shared/CodeTabs";
import { patterns } from "@/lib/registry";
import { prosConsData } from "@/lib/pattern-content";
import { PatternHeader } from "@/components/shared/pattern-layout/PatternHeader";
import { PatternSection } from "@/components/shared/pattern-layout/PatternSection";
import { ProsConsList } from "@/components/shared/pattern-layout/ProsConsList";

export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "Mediator Pattern",
  description: "Learn the Mediator Pattern.",
};
const pattern = patterns.find((p) => p.slug === "mediator");
const content = prosConsData["mediator"];

export default function MediatorPage() {
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
          Say you have a dialog for creating and editing customer profiles. It consists of various
          form controls such as text fields, checkboxes, buttons, etc.
        </p>
        <p>
          Some of the form elements may interact with others. For instance, selecting the &quot;I
          have a dog&quot; checkbox may reveal a hidden text field for entering the dog&apos;s name.
          Another button might have to validate values of all fields before submitting.
        </p>
        <p>
          If you implement this logic directly inside the code of the form elements (classes), you
          make them much harder to reuse.
        </p>
      </PatternSection>

      <PatternSection title="The Solution">
        <p>
          The <strong>Mediator pattern</strong> suggests that you should cease all direct
          communication between the components which you want to make independent. Instead, these
          components must collaborate indirectly, by calling a special mediator object that
          redirects the calls to appropriate components.
        </p>
      </PatternSection>

      <PatternSection title="Interactive Playground">
        <MediatorDemo />
      </PatternSection>

      <PatternSection title="Implementation Details">
        <CodeTabs
          tabs={[
            {
              id: "ts",
              label: "Example",
              language: "typescript",
              code: `interface Mediator {
  notify(sender: object, event: string): void;
}

class ConcreteMediator implements Mediator {
  private component1: Component1;
  private component2: Component2;

  constructor(c1: Component1, c2: Component2) {
    this.component1 = c1;
    this.component1.setMediator(this);
    this.component2 = c2;
    this.component2.setMediator(this);
  }

  public notify(sender: object, event: string): void {
    if (event === "A") {
      this.component2.doC();
    }
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
