"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

// Fix marker icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export default function ChambalMap() {
  return (
    <MapContainer
      center={[26.5, 78.3]} // Chambal region center
      zoom={7}
      scrollWheelZoom={true}
      className="h-[450px] w-full rounded-xl"
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Bateshwar Temples */}
      <Marker position={[26.22, 78.24]}>
        <Popup>
          <strong>Bateshwar Temples</strong>
          <br />
          Ancient temple complex (8th–10th century)
        </Popup>
      </Marker>

      {/* Chambal Ravines */}
      <Marker position={[26.6, 78.5]}>
        <Popup>
          <strong>Chambal Ravines</strong>
          <br />
          Unique geological landscape
        </Popup>
      </Marker>
    </MapContainer>
  );
}
