import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Star, UploadCloud, X, Loader2 } from 'lucide-react';

export default function ExploreView() {
  const navigate = useNavigate();
  const role = localStorage.getItem('userRole') || 'customer';
  const token = localStorage.getItem('token');
  
  const [filter, setFilter] = useState('All Projects');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  const [newProj, setNewProj] = useState({
    title: '', category: 'Interior Design', img: '', overview: '',
    duration: '', scale: '', area: '', budget: ''
  });

  const categories = ['All Projects', 'Interior Design', 'Electrical', 'Plumbing', 'Carpentry', 'Gardening', 'Renovation'];

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/projects');
      const data = await res.json();
      setProjects(data);
    } catch (err) {
      console.error('Failed to fetch projects', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!token) return alert('Session expired. Please log in again.');
    setSubmitLoading(true);

    const payload = {
      title: newProj.title,
      category: newProj.category,
      imageUrl: newProj.img || 'https://images.unsplash.com/photo-1581141849291-1125c7b692b5?auto=format&fit=crop&w=800&h=600',
      overview: newProj.overview,
      metrics: { duration: newProj.duration || '-', scale: newProj.scale || '-', area: newProj.area || '-', budget: newProj.budget || '-' }
    };
    
    try {
      const res = await fetch('http://localhost:5000/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      
      if (!res.ok) throw new Error('Upload failed');
      const savedProject = await res.json();

      setProjects([savedProject, ...projects]);
      setShowUploadModal(false);
      setNewProj({ title: '', category: 'Interior Design', img: '', overview: '', duration: '', scale: '', area: '', budget: '' });
    } catch (err) {
      alert(err.message);
    } finally {
      setSubmitLoading(false);
    }
  };

  const filteredProjects = filter === 'All Projects' ? projects : projects.filter(p => p.category === filter);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px 0', paddingBottom: '80px', position: 'relative' }}>
      
      {/* Header and Upload Action */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', flexWrap: 'wrap', gap: '24px' }}>
        <div>
          <h1 className="heading-gradient" style={{ fontSize: '2.8rem', fontWeight: '800', marginBottom: '12px', letterSpacing: '-0.5px' }}>Explore Craftsmanship</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Discover the finest work from top-rated professionals in your neighborhood.</p>
        </div>
        
        {role === 'worker' && (
          <button 
            onClick={() => setShowUploadModal(true)}
            style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'var(--accent-primary)', color: 'white', padding: '16px 28px', borderRadius: '30px', fontWeight: '700', fontSize: '1.05rem', boxShadow: '0 8px 25px var(--accent-glow)', border: 'none', cursor: 'pointer', transition: 'transform 0.2s', ':active': { transform: 'scale(0.95)' } }}
          >
            <UploadCloud size={24} /> Upload Work Results
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: '16px', overflowX: 'auto', paddingBottom: '16px', marginBottom: '40px', scrollbarWidth: 'none' }}>
        {categories.map(c => (
          <button 
            key={c}
            onClick={() => setFilter(c)}
            style={{ 
              whiteSpace: 'nowrap',
              padding: '12px 28px', 
              borderRadius: '30px', 
              border: filter === c ? 'none' : '1px solid var(--border-glass)', 
              fontWeight: '700',
              cursor: 'pointer',
              fontSize: '0.95rem',
              transition: 'all 0.2s',
              background: filter === c ? 'var(--accent-primary)' : 'var(--bg-glass)',
              color: filter === c ? 'white' : 'var(--text-secondary)'
            }}
          >
            {c}
          </button>
        ))}
      </div>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '100px 0', color: 'var(--text-secondary)' }}>
          <Loader2 size={48} className="animate-spin" />
        </div>
      ) : filteredProjects.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '100px 0', color: 'var(--text-secondary)', fontSize: '1.2rem' }}>
          No projects found in this category.
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '32px' }}>
          {filteredProjects.map((proj, idx) => (
            <div key={proj._id} className="glass-panel" style={{ borderRadius: '24px', overflow: 'hidden', border: '1px solid var(--border-glass)', display: 'flex', flexDirection: 'column', background: 'var(--bg-primary)', boxShadow: '0 10px 30px rgba(0,0,0,0.03)' }}>
              
              <div style={{ width: '100%', height: idx === 0 ? '450px' : '380px', position: 'relative' }}>
                <img src={proj.imageUrl} alt={proj.category} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <button style={{ position: 'absolute', top: '20px', right: '20px', width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(8px)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', cursor: 'pointer', transition: 'background 0.2s' }}>
                  <Heart size={22} />
                </button>
              </div>

              <div style={{ padding: '32px 24px', display: 'flex', flexDirection: 'column', gap: '24px', flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <img src={proj.workerId ? proj.workerId.avatar : 'https://ui-avatars.com/api/?name=User'} alt="Worker" style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover' }} />
                  <div>
                    <div style={{ fontSize: '1.15rem', fontWeight: '800', color: 'var(--text-primary)' }}>{proj.workerId ? proj.workerId.name : 'Unknown Worker'}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--success)', fontSize: '0.95rem', fontWeight: '800', marginTop: '4px' }}>
                      <Star size={16} fill="var(--success)" /> {proj.workerId ? proj.workerId.successRate / 20 : 5.0}
                    </div>
                  </div>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                  <span style={{ background: 'var(--bg-secondary)', color: 'var(--text-secondary)', padding: '8px 20px', borderRadius: '20px', fontSize: '0.9rem', fontWeight: '700' }}>
                    {proj.category}
                  </span>
                  <button 
                    onClick={() => navigate(`/app/project/${proj._id}`)}
                    style={{ background: 'var(--accent-primary)', color: 'white', padding: '12px 24px', borderRadius: '24px', fontWeight: '700', border: 'none', cursor: 'pointer', fontSize: '0.95rem', transition: 'background 0.2s' }}
                  >
                    View Project
                  </button>
                </div>

                {role === 'customer' && (
                  <div style={{ marginTop: '12px', paddingTop: '20px', borderTop: '1px solid var(--border-glass)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Rate this work:</span>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      {[1,2,3,4,5].map(s => (
                         <Star key={s} size={22} style={{ color: 'var(--text-secondary)', cursor: 'pointer', opacity: 0.5 }} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '24px' }}>
          <div className="glass-panel" style={{ width: '100%', maxWidth: '600px', background: 'var(--bg-primary)', padding: '40px', borderRadius: '32px', position: 'relative', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 20px 50px rgba(0,0,0,0.3)' }}>
            <button 
              onClick={() => setShowUploadModal(false)} 
              style={{ position: 'absolute', top: '24px', right: '24px', background: 'var(--bg-glass)', borderRadius: '50%', width: '40px', height: '40px', border: '1px solid var(--border-glass)', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <X size={20} />
            </button>
            
            <h2 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '8px' }}>Upload New Project</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>Showcase your craftsmanship to potential local clients.</p>
            
            <form onSubmit={handleUpload} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label className="input-label">Project Title</label>
                <input type="text" required className="input-field" value={newProj.title} onChange={e => setNewProj({...newProj, title: e.target.value})} placeholder="e.g. Modern Living Room Makeover..." />
              </div>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <div style={{ flex: '1 1 200px' }}>
                  <label className="input-label">Category</label>
                  <select className="input-field" value={newProj.category} onChange={e => setNewProj({...newProj, category: e.target.value})} style={{ appearance: 'none', background: 'var(--bg-glass)' }}>
                    {categories.filter(c => c !== 'All Projects').map(c => <option key={c} value={c} style={{ background: 'var(--bg-primary)' }}>{c}</option>)}
                  </select>
                </div>
                <div style={{ flex: '1 1 200px' }}>
                  <label className="input-label">Cover Image URL (Optional)</label>
                  <input type="url" className="input-field" value={newProj.img} onChange={e => setNewProj({...newProj, img: e.target.value})} placeholder="https://..." />
                </div>
              </div>
              
              <div>
                <label className="input-label">Detailed Overview</label>
                <textarea required className="input-field" rows="4" value={newProj.overview} onChange={e => setNewProj({...newProj, overview: e.target.value})} placeholder="Describe the challenges, scope, and end result..." style={{ resize: 'vertical' }}></textarea>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '16px', background: 'rgba(255,255,255,0.02)', padding: '20px', borderRadius: '16px', border: '1px solid var(--border-glass)' }}>
                <div><label className="input-label">Duration</label><input type="text" className="input-field" value={newProj.duration} onChange={e => setNewProj({...newProj, duration: e.target.value})} placeholder="e.g. 5 Days" /></div>
                <div><label className="input-label">Scale</label><input type="text" className="input-field" value={newProj.scale} onChange={e => setNewProj({...newProj, scale: e.target.value})} placeholder="e.g. Full Reno" /></div>
                <div><label className="input-label">Area</label><input type="text" className="input-field" value={newProj.area} onChange={e => setNewProj({...newProj, area: e.target.value})} placeholder="e.g. 200 sq.ft" /></div>
                <div><label className="input-label">Budget</label><input type="text" className="input-field" value={newProj.budget} onChange={e => setNewProj({...newProj, budget: e.target.value})} placeholder="e.g. Standard" /></div>
              </div>
              
              <button type="submit" disabled={submitLoading} className="btn-primary" style={{ marginTop: '16px', padding: '16px', fontSize: '1.1rem' }}>
                {submitLoading ? <Loader2 size={24} className="animate-spin" /> : 'Publish Project'}
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
