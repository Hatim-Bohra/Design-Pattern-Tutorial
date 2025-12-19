import React from "react";
import { Metadata } from "next";
import { FactoryMethodDemo } from "@/components/features/factory-method/FactoryMethodDemo";
import { CodeTabs } from "@/components/shared/CodeTabs";
import { patterns } from "@/lib/registry";
import { prosConsData } from "@/lib/pattern-content"; // Import content
import { ArrowRight, PackageOpen, Settings } from "lucide-react";
import { PatternHeader } from "@/components/shared/pattern-layout/PatternHeader";
import { PatternSection } from "@/components/shared/pattern-layout/PatternSection";
import { ProsConsList } from "@/components/shared/pattern-layout/ProsConsList";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Factory Method Pattern | Design Pattern Tutorial",
  description: "Learn how to decouple object creation code using the Factory Method.",
};

const pattern = patterns.find((p) => p.slug === "factory-method");
const content = prosConsData["factory-method"];

export default function FactoryMethodPage() {
  if (!pattern) return <div>Pattern not found</div>;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">
      <PatternHeader
        title={pattern.title}
        description={pattern.description}
        category={pattern.category}
        tags={pattern.tags}
      />

      {/* Hook */}
      <section className="flex justify-center py-8">
        <div className="flex items-center gap-8">
          <div className="flex flex-col items-center gap-2">
            <div className="w-20 h-20 bg-slate-100 rounded-lg flex items-center justify-center border-2 border-dashed border-slate-300">
              <span className="text-4xl">?</span>
            </div>
            <span className="text-xs font-bold text-slate-400">Creator</span>
          </div>
          <ArrowRight className="w-8 h-8 text-slate-300" />
          <div className="grid grid-cols-2 gap-2">
            <div className="w-12 h-12 bg-blue-500 rounded-sm flex items-center justify-center text-white text-xs font-bold shadow">
              Win
            </div>
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow">
              Mac
            </div>
            <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center text-white text-xs font-bold shadow">
              Web
            </div>
            <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center text-white text-xs font-bold shadow">
              Linux
            </div>
          </div>
        </div>
      </section>

      <PatternSection title="The Problem">
        <p>
          Imagine you are creating a logistics management application. The first version of your app
          only handles transportation by trucks, so the bulk of your code lives inside the{" "}
          <code>Truck</code> class.
        </p>
        <p>
          Later, your app becomes popular and you need to add Sea logistics. Great! But now you have
          to modify all your code to hande <code>Ships</code>. And later <code>Airplanes</code>.
        </p>
        <p>
          If you use direct <code>new Truck()</code> calls everywhere, your code becomes tightly
          coupled to specific classes.
        </p>
      </PatternSection>

      <PatternSection title="The Solution">
        <p>
          The <strong>Factory Method</strong> suggests that you replace direct object construction
          calls (using the new operator) with calls to a special <em>factory</em> method.
        </p>
        <p>
          Subclasses can override this factory method to return different types of objects (Truck,
          Ship, Plane) while the core business logic remains unchanged.
        </p>

        {/* Diagram */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 flex flex-col items-center mt-6 dark:bg-slate-800 dark:border-slate-700">
          <svg width="500" height="250" viewBox="0 0 500 250" className="max-w-full h-auto">
            {/* Creator */}
            <rect
              x="50"
              y="20"
              width="140"
              height="80"
              fill="#f8fafc"
              stroke="#334155"
              strokeWidth="2"
            />
            <text x="120" y="45" textAnchor="middle" fontWeight="bold" fontSize="12" fill="#0f172a">
              Creator
            </text>
            <text
              x="120"
              y="75"
              textAnchor="middle"
              fontSize="10"
              fill="#475569"
              fontStyle="italic"
            >
              + createProduct()
            </text>

            {/* Concrete Creator */}
            <rect
              x="50"
              y="150"
              width="140"
              height="80"
              fill="#fff"
              stroke="#334155"
              strokeWidth="2"
            />
            <text
              x="120"
              y="175"
              textAnchor="middle"
              fontWeight="bold"
              fontSize="12"
              fill="#0f172a"
            >
              ConcreteCreator
            </text>
            <text x="120" y="205" textAnchor="middle" fontSize="10" fill="#475569">
              + createProduct()
            </text>

            {/* Product Interface */}
            <rect
              x="300"
              y="20"
              width="140"
              height="80"
              fill="#f8fafc"
              stroke="#334155"
              strokeWidth="2"
              strokeDasharray="4"
            />
            <text x="370" y="45" textAnchor="middle" fontWeight="bold" fontSize="12" fill="#0f172a">
              Product
            </text>

            {/* Concrete Product */}
            <rect
              x="300"
              y="150"
              width="140"
              height="80"
              fill="#fff"
              stroke="#334155"
              strokeWidth="2"
            />
            <text
              x="370"
              y="175"
              textAnchor="middle"
              fontWeight="bold"
              fontSize="12"
              fill="#0f172a"
            >
              ConcreteProduct
            </text>

            {/* Arrows */}
            <path
              d="M 120 150 L 120 100"
              stroke="#334155"
              strokeWidth="1"
              fill="none"
              markerEnd="url(#arrow-empty)"
            />
            <path
              d="M 370 150 L 370 100"
              stroke="#334155"
              strokeWidth="1"
              fill="none"
              strokeDasharray="4"
              markerEnd="url(#arrow-empty)"
            />

            {/* Creation Arrow */}
            <path
              d="M 190 190 L 300 190"
              stroke="#334155"
              strokeWidth="1"
              fill="none"
              strokeDasharray="4"
              markerEnd="url(#arrow)"
            />

            <defs>
              <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                <path d="M0,0 L0,6 L9,3 z" fill="#334155" />
              </marker>
              <marker
                id="arrow-empty"
                markerWidth="10"
                markerHeight="10"
                refX="9"
                refY="3"
                orient="auto"
              >
                <path d="M0,0 L5,8 L10,0 z" fill="white" stroke="#334155" />
              </marker>
            </defs>
          </svg>
        </div>
      </PatternSection>

      <PatternSection title="Interactive Playground">
        <FactoryMethodDemo />
      </PatternSection>

      <PatternSection title="Implementation Details">
        <CodeTabs
          tabs={[
            {
              id: "ts",
              label: "ui-factory.ts",
              language: "typescript",
              icon: <Settings size={14} />,
              code: `// 1. Common Interface
interface Button {
  render(): void;
  onClick(f: Function): void;
}

// 2. Concrete Products
class WindowsButton implements Button { ... }
class HTMLButton implements Button { ... }

// 3. The Creator (Abstract)
abstract class Dialog {
  // THE FACTORY METHOD:
  abstract createButton(): Button;

  // Initial business logic that uses the product
  public renderDialog() {
    const okButton = this.createButton();
    okButton.onClick(() => closeDialog());
    okButton.render();
  }
}

// 4. Concrete Creators
class WindowsDialog extends Dialog {
  createButton(): Button {
    return new WindowsButton();
  }
}

class WebDialog extends Dialog {
  createButton(): Button {
    return new HTMLButton();
  }
}`,
            },
            {
              id: "usage",
              label: "app.ts",
              language: "typescript",
              icon: <PackageOpen size={14} />,
              code: `// The Application picks the factory once
let dialog: Dialog;

if (config.OS === "Windows") {
  dialog = new WindowsDialog();
} else {
  dialog = new WebDialog();
}

// The rest of the code just works!
dialog.renderDialog();`,
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
