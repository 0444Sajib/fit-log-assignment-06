
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";
import {
  getPlan,
  getSaved,
  savePlan,
  saveSaved,
} from "../../../lib/storage";

const API_URL = "https://api.abcz.workers.dev/api/fitlog";

export default function WorkoutDetailsPage() {
  const params = useParams();
  const id = params.id;

  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [plan, setPlan] = useState([]);
  const [saved, setSaved] = useState([]);

  useEffect(() => {
    async function fetchWorkout() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`${API_URL}/${id}`);

        if (!response.ok) {
          throw new Error("Failed to fetch workout");
        }

        const data = await response.json();

        setWorkout(data);
      } catch (err) {
        console.error(err);
        setError("Unable to load this workout. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchWorkout();
    }

    setPlan(getPlan());
    setSaved(getSaved());
  }, [id]);

  function handleAddToPlan() {
    const currentPlan = getPlan();

    const alreadyAdded = currentPlan.some(
      (item) => String(item.id) === String(workout.id)
    );

    if (alreadyAdded) {
      toast.info("Already in today's plan");
      return;
    }

    if (currentPlan.length >= 5) {
      toast.warning("Today's plan is full");
      return;
    }

    const updatedPlan = [
      ...currentPlan,
      {
        ...workout,
        done: false,
      },
    ];

    savePlan(updatedPlan);
    setPlan(updatedPlan);

    toast.success("Added to today's plan");
  }

  function handleSaveForLater() {
    const currentSaved = getSaved();

    const alreadySaved = currentSaved.some(
      (item) => String(item.id) === String(workout.id)
    );

    if (alreadySaved) {
      toast.info("Already saved");
      return;
    }

    const updatedSaved = [...currentSaved, workout];

    saveSaved(updatedSaved);
    setSaved(updatedSaved);

    toast.success("Saved for later");
  }

  if (loading) {
    return (
      <main className="flex min-h-[70vh] flex-1 items-center justify-center bg-[#0b0d0c] text-white">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg text-[#ccff00]" />

          <p className="mt-4 text-xs font-bold uppercase tracking-widest text-[#8b918d]">
            Loading workout...
          </p>
        </div>
      </main>
    );
  }

  if (error || !workout) {
    return (
      <main className="flex min-h-[70vh] flex-1 items-center justify-center bg-[#0b0d0c] px-6 text-white">
        <div className="w-full max-w-md border border-[#292d2b] bg-[#121419] p-8 text-center">
          <h1 className="text-xl font-black uppercase">
            Workout Not Found
          </h1>

          <p className="mt-3 text-sm text-[#8b918d]">
            {error || "This workout could not be found."}
          </p>

          <Link
            href="/"
            className="mt-6 inline-flex bg-[#ccff00] px-5 py-3 text-xs font-black uppercase text-black transition hover:bg-white"
          >
            Back to Library
          </Link>
        </div>
      </main>
    );
  }

  const isInPlan = plan.some(
    (item) => String(item.id) === String(workout.id)
  );

  const isSaved = saved.some(
    (item) => String(item.id) === String(workout.id)
  );

  return (
    <main className="relative flex-1 bg-[#0b0d0c] px-6 py-7 text-white lg:px-8 lg:py-8">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/"
          className="mb-5 inline-flex items-center text-xs font-bold uppercase tracking-wider text-[#8b918d] transition hover:text-[#ccff00]"
        >
          ← Back to Library
        </Link>

        <div className="grid overflow-hidden border border-[#292d2b] bg-[#121419] lg:grid-cols-[0.95fr_1.05fr]">
          {/* LEFT IMAGE */}
          <div className="relative h-[360px] bg-[#0b0d0c] sm:h-[430px] lg:h-[500px]">
            <img
              src={workout.image}
              alt={workout.name}
              className="h-full w-full object-cover"
            />
          </div>

          {/* RIGHT CONTENT */}
          <div className="self-start p-6 sm:p-7 lg:pt-0 lg:pr-8 lg:pb-8 lg:pl-8">
            {/* TAGS */}
            <div className="mb-4 flex flex-wrap gap-2 lg:pt-1">
              {workout.muscleGroups?.map((muscle) => (
                <span
                  key={muscle}
                  className="border border-[#292d2b] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#8b918d]"
                >
                  {muscle}
                </span>
              ))}
            </div>

            {/* TITLE */}
            <h1 className="text-3xl font-black uppercase leading-[0.95] tracking-[-0.04em] sm:text-4xl">
              {workout.name}
            </h1>

            {/* DESCRIPTION */}
            <p className="mt-4 max-w-xl text-sm leading-6 text-[#8b918d]">
              {workout.description}
            </p>

            {/* SPECS */}
            <div className="mt-6 grid grid-cols-2 gap-px border border-[#292d2b] bg-[#292d2b] sm:grid-cols-4">
              <div className="bg-[#121419] p-3">
                <p className="text-[9px] font-bold uppercase tracking-wider text-[#8b918d]">
                  Equipment
                </p>
                <p className="mt-1 text-xs font-bold text-white">
                  {workout.equipment}
                </p>
              </div>

              <div className="bg-[#121419] p-3">
                <p className="text-[9px] font-bold uppercase tracking-wider text-[#8b918d]">
                  Difficulty
                </p>
                <p className="mt-1 text-xs font-bold text-white">
                  {workout.difficulty}
                </p>
              </div>

              <div className="bg-[#121419] p-3">
                <p className="text-[9px] font-bold uppercase tracking-wider text-[#8b918d]">
                  Sets / Reps
                </p>
                <p className="mt-1 text-xs font-bold text-white">
                  {workout.sets} × {workout.reps}
                </p>
              </div>

              <div className="bg-[#121419] p-3">
                <p className="text-[9px] font-bold uppercase tracking-wider text-[#8b918d]">
                  Duration
                </p>
                <p className="mt-1 text-xs font-bold text-white">
                  {workout.duration} min
                </p>
              </div>
            </div>

            {/* CALORIES + RATING */}
            <div className="flex items-center justify-between border-b border-[#292d2b] py-4">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-wider text-[#8b918d]">
                  Calories
                </p>

                <p className="mt-1 text-sm font-black text-white">
                  {workout.caloriesBurned} kcal
                </p>
              </div>

              <div className="text-right">
                <p className="text-[9px] font-bold uppercase tracking-wider text-[#8b918d]">
                  Rating
                </p>

                <p className="mt-1 text-sm font-black text-[#ccff00]">
                  ★ {workout.rating}
                </p>
              </div>
            </div>

            {/* INSTRUCTIONS */}
            <div className="mt-5">
              <h2 className="text-xs font-black uppercase tracking-widest text-white">
                Instructions
              </h2>

              <ol className="mt-3 space-y-2.5">
                {workout.instructions?.map((instruction, index) => (
                  <li
                    key={index}
                    className="flex gap-3 text-xs leading-5 text-[#8b918d]"
                  >
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center border border-[#292d2b] text-[9px] font-black text-[#ccff00]">
                      {index + 1}
                    </span>

                    <span>{instruction}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* ACTION BUTTONS */}
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <button
                onClick={handleAddToPlan}
                className={`px-4 py-3 text-xs font-black uppercase transition ${
                  isInPlan
                    ? "bg-[#292d2b] text-white"
                    : "bg-[#ccff00] text-black hover:bg-white"
                }`}
              >
                {isInPlan
                  ? "✓ In Today's Plan"
                  : "+ Add to Today's Plan"}
              </button>

              <button
                onClick={handleSaveForLater}
                className={`border px-4 py-3 text-xs font-black uppercase transition ${
                  isSaved
                    ? "border-[#ccff00] text-[#ccff00]"
                    : "border-[#292d2b] text-white hover:border-[#ccff00] hover:text-[#ccff00]"
                }`}
              >
                {isSaved ? "♥ Saved" : "♡ Save for Later"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

