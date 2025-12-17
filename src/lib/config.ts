// Centralized Runtime Config
export const config = {
  appUrl: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  enableAnalytics: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === "true",
};

// API Client Placeholder (if needed later)
export const api = {
  get: async (url: string) => {
    // Implement standard fetch wrapper with error handling
    const res = await fetch(url);
    if (!res.ok) throw new Error(`API Error: ${res.status}`);
    return res.json();
  },
};
