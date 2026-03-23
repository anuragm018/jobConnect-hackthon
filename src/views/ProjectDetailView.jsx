import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, ShieldCheck, Mail, ArrowRight, Cuboid, MapPin, Quote, Loader2, Star } from 'lucide-react';

export default function ProjectDetailView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const fetchProject = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/projects');
        if (!res.ok) throw new Error('Network error');
        const projects = await res.json();
        
        // Find the specific project by MongoDB _id
        const foundProject = projects.find(p => p._id === id);
        setProject(foundProject);
      } catch (err) {
        console.error('Error fetching project details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '150px 0', color: 'var(--accent-primary)' }}>
        <Loader2 size={64} className="animate-spin" />
      </div>
    );
  }

  if (!project) {
    return (
      <div style={{ padding: '80px 24px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '16px' }}>Project Not Found</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>This project may have been removed or does not exist.</p>
        <button onClick={() => navigate('/app/explore')} className="btn-primary" style={{ margin: '0 auto' }}>
          Return to Explore
        </button>
      </div>
    );
  }

  // Safely extract worker data assuming frontend populated objects
  const workerName = project.workerId?.name || 'Unknown Expert';
  const workerImg = project.workerId?.avatar || 'https://ui-avatars.com/api/?name=Worker';
  const rating = project.workerId?.successRate ? (project.workerId.successRate / 20).toFixed(1) : '5.0';

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', paddingBottom: '80px' }}>
      
      {/* Back Button */}
      <button 
        onClick={() => navigate('/app/explore')}
        style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', marginBottom: '24px', fontWeight: '600', fontSize: '1rem', transition: 'color 0.2s' }}
      >
        <ArrowLeft size={20} /> Back to Explore
      </button>

      {/* Hero Header */}
      <div style={{ position: 'relative', width: '100%', height: '450px', borderRadius: '32px', overflow: 'hidden', marginBottom: '40px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
        <img 
          src={project.imageUrl} 
          alt={project.title} 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
        />
        {/* Overlay gradient */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0) 100%)' }}></div>
        
        {/* Header Content */}
        <div style={{ position: 'absolute', bottom: '40px', left: '40px', right: '40px', color: 'white' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'var(--success)', color: 'var(--bg-primary)', padding: '6px 16px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '800', marginBottom: '16px', letterSpacing: '0.5px' }}>
            <CheckCircle2 size={16} /> COMPLETED PROJECT
          </div>
          <h1 style={{ fontSize: '3.5rem', fontWeight: '800', marginBottom: '12px', letterSpacing: '-1px', lineHeight: '1.1' }}>
            {project.title}
          </h1>
          <p style={{ fontSize: '1.15rem', opacity: 0.9, fontWeight: '500' }}>
            {project.subtitle}
          </p>
        </div>
      </div>

      {/* Main Layout Grid */}
      <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
        
        {/* Left Column - Main Details */}
        <div style={{ flex: '1 1 600px', display: 'flex', flexDirection: 'column', gap: '48px' }}>
          
          {/* Overview */}
          <section>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <div style={{ width: '6px', height: '32px', background: 'var(--accent-primary)', borderRadius: '4px' }}></div>
              <h2 style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--text-primary)', margin: 0 }}>Project Overview</h2>
            </div>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
              {project.overview}
            </p>

            {/* Metrics Row */}
            {project.metrics && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '16px', marginTop: '32px' }}>
                {[
                  { label: 'DURATION', value: project.metrics.duration },
                  { label: 'SCALE', value: project.metrics.scale },
                  { label: 'AREA', value: project.metrics.area },
                  { label: 'BUDGET', value: project.metrics.budget }
                ].map(item => (
                  <div key={item.label} className="glass-panel" style={{ padding: '20px', borderRadius: '16px', background: 'var(--bg-glass)', border: '1px solid var(--border-glass)' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-secondary)', marginBottom: '8px', letterSpacing: '1px' }}>{item.label}</div>
                    <div style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--accent-primary)' }}>{item.value}</div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Materials */}
          {project.materials && project.materials.length > 0 && (
            <section>
              <h2 style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '24px' }}>Materials & Highlights</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px' }}>
                {project.materials.map((mat, i) => (
                  <div key={i} className="glass-panel" style={{ padding: '32px 20px', borderRadius: '24px', background: 'var(--bg-glass)', border: '1px solid var(--border-glass)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '16px' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(45,90,240,0.1)', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Cuboid size={24} />
                    </div>
                    <div style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--text-primary)', lineHeight: '1.4' }}>{mat}</div>
                  </div>
                ))}
              </div>
            </section>
          )}

        </div>

        {/* Right Column - Sticky Sidebar */}
        <div style={{ flex: '0 0 380px', position: 'sticky', top: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Worker Profile Card */}
          <div className="glass-panel" style={{ padding: '32px', borderRadius: '32px', border: '1px solid rgba(45,90,240,0.2)', background: 'var(--bg-glass)', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '32px' }}>
              <img src={workerImg} style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: '3px solid white', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
              <div>
                <div style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '4px' }}>{workerName}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.95rem', color: 'var(--text-secondary)', fontWeight: '500' }}>
                  <ShieldCheck size={18} color="var(--success)" /> Verified Expert
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-around', padding: '24px 0', borderTop: '1px solid var(--border-glass)', borderBottom: '1px solid var(--border-glass)', marginBottom: '32px' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--text-secondary)', marginBottom: '8px', letterSpacing: '1px' }}>RATING</div>
                <div style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                   {rating} <Star size={16} fill="var(--accent-primary)" />
                </div>
              </div>
              <div style={{ width: '1px', background: 'var(--border-glass)' }}></div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--text-secondary)', marginBottom: '8px', letterSpacing: '1px' }}>STATUS</div>
                <div style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--success)' }}>Online</div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <button style={{ background: 'var(--accent-primary)', color: 'white', border: 'none', padding: '16px', borderRadius: '40px', fontSize: '1.05rem', fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer', transition: 'background 0.2s', boxShadow: '0 8px 20px rgba(45,90,240,0.3)', ':hover': { background: 'var(--accent-hover)' } }}>
                Book {workerName.split(' ')[0]} <ArrowRight size={20} />
              </button>
              <button className="btn-outline" style={{ background: 'rgba(45,90,240,0.05)', color: 'var(--accent-primary)', border: 'none', padding: '16px', borderRadius: '40px', fontSize: '1.05rem', fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer', transition: 'background 0.2s' }}>
                Inquire for Details <Mail size={20} />
              </button>
            </div>
          </div>

          {/* Map Area Card */}
          <div className="glass-panel" style={{ padding: '24px', borderRadius: '32px', border: '1px solid var(--border-glass)', overflow: 'hidden', position: 'relative' }}>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.1rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '8px' }}>
                <MapPin size={20} color="var(--accent-primary)" strokeWidth={2.5} /> Local Service Area
              </div>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.5', paddingLeft: '28px' }}>
                Available for premium projects instantly via the platform.
              </p>
            </div>
            {/* Faint map background illustration */}
            <div style={{ position: 'absolute', inset: 0, opacity: 0.1, background: 'url("https://www.transparenttextures.com/patterns/cubes.png")' }}></div>
          </div>

        </div>

      </div>

    </div>
  );
}
