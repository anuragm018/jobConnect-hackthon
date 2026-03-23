import React from 'react';
import MapComponent from '../components/MapComponent';

// Mock data referencing the same workers
const MOCK_WORKERS = [
  { id: 1, name: 'Abhinav', title: 'Senior Plumber', hourlyRate: 85, lat: 40.7138, lng: -74.0050 },
  { id: 2, name: 'Marcus Chen', title: 'Master Electrician', hourlyRate: 95, lat: 40.7180, lng: -74.0110 },
  { id: 3, name: 'Elena Rodriguez', title: 'Interior Painter', hourlyRate: 45, lat: 40.7050, lng: -74.0080 }
];

export default function MapView() {
  return (
    <div style={{ width: '100%', height: 'calc(100vh - 120px)', position: 'relative' }}>
      
      {/* Floating Header */}
      <div style={{ position: 'absolute', top: '24px', left: '24px', zIndex: 10, background: 'var(--bg-glass)', backdropFilter: 'blur(12px)', padding: '16px 24px', borderRadius: '16px', border: '1px solid var(--border-glass)', boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }}>
        <h1 className="heading-gradient" style={{ fontSize: '1.5rem', marginBottom: '4px' }}>Global Map View</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>Showing 3 pros in your area.</p>
      </div>

      <MapComponent workers={MOCK_WORKERS} containerStyle={{ width: '100%', height: '100%', borderRadius: '16px' }} />
    </div>
  );
}
