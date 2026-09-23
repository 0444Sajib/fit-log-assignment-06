import Hero from "../components/Hero";

export default function Home() {
  return (
    <main className="flex-1 bg-[#0b0d0c] text-white">
      <Hero />

      {/* Library section will be added in the next step */}
      <section
        id="library"
        className="flex min-h-[500px] items-center justify-center px-6"
      >
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#ccff00]">
            Coming Next
          </p>

          <h2 className="mt-4 text-4xl font-black uppercase">
            The Library
          </h2>
        </div>
      </section>
    </main>
  );
}