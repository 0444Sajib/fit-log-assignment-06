"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { getPlan, getSaved } from "../lib/storage";

export default function Navbar() {
  const pathname = usePathname();

  const [planCount, setPlanCount] = useState(0);
  const [savedCount, setSavedCount] = useState(0);

  useEffect(() => {
    function updateCounts() {
      setPlanCount(getPlan().length);
      setSavedCount(getSaved().length);
    }

    updateCounts();

    window.addEventListener("fitlog-storage-update", updateCounts);
    window.addEventListener("storage", updateCounts);

    return () => {
      window.removeEventListener("fitlog-storage-update", updateCounts);
      window.removeEventListener("storage", updateCounts);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-[#292d2b] bg-[#0b0d0c]">
      <nav className="mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-6 px-6 lg:px-8">
        <Link
          href="/"
          className="shrink-0 text-2xl font-black tracking-[-0.05em] text-white"
        >
          FIT<span className="text-[#ccff00]">LOG</span>
        </Link>

        <div className="hidden items-center gap-2 sm:flex">
          <Link
            href="/"
            className={`rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition ${
              pathname === "/"
                ? "bg-[#ccff00] text-black"
                : "text-gray-400 hover:bg-[#121514] hover:text-white"
            }`}
          >
            Workout
          </Link>

          <Link
            href="/my-plan"
            className={`rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition ${
              pathname === "/my-plan"
                ? "bg-[#ccff00] text-black"
                : "text-gray-400 hover:bg-[#121514] hover:text-white"
            }`}
          >
            My Plan
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/my-plan"
            className="flex items-center gap-2 rounded-full bg-[#ccff00] px-3 py-2 text-xs font-bold uppercase text-black"
          >
            <span>Plan</span>

            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-black px-1 text-[10px] text-white">
              {planCount}
            </span>
          </Link>

          <Link
            href="/my-plan"
            className="flex items-center gap-2 rounded-full border border-[#292d2b] px-3 py-2 text-xs font-bold uppercase text-white transition hover:border-[#ccff00]"
          >
            <span>Saved</span>

            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#292d2b] px-1 text-[10px]">
              {savedCount}
            </span>
          </Link>
        </div>
      </nav>
    </header>
  );
}