import React from "react";
import { Metadata } from "next";
import { ChainDemo } from "@/components/features/chain-of-responsibility/ChainDemo";
import { CodeTabs } from "@/components/shared/CodeTabs";
import { patterns } from "@/lib/registry";
import { prosConsData } from "@/lib/pattern-content";
import { PatternHeader } from "@/components/shared/pattern-layout/PatternHeader";
import { PatternSection } from "@/components/shared/pattern-layout/PatternSection";
import { ProsConsList } from "@/components/shared/pattern-layout/ProsConsList";

export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "Chain of Responsibility Pattern",
  description: "Learn the Chain of Responsibility Pattern.",
};
const pattern = patterns.find((p) => p.slug === "chain-of-responsibility");
const content = prosConsData["chain-of-responsibility"];

export default function ChainPage() {
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
          Imagine that you are building an online ordering system. You want to restrict access to
          the system so only authenticated users can create orders. Also, users who have
          administrative permissions must have full access to all orders.
        </p>
        <p>
          After a while, you realized that these checks must be performed sequentially. The
          application attempts to authenticate a user to the system whenever it receives a request
          that contains the user&apos;s credentials. However, if those credentials aren&apos;t
          correct and authentication fails, there&apos;s no reason to proceed with any other checks.
        </p>
      </PatternSection>

      <PatternSection title="The Solution">
        <p>
          The <strong>Chain of Responsibility</strong> relies on transforming particular behaviors
          into stand-alone objects called <em>handlers</em>. In our case, each check should be
          extracted to its own class with a single method that performs the check.
        </p>
        <p>
          The request travels along the chain until all handlers have had a chance to process it.
          Here&apos;s the best part: a handler can decide not to pass the request further down the
          chain and effectively stop any further processing.
        </p>
      </PatternSection>

      <PatternSection title="Interactive Playground">
        <ChainDemo />
      </PatternSection>

      <PatternSection title="Implementation Details">
        <CodeTabs
          tabs={[
            {
              id: "ts",
              label: "Example",
              language: "typescript",
              code: `interface Handler {
  setNext(handler: Handler): Handler;
  handle(request: string): string | null;
}

abstract class AbstractHandler implements Handler {
  private nextHandler: Handler | null = null;

  public setNext(handler: Handler): Handler {
    this.nextHandler = handler;
    return handler;
  }

  public handle(request: string): string | null {
    if (this.nextHandler) {
      return this.nextHandler.handle(request);
    }
    return null;
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
