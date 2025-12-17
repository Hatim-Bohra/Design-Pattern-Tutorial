export type PatternCategory = "Creational" | "Structural" | "Behavioral";

export interface Pattern {
    slug: string;
    title: string;
    description: string;
    category: PatternCategory;
    tags: string[];
}

export const patterns: Pattern[] = [
    {
        slug: "adapter",
        title: "Adapter Pattern",
        description: "Allows objects with incompatible interfaces to collaborate.",
        category: "Structural",
        tags: ["Complexity: Low", "Popularity: High"],
    },
];
