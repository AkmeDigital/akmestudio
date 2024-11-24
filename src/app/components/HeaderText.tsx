// src/components/HeaderText.tsx
"use client";

import { useEffect } from "react";
import { useHeaderContext } from "../context/HeaderContext";

interface HeaderTextProps {
  text: string;
}

export default function HeaderText({ text }: HeaderTextProps) {
  const { setHeaderText } = useHeaderContext();

  useEffect(() => {
    setHeaderText(text); // Set the header text whenever `text` changes
  }, [text, setHeaderText]);

  return null; // This component doesn't render anything visible
}
