// app/components/header.tsx
"use client"; // Add this to make it a client component

import Image from "next/image";
import logo from "@/app/images/logo.png";
import { useHeaderContext } from "../context/HeaderContext";

export default function Header() {
  const { headerText } = useHeaderContext();

  return (
    <div className="header absolute w-full z-10">
      <div className="flex items-center justify-between p-4">
        <div className="w-1/2">
          <Image src={logo} alt="Akme Logo" width={100} height={100} />
        </div>

        <div className="flex flex-1 justify-end w-1/2">
          <div className="w-1/2 text-right">
            <p>{headerText}</p>
          </div>
          <div className="w-1/4 text-right">Work</div>
          <div className="w-1/4 text-right">About</div>
        </div>
      </div>
    </div>
  );
}
