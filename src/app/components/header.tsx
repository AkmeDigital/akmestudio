// app/components/header.tsx
"use client"; // Add this to make it a client component

import Image from "next/image";
import logo from "@/app/images/logo.png";
import { useHeaderContext } from "../context/HeaderContext";
import Link from "next/link";
import { usePathname } from "next/navigation";


export default function Header() {
  const { headerText } = useHeaderContext();
  const pathname = usePathname(); // Get the current path

  const isActive = (path: string) =>
    pathname === path || pathname.startsWith(path);

  return (
    <div className="header absolute w-full z-10 top-0">
      <div className="flex items-center justify-between p-4">
        <div className="w-1/2">
        <Link href={'/'}>
          <Image src={logo} alt="Akme Logo" width={100} height={100} />
        </Link>
        </div>

        <div className="flex flex-1 justify-end w-1/2">
          <div className="w-1/2 text-right">
            <p>{headerText}</p>
          </div>
          <div
            className={`w-1/4 text-right ${
              isActive("/work") ? "underline" : ""
            }`}
          >
            <Link href={'/work'}>
              Work
            </Link>
          </div>
          <div
            className={`w-1/4 text-right ${
              isActive("/about") ? "underline" : ""
            }`}
          >
            <Link href={'/about'}>
              About
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
