import React from 'react';
import { MapPin, Calendar, Receipt, Heart, ClipboardList, ArrowRight } from 'lucide-react';

export default function ProfileView() {
  const activities = [
    {
      id: 1,
      name: 'Ramesh Kumar',
      service: 'Master Plumber',
      status: 'COMPLETED',
      date: 'Oct 24, 2023',
      img: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&w=100&h=100'
    },
    {
      id: 2,
      name: 'Sarah Jacob',
      service: 'Electrical Repair',
      status: 'COMPLETED',
      date: 'Oct 18, 2023',
      img: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=100&h=100'
    }
  ];

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', paddingBottom: '40px' }}>
      
      {/* Profile Header */}
      <div style={{ background: 'linear-gradient(180deg, rgba(238, 242, 255, 0.4) 0%, var(--bg-primary) 100%)', padding: '48px', borderRadius: '24px', display: 'flex', alignItems: 'center', gap: '32px', marginBottom: '40px' }}>
        <img 
          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200" 
          alt="Anjali Nair" 
          style={{ width: '130px', height: '130px', borderRadius: '50%', objectFit: 'cover', border: '4px solid white', boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }} 
        />
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: '800', margin: 0, color: 'var(--text-primary)', letterSpacing: '-0.5px' }}>Anjali Nair</h1>
            <span style={{ background: 'rgba(34, 197, 94, 0.15)', color: '#16a34a', padding: '6px 14px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '6px', letterSpacing: '0.5px' }}>
              <div style={{ width: '6px', height: '6px', background: '#16a34a', borderRadius: '50%' }}></div>
              VERIFIED USER
            </span>
          </div>
          
          <div style={{ display: 'flex', gap: '32px', color: 'var(--text-secondary)', fontSize: '1rem', fontWeight: '500' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><MapPin size={18} color="var(--accent-primary)" strokeWidth={2.5} /> Kochi, Kerala</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Calendar size={18} color="var(--accent-primary)" strokeWidth={2.5} /> Member since May 2023</span>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '56px' }}>
        
        {/* Total Services */}
        <div className="glass-panel" style={{ padding: '32px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-glass)', borderRadius: '20px', border: '1px solid var(--border-glass)', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
          <div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '1rem', fontWeight: '600', marginBottom: '12px' }}>Total Services Booked</div>
            <div style={{ fontSize: '2.8rem', fontWeight: '800', color: '#1e40af', lineHeight: '1' }}>24</div>
          </div>
          <div style={{ width: '56px', height: '56px', background: 'rgba(37, 99, 235, 0.08)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563eb' }}>
            <Receipt size={28} strokeWidth={2.5} />
          </div>
        </div>

        {/* Saved Pro */}
        <div className="glass-panel" style={{ padding: '32px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-glass)', borderRadius: '20px', border: '1px solid var(--border-glass)', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
          <div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '1rem', fontWeight: '600', marginBottom: '12px' }}>Saved Professionals</div>
            <div style={{ fontSize: '2.8rem', fontWeight: '800', color: '#16a34a', lineHeight: '1' }}>12</div>
          </div>
          <div style={{ width: '56px', height: '56px', background: 'rgba(34, 197, 94, 0.1)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#22c55e' }}>
            <Heart size={28} fill="currentColor" color="transparent" />
          </div>
        </div>

        {/* Ongoing */}
        <div className="glass-panel" style={{ padding: '32px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-glass)', borderRadius: '20px', border: '1px solid var(--border-glass)', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
          <div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '1rem', fontWeight: '600', marginBottom: '12px' }}>Ongoing Projects</div>
            <div style={{ fontSize: '2.8rem', fontWeight: '800', color: '#b45309', lineHeight: '1' }}>02</div>
          </div>
          <div style={{ width: '56px', height: '56px', background: 'rgba(249, 115, 22, 0.1)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ea580c' }}>
            <ClipboardList size={28} strokeWidth={2.5} />
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '1.7rem', fontWeight: '800', color: 'var(--text-primary)' }}>Recent Activity</h2>
          <button style={{ background: 'none', border: 'none', color: 'var(--accent-primary)', fontWeight: '700', fontSize: '1rem', cursor: 'pointer', display: 'flex', gap: '8px', alignItems: 'center' }}>
            View All <ArrowRight size={18} strokeWidth={2.5} />
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {activities.map(act => (
            <div key={act.id} className="glass-panel" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 32px', borderRadius: '20px', border: '1px solid var(--border-glass)', boxShadow: '0 4px 15px rgba(0,0,0,0.02)', transition: 'transform 0.2s', cursor: 'pointer', flexWrap: 'wrap', gap: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                <img src={act.img} alt={act.name} style={{ width: '80px', height: '80px', borderRadius: '16px', objectFit: 'cover' }} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--text-primary)' }}>{act.name}</div>
                  <div style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>Service: <span style={{ color: 'var(--text-primary)', fontWeight: '600' }}>{act.service}</span></div>
                  <div style={{ background: 'rgba(34, 197, 94, 0.15)', color: '#16a34a', padding: '4px 12px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: '800', display: 'inline-block', alignSelf: 'flex-start', letterSpacing: '0.5px' }}>
                    {act.status}
                  </div>
                </div>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '24px' }}>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', fontWeight: '600' }}>{act.date}</div>
                <div style={{ display: 'flex', gap: '16px' }}>
                  <button style={{ background: 'rgba(99, 102, 241, 0.1)', color: 'var(--accent-primary)', border: 'none', padding: '10px 24px', borderRadius: '24px', fontWeight: '700', cursor: 'pointer', fontSize: '0.95rem', transition: 'background 0.2s' }}>
                    Rebook
                  </button>
                  <button className="btn-outline" style={{ background: 'transparent', color: 'var(--text-secondary)', border: '1.5px solid var(--border-glass)', padding: '10px 24px', borderRadius: '24px', fontWeight: '600', cursor: 'pointer', fontSize: '0.95rem', transition: 'all 0.2s' }}>
                    Leave Review
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
