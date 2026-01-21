"use client";

import { SafetyFactors } from "@/app/region/chambal/heritageData";

const factorLabel = {
  lighting: "Lighting & visibility",
  roadAccess: "Road accessibility",
  emergencyAccess: "Emergency facilities nearby",
  mobileNetwork: "Mobile network availability",
  visitorFeedback: "Visitor feedback & sentiment",
};

export default function SafetyBreakdown({
  factors,
}: {
  factors: SafetyFactors;
}) {
  return (
    <div className="mt-3 border-t pt-3 space-y-2 text-sm">
      <p className="text-xs text-gray-500 mb-1">
        Safety readiness is estimated using the following indicators:
      </p>

      {Object.entries(factors).map(([key, value]) => (
        <div key={key} className="flex items-center gap-3">
          <span className="w-44 text-gray-600">
            {factorLabel[key as keyof SafetyFactors]}
          </span>

          <div className="flex-1 bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-600 h-2 rounded-full"
              style={{ width: `${Math.round((value as number) * 100)}%` }}
            />
          </div>

          <span className="w-10 text-right text-xs text-gray-700">
            {Math.round((value as number) * 100)}%
          </span>
        </div>
      ))}

      <p className="text-[11px] text-gray-400 pt-2">
        These indicators are derived from infrastructure data, accessibility,
        public sources, and aggregated visitor feedback. Scores guide planning
        and do not restrict access.
      </p>
    </div>
  );
}
