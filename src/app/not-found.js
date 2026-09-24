
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] flex-1 items-center justify-center bg-[#0b0d0c] px-6 py-16 text-white lg:px-8">
      <div className="w-full max-w-lg text-center">
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#ccff00]">
          Error 404
        </p>

        <h1 className="mt-4 text-6xl font-black uppercase leading-none tracking-[-0.06em] sm:text-8xl">
          Not Found
        </h1>

        <p className="mx-auto mt-5 max-w-md text-sm leading-6 text-[#8b918d]">
          The page or workout you are looking for does not exist.
        </p>

        <Link
          href="/"
          className="mt-7 inline-flex bg-[#ccff00] px-6 py-3 text-xs font-black uppercase tracking-wider text-black transition hover:bg-white"
        >
          Back to Library
        </Link>
      </div>
    </main>
  );
}

