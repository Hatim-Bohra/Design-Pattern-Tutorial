import React from "react";
import { Metadata } from "next";
import { DecoratorDemo } from "@/components/features/decorator/DecoratorDemo";
import { CodeTabs } from "@/components/shared/CodeTabs";
import { patterns } from "@/lib/registry";
import { prosConsData } from "@/lib/pattern-content";
import { PatternHeader } from "@/components/shared/pattern-layout/PatternHeader";
import { PatternSection } from "@/components/shared/pattern-layout/PatternSection";
import { ProsConsList } from "@/components/shared/pattern-layout/ProsConsList";

export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "Decorator Pattern",
  description: "Learn the Decorator Pattern.",
};
const pattern = patterns.find((p) => p.slug === "decorator");
const content = prosConsData["decorator"];

export default function DecoratorPage() {
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
          Imagine that you are working on a notification library. Initially, the class{" "}
          <code>Notifier</code> can only send emails.
        </p>
        <p>
          Later, clients request SMS, Slack, and Facebook notifications. You could use inheritance
          (e.g. <code>SMSNotifier</code>, <code>SlackNotifier</code>), but what if someone wants
          Email + SMS? Or SMS + Slack? The number of subclasses would explode (
          <code>EmailAndSMSNotifier</code>, etc.).
        </p>
      </PatternSection>

      <PatternSection title="The Solution">
        <p>
          The <strong>Decorator pattern</strong> relies on aggregation instead of inheritance. The
          pattern attaches additional behaviors to an object by placing these objects inside special
          wrapper objects that interact with the original object.
        </p>
        <p>
          A wrapper (decorator) implements the same interface as the wrapped object. The client
          treats the decorator just like the original object.
        </p>
      </PatternSection>

      <PatternSection title="Interactive Playground">
        <DecoratorDemo />
      </PatternSection>

      <PatternSection title="Implementation Details">
        <CodeTabs
          tabs={[
            {
              id: "ts",
              label: "Example",
              language: "typescript",
              code: `interface DataSource {
  writeData(data: string): void;
}

class FileDataSource implements DataSource {
  writeData(data: string) { console.log("Writing file: " + data); }
}

// Decorator Base
class DataSourceDecorator implements DataSource {
  constructor(protected wrappee: DataSource) {}
  writeData(data: string) { this.wrappee.writeData(data); }
}

// Concrete Decorator
class EncryptionDecorator extends DataSourceDecorator {
  writeData(data: string) {
    const encrypted = "AES(" + data + ")";
    super.writeData(encrypted);
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
