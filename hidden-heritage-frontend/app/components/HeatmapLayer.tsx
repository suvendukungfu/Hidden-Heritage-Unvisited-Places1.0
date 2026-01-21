"use client";

import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet.heat";
import { HeritageSite } from "@/app/region/chambal/heritageData";

export default function HeatmapLayer({
  sites,
  type,
}: {
  sites: HeritageSite[];
  type: "density" | "risk" | "popularity";
}) {
  const map = useMap();

  useEffect(() => {
    const points = sites.map((site) => {
      let intensity = 0;

      if (type === "density") intensity = site.densityScore;
      if (type === "risk") intensity = site.riskScore;
      if (type === "popularity") intensity = site.popularityScore;

      return [site.lat, site.lng, intensity];
    });

    // @ts-ignore
    const heatLayer = L.heatLayer(points, {
      radius: 30,
      blur: 25,
      maxZoom: 12,
      gradient:
        type === "risk"
          ? { 0.2: "green", 0.6: "orange", 0.9: "red" }
          : { 0.2: "blue", 0.6: "orange", 0.9: "red" },
    }).addTo(map);

    return () => {
      map.removeLayer(heatLayer);
    };
  }, [map, sites, type]);

  return null;
}
