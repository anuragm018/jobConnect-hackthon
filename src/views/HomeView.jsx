import React, { useState } from 'react';
import WorkerCard from '../components/WorkerCard';
import MapComponent from '../components/MapComponent';
import { Map as MapIcon, List, Search } from 'lucide-react';

// Mock Data
const MOCK_WORKERS = [
  {
    id: 1,
    name: 'Abhinav',
    title: 'Senior Plumber',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=100&h=100',
    distance: 0.8,
    hourlyRate: 85,
    rating: 4.9,
    reviews: 124,
    verified: true,
    mutualFriends: 3,
    skills: ['Plumbing', 'Pipe fitting', 'Emergency repair']
  },
  {
    id: 2,
    name: 'Marcus Chen',
    title: 'Master Electrician',
    avatar: 'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?auto=format&fit=crop&q=80&w=100&h=100',
    distance: 1.2,
    hourlyRate: 95,
    rating: 4.8,
    reviews: 89,
    verified: true,
    mutualFriends: 1,
    skills: ['Wiring', 'Panel Upgrades', 'Smart Home']
  },
  {
    id: 3,
    name: 'Elena Rodriguez',
    title: 'Interior Painter',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=100&h=100',
    distance: 2.5,
    hourlyRate: 45,
    rating: 4.7,
    reviews: 56,
    verified: false,
    mutualFriends: 0,
    skills: ['Interior Painting', 'Cabinet Refinishing', 'Drywall Repair']
  }
];

export default function HomeView() {
  const [viewMode, setViewMode] = useState('list'); // 'list' | 'map'
  const [searchQuery, setSearchQuery] = useState('');

  const filteredWorkers = MOCK_WORKERS.filter(worker => {
    if (!searchQuery) return true;
    const lowerQuery = searchQuery.toLowerCase();
    return (
      worker.name.toLowerCase().includes(lowerQuery) ||
      worker.title.toLowerCase().includes(lowerQuery) ||
      worker.skills.some(skill => skill.toLowerCase().includes(lowerQuery))
    );
  });

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 className="heading-gradient" style={{ fontSize: '2rem', marginBottom: '8px' }}>Nearby Pros</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Based on your location & social network</p>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ display: 'flex', background: 'var(--bg-glass)', borderRadius: '12px', padding: '4px', border: '1px solid var(--border-glass)' }}>
            <button 
              onClick={() => setViewMode('list')}
              style={{ padding: '8px 16px', borderRadius: '8px', border: 'none', background: viewMode === 'list' ? 'var(--accent-primary)' : 'transparent', color: viewMode === 'list' ? 'white' : 'var(--text-secondary)', cursor: 'pointer', transition: 'all 0.2s ease', display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <List size={16} /> List
            </button>
            <button 
              onClick={() => setViewMode('map')}
              style={{ padding: '8px 16px', borderRadius: '8px', border: 'none', background: viewMode === 'map' ? 'var(--accent-primary)' : 'transparent', color: viewMode === 'map' ? 'white' : 'var(--text-secondary)', cursor: 'pointer', transition: 'all 0.2s ease', display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <MapIcon size={16} /> Map
            </button>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div style={{ position: 'relative', marginBottom: '24px' }}>
        <div style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }}>
          <Search size={20} />
        </div>
        <input 
          type="text" 
          placeholder="Search for plumbers, painters, or specific skills..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="input-field"
          style={{ paddingLeft: '48px', height: '56px', fontSize: '1.05rem', background: 'var(--bg-glass)', backdropFilter: 'blur(12px)', border: '1px solid var(--border-glass)' }}
        />
      </div>

      {viewMode === 'list' ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {filteredWorkers.sort((a,b) => a.distance - b.distance).map(worker => (
            <WorkerCard key={worker.id} worker={worker} />
          ))}
          {filteredWorkers.length === 0 && (
            <div style={{ textAlign: 'center', padding: '48px 0', color: 'var(--text-secondary)' }}>
              No matches found for "{searchQuery}".
            </div>
          )}
        </div>
      ) : (
        <div className="glass-panel" style={{ height: '600px', padding: '0', overflow: 'hidden', border: '1px solid var(--border-glass)' }}>
          <MapComponent workers={filteredWorkers} containerStyle={{ width: '100%', height: '100%' }} />
        </div>
      )}
    </div>
  );
}
