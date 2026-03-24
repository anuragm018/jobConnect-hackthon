import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase, UserSearch, ArrowRight } from 'lucide-react';

export default function RoleSelection() {
  const navigate = useNavigate();

  return (
    <div className="page-container">
      <div className="glass-panel" style={{ padding: '40px', maxWidth: '600px', width: '100%', textAlign: 'center' }}>
        <h1 className="heading-gradient" style={{ fontSize: '2.5rem', marginBottom: '12px' }}>Welcome to JobConnect</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '40px', fontSize: '1.1rem' }}>
          How would you like to use our platform today?
        </p>

        <div style={{ display: 'grid', gap: '24px', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
          {/* User Option */}
          <div 
            className="glass-panel" 
            style={{ padding: '32px 24px', cursor: 'pointer', transition: 'all 0.3s ease', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            onClick={() => navigate('/login/customer')}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--accent-primary)'}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border-glass)'}
          >
            <div style={{ background: 'rgba(99,102,241,0.1)', padding: '16px', borderRadius: '50%', marginBottom: '20px' }}>
              <UserSearch size={32} color="var(--accent-primary)" />
            </div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>I am a User</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '24px' }}>
              Find trusted local professionals, recommended by your friends.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-primary)', fontWeight: '600', marginTop: 'auto' }}>
              User Profile <ArrowRight size={16} />
            </div>
          </div>

          {/* Worker Option */}
          <div 
            className="glass-panel" 
            style={{ padding: '32px 24px', cursor: 'pointer', transition: 'all 0.3s ease', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            onClick={() => navigate('/login/worker')}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--success)'}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border-glass)'}
          >
            <div style={{ background: 'rgba(16,185,129,0.1)', padding: '16px', borderRadius: '50%', marginBottom: '20px' }}>
              <Briefcase size={32} color="var(--success)" />
            </div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>I want to Work</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '24px' }}>
              Offer your skills, team up with others, and build a stellar local reputation.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--success)', fontWeight: '600', marginTop: 'auto' }}>
              Worker Profile <ArrowRight size={16} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
