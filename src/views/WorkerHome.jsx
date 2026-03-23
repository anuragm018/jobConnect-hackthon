import React, { useState, useEffect } from 'react';
import { MapPin, Clock, CheckCircle, XCircle, Loader2 } from 'lucide-react';

export default function WorkerHome() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) return;
    
    const fetchJobs = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/jobs', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!res.ok) throw new Error('Failed to fetch jobs');
        const data = await res.json();
        setRequests(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchJobs();
  }, [token]);

  const handleUpdateStatus = async (id, status) => {
    try {
      const res = await fetch(`http://localhost:5000/api/jobs/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });
      
      if (!res.ok) throw new Error('Failed to update status');
      
      // Update local state smoothly
      setRequests(requests.map(req => req._id === id ? { ...req, status } : req));
    } catch (err) {
      alert('Error updating job status: ' + err.message);
    }
  };

  // Filter out completely soft-deleted (declined) local views if desired, but here we just show 'Declined'
  const visibleRequests = requests.filter(req => req.status !== 'Declined');

  return (
    <div style={{ padding: '24px', maxWidth: '800px', margin: '0 auto', height: '100%' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 className="heading-gradient" style={{ fontSize: '2.5rem', marginBottom: '8px' }}>Dashboard</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Manage your incoming job requests and schedule.</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <h2 style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          Incoming Requests
          {visibleRequests.filter(r => r.status === 'Pending').length > 0 && (
            <span style={{ background: 'var(--warning)', color: '#000', fontSize: '0.8rem', padding: '2px 8px', borderRadius: '12px', fontWeight: '600' }}>
              {visibleRequests.filter(r => r.status === 'Pending').length} New
            </span>
          )}
        </h2>

        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '60px 0', color: 'var(--accent-primary)' }}>
            <Loader2 size={40} className="animate-spin" />
          </div>
        ) : visibleRequests.length === 0 ? (
           <div className="glass-panel" style={{ textAlign: 'center', padding: '48px 24px', color: 'var(--text-secondary)' }}>
             You have no active job requests at the moment.
           </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {visibleRequests.map(req => (
              <div key={req._id} className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '16px', borderLeft: req.status === 'Accepted' || req.status === 'Completed' ? '4px solid var(--success)' : '4px solid var(--warning)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '8px', color: req.status === 'Accepted' || req.status === 'Completed' ? 'var(--success)' : 'var(--text-primary)' }}>
                      {req.serviceType}
                    </h3>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <span style={{ fontWeight: '500', color: 'var(--text-primary)' }}>{req.customerId?.name || 'Unknown Customer'}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><MapPin size={14} style={{ opacity: 0.7 }} /> {req.customerId?.location || 'Location withheld'}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Clock size={14} style={{ opacity: 0.7 }} /> Requested: {new Date(req.createdAt).toLocaleDateString()}</span>
                      {req.description && (
                        <p style={{ marginTop: '8px', fontSize: '0.95rem', color: 'var(--text-primary)', fontStyle: 'italic' }}>
                          "{req.description}"
                        </p>
                      )}
                    </div>
                  </div>
                  
                  {req.status === 'Accepted' || req.status === 'Completed' ? (
                    <div style={{ color: 'var(--success)', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '500', fontSize: '0.9rem', background: 'rgba(16,185,129,0.1)', padding: '6px 12px', borderRadius: '8px' }}>
                      <CheckCircle size={16} /> Job {req.status}
                    </div>
                  ) : (
                    <div style={{ color: 'var(--warning)', fontSize: '0.85rem', fontWeight: '500', background: 'rgba(245,158,11,0.1)', padding: '4px 8px', borderRadius: '6px' }}>
                      Pending Reply
                    </div>
                  )}
                </div>

                {req.status === 'Pending' && (
                  <div style={{ display: 'flex', gap: '12px', marginTop: '8px', borderTop: '1px solid var(--border-glass)', paddingTop: '16px' }}>
                    <button onClick={() => handleUpdateStatus(req._id, 'Accepted')} className="btn-primary" style={{ flex: 1, background: 'var(--success)', boxShadow: '0 4px 15px rgba(16,185,129,0.3)', border: 'none' }}>
                      Accept Request
                    </button>
                    <button onClick={() => handleUpdateStatus(req._id, 'Declined')} className="btn-outline" style={{ flex: 1, borderColor: 'rgba(239,68,68,0.5)', color: '#ef4444' }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(239,68,68,0.1)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}>
                      <XCircle size={16} style={{ marginRight: '6px', verticalAlign: 'text-bottom' }} /> Decline / Delete
                    </button>
                  </div>
                )}
                
                {req.status === 'Accepted' && (
                  <div style={{ display: 'flex', gap: '12px', marginTop: '8px', borderTop: '1px solid var(--border-glass)', paddingTop: '16px' }}>
                     <button onClick={() => handleUpdateStatus(req._id, 'Completed')} className="btn-primary" style={{ flex: 1, width: '100%', background: 'var(--accent-primary)', border: 'none' }}>
                      Mark as Completed (Paid)
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