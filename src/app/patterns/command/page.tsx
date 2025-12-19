import React from "react";
import { Metadata } from "next";
import { CommandDemo } from "@/components/features/command/CommandDemo";
import { CodeTabs } from "@/components/shared/CodeTabs";
import { patterns } from "@/lib/registry";
import { prosConsData } from "@/lib/pattern-content";
import { PatternHeader } from "@/components/shared/pattern-layout/PatternHeader";
import { PatternSection } from "@/components/shared/pattern-layout/PatternSection";
import { ProsConsList } from "@/components/shared/pattern-layout/ProsConsList";

export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "Command Pattern",
  description: "Learn the Command Pattern.",
};
const pattern = patterns.find((p) => p.slug === "command");
const content = prosConsData["command"];

export default function CommandPage() {
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
          Imagine you are building a text-editor app. You create a toolbar with a bunch of buttons
          for various operations. You create a <code>Button</code> class that can be used for
          toolbar buttons, as well as for generic buttons in various dialogs.
        </p>
        <p>
          While all of these buttons look similar, they do different things. Where should you put
          the code for the various click handlers of these buttons? The simplest solution is to
          create tons of subclasses for each place where the button is used. This is bad.
        </p>
      </PatternSection>

      <PatternSection title="The Solution">
        <p>
          The <strong>Command pattern</strong> suggests that GUI objects shouldn&apos;t send these
          requests directly. Instead, you should extract all of the request details, such as the
          object being called, the name of the method and the list of arguments into a separate{" "}
          <em>command</em> class with a single method that triggers this request.
        </p>
      </PatternSection>

      <PatternSection title="Interactive Playground">
        <CommandDemo />
      </PatternSection>

      <PatternSection title="Implementation Details">
        <CodeTabs
          tabs={[
            {
              id: "ts",
              label: "Example",
              language: "typescript",
              code: `interface Command {
  execute(): void;
  undo(): void;
}

class CopyCommand implements Command {
  constructor(private editor: Editor) {}

  execute() {
    this.editor.copySelection();
  }

  undo() {
     // no-op
  }
}

class Button {
  constructor(private command: Command) {}

  click() {
    this.command.execute();
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
