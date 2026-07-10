"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function Navigation() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/work", label: "Work" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-40 p-6 mix-blend-difference flex justify-between items-center">
      <Link href="/" className="font-display font-bold text-2xl uppercase tracking-tighter text-white">
        Yoga<span className="text-accent">.</span>
      </Link>
      
      <nav className="flex gap-8">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={clsx(
              "text-xs md:text-sm font-medium tracking-widest uppercase transition-colors hover:text-accent relative group text-white",
              pathname === link.href ? "text-accent" : ""
            )}
          >
            {link.label}
            <span 
              className={clsx(
                "absolute -bottom-2 left-0 w-full h-[1px] bg-accent transform origin-left transition-transform duration-300",
                pathname === link.href ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
              )}
            />
          </Link>
        ))}
      </nav>
    </header>
  );
}
