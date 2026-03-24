import React, { useState, useEffect } from 'react';
import { MapPin, Clock, CheckCircle, XCircle, Loader2, ClipboardList, Briefcase, CheckCircle2 } from 'lucide-react';

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
           <div className="glass-panel" style={{ textAlign: 'center', padding: '60px 24px', color: 'var(--text-secondary)', borderRadius: '24px' }}>
             <ClipboardList size={48} style={{ margin: '0 auto 16px auto', opacity: 0.5 }} />
             <h3 style={{ fontSize: '1.2rem', marginBottom: '8px', color: 'var(--text-primary)' }}>No Active Requests</h3>
             <p>When customers or other professionals send you job bookings, they will appear here.</p>
           </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {visibleRequests.map(req => (
              <div key={req._id} className="glass-panel" style={{ padding: '24px', borderRadius: '24px', display: 'flex', flexWrap: 'wrap', gap: '24px', alignItems: 'center', borderLeft: req.status === 'Completed' ? '4px solid var(--success)' : req.status === 'Accepted' ? '4px solid #3b82f6' : '4px solid var(--warning)' }}>
                
                <div style={{ flex: 1, minWidth: '250px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                    <img src={req.customerId?.avatar || `https://ui-avatars.com/api/?name=${req.customerId?.name}`} alt="Customer" style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }} />
                    <div>
                      <h3 style={{ margin: 0, fontSize: '1.2rem' }}>{req.customerId?.name || 'Unknown User'}</h3>
                      <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <MapPin size={12} /> {req.customerId?.location || 'Location withheld'}
                      </span>
                    </div>
                  </div>

                  <div style={{ marginBottom: '16px' }}>
                    <span style={{ background: 'rgba(255,255,255,0.08)', padding: '6px 12px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-primary)', display: 'inline-block', marginBottom: '8px' }}>
                      <Briefcase size={12} style={{ display: 'inline', marginRight: '4px' }} /> 
                      {req.serviceType}
                    </span>
                    {req.description && (
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', fontStyle: 'italic', margin: 0, paddingLeft: '8px', borderLeft: '2px solid rgba(255,255,255,0.1)' }}>
                        "{req.description}"
                      </p>
                    )}
                  </div>
                  
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    <Clock size={12} style={{ display: 'inline', marginRight: '4px' }} /> 
                    Requested on {new Date(req.createdAt).toLocaleDateString()}
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '12px', minWidth: '200px' }}>
                  
                  <div style={{ 
                    background: req.status === 'Completed' ? 'rgba(16, 185, 129, 0.1)' : req.status === 'Accepted' ? 'rgba(59, 130, 246, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                    color: req.status === 'Completed' ? '#10b981' : req.status === 'Accepted' ? '#3b82f6' : '#f59e0b',
                    padding: '8px 16px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 'bold'
                  }}>
                    {req.status === 'Pending' && <Clock size={14} style={{ display: 'inline', marginRight: '4px' }} />}
                    {req.status === 'Accepted' && <Briefcase size={14} style={{ display: 'inline', marginRight: '4px' }} />}
                    {req.status === 'Completed' && <CheckCircle2 size={14} style={{ display: 'inline', marginRight: '4px' }} />}
                    Status: {req.status}
                  </div>

                  {req.status === 'Pending' && (
                    <div style={{ display: 'flex', gap: '8px', width: '100%', marginTop: '8px' }}>
                      <button onClick={() => handleUpdateStatus(req._id, 'Accepted')} className="btn-primary" style={{ flex: 1, padding: '10px', background: 'var(--success)', boxShadow: '0 4px 15px rgba(16,185,129,0.3)', border: 'none', fontSize: '0.9rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <CheckCircle size={16} style={{ marginRight: '4px' }}/> Accept
                      </button>
                      <button onClick={() => handleUpdateStatus(req._id, 'Declined')} className="btn-outline" style={{ flex: 1, padding: '10px', borderColor: 'rgba(239,68,68,0.5)', color: '#ef4444', fontSize: '0.9rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(239,68,68,0.1)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}>
                        <XCircle size={16} style={{ marginRight: '4px' }}/> Decline
                      </button>
                    </div>
                  )}

                  {req.status === 'Accepted' && (
                    <button onClick={() => handleUpdateStatus(req._id, 'Completed')} className="btn-primary" style={{ padding: '12px 24px', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 8px 15px rgba(99,102,241,0.3)', width: '100%', justifyContent: 'center' }}>
                      <CheckCircle2 size={18} /> Mark as Paid
                    </button>
                  )}
                  
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}