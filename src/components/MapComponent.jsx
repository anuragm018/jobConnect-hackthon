import React from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';

// A premium dark theme for Google Maps to match our aesthetics
const darkMapStyle = [
  { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#38414e" }],
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [{ color: "#212a37" }],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [{ color: "#9ca5b3" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#17263c" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [{ color: "#515c6d" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.stroke",
    stylers: [{ color: "#17263c" }],
  },
];

export default function MapComponent({ workers, containerStyle = { width: '100%', height: '100%', borderRadius: '12px' } }) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    // In production, use environment variables: import.meta.env.VITE_GOOGLE_MAPS_API_KEY
    googleMapsApiKey: "" // Providing empty loads the map in development mode (watermarked)
  });

  const [activeMarker, setActiveMarker] = React.useState(null);

  // default center somewhere generic like NY for demo purposes
  const initCenter = { lat: 40.7128, lng: -74.0060 };

  if (!isLoaded) {
    return (
      <div style={{ width: containerStyle.width, height: containerStyle.height, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-secondary)', borderRadius: containerStyle.borderRadius }}>
        <span style={{ color: 'var(--text-secondary)' }}>Loading Maps...</span>
      </div>
    );
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={initCenter}
      zoom={13}
      options={{
        styles: darkMapStyle,
        disableDefaultUI: true,
        zoomControl: true,
      }}
    >
      {workers.map((worker) => (
         <Marker
           key={worker.id}
           position={{ lat: worker.lat || initCenter.lat + (Math.random() - 0.5) * 0.05, lng: worker.lng || initCenter.lng + (Math.random() - 0.5) * 0.05 }}
           onClick={() => setActiveMarker(worker.id)}
           animation={window.google.maps.Animation.DROP}
         />
      ))}

      {activeMarker && (
        <InfoWindow
          position={{ 
            lat: workers.find(w => w.id === activeMarker)?.lat || initCenter.lat, 
            lng: workers.find(w => w.id === activeMarker)?.lng || initCenter.lng 
          }}
          onCloseClick={() => setActiveMarker(null)}
        >
          <div style={{ color: '#000', padding: '4px', minWidth: '150px' }}>
            <h4 style={{ margin: '0 0 4px 0', fontSize: '1rem' }}>{workers.find(w => w.id === activeMarker)?.name}</h4>
            <p style={{ margin: 0, fontSize: '0.85rem' }}>{workers.find(w => w.id === activeMarker)?.title}</p>
            <p style={{ margin: '4px 0 0 0', fontWeight: 'bold' }}>${workers.find(w => w.id === activeMarker)?.hourlyRate}/hr</p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}
