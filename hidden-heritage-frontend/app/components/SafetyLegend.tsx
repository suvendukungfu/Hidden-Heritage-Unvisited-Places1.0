"use client";

/**
 * Safety Legend explains how Safety Readiness Scores work.
 * This is informational, ethical, and government-friendly.
 */

export default function SafetyLegend() {
  const bands = [
    {
      range: "80–100",
      label: "High Readiness",
      color: "bg-green-600",
      description:
        "Well-connected, accessible, and commonly visited. Suitable for most travelers.",
    },
    {
      range: "60–79",
      label: "Moderate",
      color: "bg-yellow-500",
      description:
        "Basic planning recommended. Facilities may be limited in some areas.",
    },
    {
      range: "40–59",
      label: "Caution",
      color: "bg-orange-500",
      description:
        "Remote or less developed. Daytime visits and preparation advised.",
    },
    {
      range: "< 40",
      label: "Low Readiness",
      color: "bg-red-600",
      description:
        "Very remote or infrastructure-limited. Best visited with expert guides.",
    },
  ];

  return (
    <div className="bg-white border rounded-xl p-5 shadow-sm max-w-4xl mx-auto mb-6">
      <h3 className="text-sm font-semibold mb-3 text-gray-800">
        Safety Readiness Guide
      </h3>

      <div className="grid sm:grid-cols-2 gap-4 text-sm">
        {bands.map((band) => (
          <div key={band.range} className="flex gap-3">
            <span
              className={`w-3 h-3 rounded-full mt-1 flex-shrink-0 ${band.color}`}
            />
            <div>
              <div className="font-medium text-gray-800">
                {band.range} — {band.label}
              </div>
              <p className="text-gray-600 leading-snug">
                {band.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs text-gray-500 mt-4 leading-relaxed">
        Safety Readiness Scores are calculated using multiple indicators such as
        accessibility, lighting, proximity to facilities, road conditions, and
        aggregated visitor feedback. These scores help travelers plan responsibly
        and do not restrict access to any location.
      </p>
    </div>
  );
}
