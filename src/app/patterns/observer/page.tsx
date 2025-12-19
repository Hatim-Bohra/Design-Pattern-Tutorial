import React from "react";
import { Metadata } from "next";
import { ObserverDemo } from "@/components/features/observer/ObserverDemo";
import { CodeTabs } from "@/components/shared/CodeTabs";
import { patterns } from "@/lib/registry";
import { prosConsData } from "@/lib/pattern-content";
import { PatternHeader } from "@/components/shared/pattern-layout/PatternHeader";
import { PatternSection } from "@/components/shared/pattern-layout/PatternSection";
import { ProsConsList } from "@/components/shared/pattern-layout/ProsConsList";

export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "Observer Pattern",
  description: "Learn the Observer Pattern.",
};
const pattern = patterns.find((p) => p.slug === "observer");
const content = prosConsData["observer"];

export default function ObserverPage() {
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
          Imagine that you have two types of objects: a <code>Customer</code> and a{" "}
          <code>Store</code>. The customer is very interested in a particular brand of product (say,
          it&apos;s a new model of the iPhone) which should become available in the store soon.
        </p>
        <p>
          The customer could visit the store every day (pooling) to check product availability. But
          most of these trips would be pointless. Or, the store could send tons of emails (spam) to
          all customers each time a new product arrives.
        </p>
      </PatternSection>

      <PatternSection title="The Solution">
        <p>
          The <strong>Observer pattern</strong> suggests that you add a subscription mechanism to
          the provider class so unrelated objects can subscribe to or unsubscribe from a stream of
          events coming from that publisher.
        </p>
      </PatternSection>

      <PatternSection title="Interactive Playground">
        <ObserverDemo />
      </PatternSection>

      <PatternSection title="Implementation Details">
        <CodeTabs
          tabs={[
            {
              id: "ts",
              label: "Observable.ts",
              language: "typescript",
              code: `interface Observer {
  update(data: any): void;
}

class Subject {
  private observers: Observer[] = [];

  subscribe(o: Observer) {
    this.observers.push(o);
  }

  notify(data: any) {
    this.observers.forEach(o => o.update(data));
  }
}`,
            },
            {
              id: "usage",
              label: "usage.ts",
              language: "typescript",
              code: `const news = new Subject();
news.subscribe({ update: (d) => console.log("Reader 1 read:", d) });
news.subscribe({ update: (d) => console.log("Reader 2 read:", d) });

news.notify("Breaking News!");`,
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
