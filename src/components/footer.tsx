"use client";

import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  // Conditionally apply the 'absolute' class only on the root path
  const footerClass = (pathname === "/" || pathname === "/work") ? "absolute" : "";

  return (
    <footer className={`${footerClass} bottom-0 w-full z-10 p-8 py-4`}>
      <div className="grid grid-cols-12 items-center ">
        {/* Project Inquiries */}
        <div className="col-span-6 ">
            For Project inquiries and more information, get in touch at{" "}
            <a href="mailto:contact@akmestudio.com">contact@akmestudio.com</a>
        </div>

        {/* @akme.studio */}
        <div className="col-span-3 lg:col-start-8 lg:col-span-1 ">
          <a target="_blank" href="https://www.instagram.com/akme.studio/">
            @akme.studio
          </a>
        </div>

        {/* Copyright Akmē Studio */}
        <div className="col-span-2 lg:col-start-11 lg:col-span-2 text-right">
          <span>&copy; {new Date().getFullYear()} Akmē Studio</span>
        </div>
      </div>
    </footer>
  );
}
