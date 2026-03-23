import React, { useState } from 'react';
import WorkerCard from '../components/WorkerCard';
import MapComponent from '../components/MapComponent';
import { Map as MapIcon, List, Search, Users } from 'lucide-react';

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

const ACTIVE_EXPERTS = [
  { name: 'Rahul V.', img: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=100&h=100' },
  { name: 'Sneha M.', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100' },
  { name: 'Ananth K.', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100' },
  { name: 'Priya S.', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&h=100' },
  { name: 'John D.', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&h=100' },
  { name: 'Maria R.', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100' },
  { name: 'Arjun P.', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&h=100' },
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
    <div style={{ maxWidth: '1000px', margin: '0 auto', paddingBottom: '40px' }}>
      
      {/* Hero Banner */}
      <div style={{ background: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)', borderRadius: '24px', padding: '48px', color: 'white', position: 'relative', overflow: 'hidden', marginBottom: '48px', boxShadow: '0 20px 40px rgba(37,99,235,0.2)' }}>
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '600px' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: '800', lineHeight: '1.15', marginBottom: '24px', letterSpacing: '-0.5px' }}>
            Find the perfect expert,<br/>
            <span style={{ color: '#4ade80' }}>right in your street.</span>
          </h1>
          <p style={{ fontSize: '1.1rem', opacity: 0.9, lineHeight: '1.6', marginBottom: '32px' }}>
            Connect with verified plumbers, tutors, developers, and more in Kochi's growing digital neighborhood.
          </p>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <button style={{ background: 'white', color: '#1e40af', padding: '14px 28px', borderRadius: '30px', fontWeight: '700', fontSize: '1rem', border: 'none', cursor: 'pointer', transition: 'transform 0.2s', boxShadow: '0 4px 15px rgba(255,255,255,0.2)' }}>
              Explore Experts
            </button>
            <button style={{ background: '#1e3a8a', color: 'white', padding: '14px 28px', borderRadius: '30px', fontWeight: '700', fontSize: '1rem', border: 'none', cursor: 'pointer', transition: 'background 0.2s', ':hover': { background: '#172554' } }}>
              Post a Service
            </button>
          </div>
        </div>
        
        {/* Abstract Background Graphic representing the photo */}
        <div style={{ position: 'absolute', right: '-10%', top: '-20%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 60%)', borderRadius: '50%', zIndex: 1 }}></div>
        <div style={{ position: 'absolute', right: '40px', bottom: '20px', zIndex: 1, opacity: 0.15 }}>
          <Users size={300} color="white" />
        </div>
      </div>

      {/* Active Experts Nearby */}
      <div style={{ marginBottom: '48px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '24px' }}>
          <div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: '700', marginBottom: '4px' }}>Active Experts Nearby</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Real-time availability in Kochi</p>
          </div>
          <button onClick={() => setViewMode('map')} style={{ background: 'none', border: 'none', color: 'var(--accent-primary)', fontWeight: '600', cursor: 'pointer', fontSize: '0.95rem' }}>
            View Map
          </button>
        </div>

        <div style={{ display: 'flex', gap: '24px', overflowX: 'auto', paddingBottom: '16px', scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}>
          {ACTIVE_EXPERTS.map((expert, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', minWidth: '80px', flexShrink: 0 }}>
              <div style={{ position: 'relative' }}>
                <img src={expert.img} alt={expert.name} style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--bg-primary)' }} />
                <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: '#4ade80', border: '3px solid var(--bg-primary)', position: 'absolute', bottom: '2px', right: '2px' }}></div>
              </div>
              <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-primary)' }}>{expert.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Trusted in your Neighborhood */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: '700', marginBottom: '8px' }}>Trusted in your Neighborhood</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: '400px', lineHeight: '1.4' }}>Hand-picked experts based on community ratings and successful connections.</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(99,102,241,0.1)', padding: '10px 20px', borderRadius: '24px', border: '1px solid rgba(99,102,241,0.2)', fontSize: '0.9rem', fontWeight: '600', color: 'var(--accent-primary)' }}>
            <Users size={16} /> 500+ Verified Locally
          </div>
        </div>

        {/* Existing Search and List/Map Toggle Integration */}
        <div style={{ display: 'flex', gap: '16px', marginBottom: '32px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', flex: '1 1 300px' }}>
            <div style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }}>
              <Search size={20} />
            </div>
            <input 
              type="text" 
              placeholder="Search for plumbers, painters, or specific skills..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field"
              style={{ paddingLeft: '48px', height: '52px', fontSize: '1rem', background: 'var(--bg-glass)', backdropFilter: 'blur(12px)', border: '1px solid var(--border-glass)', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}
            />
          </div>
          <div style={{ display: 'flex', background: 'var(--bg-glass)', borderRadius: '16px', padding: '6px', border: '1px solid var(--border-glass)', height: '52px', alignItems: 'center', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
            <button 
              onClick={() => setViewMode('list')}
              style={{ padding: '8px 20px', borderRadius: '10px', border: 'none', background: viewMode === 'list' ? 'var(--accent-primary)' : 'transparent', color: viewMode === 'list' ? 'white' : 'var(--text-secondary)', cursor: 'pointer', transition: 'all 0.2s ease', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: viewMode === 'list' ? '600' : '500' }}
            >
              <List size={18} /> List
            </button>
            <button 
              onClick={() => setViewMode('map')}
              style={{ padding: '8px 20px', borderRadius: '10px', border: 'none', background: viewMode === 'map' ? 'var(--accent-primary)' : 'transparent', color: viewMode === 'map' ? 'white' : 'var(--text-secondary)', cursor: 'pointer', transition: 'all 0.2s ease', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: viewMode === 'map' ? '600' : '500' }}
            >
              <MapIcon size={18} /> Map
            </button>
          </div>
        </div>

        {/* The List/Map Rendering from before */}
        {viewMode === 'list' ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
            {filteredWorkers.sort((a,b) => a.distance - b.distance).map(worker => (
              <WorkerCard key={worker.id} worker={worker} />
            ))}
            {filteredWorkers.length === 0 && (
              <div style={{ textAlign: 'center', padding: '48px 0', color: 'var(--text-secondary)', gridColumn: '1 / -1' }}>
                No matches found for "{searchQuery}".
              </div>
            )}
          </div>
        ) : (
          <div className="glass-panel" style={{ height: '500px', padding: '0', overflow: 'hidden', border: '1px solid var(--border-glass)', borderRadius: '24px' }}>
            <MapComponent workers={filteredWorkers} containerStyle={{ width: '100%', height: '100%' }} />
          </div>
        )}
      </div>

    </div>
  );
}
