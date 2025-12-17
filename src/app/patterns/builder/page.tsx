import React from "react";
import { Metadata } from "next";
import { BuilderDemo } from "@/components/features/builder/BuilderDemo";
import { CodeTabs } from "@/components/shared/CodeTabs";
import { patterns } from "@/lib/registry";

export const dynamic = "force-static";
export const metadata: Metadata = { title: "Builder Pattern", description: "Learn the Builder Pattern." };
const pattern = patterns.find((p) => p.slug === "builder");

export default function BuilderPage() {
    if (!pattern) return <div>Pattern not found</div>;

    return (
        <div className="max-w-4xl mx-auto px-6 py-12 space-y-16">
            <header className="space-y-4 border-b pb-8">
                <h1 className="text-4xl font-extrabold text-slate-900">{pattern.title}</h1>
                <p className="text-xl text-slate-600">{pattern.description}</p>
            </header>

            <section>
                <h2 className="text-2xl font-bold mb-4">Interactive Demo</h2>
                <BuilderDemo />
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-bold text-slate-900">Implementation Details</h2>
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
}`
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

console.log(query);`
                        }
                    ]}
                />
            </section>
        </div>
    );
}
