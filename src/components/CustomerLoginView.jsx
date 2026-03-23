import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, UserSearch } from 'lucide-react';

export default function CustomerLoginView() {
  const navigate = useNavigate();

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
          <h2 className="heading-gradient" style={{ fontSize: '2rem', marginBottom: '8px' }}>Customer Login</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Sign in to find the best local talent to get your job done.</p>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); navigate('/app'); }} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label className="input-label">Email Address</label>
            <input type="email" placeholder="you@example.com" className="input-field" required />
          </div>
          <div>
            <label className="input-label">Password</label>
            <input type="password" placeholder="••••••••" className="input-field" required />
          </div>

          <button type="button" onClick={() => navigate('/app')} className="btn-primary" style={{ marginTop: '12px', width: '100%' }}>
            Sign In as Customer
          </button>
        </form>

        <div style={{ marginTop: '24px', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          Don't have a customer profile?{' '}
          <a href="#" style={{ color: 'var(--accent-primary)', textDecoration: 'none', fontWeight: '500' }}>Sign up</a>
        </div>
      </div>
    </div>
  );
}
