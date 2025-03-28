"use client";

import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  // Conditionally apply the 'absolute' class only on the root path
  const footerClass = pathname === "/" ? "absolute" : "";

  return (
    <footer className={`${footerClass} bottom-0 w-full z-10 p-4`}>
      <div className="grid grid-cols-12 items-center gap-4">
        {/* Project Inquiries */}
        <div className="col-start-1 col-span-3">
          <p>
            For Project inquiries and more information, get in touch at{" "}
            <a href="mailto:contact@akmestudio.com">contact@akmestudio.com</a>
          </p>
        </div>

        {/* @akme.studio */}
        <div className="col-start-8 col-span-1">
          <a target="_blank" href="https://www.instagram.com/akme.studio/">
            @akme.studio
          </a>
        </div>

        {/* Copyright Akmē Studio */}
        <div className="col-start-11 col-span-2 text-right">
          <span>Copyright Akmē Studio</span>
        </div>
      </div>
    </footer>
  );
}
