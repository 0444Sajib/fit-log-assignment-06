import Link from "next/link";

export default function WorkoutCard({ workout }) {
  return (
    <Link
      href={`/workouts/${workout.id}`}
      className="group block overflow-hidden rounded-md border border-[#292d2b] bg-[#121419] transition duration-300 hover:-translate-y-1 hover:border-[#ccff00]"
    >
      {/* Workout Image */}
      <div className="relative aspect-[2/1] overflow-hidden bg-[#0b0d0c]">
        <img
          src={workout.image}
          alt={workout.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      {/* Card Content */}
      <div className="p-4">

        {/* Muscle Group Tags */}
        <div className="mb-3 flex flex-wrap gap-2">
          {workout.muscleGroups?.map((muscle) => (
            <span
              key={muscle}
              className="bg-[#ccff00] px-2.5 py-1 text-[8px] font-black uppercase tracking-wide text-black"
            >
              {muscle}
            </span>
          ))}
        </div>

        {/* Workout Name */}
        <h3 className="text-base font-black uppercase leading-tight tracking-tight text-white transition group-hover:text-[#ccff00]">
          {workout.name}
        </h3>

        {/* Equipment */}
        <p className="mt-1 text-[10px] uppercase tracking-wide text-[#8b918d]">
          {workout.equipment}
        </p>

        {/* Stats */}
        <div className="mt-3 grid grid-cols-3 border-t border-[#292d2b] pt-3">

          <div>
            <p className="text-[8px] uppercase tracking-wide text-[#8b918d]">
              Duration
            </p>

            <p className="mt-1 text-[11px] font-bold text-white">
              {workout.duration} min
            </p>
          </div>

          <div>
            <p className="text-[8px] uppercase tracking-wide text-[#8b918d]">
              Calories
            </p>

            <p className="mt-1 text-[11px] font-bold text-white">
              {workout.caloriesBurned} kcal
            </p>
          </div>

          <div>
            <p className="text-[8px] uppercase tracking-wide text-[#8b918d]">
              Rating
            </p>

            <p className="mt-1 text-[11px] font-bold text-white">
              {workout.rating}
            </p>
          </div>

        </div>
      </div>
    </Link>
  );
}