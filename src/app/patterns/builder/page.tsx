import React from "react";
import { Metadata } from "next";
import { BuilderDemo } from "@/components/features/builder/BuilderDemo";
import { CodeTabs } from "@/components/shared/CodeTabs";
import { patterns } from "@/lib/registry";
import { prosConsData } from "@/lib/pattern-content";
import { PatternHeader } from "@/components/shared/pattern-layout/PatternHeader";
import { PatternSection } from "@/components/shared/pattern-layout/PatternSection";
import { ProsConsList } from "@/components/shared/pattern-layout/ProsConsList";

export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "Builder Pattern",
  description: "Learn the Builder Pattern.",
};
const pattern = patterns.find((p) => p.slug === "builder");
const content = prosConsData["builder"];

export default function BuilderPage() {
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
          Imagine a complex object that requires laborious, step-by-step initialization of many
          fields and nested objects. Such initialization code is usually buried inside a monstrous
          constructor with lots of parameters.
        </p>
        <p>
          For example, think about creating a <code>House</code> object. To build a simple house,
          you need to construct four walls, a floor, and a roof. But what if you want a bigger house
          with a pool and fancy statues? You&apos;d end up with a constructor like{" "}
          <code>
            new House(true, true, false, true, 4, &quot;swimming pool&quot;, &quot;gold&quot;)
          </code>
          .
        </p>
      </PatternSection>

      <PatternSection title="The Solution">
        <p>
          The <strong>Builder pattern</strong> suggests that you extract the object construction
          code out of its own class and move it to separate objects called <em>builders</em>.
        </p>
        <p>
          The pattern organizes object construction into a set of steps (<code>buildWalls</code>,{" "}
          <code>buildDoor</code>, etc.). To create an object, you execute a series of these steps on
          a builder object.
        </p>
      </PatternSection>

      <PatternSection title="Interactive Playground">
        <BuilderDemo />
      </PatternSection>

      <PatternSection title="Implementation Details">
        <CodeTabs
          tabs={[
            {
              id: "ts",
              label: "QueryBuilder.ts",
              language: "typescript",
              code: `class QueryBuilder {
  private query: Partial<Query> = {};

  select(fields: string): this {
    this.query.select = fields;
    return this;
  }

  from(table: string): this {
    this.query.table = table;
    return this;
  }

  where(condition: string): this {
    this.query.where = condition;
    return this;
  }

  build(): string {
    return \`SELECT \${this.query.select} FROM \${this.query.table} WHERE \${this.query.where}\`;
  }
}`,
            },
            {
              id: "usage",
              label: "usage.ts",
              language: "typescript",
              code: `const query = new QueryBuilder()
  .select("id, name")
  .from("users")
  .where("active = true")
  .build();

console.log(query);`,
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
