"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function ThemeProvider() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;

    // todo set style on akme logo
    // Default styles
    let textColor = "#0a0a0a";
    let backgroundColor = "#fff";

    // Update styles based on specific pathnames
    switch (pathname) {
      case "/about":
        // textColor = "#0a0a0a";
        backgroundColor = "#fff";
        textColor = "#fff";
        // backgroundColor = "#0a0a0a";
        break;
      case "/work":
        textColor = "#fff";
        backgroundColor = "#0a0a0a";
        break;
      case "/":
        textColor = "#fff";
        backgroundColor = "#0a0a0a";
        break;
      default:
        if (pathname.startsWith("/work/")) {
          backgroundColor = "#fff";
          textColor = "#fff";
        }
        break;
    }

    // Apply the styles
    root.style.setProperty("--text-color", textColor);
    root.style.setProperty("--background-color", backgroundColor);
  }, [pathname]);

  return null; // No UI, just a side effect
}
