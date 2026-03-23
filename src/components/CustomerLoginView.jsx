import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, UserSearch, AlertCircle, Loader2 } from 'lucide-react';

export default function CustomerLoginView() {
  const navigate = useNavigate();
  const [isRegistering, setIsRegistering] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const endpoint = isRegistering ? '/api/auth/register' : '/api/auth/login';
    const payload = isRegistering 
      ? { ...formData, role: 'customer' } 
      : { email: formData.email, password: formData.password };

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
      localStorage.setItem('userRole', 'customer');
      localStorage.setItem('userProfile', JSON.stringify(data.user));
      navigate('/app');

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <button
        onClick={() => navigate('/')}
        style={{ position: 'absolute', top: '24px', left: '24px', background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1rem' }}
      >
        <ArrowLeft size={20} /> Back
      </button>

      <div className="glass-panel auth-card">
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ background: 'rgba(99,102,241,0.1)', width: '64px', height: '64px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
            <UserSearch size={32} color="var(--accent-primary)" />
          </div>
          <h2 className="heading-gradient" style={{ fontSize: '2rem', marginBottom: '8px' }}>
            {isRegistering ? 'Create Customer Account' : 'Customer Login'}
          </h2>
          <p style={{ color: 'var(--text-secondary)' }}>
            {isRegistering ? 'Join to find the best local talent.' : 'Sign in to find the best local talent to get your job done.'}
          </p>
        </div>

        {error && (
          <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--error)', padding: '12px', borderRadius: '8px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem' }}>
            <AlertCircle size={18} /> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {isRegistering && (
            <div>
              <label className="input-label">Full Name</label>
              <input 
                type="text" 
                placeholder="John Doe" 
                className="input-field" 
                required 
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
          )}

          <div>
            <label className="input-label">Email Address</label>
            <input 
              type="email" 
              placeholder="you@example.com" 
              className="input-field" 
              required 
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
            />
          </div>
          <div>
            <label className="input-label">Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              className="input-field" 
              required 
              minLength={6}
              value={formData.password}
              onChange={e => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <button type="submit" disabled={loading} className="btn-primary" style={{ marginTop: '12px', width: '100%' }}>
            {loading ? <Loader2 size={20} className="animate-spin" /> : (isRegistering ? 'Create Account' : 'Sign In as Customer')}
          </button>
        </form>

        <div style={{ marginTop: '24px', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          {isRegistering ? "Already have a profile? " : "Don't have a customer profile? "}
          <button 
            onClick={() => { setIsRegistering(!isRegistering); setError(null); }}
            style={{ background: 'none', border: 'none', color: 'var(--accent-primary)', textDecoration: 'none', fontWeight: '500', cursor: 'pointer', fontSize: '0.9rem' }}
          >
            {isRegistering ? 'Sign In Instead' : 'Sign up'}
          </button>
        </div>
      </div>
    </div>
  );
}
