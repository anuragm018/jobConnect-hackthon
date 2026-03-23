import React from 'react';
import { MapPin, Star, Users, Briefcase, MessageSquare, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function WorkerCard({ worker }) {
  const navigate = useNavigate();

  const renderBadge = (score) => {
    if (!score || score <= 0) return null;
    if (score >= 10) return <span style={{ background: 'linear-gradient(45deg, #f59e0b, #fbbf24)', color: '#000', fontSize: '0.65rem', padding: '2px 8px', borderRadius: '10px', fontWeight: 'bold', boxShadow: '0 0 15px rgba(245, 158, 11, 0.6)', marginLeft: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}><Award size={10}/> Top Expert</span>;
    if (score >= 5) return <span style={{ background: 'linear-gradient(45deg, #a855f7, #ec4899)', color: '#fff', fontSize: '0.65rem', padding: '2px 8px', borderRadius: '10px', fontWeight: 'bold', boxShadow: '0 0 12px rgba(168, 85, 247, 0.6)', marginLeft: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}><Award size={10}/> Rising Pro</span>;
    return <span style={{ background: 'rgba(59,130,246,0.15)', color: '#3b82f6', fontSize: '0.65rem', padding: '2px 8px', borderRadius: '10px', fontWeight: 'bold', border: '1px solid #3b82f6', marginLeft: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}>Helpful</span>;
  };

  return (
    <div className="glass-panel" style={{ padding: '24px', cursor: 'pointer', transition: 'all 0.3s ease', display: 'flex', flexDirection: 'column', gap: '16px' }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.borderColor = 'var(--accent-primary)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.borderColor = 'var(--border-glass)';
      }}
    >
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <img 
          src={worker.avatar} 
          alt={worker.name} 
          style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--accent-primary)' }}
        />
        <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            {worker.name}
            {worker.verified && <span style={{ background: 'rgba(16,185,129,0.1)', color: 'var(--success)', fontSize: '0.7rem', padding: '2px 8px', borderRadius: '12px', fontWeight: '600' }}>Verified</span>}
            {renderBadge(worker.reputationScore)}
          </h3>
          <p style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.9rem' }}>
            <Briefcase size={14} /> {worker.title}
          </p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ color: 'var(--text-primary)', fontWeight: '600', fontSize: '1.1rem' }}>${worker.hourlyRate}/hr</div>
          <div style={{ color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem', justifyContent: 'flex-end', marginTop: '4px' }}>
            <MapPin size={14} /> {worker.distance} mi
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {worker.skills.map(skill => (
          <span key={skill} style={{ background: 'var(--bg-secondary)', color: 'var(--text-secondary)', fontSize: '0.8rem', padding: '4px 12px', borderRadius: '12px', border: '1px solid var(--border-glass)' }}>
            {skill}
          </span>
        ))}
      </div>

      <div style={{ borderTop: '1px solid var(--border-glass)', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.9rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--warning)' }}>
          <Star size={16} fill="currentColor" />
          <span style={{ color: 'var(--text-primary)', fontWeight: '600' }}>{worker.rating}</span>
          <span style={{ color: 'var(--text-secondary)' }}>({worker.reviews})</span>
        </div>
        
        {worker.mutualFriends > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)' }}>
            <Users size={16} />
            <span style={{ color: 'var(--text-primary)', fontWeight: '500' }}>{worker.mutualFriends} friends</span>
          </div>
        )}
      </div>

      <div style={{ marginTop: '8px' }}>
        <button 
          onClick={(e) => { e.stopPropagation(); navigate('/app/messages'); }} 
          className="btn-primary" 
          style={{ width: '100%', padding: '10px 0', fontSize: '0.95rem' }}
        >
          <MessageSquare size={16} /> Message {worker.name.split(' ')[0]}
        </button>
      </div>
    </div>
  );
}
