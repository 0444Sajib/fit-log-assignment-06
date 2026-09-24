
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  getPlan,
  getSaved,
  savePlan,
  saveSaved,
} from "../../lib/storage";

export default function MyPlanPage() {
  const [plan, setPlan] = useState([]);
  const [saved, setSaved] = useState([]);
  const [activeTab, setActiveTab] = useState("plan");
  const [sortBy, setSortBy] = useState("duration");

  useEffect(() => {
    loadData();

    window.addEventListener("fitlog-storage-update", loadData);

    return () => {
      window.removeEventListener("fitlog-storage-update", loadData);
    };
  }, []);

  function loadData() {
    setPlan(getPlan());
    setSaved(getSaved());
  }

  function handleRemovePlan(id) {
    const updatedPlan = plan.filter(
      (item) => String(item.id) !== String(id)
    );

    savePlan(updatedPlan);
    setPlan(updatedPlan);

    toast.success("Removed from today's plan");
  }

  function handleRemoveSaved(id) {
    const updatedSaved = saved.filter(
      (item) => String(item.id) !== String(id)
    );

    saveSaved(updatedSaved);
    setSaved(updatedSaved);

    toast.success("Removed from saved");
  }

  function handleMarkDone(id) {
    const updatedPlan = plan.map((item) =>
      String(item.id) === String(id)
        ? { ...item, done: true }
        : item
    );

    savePlan(updatedPlan);
    setPlan(updatedPlan);

    toast.success("Workout marked as done");
  }

  const totalMinutes = plan.reduce(
    (total, workout) => total + Number(workout.duration || 0),
    0
  );

  const totalCalories = plan.reduce(
    (total, workout) =>
      total + Number(workout.caloriesBurned || 0),
    0
  );

  const completedCount = plan.filter(
    (workout) => workout.done
  ).length;

  const currentList = activeTab === "plan" ? plan : saved;

  const sortedList = [...currentList].sort((a, b) => {
    if (sortBy === "duration") {
      return Number(b.duration || 0) - Number(a.duration || 0);
    }

    if (sortBy === "calories") {
      return (
        Number(b.caloriesBurned || 0) -
        Number(a.caloriesBurned || 0)
      );
    }

    if (sortBy === "rating") {
      return Number(b.rating || 0) - Number(a.rating || 0);
    }

    return 0;
  });

  return (
    <main className="flex-1 bg-[#0b0d0c] px-6 py-10 text-white lg:px-8 lg:py-14">
      <div className="mx-auto max-w-7xl">

        {/* HEADER */}
        <section className="max-w-2xl">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#ccff00]">
            Workout Log
          </p>

          <h1 className="mt-3 text-4xl font-black uppercase leading-none tracking-[-0.05em] sm:text-5xl">
            My Plan
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-6 text-[#8b918d]">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </section>

        {/* METRICS */}
        <section className="mt-8 grid grid-cols-3 border border-[#292d2b] bg-[#121419]">
          <div className="border-r border-[#292d2b] p-4 sm:p-5">
            <p className="text-[9px] font-black uppercase tracking-widest text-[#8b918d]">
              Exercises
            </p>

            <p className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">
              {plan.length}
              <span className="ml-1 text-sm font-bold text-[#8b918d]">
                / 5
              </span>
            </p>
          </div>

          <div className="border-r border-[#292d2b] p-4 sm:p-5">
            <p className="text-[9px] font-black uppercase tracking-widest text-[#8b918d]">
              Minutes
            </p>

            <p className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">
              {totalMinutes}
            </p>
          </div>

          <div className="p-4 sm:p-5">
            <p className="text-[9px] font-black uppercase tracking-widest text-[#8b918d]">
              Calories
            </p>

            <p className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">
              {totalCalories}
            </p>
          </div>
        </section>

        {/* PROGRESS */}
        {plan.length > 0 && (
          <section className="mt-5 border border-[#292d2b] bg-[#121419] p-4">
            <div className="flex items-center justify-between gap-4">
              <p className="text-[9px] font-black uppercase tracking-widest text-[#8b918d]">
                Today's Progress
              </p>

              <p className="text-[10px] font-black uppercase text-[#ccff00]">
                {completedCount}/{plan.length} Done
              </p>
            </div>

            <div className="mt-3 h-1.5 w-full bg-[#292d2b]">
              <div
                className="h-full bg-[#ccff00] transition-all duration-300"
                style={{
                  width: `${
                    plan.length
                      ? (completedCount / plan.length) * 100
                      : 0
                  }%`,
                }}
              />
            </div>
          </section>
        )}

        {/* TABS + SORT */}
        <div className="mt-8 flex flex-col gap-4 border-b border-[#292d2b] pb-3 sm:flex-row sm:items-end sm:justify-between">

          {/* TABS */}
          <div className="flex">
            <button
              onClick={() => setActiveTab("plan")}
              className={`relative mr-6 px-1 pb-1 text-xs font-black uppercase tracking-wider transition ${
                activeTab === "plan"
                  ? "text-[#ccff00]"
                  : "text-[#8b918d] hover:text-white"
              }`}
            >
              Today's Plan

              {activeTab === "plan" && (
                <span className="absolute -bottom-3 left-0 h-0.5 w-full bg-[#ccff00]" />
              )}
            </button>

            <button
              onClick={() => setActiveTab("saved")}
              className={`relative px-1 pb-1 text-xs font-black uppercase tracking-wider transition ${
                activeTab === "saved"
                  ? "text-[#ccff00]"
                  : "text-[#8b918d] hover:text-white"
              }`}
            >
              Saved

              {activeTab === "saved" && (
                <span className="absolute -bottom-3 left-0 h-0.5 w-full bg-[#ccff00]" />
              )}
            </button>
          </div>

          {/* SORT */}
          <div className="flex items-center gap-2">
            <label
              htmlFor="sort"
              className="text-[9px] font-black uppercase tracking-widest text-[#8b918d]"
            >
              Sort
            </label>

            <select
              id="sort"
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              className="border border-[#292d2b] bg-[#121419] px-3 py-2 text-[10px] font-black uppercase tracking-wider text-white outline-none transition focus:border-[#ccff00]"
            >
              <option value="duration">Duration</option>
              <option value="calories">Calories</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>

        {/* EMPTY STATE */}
        {currentList.length === 0 && (
          <section className="mt-6 border border-dashed border-[#292d2b] bg-[#121419] px-6 py-16 text-center">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#ccff00]">
              {activeTab === "plan"
                ? "Your plan is empty"
                : "Nothing saved yet"}
            </p>

            <h2 className="mt-3 text-2xl font-black uppercase tracking-[-0.03em]">
              {activeTab === "plan"
                ? "Build today's workout."
                : "Save workouts for later."}
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#8b918d]">
              {activeTab === "plan"
                ? "Browse the library and add up to five lifts to your plan."
                : "Save workouts from the library and come back to them whenever you need."}
            </p>

            <Link
              href="/#library"
              className="mt-6 inline-flex bg-[#ccff00] px-5 py-3 text-xs font-black uppercase text-black transition hover:bg-white"
            >
              Browse Workouts
            </Link>
          </section>
        )}

        {/* WORKOUT LIST */}
        {sortedList.length > 0 && (
          <section className="mt-6 space-y-3">
            {sortedList.map((workout) => (
              <article
                key={workout.id}
                className={`grid overflow-hidden border border-[#292d2b] bg-[#121419] transition ${
                  workout.done
                    ? "opacity-60"
                    : "hover:border-[#444a47]"
                } md:grid-cols-[180px_1fr_auto]`}
              >

                {/* IMAGE */}
                <div className="relative h-48 bg-[#0b0d0c] md:h-full">
                  <img
                    src={workout.image}
                    alt={workout.name}
                    className="h-full w-full object-cover"
                  />

                  {workout.done && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                      <span className="border border-[#ccff00] bg-[#0b0d0c] px-3 py-2 text-[10px] font-black uppercase tracking-wider text-[#ccff00]">
                        Completed
                      </span>
                    </div>
                  )}
                </div>

                {/* WORKOUT CONTENT */}
                <div className="min-w-0 p-5">
                  <div className="flex flex-wrap gap-2">
                    {workout.muscleGroups?.map((muscle) => (
                      <span
                        key={muscle}
                        className="border border-[#292d2b] px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-[#8b918d]"
                      >
                        {muscle}
                      </span>
                    ))}
                  </div>

                  <h2 className="mt-3 truncate text-xl font-black uppercase tracking-[-0.03em]">
                    {workout.name}
                  </h2>

                  <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-[10px] font-bold uppercase tracking-wider text-[#8b918d]">
                    <span>{workout.duration} min</span>
                    <span>{workout.caloriesBurned} kcal</span>
                    <span>
                      {workout.sets} × {workout.reps}
                    </span>
                    <span>★ {workout.rating}</span>
                  </div>

                  {/* MARK AS DONE */}
                  <div className="mt-5">
                    {activeTab === "plan" && !workout.done && (
                      <button
                        onClick={() => handleMarkDone(workout.id)}
                        className="bg-[#ccff00] px-4 py-2.5 text-[10px] font-black uppercase tracking-wider text-black transition hover:bg-white"
                      >
                        Mark as Done
                      </button>
                    )}

                    {activeTab === "plan" && workout.done && (
                      <span className="inline-flex items-center text-[10px] font-black uppercase tracking-wider text-[#ccff00]">
                        ✓ Completed
                      </span>
                    )}
                  </div>
                </div>

                {/* RIGHT SIDE ACTIONS */}
                <div className="flex items-center justify-end gap-2 p-4 md:p-5">

                  {/* VIEW DETAILS */}
                  <Link
                    href={`/workouts/${workout.id}`}
                    className="border border-[#292d2b] px-4 py-2.5 text-[10px] font-black uppercase tracking-wider text-white transition hover:border-[#ccff00] hover:text-[#ccff00]"
                  >
                    View Details
                  </Link>

                  {/* REMOVE */}
                  <button
                    onClick={() =>
                      activeTab === "plan"
                        ? handleRemovePlan(workout.id)
                        : handleRemoveSaved(workout.id)
                    }
                    aria-label={`Remove ${workout.name}`}
                    className="flex h-9 w-9 shrink-0 items-center justify-center border border-[#292d2b] text-lg leading-none text-[#8b918d] transition hover:border-red-400 hover:text-red-400"
                  >
                    ×
                  </button>

                </div>
              </article>
            ))}
          </section>
        )}
      </div>
    </main>
  );
}

