"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { useEffect } from "react";
import L from "leaflet";
import HeatmapLayer from "./HeatmapLayer";
import { HeritageSite } from "@/app/region/chambal/heritageData";

// --------------------
// Marker Icons
// --------------------
const defaultIcon = new L.Icon({
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const activeIcon = new L.Icon({
  iconUrl:
    "https://maps.google.com/mapfiles/ms/icons/orange-dot.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

// --------------------
// Map fly-to helper
// --------------------
function FlyTo({ focusLocation }: { focusLocation: any }) {
  const map = useMap();

  useEffect(() => {
    if (focusLocation) {
      map.flyTo(
        [focusLocation.lat, focusLocation.lng],
        focusLocation.zoom,
        { duration: 1.5 }
      );
    }
  }, [focusLocation, map]);

  return null;
}

// --------------------
// Main Map Component
// --------------------
export default function ChambalMap({
  sites,
  activeSiteId,
  focusLocation,
  heatmapType,
  onMarkerClick,
}: {
  sites: HeritageSite[];
  activeSiteId: string | null;
  focusLocation: any;
  heatmapType: "density" | "risk" | "popularity" | null;
  onMarkerClick: (site: HeritageSite) => void;
}) {
  return (
    <MapContainer
      center={[26.7, 78.8]}
      zoom={7}
      scrollWheelZoom
      className="h-[450px] w-full rounded-xl"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="© OpenStreetMap contributors"
      />

      {/* Fly-to on selection */}
      <FlyTo focusLocation={focusLocation} />

      {/* 🔥 Heatmap Layer */}
      {heatmapType && (
        <HeatmapLayer sites={sites} type={heatmapType} />
      )}

      {/* 🧭 Clustered Markers */}
      <MarkerClusterGroup
        chunkedLoading
        spiderfyOnMaxZoom
        showCoverageOnHover={false}
        maxClusterRadius={50}
        iconCreateFunction={(cluster) => {
          const count = cluster.getChildCount();

          let size = "small";
          if (count >= 10 && count < 25) size = "medium";
          if (count >= 25) size = "large";

          return L.divIcon({
            html: `<span>${count}</span>`,
            className: `heritage-cluster ${size}`,
            iconSize: L.point(40, 40, true),
          });
        }}
      >
        {sites.map((site) => (
          <Marker
            key={site.id}
            position={[site.lat, site.lng]}
            icon={
              site.id === activeSiteId ? activeIcon : defaultIcon
            }
            eventHandlers={{
              click: () => onMarkerClick(site),
            }}
          >
            <Popup>
              <strong>{site.name}</strong>
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
}
