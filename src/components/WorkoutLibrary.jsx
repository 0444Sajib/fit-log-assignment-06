"use client";

import { useEffect, useState } from "react";
import WorkoutCard from "./WorkoutCard";

const API_URL = "https://api.abcz.workers.dev/api/fitlog";

export default function WorkoutLibrary() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchWorkouts() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error("Failed to fetch workouts");
        }

        const data = await response.json();

        setWorkouts(data);
      } catch (err) {
        console.error(err);
        setError("Unable to load workouts. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchWorkouts();
  }, []);

  return (
    <section
      id="library"
      className="bg-[#0b0d0c] px-6 py-14 lg:px-8 lg:py-16"
    >
      <div className="mx-auto max-w-7xl">

        {/* Library Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-black uppercase tracking-[-0.03em] text-white sm:text-3xl">
            The Library
          </h2>

          <p className="mt-1 text-xs text-[#8b918d] sm:text-sm">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex min-h-[300px] items-center justify-center">
            <div className="text-center">
              <span className="loading loading-spinner loading-lg text-[#ccff00]" />

              <p className="mt-4 text-xs font-bold uppercase tracking-widest text-[#8b918d]">
                Loading workouts...
              </p>
            </div>
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="border border-[#292d2b] bg-[#121419] p-8 text-center">
            <p className="text-sm font-bold uppercase text-red-400">
              {error}
            </p>

            <button
              onClick={() => window.location.reload()}
              className="mt-5 bg-[#ccff00] px-5 py-3 text-xs font-black uppercase text-black transition hover:bg-white"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Workout Grid */}
        {!loading && !error && (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {workouts.map((workout) => (
              <WorkoutCard
                key={workout.id}
                workout={workout}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}