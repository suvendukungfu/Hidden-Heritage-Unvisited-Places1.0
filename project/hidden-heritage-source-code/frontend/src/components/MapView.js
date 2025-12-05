import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

function ChangeView({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
}

const MapView = ({ sites }) => {
  const [selectedSites, setSelectedSites] = useState([]);
  const [center, setCenter] = useState([26.4, 78.4]);

  useEffect(() => {
    if (sites.length > 0) {
      const avgLat = sites.reduce((sum, site) => sum + site.latitude, 0) / sites.length;
      const avgLng = sites.reduce((sum, site) => sum + site.longitude, 0) / sites.length;
      setCenter([avgLat, avgLng]);
    }
  }, [sites]);

  const handleSiteToggle = (siteId) => {
    setSelectedSites(prev => {
      if (prev.includes(siteId)) {
        return prev.filter(id => id !== siteId);
      } else {
        return [...prev, siteId];
      }
    });
  };

  const selectedSiteCoordinates = sites
    .filter(site => selectedSites.includes(site.id))
    .map(site => [site.latitude, site.longitude]);

  return (
    <div className="map-container" data-testid="map-container">
      <MapContainer center={center} zoom={9} style={{ height: '100%', width: '100%' }}>
        <ChangeView center={center} zoom={9} />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {sites.map((site) => (
          <Marker 
            key={site.id} 
            position={[site.latitude, site.longitude]}
            data-testid={`map-marker-${site.slug}`}
          >
            <Popup>
              <div className="popup-content" data-testid={`popup-${site.slug}`}>
                <img src={site.image} alt={site.name} className="popup-image" />
                <h4 className="popup-title">{site.name}</h4>
                <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>{site.type}</p>
                <div className="popup-checkbox">
                  <label>
                    <input
                      type="checkbox"
                      checked={selectedSites.includes(site.id)}
                      onChange={() => handleSiteToggle(site.id)}
                      data-testid={`map-checkbox-${site.slug}`}
                    />
                    {' '}Select for route
                  </label>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
        
        {selectedSiteCoordinates.length > 1 && (
          <Polyline 
            positions={selectedSiteCoordinates} 
            color="#c86b3a" 
            weight={4}
            opacity={0.7}
            data-testid="route-polyline"
          />
        )}
      </MapContainer>
    </div>
  );
};

export default MapView;
