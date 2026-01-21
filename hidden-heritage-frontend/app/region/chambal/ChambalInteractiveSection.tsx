"use client";

import { useState } from "react";
import ChambalMap from "@/app/components/ChambalMap";
import HeritageSiteCard from "@/app/components/HeritageSiteCard";
import HeatmapToggle from "@/app/components/HeatmapToggle";
import SafetyLegend from "@/app/components/SafetyLegend";
import SiteDetailModal from "@/app/components/SiteDetailModal";
import { HeritageSite } from "./heritageData";

type FocusLocation = {
  lat: number;
  lng: number;
  zoom: number;
} | null;

export default function ChambalInteractiveSection({
  sites,
}: {
  sites: HeritageSite[];
}) {
  const [activeSiteId, setActiveSiteId] = useState<string | null>(null);
  const [selectedSite, setSelectedSite] =
    useState<HeritageSite | null>(null);

  const [focusLocation, setFocusLocation] =
    useState<FocusLocation>(null);

  const [heatmapType, setHeatmapType] =
    useState<"density" | "risk" | "popularity" | null>(null);

  const selectSite = (site: HeritageSite) => {
    setActiveSiteId(site.id);
    setSelectedSite(site);

    setFocusLocation({
      lat: site.lat,
      lng: site.lng,
      zoom: 13,
    });

    // Scroll card into view
    document
      .getElementById(`site-${site.id}`)
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <>
      {/* 🔥 Heatmap Toggle */}
      <HeatmapToggle
        active={heatmapType}
        setActive={setHeatmapType}
      />

      {/* 🛡️ Safety Legend */}
      <SafetyLegend />

      {/* 🗺️ Map */}
      <section className="max-w-5xl mx-auto mb-12">
        <ChambalMap
          sites={sites}
          activeSiteId={activeSiteId}
          focusLocation={focusLocation}
          heatmapType={heatmapType}
          onMarkerClick={selectSite}
        />
      </section>

      {/* 🏛️ Cards */}
      <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {sites.map((site) => (
          <HeritageSiteCard
            key={site.id}
            site={site}
            isActive={activeSiteId === site.id}
            onClick={() => selectSite(site)}
          />
        ))}
      </section>

      {/* 📖 Site Detail Modal */}
      <SiteDetailModal
        site={selectedSite}
        onClose={() => setSelectedSite(null)}
      />
    </>
  );
}
