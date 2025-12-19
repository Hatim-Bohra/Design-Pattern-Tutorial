import React from "react";
import { Metadata } from "next";
import { FacadeDemo } from "@/components/features/facade/FacadeDemo";
import { CodeTabs } from "@/components/shared/CodeTabs";
import { patterns } from "@/lib/registry";
import { prosConsData } from "@/lib/pattern-content";
import { PatternHeader } from "@/components/shared/pattern-layout/PatternHeader";
import { PatternSection } from "@/components/shared/pattern-layout/PatternSection";
import { ProsConsList } from "@/components/shared/pattern-layout/ProsConsList";

export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "Facade Pattern",
  description: "Learn the Facade Pattern.",
};
const pattern = patterns.find((p) => p.slug === "facade");
const content = prosConsData["facade"];

export default function FacadePage() {
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
          Imagine that you must make your code work with a broad set of objects that belong to a
          sophisticated library or framework. typically, you would need to initialize all those
          objects, keep track of dependencies, execute methods in the correct order, and so on.
        </p>
        <p>
          As a result, the business logic of your classes would become tightly coupled to the
          implementation details of 3rd-party classes, making it hard to comprehend and maintain.
        </p>
      </PatternSection>

      <PatternSection title="The Solution">
        <p>
          A <strong>Facade</strong> is a class that provides a simple interface to a complex
          subsystem which contains lots of moving parts. A facade might provide limited
          functionality compared to working with the subsystem directly, but it includes only those
          features that clients really care about.
        </p>
      </PatternSection>

      <PatternSection title="Interactive Playground">
        <FacadeDemo />
      </PatternSection>

      <PatternSection title="Implementation Details">
        <CodeTabs
          tabs={[
            {
              id: "ts",
              label: "Example",
              language: "typescript",
              code: `class VideoConverter {
  convert(filename: string, format: string): File {
    const file = new VideoFile(filename);
    const sourceCodec = CodecFactory.extract(file);
    if (format == "mp4") {
        // complex logic hidden...
    }
    return new File(result);
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
