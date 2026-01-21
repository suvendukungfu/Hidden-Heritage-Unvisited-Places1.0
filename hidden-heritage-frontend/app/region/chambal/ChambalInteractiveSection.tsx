"use client";

import React from "react";

// ✅ SHARED TYPE (must match the state exactly)
export type HeatmapType = "density" | "risk" | "popularity" | null;

export default function HeatmapToggle({
  active,
  setActive,
}: {
  active: HeatmapType;
  setActive: React.Dispatch<React.SetStateAction<HeatmapType>>;
}) {
  const types: Exclude<HeatmapType, null>[] = [
    "density",
    "risk",
    "popularity",
  ];

  return (
    <div className="flex gap-3 mb-6 justify-center">
      {types.map((type) => (
        <button
          key={type}
          onClick={() =>
            setActive((prev) => (prev === type ? null : type))
          }
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            active === type
              ? "bg-black text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          {type.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
