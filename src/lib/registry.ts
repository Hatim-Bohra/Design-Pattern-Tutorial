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
    {
        slug: "singleton",
        title: "Singleton Pattern",
        description: "Ensures a class has only one instance and provides global access to it.",
        category: "Creational",
        tags: ["Complexity: Low", "Popularity: Extreme"],
    },
    {
        slug: "factory-method",
        title: "Factory Method",
        description: "Defines an interface for creating objects, but lets subclasses decide which class to instantiate.",
        category: "Creational",
        tags: ["Complexity: Low", "Popularity: High"],
    },
    // --- Creational ---
    {
        slug: "builder",
        title: "Builder Pattern",
        description: "Constructs complex objects step by step.",
        category: "Creational",
        tags: ["Complexity: Medium", "Popularity: High"],
    },
    {
        slug: "abstract-factory",
        title: "Abstract Factory",
        description: "Creates families of related objects without specifying their concrete classes.",
        category: "Creational",
        tags: ["Complexity: High", "Popularity: Medium"],
    },
    {
        slug: "prototype",
        title: "Prototype Pattern",
        description: "Creates new objects by copying an existing object.",
        category: "Creational",
        tags: ["Complexity: Medium", "Popularity: Medium"],
    },
    // --- Structural ---
    {
        slug: "bridge",
        title: "Bridge Pattern",
        description: "Separates an abstraction from its implementation.",
        category: "Structural",
        tags: ["Complexity: High", "Popularity: Medium"],
    },
    {
        slug: "composite",
        title: "Composite Pattern",
        description: "Composes objects into tree structures.",
        category: "Structural",
        tags: ["Complexity: Medium", "Popularity: High"],
    },
    {
        slug: "decorator",
        title: "Decorator Pattern",
        description: "Attaches additional responsibilities to an object dynamically.",
        category: "Structural",
        tags: ["Complexity: Medium", "Popularity: High"],
    },
    {
        slug: "facade",
        title: "Facade Pattern",
        description: "Provides a simplified interface to a complex system.",
        category: "Structural",
        tags: ["Complexity: Low", "Popularity: Extreme"],
    },
    {
        slug: "proxy",
        title: "Proxy Pattern",
        description: "Controls access to an object.",
        category: "Structural",
        tags: ["Complexity: Medium", "Popularity: High"],
    },
    // --- Behavioral ---
    {
        slug: "chain-of-responsibility",
        title: "Chain of Responsibility",
        description: "Passes requests along a chain of handlers.",
        category: "Behavioral",
        tags: ["Complexity: Medium", "Popularity: Medium"],
    },
    {
        slug: "command",
        title: "Command Pattern",
        description: "Encapsulates a request as an object.",
        category: "Behavioral",
        tags: ["Complexity: Medium", "Popularity: High"],
    },
    {
        slug: "iterator",
        title: "Iterator Pattern",
        description: "Traverses a collection without exposing its underlying representation.",
        category: "Behavioral",
        tags: ["Complexity: Low", "Popularity: Extreme"],
    },
    {
        slug: "mediator",
        title: "Mediator Pattern",
        description: "Defines simplified communication between classes.",
        category: "Behavioral",
        tags: ["Complexity: Medium", "Popularity: Medium"],
    },
    {
        slug: "memento",
        title: "Memento Pattern",
        description: "Captures and restores an object's internal state.",
        category: "Behavioral",
        tags: ["Complexity: Low", "Popularity: Low"],
    },
    {
        slug: "observer",
        title: "Observer Pattern",
        description: "Notifies multiple objects about events.",
        category: "Behavioral",
        tags: ["Complexity: Medium", "Popularity: Extreme"],
    },
    {
        slug: "state",
        title: "State Pattern",
        description: "Alters an object's behavior when its state changes.",
        category: "Behavioral",
        tags: ["Complexity: Medium", "Popularity: Medium"],
    },
    {
        slug: "strategy",
        title: "Strategy Pattern",
        description: "Defines a family of interchangeable algorithms.",
        category: "Behavioral",
        tags: ["Complexity: Low", "Popularity: High"],
    },
    {
        slug: "template-method",
        title: "Template Method",
        description: "Defines the skeleton of an algorithm in a superclass.",
        category: "Behavioral",
        tags: ["Complexity: Low", "Popularity: Medium"],
    },
];
