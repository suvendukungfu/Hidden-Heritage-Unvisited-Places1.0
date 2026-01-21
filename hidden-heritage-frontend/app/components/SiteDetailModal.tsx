"use client";

import { HeritageSite } from "@/app/region/chambal/heritageData";
import SafetyBreakdown from "./SafetyBreakdown";

export default function SiteDetailModal({
  site,
  onClose,
}: {
  site: HeritageSite | null;
  onClose: () => void;
}) {
  if (!site) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold mb-2">
          {site.name}
        </h2>

        {/* Description */}
        <p className="text-gray-600 mb-4">
          {site.description}
        </p>

        {/* Safety */}
        <SafetyBreakdown factors={site.safetyFactors} />

        {/* Footer actions */}
        <div className="mt-6 flex justify-end gap-3">
          <button className="px-4 py-2 rounded-lg border">
            Save for later
          </button>
          <button className="px-4 py-2 rounded-lg bg-orange-600 text-white">
            Add to Trip
          </button>
        </div>
      </div>
    </div>
  );
}
