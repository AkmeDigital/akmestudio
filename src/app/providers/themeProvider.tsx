"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function ThemeProvider() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;

    // todo set style on akme logo
    // Default styles
    let textColor = "#000";
    let backgroundColor = "#fff";

    // Update styles based on specific pathnames
    switch (pathname) {
      case "/about":
        textColor = "#000";
        backgroundColor = "#fff";
        break;
      case "/work":
        textColor = "#fff";
        backgroundColor = "#222";
        break;
      case "/":
        textColor = "#fff";
        backgroundColor = "#000";
        break;
    }

    // Apply the styles
    root.style.setProperty("--text-color", textColor);
    root.style.setProperty("--background-color", backgroundColor);
  }, [pathname]);

  return null; // No UI, just a side effect
}
