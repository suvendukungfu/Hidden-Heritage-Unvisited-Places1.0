"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import L from "leaflet";
import { HeritageSite } from "@/app/region/chambal/heritageData";

type FocusLocation = {
  lat: number;
  lng: number;
  zoom: number;
} | null;

function FlyToLocation({ focus }: { focus: FocusLocation }) {
  const map = useMap();

  useEffect(() => {
    if (focus) {
      map.flyTo([focus.lat, focus.lng], focus.zoom, {
        duration: 1.5,
      });
    }
  }, [focus, map]);

  return null;
}

// Fix Leaflet marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export default function ChambalMap({
  sites,
  focusLocation,
}: {
  sites: HeritageSite[];
  focusLocation: FocusLocation;
}) {
  return (
    <MapContainer
      center={[26.5, 78.0]}
      zoom={7}
      scrollWheelZoom={false}
      className="h-[450px] w-full rounded-xl"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="© OpenStreetMap contributors"
      />

      <FlyToLocation focus={focusLocation} />

      {sites.map((site) => (
        <Marker
          key={site.id}
          position={[site.location.lat, site.location.lng]}
        >
          <Popup>
            <strong>{site.name}</strong>
            <br />
            {site.category}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
