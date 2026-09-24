# FitLog

FitLog is a workout library where users can browse exercises, check workout details, save workouts for later, and create a daily workout plan.

## Technologies Used

* Next.js
* React
* Tailwind CSS
* DaisyUI
* React Toastify
* LocalStorage

## Features

* Browse workouts from the workout library.
* View detailed information for each workout.
* Add workouts to today's plan with a maximum of 5 exercises.
* Save workouts for later.
* Mark planned workouts as completed.
* Remove workouts from the plan or saved list.
* Sort workouts by duration, calories, or rating.
* Responsive design for mobile, tablet, and desktop.

## How It Works

Workout data is loaded from the provided FitLog API and displayed in the library. Users can open any workout to see its details, add it to today's plan, or save it for later.

The My Plan page shows the selected workouts along with total exercises, workout time, and calories. Plan and saved workout data are stored in the browser using LocalStorage.

## Getting Started

Install the dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Then open:
http://localhost:3000

