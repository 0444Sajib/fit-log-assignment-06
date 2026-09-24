import Hero from "../components/Hero";
import WorkoutLibrary from "../components/WorkoutLibrary";

export default function Home() {
  return (
    <main className="flex-1 bg-[#0b0d0c] text-white">
      <Hero />

      <WorkoutLibrary />
    </main>
  );
}