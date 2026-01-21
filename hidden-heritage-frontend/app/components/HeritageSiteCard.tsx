"use client";

import { HeritageSite } from "@/app/region/chambal/heritageData";

/**
 * Convert riskScore (0–1) → Safety Readiness metadata
 */
const getSafetyMeta = (riskScore: number) => {
  const score = Math.round((1 - riskScore) * 100);

  if (score >= 80)
    return { label: "High Readiness", color: "bg-green-600", score };
  if (score >= 60)
    return { label: "Moderate", color: "bg-yellow-500", score };
  if (score >= 40)
    return { label: "Caution", color: "bg-orange-500", score };

  return { label: "Low Readiness", color: "bg-red-600", score };
};

export default function HeritageSiteCard({
  site,
  isActive,
  onClick,
}: {
  site: HeritageSite;
  isActive: boolean;
  onClick: () => void;
}) {
  const safety = getSafetyMeta(site.riskScore);

  return (
    <div
      id={`site-${site.id}`}
      onClick={onClick}
      className={`cursor-pointer rounded-xl border p-5 transition-all ${
        isActive
          ? "border-orange-600 ring-2 ring-orange-400 bg-orange-50"
          : "border-gray-200 hover:shadow-lg"
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-lg font-semibold leading-tight">
          {site.name}
        </h3>

        <span
          className={`text-xs px-2 py-1 rounded-full text-white ${safety.color}`}
          title={`Safety Readiness Score: ${safety.score}/100`}
        >
          {safety.label}
        </span>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 mb-3">
        {site.description}
      </p>

      {/* Footer */}
      <div className="flex justify-between text-xs text-gray-500">
        <span>
          Safety Score:{" "}
          <strong className="text-gray-700">
            {safety.score}/100
          </strong>
        </span>
        <span className="italic">Tap to explore on map</span>
      </div>
    </div>
  );
}
