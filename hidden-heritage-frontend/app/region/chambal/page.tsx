"use client";

import { useState } from "react";
import ChambalMap from "@/app/components/ChambalMap";
import HeritageSiteCard from "@/app/components/HeritageSiteCard";
import {
  chambalHeritageSites,
  HeritageSite,
} from "./heritageData";

export default function ChambalRegionPage() {
  const [focusLocation, setFocusLocation] = useState<{
    lat: number;
    lng: number;
    zoom: number;
  } | null>(null);

  return (
    <main className="px-8 py-16">
      {/* Header */}
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Chambal Region</h1>
        <p className="max-w-3xl mx-auto text-gray-600">
          The Chambal region is a land of mystery and forgotten heritage,
          featuring ancient temples, dramatic ravines, and prehistoric history.
        </p>
      </section>

      {/* Map */}
      <section className="max-w-6xl mx-auto mb-20">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Interactive Map
        </h2>

        <ChambalMap
          sites={chambalHeritageSites}
          focusLocation={focusLocation}
        />
      </section>

      {/* Heritage Cards */}
      <section className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold mb-10 text-center">
          Heritage Sites
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {chambalHeritageSites.map((site: HeritageSite) => (
            <HeritageSiteCard
              key={site.id}
              site={site}
              onClick={() =>
                setFocusLocation({
                  lat: site.location.lat,
                  lng: site.location.lng,
                  zoom: 10,
                })
              }
            />
          ))}
        </div>
      </section>
    </main>
  );
}
