// app/context/HeaderContext.tsx
"use client";

import { createContext, useContext, useState } from "react";

interface HeaderContextProps {
  headerText: string;
  setHeaderText: (text: string) => void;
}

const HeaderContext = createContext<HeaderContextProps | undefined>(undefined);

export function HeaderProvider({ children }: { children: React.ReactNode }) {
  const [headerText, setHeaderText] = useState("");

  return (
    <HeaderContext.Provider value={{ headerText, setHeaderText }}>
      {children}
    </HeaderContext.Provider>
  );
}

export function useHeaderContext() {
  const context = useContext(HeaderContext);
  if (!context) {
    throw new Error("useHeaderContext must be used within a HeaderProvider");
  }
  return context;
}
