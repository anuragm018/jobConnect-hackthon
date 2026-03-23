import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in Leaflet with React + Vite
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: iconUrl,
  shadowUrl: shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

export default function MapComponent({ workers = [], containerStyle = { width: '100%', height: '100%', borderRadius: '12px' } }) {
  // Center roughly on Kochi based on our seed data
  const initCenter = [9.9312, 76.2673]; 

  // Adding minimal jitter so multiple markers at same city center don't overlap completely
  const jitter = () => (Math.random() - 0.5) * 0.08;

  return (
    <div style={{ ...containerStyle, position: 'relative', zIndex: 1, borderRadius: '24px', overflow: 'hidden' }}>
      <MapContainer 
        center={initCenter} 
        zoom={12} 
        style={{ width: '100%', height: '100%', zIndex: 1 }}
        scrollWheelZoom={false}
      >
        {/* Dark theme tiles for a premium look matching our glassmorphism UI */}
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        
        {workers.map((worker) => {
          // If real lat/lng isn't in seed data, fallback to generic center with jitter
          const lat = worker.lat || initCenter[0] + jitter();
          const lng = worker.lng || initCenter[1] + jitter();
          
          return (
            <Marker key={worker.id || worker._id} position={[lat, lng]}>
              <Popup>
                <div style={{ padding: '2px', minWidth: '130px', textAlign: 'center' }}>
                  <img src={worker.avatar || worker.img} alt={worker.name} style={{ width: '48px', height: '48px', borderRadius: '50%', marginBottom: '8px', objectFit: 'cover' }} />
                  <h4 style={{ margin: '0 0 4px 0', fontSize: '1.05rem', color: '#1e40af' }}>{worker.name}</h4>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: '#4b5563', fontWeight: '500' }}>{worker.title || worker.role}</p>
                  <p style={{ margin: '8px 0 0 0', fontWeight: '800', color: '#16a34a', fontSize: '1rem' }}>₹{worker.hourlyRate || worker.price || '450'}/hr</p>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
      
      {/* Additional global CSS for popup to override Leaflet default white borders to match glass UI */}
      <style>{`
        .leaflet-popup-content-wrapper {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border-radius: 16px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.15);
          border: 1px solid rgba(0,0,0,0.05);
        }
        .leaflet-popup-tip {
          background: rgba(255, 255, 255, 0.95);
        }
        .leaflet-container {
          background: #1e1e1e; /* Match theme if tiles load slow */
        }
      `}</style>
    </div>
  );
}
