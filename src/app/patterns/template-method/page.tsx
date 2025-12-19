import React from "react";
import { Metadata } from "next";
import { TemplateMethodDemo } from "@/components/features/template-method/TemplateMethodDemo";
import { CodeTabs } from "@/components/shared/CodeTabs";
import { patterns } from "@/lib/registry";
import { prosConsData } from "@/lib/pattern-content";
import { PatternHeader } from "@/components/shared/pattern-layout/PatternHeader";
import { PatternSection } from "@/components/shared/pattern-layout/PatternSection";
import { ProsConsList } from "@/components/shared/pattern-layout/ProsConsList";

export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "Template Method Pattern",
  description: "Learn the Template Method Pattern.",
};
const pattern = patterns.find((p) => p.slug === "template-method");
const content = prosConsData["template-method"];

export default function TemplateMethodPage() {
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
          Imagine you are creating a data mining application that analyzes corporate documents.
          Users feed the app documents in various formats (PDF, DOC, CSV), and it tries to extract
          meaningful data from these docs in a uniform format.
        </p>
        <p>
          All three classes have a lot of similar code. The code for processing various data formats
          is entirely different, but the code for data processing and analysis is almost identical.
          Wouldn&apos;t it be great to get rid of the code duplication?
        </p>
      </PatternSection>

      <PatternSection title="The Solution">
        <p>
          The <strong>Template Method pattern</strong> suggests that you break down an algorithm
          into a series of steps, turn these steps into methods, and put a series of calls to these
          methods inside a single <em>template method</em>.
        </p>
        <p>
          The steps may be <code>abstract</code>, or have some default implementation. Subclasses
          can override some or all steps, but cannot change the structure of the algorithm itself.
        </p>
      </PatternSection>

      <PatternSection title="Interactive Playground">
        <TemplateMethodDemo />
      </PatternSection>

      <PatternSection title="Implementation Details">
        <CodeTabs
          tabs={[
            {
              id: "ts",
              label: "Example",
              language: "typescript",
              code: `abstract class DataMiner {
  // The Template Method
  public mine(path: string) {
    const file = this.openFile(path);
    const rawData = this.extractData(file);
    const data = this.parseData(rawData);
    this.closeFile(file);
  }

  // Abstract steps to be implemented by subclasses
  abstract openFile(path: string): File;
  abstract extractData(file: File): RawData;
  abstract parseData(data: RawData): Data;

  // Hook with default implementation
  closeFile(file: File) {
     console.log("Closing file");
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
