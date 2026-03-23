import React, { useState } from 'react';
import { User, Phone, MapPin, Edit2, Save, Camera } from 'lucide-react';

export default function ProfileView() {
  const [profile, setProfile] = useState({
    name: 'Customer Name',
    mobile: '+1 (555) 000-0000',
    address: '123 Tech Avenue, San Francisco, CA'
  });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    alert("Profile saved successfully!");
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 className="heading-gradient" style={{ fontSize: '2rem' }}>My Profile</h1>
        <button onClick={handleSave} className="btn-primary" style={{ padding: '8px 16px', fontSize: '0.9rem', background: 'var(--success)', boxShadow: '0 4px 15px rgba(16,185,129,0.4)' }}>
          <Save size={16} /> Save Changes
        </button>
      </div>

      <div className="glass-panel" style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
        
        {/* Avatar Section */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
          <div style={{ position: 'relative' }}>
            <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: 'var(--bg-secondary)', border: '2px solid var(--border-glass)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <User size={48} color="var(--text-secondary)" />
            </div>
            <button style={{ position: 'absolute', bottom: 0, right: 0, background: 'var(--accent-primary)', border: 'none', color: 'white', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <Camera size={16} />
            </button>
          </div>
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '4px' }}>{profile.name}</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Customer Account</p>
          </div>
        </div>

        {/* Form Fields */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div>
            <label className="input-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><User size={14} /> Full Name</label>
            <input type="text" name="name" value={profile.name} onChange={handleChange} className="input-field" />
          </div>

          <div>
            <label className="input-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Phone size={14} /> Mobile Number</label>
            <input type="tel" name="mobile" value={profile.mobile} onChange={handleChange} className="input-field" placeholder="+1 (555) 000-0000" />
          </div>

          <div>
            <label className="input-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><MapPin size={14} /> Location / Address</label>
            <textarea name="address" value={profile.address} onChange={handleChange} className="input-field" style={{ resize: 'vertical', minHeight: '80px' }} />
          </div>

        </div>

      </div>
    </div>
  );
}
