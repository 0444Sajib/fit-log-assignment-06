import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-[#0b0d0c] px-6 py-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl items-center gap-8 overflow-hidden rounded-xl border border-[#292d2b] bg-[#121419] px-8 py-10 sm:px-10 lg:grid-cols-[1.35fr_0.65fr] lg:px-9 lg:py-9">

        {/* Left Side - Hero Content */}
        <div className="max-w-2xl">
          <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.28em] text-[#ccff00] sm:text-xs">
            Workout Library
          </p>

          <h1 className="max-w-2xl text-4xl font-black uppercase leading-[0.95] tracking-[-0.04em] text-white sm:text-5xl lg:text-[44px]">
            Train with intent. Log
            <br />
            every set.
          </h1>

          <p className="mt-5 max-w-xl text-xs leading-5 text-[#8b918d] sm:text-sm sm:leading-6">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>

          {/* Browse Workouts Button */}
          <Link
            href="#library"
            className="mt-6 inline-flex items-center bg-[#ccff00] px-5 py-3 text-[10px] font-black uppercase tracking-wider text-black transition hover:bg-white sm:px-6 sm:py-3.5 sm:text-xs"
          >
            Browse Workouts
          </Link>
        </div>

        {/* Right Side - Hero Image */}
        <div className="relative flex h-[260px] items-center justify-center sm:h-[300px] lg:h-[290px]">
          <Image
            src="/banner.png"
            alt="FitLog workout banner"
            fill
            priority
            className="object-contain"
          />
        </div>

      </div>
    </section>
  );
}