import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Briefcase, UserPlus, AlertCircle, Loader2 } from 'lucide-react';

export default function WorkerLoginView() {
  const navigate = useNavigate();
  const [isRegistering, setIsRegistering] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    aadhar: '',
    phone: '',
    location: '',
    category: '',
    email: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const endpoint = isRegistering ? '/api/auth/register' : '/api/auth/login';
    const payload = isRegistering 
      ? { 
          name: formData.name, 
          email: formData.email, 
          password: formData.password, 
          role: 'worker',
          phone: formData.phone,
          location: formData.location,
          skills: formData.category ? [formData.category] : []
        } 
      : { 
          email: formData.email, 
          password: formData.password 
        };

    try {
      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      // Success
      localStorage.setItem('token', data.token);
      localStorage.setItem('userRole', 'worker');
      localStorage.setItem('userProfile', JSON.stringify(data.user));
      navigate('/app/workerHome');

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container" style={{ background: 'radial-gradient(circle at top, rgba(16,185,129,0.15) 0%, var(--bg-primary) 40%)', padding: '100px 20px 40px', overflowY: 'auto' }}>
      <button
        onClick={() => navigate('/')}
        style={{ position: 'absolute', top: '24px', left: '24px', background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1rem' }}
      >
        <ArrowLeft size={20} /> Back
      </button>

      <div className="glass-panel auth-card" style={{ borderColor: 'rgba(16,185,129,0.2)', maxWidth: isRegistering ? '500px' : '400px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ background: 'rgba(16,185,129,0.1)', width: '64px', height: '64px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
            {isRegistering ? <UserPlus size={32} color="var(--success)" /> : <Briefcase size={32} color="var(--success)" />}
          </div>
          <h2 className="heading-gradient" style={{ fontSize: '2rem', marginBottom: '8px' }}>
            {isRegistering ? 'Worker Registration' : 'Worker Login'}
          </h2>
          <p style={{ color: 'var(--text-secondary)' }}>
            {isRegistering ? 'Create your profile to start finding local jobs.' : 'Access your dashboard, chat with clients, and manage your jobs.'}
          </p>
        </div>

        {error && (
          <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--error)', padding: '12px', borderRadius: '8px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem' }}>
            <AlertCircle size={18} /> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {isRegistering && (
            <>
              <div>
                <label className="input-label">Full Name</label>
                <input type="text" placeholder="John Doe" className="input-field" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              </div>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <div style={{ flex: '1 1 150px' }}>
                  <label className="input-label">Aadhar Number</label>
                  <input type="text" placeholder="XXXX XXXX XXXX" maxLength="14" className="input-field" required value={formData.aadhar} onChange={e => setFormData({...formData, aadhar: e.target.value})} />
                </div>
                <div style={{ flex: '1 1 150px' }}>
                  <label className="input-label">Phone Number</label>
                  <input type="tel" placeholder="+91 XXXXX XXXXX" className="input-field" required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                </div>
              </div>
              <div>
                <label className="input-label">Location / Address</label>
                <input type="text" placeholder="City, Area, or Full Address" className="input-field" required value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} />
              </div>
              <div>
                <label className="input-label">Work Category</label>
                <select className="input-field" required value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} style={{ color: 'var(--text-primary)', backgroundColor: 'var(--bg-glass)' }}>
                  <option value="" disabled>Select your primary skill...</option>
                  <option value="Plumber">Plumber</option>
                  <option value="Electrician">Electrician</option>
                  <option value="Painter">Painter</option>
                  <option value="Carpenter">Carpenter</option>
                  <option value="Cleaner">Cleaner</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </>
          )}

          <div>
            <label className="input-label">Email Address</label>
            <input type="email" placeholder="you@example.com" className="input-field" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
          </div>
          <div>
            <label className="input-label">Password</label>
            <input type="password" placeholder="••••••••" className="input-field" required minLength={6} value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
          </div>

          <button type="submit" disabled={loading} className="btn-primary" style={{ marginTop: '12px', width: '100%', background: 'var(--success)', boxShadow: '0 4px 15px rgba(16,185,129,0.4)' }}>
            {loading ? <Loader2 size={20} className="animate-spin" /> : (isRegistering ? 'Register as Worker' : 'Sign In as Worker')}
          </button>
        </form>

        <div style={{ marginTop: '24px', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          {isRegistering ? (
            <>Already have an account? <span onClick={() => { setIsRegistering(false); setError(null); }} style={{ color: 'var(--success)', cursor: 'pointer', fontWeight: '500' }}>Login</span></>
          ) : (
            <>Want to offer your skills? <span onClick={() => { setIsRegistering(true); setError(null); }} style={{ color: 'var(--success)', cursor: 'pointer', fontWeight: '500' }}>Create worker profile</span></>
          )}
        </div>
      </div>
    </div>
  );
}
