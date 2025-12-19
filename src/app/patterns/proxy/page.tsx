import React from "react";
import { Metadata } from "next";
import { ProxyDemo } from "@/components/features/proxy/ProxyDemo";
import { CodeTabs } from "@/components/shared/CodeTabs";
import { patterns } from "@/lib/registry";
import { prosConsData } from "@/lib/pattern-content";
import { PatternHeader } from "@/components/shared/pattern-layout/PatternHeader";
import { PatternSection } from "@/components/shared/pattern-layout/PatternSection";
import { ProsConsList } from "@/components/shared/pattern-layout/ProsConsList";

export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "Proxy Pattern",
  description: "Learn the Proxy Pattern.",
};
const pattern = patterns.find((p) => p.slug === "proxy");
const content = prosConsData["proxy"];

export default function ProxyPage() {
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
          Why would you want to control access to an object? Here is one example: you have a massive
          object that consumes a vast amount of system resources. You need it from time to time, but
          not always.
        </p>
        <p>
          You could implement lazy initialization: create this object only when it&apos;s actually
          needed. All the object&apos;s clients would need to execute some delayed initialization
          code. Unfortunately, this would clutter the code.
        </p>
      </PatternSection>

      <PatternSection title="The Solution">
        <p>
          The <strong>Proxy pattern</strong> suggests that you create a new proxy class with the
          same interface as an original service object. Then you update your app so that it passes
          the proxy object to all of the original object&apos;s clients. Upon receiving a request
          from a client, the proxy creates a real service object and calls it.
        </p>
      </PatternSection>

      <PatternSection title="Interactive Playground">
        <ProxyDemo />
      </PatternSection>

      <PatternSection title="Implementation Details">
        <CodeTabs
          tabs={[
            {
              id: "ts",
              label: "Example",
              language: "typescript",
              code: `interface YouTubeLib {
  getVideo(id: string): Video;
}

class YouTubeCacheProxy implements YouTubeLib {
  private cache: Record<string, Video> = {};

  constructor(private service: YouTubeService) {}

  getVideo(id: string): Video {
    if (!this.cache[id]) {
       this.cache[id] = this.service.getVideo(id);
    }
    return this.cache[id];
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
