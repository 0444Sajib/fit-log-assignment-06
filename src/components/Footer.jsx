
export default function Footer() {
  return (
    <footer className="border-t border-[#292d2b] bg-[#0b0d0c] px-6 py-7 text-white lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="FitLog logo"
            className="h-8 w-auto object-contain"
          />

          <span className="text-lg font-black tracking-[-0.05em]">
            FIT<span className="text-[#ccff00]">LOG</span>
          </span>
        </div>

        {/* Copyright */}
        <p className="text-center text-[10px] font-bold uppercase tracking-wider text-[#8b918d] sm:text-right">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}

