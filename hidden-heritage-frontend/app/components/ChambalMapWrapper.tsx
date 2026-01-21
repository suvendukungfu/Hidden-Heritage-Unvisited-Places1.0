"use client";

import dynamic from "next/dynamic";
import { HeritageSite } from "@/app/region/chambal/heritageData";

type FocusLocation = {
  lat: number;
  lng: number;
  zoom: number;
} | null;

const ChambalMap = dynamic(() => import("./ChambalMap"), {
  ssr: false,
});

export default function ChambalMapWrapper({
  sites,
  focusLocation,
  activeSiteId,
  onMarkerClick,
  heatmapType = null,
}: {
  sites: HeritageSite[];
  focusLocation: FocusLocation;
  activeSiteId: string | null;
  onMarkerClick: (site: HeritageSite) => void;
  heatmapType?: "density" | "risk" | "popularity" | null;
}) {
  return (
    <ChambalMap
      sites={sites}
      focusLocation={focusLocation}
      activeSiteId={activeSiteId}
      heatmapType={heatmapType}
      onMarkerClick={onMarkerClick}
    />
  );
}
