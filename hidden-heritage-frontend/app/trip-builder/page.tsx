"use client";

import { useState } from "react";
import TripBuilderForm from "@/app/components/TripBuilderForm";
import TripSummary from "@/app/components/TripSummary";
import { HeritageSite } from "@/app/region/chambal/heritageData";

export default function TripBuilderPage() {
  const [selectedSites, setSelectedSites] = useState<HeritageSite[]>([]);

  return (
    <main className="px-6 py-12 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-6 text-center">
        Build Your Custom Trip
      </h1>

      <div className="grid md:grid-cols-2 gap-10">
        <TripBuilderForm
          selectedSites={selectedSites}
          setSelectedSites={setSelectedSites}
        />

        <TripSummary selectedSites={selectedSites} />
      </div>
    </main>
  );
}
