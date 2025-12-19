"use client";

import React, { useEffect } from "react";
import { usePathname } from "next/navigation";

export function ScrollToTop() {
  const pathname = usePathname();

  React.useEffect(() => {
    // Prevent browser from restoring scroll position
    if (typeof window !== "undefined" && window.history) {
      window.history.scrollRestoration = "manual";
    }

    // Force scroll to top immediately and after a tick to handle race conditions with layout
    window.scrollTo(0, 0);
    const timeout = setTimeout(() => window.scrollTo(0, 0), 10);

    return () => clearTimeout(timeout);
  }, [pathname]);

  return null;
}
