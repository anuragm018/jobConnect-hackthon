import React, { useState, useEffect } from 'react';
import { MapPin, Globe, CheckCircle2, Star, MessageSquare, Loader2, Award, Briefcase, Calendar, X } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';

export default function WorkerProfileView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem('userProfile')) || {};
  const [worker, setWorker] = useState(null);
  const [loading, setLoading] = useState(true);

  // Hire Form State
  const [showHireForm, setShowHireForm] = useState(false);
  const [jobDescription, setJobDescription] = useState('');
  const [jobDuration, setJobDuration] = useState('1 Day');

  const handleHireSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          workerId: worker._id || worker.id,
          description: jobDescription,
          duration: jobDuration
        })
      });
      if (res.ok) {
        alert('Job request sent successfully!');
        setShowHireForm(false);
        setJobDescription('');
      } else {
        alert('Failed to send request. You may need to log in as a Customer.');
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Schedule State
  const [newBusyDate, setNewBusyDate] = useState('');
  const [newBusyTime, setNewBusyTime] = useState('Morning (9 AM - 1 PM)');

  const handleAddBusySlot = async () => {
    if (!newBusyDate) return;
    const newSlot = { date: newBusyDate, time: newBusyTime };
    const updatedSlots = [...(worker.busySlots || []), newSlot];
    
    try {
      const res = await fetch(`http://localhost:5000/api/users/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ busySlots: updatedSlots })
      });
      if (res.ok) {
        setWorker({ ...worker, busySlots: updatedSlots });
        setNewBusyDate('');
      }
    } catch(err) { console.error(err) }
  };

  const handleRemoveBusySlot = async (index) => {
    const updatedSlots = worker.busySlots.filter((_, i) => i !== index);
    try {
      const res = await fetch(`http://localhost:5000/api/users/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ busySlots: updatedSlots })
      });
      if (res.ok) {
        setWorker({ ...worker, busySlots: updatedSlots });
      }
    } catch(err) { console.error(err) }
  };

  useEffect(() => {
    const fetchWorker = async () => {
      // If viewing someone else via /explore/:id, fetch their profile. If viewing own profile, use local state + fetch refresh.
      try {
        if (id && id !== currentUser.id) {
           const res = await fetch(`http://localhost:5000/api/users/profile/${id}`);
           const data = await res.json();
           setWorker(data);
        } else {
           // Viewing own profile, fallback to local initially then refresh
           setWorker(currentUser);
           if (currentUser.id) {
             const res = await fetch(`http://localhost:5000/api/users/profile/${currentUser.id}`);
             const data = await res.json();
             setWorker(data);
           }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    // Quick load from localstorage if it's our profile
    if (!id || id === currentUser.id) setWorker(currentUser);
    fetchWorker();
  }, [id]);

  if (loading && !worker) {
     return <div style={{ display: 'flex', justifyContent: 'center', padding: '100px 0' }}><Loader2 className="animate-spin" size={48} color="var(--accent-primary)" /></div>;
  }

  if (!worker) {
     return <div style={{ textAlign: 'center', padding: '80px 0' }}><h2>Profile not found.</h2></div>;
  }

  const name = worker.name || 'Worker Name';
  const role = worker.title || worker.skills?.[0] || 'Professional Worker';
  const avatar = worker.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}`;
  const location = worker.location || 'Location Not Specified';
  const reviews = worker.reviewsCount || 0;
  const rating = worker.successRate ? (worker.successRate / 20).toFixed(1) : 5.0;

  const renderBadge = (score) => {
    if (!score || score <= 0) return null;
    if (score >= 10) return <div style={{ background: 'linear-gradient(45deg, #f59e0b, #fbbf24)', color: '#000', fontSize: '0.8rem', padding: '6px 14px', borderRadius: '20px', fontWeight: '800', boxShadow: '0 0 20px rgba(245, 158, 11, 0.6)', display: 'inline-flex', alignItems: 'center', gap: '6px', marginTop: '12px' }}><Award size={16}/> Top Expert ({score} Helps)</div>;
    if (score >= 5) return <div style={{ background: 'linear-gradient(45deg, #a855f7, #ec4899)', color: '#fff', fontSize: '0.8rem', padding: '6px 14px', borderRadius: '20px', fontWeight: '800', boxShadow: '0 0 15px rgba(168, 85, 247, 0.6)', display: 'inline-flex', alignItems: 'center', gap: '6px', marginTop: '12px' }}><Award size={16}/> Rising Pro ({score} Helps)</div>;
    return <div style={{ background: 'rgba(59,130,246,0.15)', color: '#3b82f6', fontSize: '0.8rem', padding: '6px 14px', borderRadius: '20px', fontWeight: '800', border: '1px solid #3b82f6', display: 'inline-flex', alignItems: 'center', gap: '6px', marginTop: '12px' }}>Helpful ({score} Helps)</div>;
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', paddingBottom: '80px', position: 'relative' }}>
      
      {/* Top Profile Card */}
      <div className="glass-panel" style={{ padding: '32px', borderRadius: '32px', display: 'flex', gap: '40px', marginBottom: '32px', flexWrap: 'wrap', border: '1px solid var(--border-glass)', background: 'var(--bg-glass)' }}>
        
        {/* Left Avatar Block */}
        <div style={{ position: 'relative', width: '220px', height: '220px', borderRadius: '24px', overflow: 'hidden', flexShrink: 0, boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}>
          <img 
            src={avatar} 
            alt={name} 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
          />
          <div style={{ position: 'absolute', bottom: '12px', right: '12px', background: worker.isAvailable !== false ? '#4ade80' : '#f59e0b', color: 'white', padding: '6px 14px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '6px', border: '3px solid white', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
            <div style={{ width: '6px', height: '6px', background: 'white', borderRadius: '50%' }}></div>
            {worker.isAvailable !== false ? 'ONLINE' : 'BUSY'}
          </div>
        </div>

        {/* Right Info Block */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px', justifyContent: 'center', minWidth: '300px' }}>
          <div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: '800', margin: '0 0 8px 0', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              {name} <CheckCircle2 size={30} fill="#2563eb" color="white" />
            </h1>
            <h2 style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', fontWeight: '600', margin: 0 }}>{role}</h2>
            {renderBadge(worker.reputationScore)}
          </div>
          
          <p style={{ color: 'var(--text-primary)', lineHeight: '1.7', fontSize: '1.05rem', opacity: 0.85, maxWidth: '650px', marginBottom: '8px' }}>
            {worker.bio || `Specializing in ${role.toLowerCase()}, I am dedicated to providing top-tier service tailored to community standards. I continuously strive for excellence across all my local projects.`}
          </p>

          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(99, 102, 241, 0.08)', color: '#4f46e5', padding: '10px 20px', borderRadius: '24px', fontSize: '0.95rem', fontWeight: '700' }}>
              <MapPin size={18} /> {location}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(99, 102, 241, 0.08)', color: '#4f46e5', padding: '10px 20px', borderRadius: '24px', fontSize: '0.95rem', fontWeight: '700' }}>
              <Globe size={18} /> English, Regional
            </span>
          </div>

          {/* Action Buttons */}
          {currentUser.role === 'customer' && worker.isAvailable !== false && (
            <div style={{ display: 'flex', gap: '16px', marginTop: '8px', flexWrap: 'wrap' }}>
              <button 
                onClick={() => setShowHireForm(true)} 
                className="btn-primary" 
                style={{ padding: '12px 24px', fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 8px 20px rgba(37,99,235,0.25)' }}
              >
                <Briefcase size={20} /> Request Service
              </button>
              <button 
                onClick={() => navigate('/app/messages', { state: { preselectWorker: worker } })}
                className="btn-outline" 
                style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', fontSize: '1.05rem' }}
              >
                <MessageSquare size={20} /> Live Chat
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Stats Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '56px' }}>
        <div className="glass-panel" style={{ padding: '32px 24px', borderRadius: '24px', display: 'flex', alignItems: 'center', gap: '24px', border: '1px solid var(--border-glass)' }}>
          <div style={{ width: '64px', height: '64px', background: 'rgba(59, 130, 246, 0.1)', color: '#2563eb', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CheckCircle2 size={32} />
          </div>
          <div>
            <div style={{ fontSize: '1.6rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '6px' }}>{reviews > 0 ? `${reviews}+` : 'Recent'} Jobs</div>
            <div style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', fontWeight: '500' }}>Completed on platform</div>
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '32px 24px', borderRadius: '24px', display: 'flex', alignItems: 'center', gap: '24px', border: '1px solid var(--border-glass)' }}>
          <div style={{ width: '64px', height: '64px', background: 'rgba(34, 197, 94, 0.1)', color: '#16a34a', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Star size={32} fill="currentColor" color="transparent" />
          </div>
          <div>
            <div style={{ fontSize: '1.6rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '6px' }}>{rating}/5 Rating</div>
            <div style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', fontWeight: '500' }}>Top professional score</div>
          </div>
        </div>
      </div>

      {/* Schedule / Availability Section */}
      <div className="glass-panel" style={{ padding: '32px', borderRadius: '32px', marginBottom: '32px', border: '1px solid var(--border-glass)' }}>
        <h2 style={{ fontSize: '1.6rem', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Calendar size={28} color="var(--accent-primary)" /> Availability & Schedule
        </h2>
        
        {/* Worker Edit Mode */}
        {(!id || id === currentUser.id) && currentUser.role === 'worker' && (
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '24px', borderRadius: '16px', marginBottom: '24px', border: '1px dashed var(--border-glass)' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '16px' }}>Mark exact dates you are busy or booked to avoid conflict:</h3>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'flex-end' }}>
              <div style={{ flex: 1, minWidth: '150px' }}>
                <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '8px', color: 'var(--text-secondary)' }}>Date</label>
                <input type="date" className="input-field" value={newBusyDate} onChange={e => setNewBusyDate(e.target.value)} />
              </div>
              <div style={{ flex: 1, minWidth: '200px' }}>
                <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '8px', color: 'var(--text-secondary)' }}>Time Slot</label>
                <select className="input-field" value={newBusyTime} onChange={e => setNewBusyTime(e.target.value)} style={{ appearance: 'none', background: 'var(--bg-glass)' }}>
                  <option>Morning (9 AM - 1 PM)</option>
                  <option>Afternoon (1 PM - 5 PM)</option>
                  <option>Evening (5 PM - 9 PM)</option>
                  <option>Full Day</option>
                </select>
              </div>
              <button className="btn-primary" onClick={handleAddBusySlot} style={{ height: '52px', padding: '0 24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={18} /> Mark Busy
              </button>
            </div>
          </div>
        )}

        {/* Display Busy Slots */}
        {(!worker.busySlots || worker.busySlots.length === 0) ? (
          <p style={{ color: 'var(--success)' }}>This professional currently has no busy dates marked. They are wide open for bookings!</p>
        ) : (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            {worker.busySlots.sort((a,b) => new Date(a.date) - new Date(b.date)).map((slot, idx) => (
              <div key={idx} style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#ef4444', padding: '12px 20px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ fontWeight: '600' }}>{new Date(slot.date).toLocaleDateString()}</div>
                <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>• {slot.time}</div>
                {(!id || id === currentUser.id) && currentUser.role === 'worker' && (
                  <button onClick={() => handleRemoveBusySlot(idx)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', marginLeft: '8px' }}>
                    <X size={16} />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Hire Modal */}
      {showHireForm && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
          <div className="glass-panel" style={{ width: '100%', maxWidth: '500px', padding: '32px', borderRadius: '24px', position: 'relative', animation: 'fadeIn 0.3s ease' }}>
            <button onClick={() => setShowHireForm(false)} style={{ position: 'absolute', top: '24px', right: '24px', background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>
              <X size={24} />
            </button>
            
            <h2 className="heading-gradient" style={{ fontSize: '1.8rem', marginBottom: '8px' }}>Hire {name.split(' ')[0]}</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>Describe your requirement to get an estimate.</p>
            
            <form onSubmit={handleHireSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: 'var(--text-primary)' }}>Job Description</label>
                <textarea 
                  required
                  className="input-field" 
                  placeholder="E.g. I need my kitchen sink pipe replaced..." 
                  style={{ height: '120px', resize: 'none' }}
                  value={jobDescription}
                  onChange={e => setJobDescription(e.target.value)}
                />
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: 'var(--text-primary)' }}>Estimated Duration</label>
                <select 
                  className="input-field"
                  value={jobDuration}
                  onChange={e => setJobDuration(e.target.value)}
                  style={{ appearance: 'none', width: '100%', background: 'var(--bg-glass)' }}
                >
                  <option value="Few Hours">A Few Hours</option>
                  <option value="1 Day">1 Full Day</option>
                  <option value="2-3 Days">2-3 Days</option>
                  <option value="1 Week+">1 Week or More</option>
                </select>
              </div>
              
              <button type="submit" className="btn-primary" style={{ padding: '16px', fontSize: '1.1rem', marginTop: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <CheckCircle2 size={20} /> Send Request
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
