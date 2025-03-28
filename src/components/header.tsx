"use client"; // Add this to make it a client component

import Image from "next/image";
import svgLogo from '../../public/akme_svg.svg'
import { useHeaderContext } from "../app/context/HeaderContext";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const { headerText } = useHeaderContext();
  const pathname = usePathname(); // Get the current path

  const isActive = (path: string) =>
    pathname === path || pathname.startsWith(path);

  return (
    <div className="header absolute w-full z-10 top-0">
      <div className="grid grid-cols-12 items-center p-4">
        {/* Logo */}
        <div className="col-span-1">
          <Link href={"/"}>
            <Image src={svgLogo} alt="Akme Logo" width={100} height={100} className="svg-color"/>
          </Link>
        </div>

        {/* Header Text */}
        <div className="col-start-8 col-span-1 text-left">
          <p>{headerText}</p>
        </div>

        {/* Work Link */}
        <div
          className={`col-start-11 col-span-1 text-right ${
            isActive("/work") ? "underline" : ""
          }`}
        >
          <Link href={"/work"}>Work</Link>
        </div>

        {/* About Link */}
        <div
          className={`col-start-12 col-span-1 text-right ${
            isActive("/about") ? "underline" : ""
          }`}
        >
          <Link href={"/about"}>About</Link>
        </div>
      </div>
    </div>
  );
}
