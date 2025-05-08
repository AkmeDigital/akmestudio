"use client";

import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  // Conditionally apply the 'absolute' class only on the root path
  const footerClass = pathname === "/" ? "absolute" : "";

  return (
    <footer className={`${footerClass} bottom-0 w-full z-10 p-8`}>
      <div className="grid grid-cols-12 items-center ">
        {/* Project Inquiries */}
        <div className="col-span-6 ">
          <p>
            For Project inquiries and more information, get in touch at{" "}
            <a href="mailto:contact@akmestudio.com">contact@akmestudio.com</a>
          </p>
        </div>

        {/* @akme.studio */}
        <div className="col-span-3 col-start-7 lg:col-span-1 lg:pl-4">
          <a target="_blank" href="https://www.instagram.com/akme.studio/">
            @akme.studio
          </a>
        </div>

        {/* Copyright Akmē Studio */}
        <div className="col-span-3 lg:col-start-11 lg:col-span-2 text-right">
          <span>&copy; Akmē Studio</span>
        </div>
      </div>
    </footer>
  );
}
