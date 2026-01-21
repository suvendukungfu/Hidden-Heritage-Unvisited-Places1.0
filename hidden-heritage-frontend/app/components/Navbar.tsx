"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full bg-[#4b2e1f] text-[#f6efe6] px-8 py-4 flex items-center justify-between sticky top-0 z-50">
      {/* Logo */}
      <Link href="/" className="text-xl font-semibold tracking-wide">
        Hidden Heritage
      </Link>

      {/* Navigation */}
      <div className="flex gap-6 text-sm font-medium">
        <Link href="/">Home</Link>
        <Link href="/explore">Explore</Link>
        <Link href="/trip-builder">Trip Builder</Link>
        <Link href="/about">About</Link>
        <Link href="/feedback">Feedback</Link>
      </div>
    </nav>
  );
}
