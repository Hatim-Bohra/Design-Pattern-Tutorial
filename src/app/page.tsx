import Link from "next/link";
import { patterns } from "@/lib/registry";
import { ArrowRight, Layers, Box, Zap } from "lucide-react";

export default function Home() {
  const categories = ["Creational", "Structural", "Behavioral"];

  const getIcon = (category: string) => {
    switch (category) {
      case "Creational":
        return <Box className="w-5 h-5 text-blue-600" />;
      case "Structural":
        return <Layers className="w-5 h-5 text-purple-600" />;
      case "Behavioral":
        return <Zap className="w-5 h-5 text-amber-600" />;
      default:
        return <Box />;
    }
  };

  const getColor = (category: string) => {
    switch (category) {
      case "Creational":
        return "bg-blue-50 border-blue-100 hover:border-blue-300 dark:bg-blue-950/20 dark:border-blue-900 dark:hover:border-blue-700";
      case "Structural":
        return "bg-purple-50 border-purple-100 hover:border-purple-300 dark:bg-purple-950/20 dark:border-purple-900 dark:hover:border-purple-700";
      case "Behavioral":
        return "bg-amber-50 border-amber-100 hover:border-amber-300 dark:bg-amber-950/20 dark:border-amber-900 dark:hover:border-amber-700";
      default:
        return "bg-slate-50 dark:bg-slate-900/50";
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* Hero */}
      <div className="bg-slate-900 py-20 px-6 sm:px-12 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-size-[32px]"></div>
        <div className="relative z-10">
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight mb-6">
            Interactive Design Patterns
          </h1>
          <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10">
            Master the design patterns with interactive visualizations, real-world React demos, and
            deep-dive explanations.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/patterns/singleton"
              scroll={false}
              className="bg-white text-slate-900 px-8 py-3 rounded-full font-bold hover:bg-slate-100 transition-colors shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Start Learning
            </Link>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-6 py-16 space-y-16">
        {categories.map((category) => {
          const categoryPatterns = patterns.filter((p) => p.category === category);
          if (categoryPatterns.length === 0) return null;

          return (
            <section key={category} className="space-y-6">
              <div className="flex items-center gap-3 border-b border-border pb-4">
                {getIcon(category)}
                <h2 className="text-2xl font-bold text-foreground">{category} Patterns</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryPatterns.map((pattern) => (
                  <Link
                    key={pattern.slug}
                    href={`/patterns/${pattern.slug}`}
                    scroll={true}
                    className={`block p-6 rounded-xl border border-border transition-all hover:shadow-lg hover:-translate-y-1 ${getColor(category)} text-card-foreground`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                        {pattern.title}
                      </h3>
                      <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity text-slate-400" />
                    </div>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {pattern.description}
                    </p>
                    <div className="flex gap-2">
                      {pattern.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] uppercase font-bold tracking-wider px-2 py-1 bg-secondary text-secondary-foreground rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
