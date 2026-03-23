import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Briefcase, UserPlus } from 'lucide-react';

export default function WorkerLoginView() {
  const navigate = useNavigate();
  const [isRegistering, setIsRegistering] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/app/workerHome');
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

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {isRegistering && (
            <>
              <div>
                <label className="input-label">Full Name</label>
                <input type="text" placeholder="John Doe" className="input-field" required />
              </div>
              <div style={{ display: 'flex', gap: '16px' }}>
                <div style={{ flex: 1 }}>
                  <label className="input-label">Aadhar Number</label>
                  <input type="text" placeholder="XXXX XXXX XXXX" maxLength="14" className="input-field" required />
                </div>
                <div style={{ flex: 1 }}>
                  <label className="input-label">Phone Number</label>
                  <input type="tel" placeholder="+91 XXXXX XXXXX" className="input-field" required />
                </div>
              </div>
              <div>
                <label className="input-label">Location / Address</label>
                <input type="text" placeholder="City, Area, or Full Address" className="input-field" required />
              </div>
              <div>
                <label className="input-label">Work Category</label>
                <select className="input-field" required style={{ color: 'var(--text-primary)', backgroundColor: 'var(--bg-glass)' }}>
                  <option value="" disabled selected>Select your primary skill...</option>
                  <option value="plumber">Plumber</option>
                  <option value="electrician">Electrician</option>
                  <option value="painter">Painter</option>
                  <option value="carpenter">Carpenter</option>
                  <option value="cleaner">Cleaner</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </>
          )}

          <div>
            <label className="input-label">Email Address</label>
            <input type="email" placeholder="you@example.com" className="input-field" required />
          </div>
          <div>
            <label className="input-label">Password</label>
            <input type="password" placeholder="••••••••" className="input-field" required />
          </div>

          <button type="submit" className="btn-primary" style={{ marginTop: '12px', width: '100%', background: 'var(--success)', boxShadow: '0 4px 15px rgba(16,185,129,0.4)' }}>
            {isRegistering ? 'Register as Worker' : 'Sign In as Worker'}
          </button>
        </form>

        <div style={{ marginTop: '24px', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          {isRegistering ? (
            <>Already have an account? <span onClick={() => setIsRegistering(false)} style={{ color: 'var(--success)', cursor: 'pointer', fontWeight: '500' }}>Login</span></>
          ) : (
            <>Want to offer your skills? <span onClick={() => setIsRegistering(true)} style={{ color: 'var(--success)', cursor: 'pointer', fontWeight: '500' }}>Create worker profile</span></>
          )}
        </div>
      </div>
    </div>
  );
}
