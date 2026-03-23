import React, { useState } from 'react';
import { Plus, Users, Share2, MoreVertical, Bell } from 'lucide-react';

export default function CollaborationHub() {
  const [requests, setRequests] = useState([
    {
      id: 1,
      type: 'URGENT',
      time: '2 mins ago',
      content: "I'm on a site in Aluva, need a Painter for immediate internal work.",
      author: 'Joseph Kurian',
      role: 'Civil Contractor',
      actionText: 'Reply',
      color: 'var(--accent-primary)'
    },
    {
      id: 2,
      type: 'UPCOMING',
      time: '1 hr ago',
      content: "Looking for 2 Electricians for a luxury villa project near Fort Kochi next Tuesday.",
      author: 'Anwar S.',
      role: 'Interior Designer',
      actionText: 'Inquire',
      color: 'var(--success)'
    },
    {
      id: 3,
      type: 'HELP NEEDED',
      time: '3 hrs ago',
      content: "Anyone has a heavy-duty tile cutter near Edapally? Mine just broke down mid-job.",
      author: 'Suresh Gopi',
      role: 'Tile & Flooring',
      actionText: 'I can help',
      color: 'var(--warning)',
      hasImage: true
    }
  ]);

  const collaborators = [
    { name: 'Arjun Mehra', role: 'Master Plumber', distance: '0.5km', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&h=100' },
    { name: 'Sarah Thomas', role: 'Carpenter', distance: '1.2km', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100' },
    { name: 'Leo Das', role: 'Mason', distance: '2.0km', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=100&h=100' }
  ];

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', gap: '32px', padding: '24px 0', flexWrap: 'wrap' }}>
      
      {/* Left Main Content */}
      <div style={{ flex: '1 1 600px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 className="heading-gradient" style={{ fontSize: '2.2rem', marginBottom: '8px' }}>Collaboration Hub</h1>
            <p style={{ color: 'var(--text-secondary)' }}>Real-time site requests from your neighborhood</p>
          </div>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <button className="glass-panel" style={{ padding: '12px', borderRadius: '50%', display: 'flex', border: '1px solid var(--border-glass)', cursor: 'pointer' }}>
              <Bell size={20} color="var(--text-primary)" />
            </button>
            <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--success)', border: 'none', boxShadow: '0 4px 15px rgba(16,185,129,0.3)' }}>
              <Plus size={18} /> Post a Request
            </button>
          </div>
        </div>

        {/* Requests List */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-primary)' }}>
              <div style={{ width: '4px', height: '18px', background: 'var(--accent-primary)', borderRadius: '4px' }}></div>
              Active Site Requests
            </h2>
            <div style={{ display: 'flex', gap: '24px', fontSize: '0.9rem' }}>
              <span style={{ color: 'var(--text-primary)', fontWeight: '600', borderBottom: '2px solid var(--text-primary)', paddingBottom: '4px', cursor: 'pointer' }}>Today</span>
              <span style={{ color: 'var(--text-secondary)', paddingBottom: '4px', cursor: 'pointer' }}>This Week</span>
            </div>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
            {requests.map(req => (
              <div key={req.id} className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px', position: 'relative' }}>
                <MoreVertical size={18} style={{ position: 'absolute', top: '24px', right: '24px', color: 'var(--text-secondary)', cursor: 'pointer' }} />
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  <span style={{ color: req.color, background: `${req.color}15`, padding: '4px 10px', borderRadius: '12px', border: `1px solid ${req.color}30` }}>{req.type}</span>
                  <span style={{ color: 'var(--text-secondary)', fontWeight: 'normal' }}>{req.time}</span>
                </div>

                <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: 'var(--text-primary)', flex: 1, fontWeight: '500' }}>
                  "{req.content}"
                </p>

                {req.hasImage && (
                  <div style={{ height: '100px', background: 'var(--bg-secondary)', borderRadius: '12px', border: '1px solid var(--border-glass)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                     {/* Simplified proxy for the heavy duty tile cutter image */}
                     <div style={{ width: '100%', height: '100%', background: 'linear-gradient(45deg, var(--bg-primary) 0%, rgba(16,185,129,0.2) 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                       <span style={{ opacity: 0.5, fontSize: '0.8rem' }}>Image Attachment</span>
                     </div>
                  </div>
                )}

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Users size={18} color="var(--text-secondary)" />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.95rem', fontWeight: '600' }}>{req.author}</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{req.role}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginTop: '4px' }}>
                  <button className="btn-primary" style={{ flex: 1, padding: '12px 0', background: req.type === 'HELP NEEDED' ? 'var(--success)' : 'var(--accent-primary)', border: 'none', fontWeight: '600' }}>
                    {req.actionText}
                  </button>
                  <button className="glass-panel" style={{ padding: '12px', display: 'flex', border: 'none', background: 'rgba(255,255,255,0.03)', cursor: 'pointer' }}>
                    <Share2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div style={{ flex: '1 1 300px', maxWidth: '380px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        {/* Collaborators List */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '1.15rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
              Collaborators <span style={{ background: 'rgba(16,185,129,0.2)', color: 'var(--success)', fontSize: '0.75rem', padding: '2px 8px', borderRadius: '12px' }}>12</span>
            </h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--success)', boxShadow: '0 0 8px var(--success)' }}></div>
              Online Nearby
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {collaborators.map((c, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <img src={c.avatar} alt={c.name} style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }} />
                  <div>
                    <div style={{ fontSize: '0.95rem', fontWeight: '600', marginBottom: '2px' }}>{c.name}</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{c.role} &bull; {c.distance}</div>
                  </div>
                </div>
                <div style={{ width: '20px', height: '20px', border: '2px solid var(--border-glass)', borderRadius: '6px' }}></div>
              </div>
            ))}
          </div>
          
          <button className="btn-outline" style={{ width: '100%', marginTop: '24px', padding: '12px 0', fontSize: '0.9rem', border: 'none', background: 'rgba(255,255,255,0.02)' }}>
            View Map Directory
          </button>
        </div>

        {/* Network Growth Card */}
        <div style={{ background: 'linear-gradient(135deg, var(--accent-primary) 0%, #4f46e5 100%)', borderRadius: '20px', padding: '28px', color: 'white', boxShadow: '0 12px 32px rgba(99,102,241,0.25)' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '12px', fontWeight: '600' }}>Network Growth</h3>
          <p style={{ fontSize: '0.9rem', opacity: 0.9, marginBottom: '24px', lineHeight: '1.5' }}>
            You have 4 new connection requests from local workers this week.
          </p>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
            <div style={{ display: 'flex' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#fff', marginLeft: 0 }}></div>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#ddd', marginLeft: '-12px', border: '2px solid var(--accent-primary)' }}></div>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#bbb', marginLeft: '-12px', border: '2px solid var(--accent-primary)' }}></div>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', marginLeft: '-12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 'bold', backdropFilter: 'blur(4px)', border: '2px solid var(--accent-primary)' }}>+4</div>
            </div>
            <span style={{ fontSize: '0.85rem', fontWeight: '500', opacity: 0.9 }}>Trusted Network</span>
          </div>

          <button style={{ width: '100%', padding: '12px 0', background: 'white', color: 'var(--accent-primary)', border: 'none', borderRadius: '12px', fontWeight: '700', cursor: 'pointer', transition: 'transform 0.2s', ':active': { transform: 'scale(0.98)' } }}>
            Review Requests
          </button>
        </div>

      </div>
    </div>
  );
}
