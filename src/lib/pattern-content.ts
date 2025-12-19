export const prosConsData: Record<string, { pros: string[]; cons: string[] }> = {
  singleton: {
    pros: [
      "Ensures a class has only one instance.",
      "Provides a global access point to that instance.",
      "Initialized only when requested (lazy initialization).",
    ],
    cons: [
      "Violates the Single Responsibility Principle.",
      "Can mask bad design (global state coupling).",
      "Difficult to unit test due to hidden dependencies.",
    ],
  },
  "factory-method": {
    pros: [
      "Decouples creator code from concrete product classes.",
      "Single Responsibility Principle: Product creation code is in one place.",
      "Open/Closed Principle: Easy to introduce new product types.",
    ],
    cons: [
      "Code may become complicated with many new subclasses.",
      "Requires creating a subclass for every product type.",
    ],
  },
  "abstract-factory": {
    pros: [
      "Ensures compatibility between products of the same family.",
      "Avoids tight coupling between concrete products and client code.",
      "Single Responsibility Principle: Product creation is centralized.",
    ],
    cons: [
      "Code becomes complex due to many new interfaces and classes.",
      "Adding new product variants (e.g. 'Table') requires changing the base interface.",
    ],
  },
  builder: {
    pros: [
      "Constructs objects step-by-step.",
      "Reuses the same construction code for different representations.",
      "Isolates complex construction code from business logic.",
    ],
    cons: [
      "Requires creating a separate Builder class for each product type.",
      "Increased overall code complexity.",
    ],
  },
  prototype: {
    pros: [
      "Clones objects without coupling to their specific classes.",
      "Avoids repeated initialization code.",
      "Produces complex objects more conveniently.",
    ],
    cons: [
      "Cloning complex objects with circular references is tricky.",
      "Deep copy vs. Shallow copy confusion.",
    ],
  },
  adapter: {
    pros: [
      "Single Responsibility Principle: Data conversion is separate from logic.",
      "Open/Closed Principle: Can introduce new adapters without breaking code.",
      "Allows incompatible classes to work together.",
    ],
    cons: [
      "Overall complexity increases with new interfaces and classes.",
      "Sometimes simpler to just change the service class if possible.",
    ],
  },
  bridge: {
    pros: [
      "Decouples abstraction from implementation.",
      "Open/Closed Principle: You can introduce new abstractions and implementations independently.",
      "Hides implementation details from the client.",
    ],
    cons: [
      "Code becomes more complex due to additional classes.",
      "Might be overkill for simple systems.",
    ],
  },
  composite: {
    pros: [
      "Work with complex tree structures conveniently.",
      "Open/Closed Principle: New element types can be added easily.",
      "Client treats simple and complex elements uniformly.",
    ],
    cons: [
      "Can make design overly general.",
      "Difficult to restrict the type of components in the tree.",
    ],
  },
  decorator: {
    pros: [
      "Extend behavior without making new subclasses.",
      "Add or remove responsibilities at runtime.",
      "Combine several behaviors by wrapping an object multiple times.",
    ],
    cons: [
      "Hard to remove a specific wrapper from the stack.",
      "Implementation order of decorators can be significant.",
      "Code looks like 'callback hell' but with objects.",
    ],
  },
  facade: {
    pros: [
      "Isolates code from the complexity of a subsystem.",
      "Provides a simple interface for common tasks.",
      "Reduces coupling between client and subsystem.",
    ],
    cons: [
      "A facade can become a 'God Object' coupled to all classes of an app.",
      "May hide useful features of the underlying subsystem.",
    ],
  },
  proxy: {
    pros: [
      "Control the service object without clients knowing.",
      "Manage lifecycle of the service object (e.g., lazy loading).",
      "Security and access control.",
    ],
    cons: ["Response might be delayed.", "Code becomes more complicated."],
  },
  "chain-of-responsibility": {
    pros: [
      "Decouples sender and receivers.",
      "Single Responsibility Principle: You can decouple classes that invoke operations from classes that perform them.",
      "Open/Closed Principle: You can introduce new handlers without breaking existing code.",
    ],
    cons: [
      "Some requests may end up unhandled.",
      "Debugging and monitoring the chain can be difficult.",
    ],
  },
  command: {
    pros: [
      "Single Responsibility Principle: Decouples classes that invoke operations from classes that perform them.",
      "Easy to implement Undo/Redo.",
      "Can assemble simple commands into complex ones.",
    ],
    cons: ["Code inevitably becomes more complicated.", "Many classes for simple actions."],
  },
  iterator: {
    pros: [
      "Single Responsibility Principle: Extracts traversal algorithms.",
      "cleaner client code (simplified loops).",
      "Can iterate over the same collection in parallel.",
    ],
    cons: [
      "Overkill if your app only works with simple collections.",
      "Using an iterator may be less efficient than direct indexing.",
    ],
  },
  mediator: {
    pros: [
      "Reduces chaotic dependencies between objects.",
      "Single Responsibility Principle: Extracts communication into one place.",
      "Simplifies object cooperation.",
    ],
    cons: [
      "The Mediator can evolve into a 'God Object'.",
      "Can be difficult to maintain as logic grows.",
    ],
  },
  memento: {
    pros: [
      "Produces snapshots of object state without violating encapsulation.",
      "Simplifies the originator code (no need to manage history).",
    ],
    cons: [
      "Consumes memory if clients create mementos too often.",
      "Caretakers must track the originator's lifecycle to discard obsolete mementos.",
    ],
  },
  observer: {
    pros: [
      "Open/Closed Principle: You can introduce new subscriber classes without checking publisher code.",
      "Establish relationships at runtime.",
    ],
    cons: [
      "Subscribers are notified in random order.",
      "Potential memory leaks if observers aren't unsubscribed.",
    ],
  },
  state: {
    pros: [
      "Single Responsibility Principle: Organize state-specific code into separate classes.",
      "Open/Closed Principle: Introduce new states without changing existing state classes.",
      "Simplifies the state machine logic.",
    ],
    cons: ["Overkill if a state machine has only a few states or rarely changes."],
  },
  strategy: {
    pros: [
      "Swap algorithms used inside an object at runtime.",
      "Isolate implementation details of an algorithm from code that uses it.",
      "Open/Closed Principle: New strategies can be added easily.",
    ],
    cons: [
      "Clients must know the differences between strategies to select the right one.",
      "Code complexity increases.",
    ],
  },
  "template-method": {
    pros: [
      "Clients can override only certain parts of a large algorithm.",
      "Pull duplicate code into a superclass.",
    ],
    cons: [
      "Template methods tend to be harder to maintain.",
      "Liskov Substitution Principle violation if a subclass suppresses a default step implementation.",
    ],
  },
};
