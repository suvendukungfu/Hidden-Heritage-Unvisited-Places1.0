"use client";

import dynamic from "next/dynamic";
import { HeritageSite } from "@/app/region/chambal/heritageData";

const ChambalMap = dynamic(() => import("./ChambalMap"), {
  ssr: false,
});

export default function ChambalMapWrapper({
  sites,
  focusLocation,
  activeSiteId,
}: {
  sites: HeritageSite[];
  focusLocation: any;
  activeSiteId: string | null;
}) {
  return (
    <ChambalMap
      sites={sites}
      focusLocation={focusLocation}
      activeSiteId={activeSiteId}
    />
  );
}
