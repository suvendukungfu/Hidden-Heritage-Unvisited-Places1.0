"use client";

export default function HeatmapToggle({
  active,
  setActive,
}: {
  active: string | null;
  setActive: (v: string | null) => void;
}) {
  const options = [
    { key: "density", label: "Density" },
    { key: "risk", label: "Risk" },
    { key: "popularity", label: "Popularity" },
  ];

  return (
    <div className="flex gap-2 mb-4 justify-center">
      {options.map((opt) => (
        <button
          key={opt.key}
          onClick={() =>
            setActive(active === opt.key ? null : opt.key)
          }
          className={`px-4 py-2 rounded-full text-sm font-medium border ${
            active === opt.key
              ? "bg-orange-600 text-white border-orange-600"
              : "bg-white text-gray-700 border-gray-300"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

