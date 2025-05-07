"use client";

import { useState, useEffect } from "react";

export default function CurrentTime() {
  const [currentTime, setCurrentTime] = useState<Date | null>(null); // Start with null

  useEffect(() => {
    setCurrentTime(new Date()); // Set initial time after hydration
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!currentTime) return <div>--:--:--</div>; // Placeholder until hydration

  return (
    <div>
      {currentTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })}
    </div>
  );
}
