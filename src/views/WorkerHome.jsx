import React, { useState } from 'react';
import { MapPin, Clock, CheckCircle, XCircle } from 'lucide-react';

export default function WorkerHome() {
  const [requests, setRequests] = useState([
    {
      id: 1,
      customerName: 'Sarah Jenkins',
      service: 'Leaky Kitchen Sink Repair',
      location: '124 Maple St, Downtown',
      time: 'Today, 2:30 PM',
      status: 'pending'
    },
    {
      id: 2,
      customerName: 'Mike Patterson',
      service: 'Install New Dishwasher',
      location: '89 Westheimer Rd',
      time: 'Tomorrow, 10:00 AM',
      status: 'pending'
    }
  ]);

  const handleDelete = (id) => {
    // Completely removes the request from the screen
    setRequests(requests.filter(req => req.id !== id));
  };

  const handleAccept = (id) => {
    // Changes status to accepted without deleting
    setRequests(requests.map(req => req.id === id ? { ...req, status: 'accepted' } : req));
  };

  return (
    <div style={{ padding: '24px', maxWidth: '800px', margin: '0 auto', height: '100%' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 className="heading-gradient" style={{ fontSize: '2.5rem', marginBottom: '8px' }}>Dashboard</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Manage your incoming job requests and schedule.</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <h2 style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          Incoming Requests
          {requests.filter(r => r.status === 'pending').length > 0 && (
            <span style={{ background: 'var(--warning)', color: '#000', fontSize: '0.8rem', padding: '2px 8px', borderRadius: '12px', fontWeight: '600' }}>
              {requests.filter(r => r.status === 'pending').length} New
            </span>
          )}
        </h2>

        {requests.length === 0 ? (
           <div className="glass-panel" style={{ textAlign: 'center', padding: '48px 24px', color: 'var(--text-secondary)' }}>
             You have no new job requests at the moment.
           </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {requests.map(req => (
              <div key={req.id} className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '16px', borderLeft: req.status === 'accepted' ? '4px solid var(--success)' : '4px solid var(--warning)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '8px', color: req.status === 'accepted' ? 'var(--success)' : 'var(--text-primary)' }}>
                      {req.service}
                    </h3>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <span style={{ fontWeight: '500', color: 'var(--text-primary)' }}>{req.customerName}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><MapPin size={14} style={{ opacity: 0.7 }} /> {req.location}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Clock size={14} style={{ opacity: 0.7 }} /> {req.time}</span>
                    </div>
                  </div>
                  
                  {req.status === 'accepted' ? (
                    <div style={{ color: 'var(--success)', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '500', fontSize: '0.9rem', background: 'rgba(16,185,129,0.1)', padding: '6px 12px', borderRadius: '8px' }}>
                      <CheckCircle size={16} /> Job Accepted
                    </div>
                  ) : (
                    <div style={{ color: 'var(--warning)', fontSize: '0.85rem', fontWeight: '500', background: 'rgba(245,158,11,0.1)', padding: '4px 8px', borderRadius: '6px' }}>
                      Pending Reply
                    </div>
                  )}
                </div>

                {req.status === 'pending' && (
                  <div style={{ display: 'flex', gap: '12px', marginTop: '8px', borderTop: '1px solid var(--border-glass)', paddingTop: '16px' }}>
                    <button onClick={() => handleAccept(req.id)} className="btn-primary" style={{ flex: 1, background: 'var(--success)', boxShadow: '0 4px 15px rgba(16,185,129,0.3)', border: 'none' }}>
                      Accept Request
                    </button>
                    <button onClick={() => handleDelete(req.id)} className="btn-outline" style={{ flex: 1, borderColor: 'rgba(239,68,68,0.5)', color: '#ef4444' }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(239,68,68,0.1)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}>
                      <XCircle size={16} style={{ marginRight: '6px', verticalAlign: 'text-bottom' }} /> Decline / Delete
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}