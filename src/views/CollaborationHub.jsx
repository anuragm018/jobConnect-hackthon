import React, { useState, useEffect } from 'react';
import { Plus, Users, Share2, MoreVertical, Bell, Loader2, Send } from 'lucide-react';

export default function CollaborationHub() {
  const [requests, setRequests] = useState([]);
  const [collaborators, setCollaborators] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [showPostForm, setShowPostForm] = useState(false);
  const [newRequestType, setNewRequestType] = useState('URGENT');
  const [newRequestContent, setNewRequestContent] = useState('');
  
  const token = localStorage.getItem('token');
  const me = JSON.parse(localStorage.getItem('userProfile')) || {};

  useEffect(() => {
    if (!token) return;
    
    // Fetch Collaboration Requests
    fetch('http://localhost:5000/api/collab', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        setRequests(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });

    // Fetch Nearby Collaborators
    fetch('http://localhost:5000/api/messages/contacts', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        // Grab some workers to display in sidebar
        const workers = data.filter(u => u.role === 'worker' && u._id !== me.id).slice(0, 4);
        setCollaborators(workers);
      })
      .catch(console.error);
      
  }, [token]);

  const handlePostRequest = async (e) => {
    e.preventDefault();
    if (!newRequestContent.trim()) return;

    try {
      const res = await fetch('http://localhost:5000/api/collab', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ type: newRequestType, content: newRequestContent })
      });
      
      if (!res.ok) throw new Error('Failed to post request');
      const data = await res.json();
      
      setRequests([data, ...requests]);
      setNewRequestContent('');
      setShowPostForm(false);
    } catch (err) {
      alert(err.message);
    }
  };

  const getColorForType = (type) => {
    if (type === 'URGENT') return '#ef4444'; // Red for urgent
    if (type === 'UPCOMING') return '#10b981'; // Green for upcoming
    return '#f59e0b'; // Orange for help needed
  };

  const getActionForType = (type) => {
    if (type === 'URGENT') return 'Reply Instantly';
    if (type === 'UPCOMING') return 'Inquire Now';
    return 'I can help';
  };

  const formatTime = (dateString) => {
    const d = new Date(dateString);
    return isNaN(d.getTime()) ? 'Just now' : d.toLocaleDateString() + ' ' + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

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
            <button onClick={() => setShowPostForm(!showPostForm)} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--success)', border: 'none', boxShadow: '0 4px 15px rgba(16,185,129,0.3)' }}>
              <Plus size={18} /> Post a Request
            </button>
          </div>
        </div>

        {/* Post Form Dropdown */}
        {showPostForm && (
          <div className="glass-panel" style={{ padding: '24px', borderRadius: '24px', borderLeft: '4px solid var(--success)', animation: 'fadeIn 0.3s ease' }}>
            <h3 style={{ marginBottom: '16px', fontSize: '1.2rem' }}>Create New Request</h3>
            <form onSubmit={handlePostRequest} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <select 
                value={newRequestType}
                onChange={(e) => setNewRequestType(e.target.value)}
                className="input-field"
                style={{ cursor: 'pointer', padding: '12px' }}
              >
                <option value="URGENT">🔴 URGENT (Immediate Site Help)</option>
                <option value="UPCOMING">🟢 UPCOMING (Planning for Next Week)</option>
                <option value="HELP NEEDED">🟠 HELP NEEDED (Tool Sharing / Advice)</option>
              </select>
              <textarea 
                placeholder="Describe what you need, location, and timeframe..."
                value={newRequestContent}
                onChange={(e) => setNewRequestContent(e.target.value)}
                className="input-field"
                style={{ height: '100px', padding: '16px', resize: 'none' }}
                required
              />
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                <button type="button" className="btn-outline" onClick={() => setShowPostForm(false)} style={{ padding: '10px 24px', border: 'none' }}>Cancel</button>
                <button type="submit" className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 24px' }}>
                  <Send size={16} /> Broadcast Need
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Requests List */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-primary)' }}>
              <div style={{ width: '4px', height: '18px', background: 'var(--accent-primary)', borderRadius: '4px' }}></div>
              Active Site Requests
            </h2>
            <div style={{ display: 'flex', gap: '24px', fontSize: '0.9rem' }}>
              <span style={{ color: 'var(--text-primary)', fontWeight: '600', borderBottom: '2px solid var(--text-primary)', paddingBottom: '4px', cursor: 'pointer' }}>Live Feed</span>
            </div>
          </div>
          
          {loading ? (
             <div style={{ display: 'flex', justifyContent: 'center', padding: '60px 0' }}><Loader2 className="animate-spin" size={40} color="var(--accent-primary)" /></div>
          ) : requests.length === 0 ? (
             <div className="glass-panel" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-secondary)' }}>
               No active collaboration requests in your neighborhood yet. Connect with others by posting the first one!
             </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
              {requests.map(req => {
                const color = getColorForType(req.type);
                return (
                  <div key={req._id} className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px', position: 'relative' }}>
                    <MoreVertical size={18} style={{ position: 'absolute', top: '24px', right: '24px', color: 'var(--text-secondary)', cursor: 'pointer' }} />
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      <span style={{ color: color, background: `${color}15`, padding: '4px 10px', borderRadius: '12px', border: `1px solid ${color}30` }}>{req.type}</span>
                      <span style={{ color: 'var(--text-secondary)', fontWeight: 'normal' }}>{formatTime(req.createdAt)}</span>
                    </div>

                    <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: 'var(--text-primary)', flex: 1, fontWeight: '500' }}>
                      "{req.content}"
                    </p>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                        {req.authorId?.avatar ? <img src={req.authorId.avatar} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <Users size={18} color="var(--text-secondary)" />}
                      </div>
                      <div>
                        <div style={{ fontSize: '0.95rem', fontWeight: '600' }}>{req.authorId?.name || 'Anonymous User'}</div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{req.authorId?.title || req.authorId?.role || 'Professional'}</div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginTop: '4px' }}>
                      <button className="btn-primary" style={{ flex: 1, padding: '12px 0', background: color, border: 'none', fontWeight: '600' }}>
                        {getActionForType(req.type)}
                      </button>
                      <button className="glass-panel" style={{ padding: '12px', display: 'flex', border: 'none', background: 'rgba(255,255,255,0.03)', cursor: 'pointer' }}>
                        <Share2 size={18} />
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* Right Sidebar */}
      <div style={{ flex: '1 1 300px', maxWidth: '380px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        {/* Collaborators List */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '1.15rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
              Pro Network <span style={{ background: 'rgba(16,185,129,0.2)', color: 'var(--success)', fontSize: '0.75rem', padding: '2px 8px', borderRadius: '12px' }}>{collaborators.length}</span>
            </h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--success)', boxShadow: '0 0 8px var(--success)' }}></div>
              Online Nearby
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {collaborators.length === 0 ? <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', textAlign: 'center' }}>No professionals online</p> : null}
            {collaborators.map((c, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <img src={c.avatar || `https://ui-avatars.com/api/?name=${c.name}`} alt={c.name} style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }} />
                  <div>
                    <div style={{ fontSize: '0.95rem', fontWeight: '600', marginBottom: '2px' }}>{c.name}</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{c.title || c.role} &bull; Nearby</div>
                  </div>
                </div>
                <div style={{ width: '20px', height: '20px', border: '2px solid var(--border-glass)', borderRadius: '6px' }}></div>
              </div>
            ))}
          </div>
          
          <button className="btn-outline" style={{ width: '100%', marginTop: '24px', padding: '12px 0', fontSize: '0.9rem', border: 'none', background: 'rgba(255,255,255,0.02)' }}>
            View Full Directory
          </button>
        </div>

        {/* Network Growth Card */}
        <div style={{ background: 'linear-gradient(135deg, var(--accent-primary) 0%, #4f46e5 100%)', borderRadius: '20px', padding: '28px', color: 'white', boxShadow: '0 12px 32px rgba(99,102,241,0.25)' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '12px', fontWeight: '600' }}>Network Growth</h3>
          <p style={{ fontSize: '0.9rem', opacity: 0.9, marginBottom: '24px', lineHeight: '1.5' }}>
            You have {collaborators.length > 0 ? collaborators.length : 'several'} active professionals mapped in your local area. Team up for larger contracts!
          </p>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
            <div style={{ display: 'flex' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#fff', marginLeft: 0 }}></div>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#ddd', marginLeft: '-12px', border: '2px solid var(--accent-primary)' }}></div>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#bbb', marginLeft: '-12px', border: '2px solid var(--accent-primary)' }}></div>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', marginLeft: '-12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 'bold', backdropFilter: 'blur(4px)', border: '2px solid var(--accent-primary)' }}>+{collaborators.length}</div>
            </div>
            <span style={{ fontSize: '0.85rem', fontWeight: '500', opacity: 0.9 }}>Trusted Network</span>
          </div>

          <button style={{ width: '100%', padding: '12px 0', background: 'white', color: 'var(--accent-primary)', border: 'none', borderRadius: '12px', fontWeight: '700', cursor: 'pointer', transition: 'transform 0.2s', ':active': { transform: 'scale(0.98)' } }}>
            Build Your Crew
          </button>
        </div>

      </div>
    </div>
  );
}
