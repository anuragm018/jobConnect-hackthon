import React, { useState } from 'react';
import { User, Phone, MapPin, Save, Camera, Briefcase, FileText, DollarSign } from 'lucide-react';

export default function WorkerProfileView() {
  const [profile, setProfile] = useState({
    name: 'Abhinav',
    mobile: '+91 98765 43210',
    aadhar: '1234 5678 9012',
    address: 'Kochi, Kerala',
    category: 'Plumber',
    hourlyRate: '85',
    available: true
  });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    alert("Worker profile updated successfully!");
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px', paddingBottom: '40px' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 className="heading-gradient" style={{ fontSize: '2rem' }}>Worker Profile</h1>
        <button onClick={handleSave} className="btn-primary" style={{ padding: '8px 16px', fontSize: '0.9rem', background: 'var(--success)', boxShadow: '0 4px 15px rgba(16,185,129,0.4)', border: 'none' }}>
          <Save size={16} /> Save Changes
        </button>
      </div>

      <div className="glass-panel" style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
        
        {/* Avatar Section */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
          <div style={{ position: 'relative' }}>
            <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: 'var(--bg-secondary)', border: '2px solid var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <User size={48} color="var(--text-secondary)" />
            </div>
            <button style={{ position: 'absolute', bottom: 0, right: 0, background: 'var(--success)', border: 'none', color: 'white', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <Camera size={16} />
            </button>
          </div>
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '4px' }}>{profile.name}</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'center', color: 'var(--success)' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: profile.available ? 'var(--success)' : 'var(--text-secondary)' }}></div>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{profile.available ? 'Available for work' : 'Not available'}</span>
            </div>
          </div>
        </div>

        {/* Form Fields */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div>
            <label className="input-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><User size={14} /> Full Name</label>
            <input type="text" name="name" value={profile.name} onChange={handleChange} className="input-field" />
          </div>

          <div style={{ display: 'flex', gap: '16px' }}>
            <div style={{ flex: 1 }}>
              <label className="input-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Phone size={14} /> Mobile Number</label>
              <input type="tel" name="mobile" value={profile.mobile} onChange={handleChange} className="input-field" />
            </div>
            <div style={{ flex: 1 }}>
              <label className="input-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><FileText size={14} /> Aadhar Number</label>
              <input type="text" name="aadhar" value={profile.aadhar} onChange={handleChange} className="input-field" />
            </div>
          </div>

          <div>
            <label className="input-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><MapPin size={14} /> Base Location</label>
            <input type="text" name="address" value={profile.address} onChange={handleChange} className="input-field" />
          </div>

          <div style={{ display: 'flex', gap: '16px' }}>
            <div style={{ flex: 2 }}>
              <label className="input-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Briefcase size={14} /> Primary Trade</label>
              <select name="category" value={profile.category} onChange={handleChange} className="input-field" style={{ color: 'var(--text-primary)', backgroundColor: 'var(--bg-glass)' }}>
                <option value="Plumber">Plumber</option>
                <option value="Electrician">Electrician</option>
                <option value="Painter">Painter</option>
                <option value="Carpenter">Carpenter</option>
              </select>
            </div>
            <div style={{ flex: 1 }}>
              <label className="input-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><DollarSign size={14} /> Hourly Rate ($)</label>
              <input type="number" name="hourlyRate" value={profile.hourlyRate} onChange={handleChange} className="input-field" />
            </div>
          </div>

          {/* Availability Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '8px', padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid var(--border-glass)' }}>
             <input 
               type="checkbox" 
               checked={profile.available} 
               onChange={(e) => setProfile({ ...profile, available: e.target.checked })} 
               style={{ width: '20px', height: '20px', accentColor: 'var(--success)' }} 
             />
             <div>
               <div style={{ fontWeight: '500', color: 'var(--text-primary)' }}>Accepting New Requests</div>
               <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Toggle this off to pause incoming job notifications.</div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}
