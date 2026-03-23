import React from 'react';
import { MapPin, Globe, CheckCircle2, Star, MessageSquare } from 'lucide-react';

export default function WorkerProfileView() {
  const testimonials = [
    {
      id: 1,
      name: 'Priya Sharma',
      location: 'LOKHANDWALA COMPLEX',
      rating: 5,
      text: '"Rajesh was incredibly professional. He fixed a leak that three other plumbers couldn\'t identify. He left the work area cleaner than he found it. Highly recommended!"',
      img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100'
    },
    {
      id: 2,
      name: 'Amit Patel',
      location: 'VERSOVA HEIGHTS',
      rating: 5,
      text: '"Great service and fair pricing. He arrived exactly on time and explained the issue clearly. Our new bathroom looks amazing thanks to his precise fitting work."',
      img: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=100&h=100'
    },
    {
      id: 3,
      name: 'Rohan Mehta',
      location: 'JUHU AREA',
      rating: 5,
      text: '"A master of his craft. He completely replaced our building\'s water pump with zero downtime. Very impressive knowledge."',
      img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100'
    }
  ];

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', paddingBottom: '80px', position: 'relative' }}>
      
      {/* Top Profile Card */}
      <div className="glass-panel" style={{ padding: '32px', borderRadius: '32px', display: 'flex', gap: '40px', marginBottom: '32px', flexWrap: 'wrap', border: '1px solid var(--border-glass)', background: 'var(--bg-glass)' }}>
        
        {/* Left Avatar Block */}
        <div style={{ position: 'relative', width: '220px', height: '220px', borderRadius: '24px', overflow: 'hidden', flexShrink: 0, boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}>
          <img 
            src="https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&w=400&h=400" 
            alt="Rajesh Kumar" 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
          />
          <div style={{ position: 'absolute', bottom: '12px', right: '12px', background: '#4ade80', color: 'white', padding: '6px 14px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '6px', border: '3px solid white', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
            <div style={{ width: '6px', height: '6px', background: 'white', borderRadius: '50%' }}></div>
            ONLINE
          </div>
        </div>

        {/* Right Info Block */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px', justifyContent: 'center', minWidth: '300px' }}>
          <div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: '800', margin: '0 0 8px 0', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '10px' }}>
              Rajesh Kumar <CheckCircle2 size={30} fill="#2563eb" color="white" />
            </h1>
            <h2 style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', fontWeight: '600', margin: 0 }}>Senior Plumber & Pipeline Specialist</h2>
          </div>
          
          <p style={{ color: 'var(--text-primary)', lineHeight: '1.7', fontSize: '1.05rem', opacity: 0.85, maxWidth: '650px', marginBottom: '8px' }}>
            With over 12 years of experience in residential and commercial plumbing, I specialize in leak detection, modern bathroom fittings, and complex industrial piping systems. Focused on quality and community trust.
          </p>

          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(99, 102, 241, 0.08)', color: '#4f46e5', padding: '10px 20px', borderRadius: '24px', fontSize: '0.95rem', fontWeight: '700' }}>
              <MapPin size={18} /> Andheri West, Mumbai
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(99, 102, 241, 0.08)', color: '#4f46e5', padding: '10px 20px', borderRadius: '24px', fontSize: '0.95rem', fontWeight: '700' }}>
              <Globe size={18} /> Hindi, English, Marathi
            </span>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '56px' }}>
        
        {/* Jobs Card */}
        <div className="glass-panel" style={{ padding: '32px 24px', borderRadius: '24px', display: 'flex', alignItems: 'center', gap: '24px', border: '1px solid var(--border-glass)' }}>
          <div style={{ width: '64px', height: '64px', background: 'rgba(59, 130, 246, 0.1)', color: '#2563eb', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CheckCircle2 size={32} />
          </div>
          <div>
            <div style={{ fontSize: '1.6rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '6px' }}>120+ Jobs</div>
            <div style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', fontWeight: '500' }}>Completed on platform</div>
          </div>
        </div>

        {/* Rating Card */}
        <div className="glass-panel" style={{ padding: '32px 24px', borderRadius: '24px', display: 'flex', alignItems: 'center', gap: '24px', border: '1px solid var(--border-glass)' }}>
          <div style={{ width: '64px', height: '64px', background: 'rgba(34, 197, 94, 0.1)', color: '#16a34a', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Star size={32} fill="currentColor" color="transparent" />
          </div>
          <div>
            <div style={{ fontSize: '1.6rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '6px' }}>4.9/5 Rating</div>
            <div style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', fontWeight: '500' }}>From 98 verified clients</div>
          </div>
        </div>

        {/* Hired Card */}
        <div style={{ padding: '32px 24px', borderRadius: '24px', background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)', color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '20px', boxShadow: '0 12px 30px rgba(37,99,235,0.25)' }}>
          <div style={{ display: 'flex' }}>
            <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=100&h=100" style={{ width: '44px', height: '44px', borderRadius: '50%', border: '3px solid #2563eb' }} />
            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100" style={{ width: '44px', height: '44px', borderRadius: '50%', border: '3px solid #2563eb', marginLeft: '-14px' }} />
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100" style={{ width: '44px', height: '44px', borderRadius: '50%', border: '3px solid #2563eb', marginLeft: '-14px' }} />
            <div style={{ width: '44px', height: '44px', borderRadius: '50%', border: '3px solid #2563eb', marginLeft: '-14px', background: '#1e40af', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem', fontWeight: '800' }}>+9</div>
          </div>
          <div style={{ fontSize: '1.05rem', fontWeight: '700' }}>Hired by 12 people in your area</div>
        </div>

      </div>

      {/* Work Gallery */}
      <div style={{ marginBottom: '64px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--text-primary)' }}>Work Gallery</h2>
          <button style={{ background: 'none', border: '1.5px dashed var(--accent-primary)', color: 'var(--accent-primary)', padding: '10px 24px', borderRadius: '12px', fontWeight: '700', fontSize: '0.95rem', cursor: 'pointer', transition: 'background 0.2s', ':hover': { background: 'rgba(99,102,241,0.05)' } }}>
            View All Projects
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          <div style={{ borderRadius: '24px', overflow: 'hidden', height: '400px' }}>
            <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&h=800" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Modern Sink" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', height: '400px' }}>
            <div style={{ borderRadius: '24px', overflow: 'hidden', flex: 1 }}>
              <img src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&h=400" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Industrial Pipes" />
            </div>
            <div style={{ borderRadius: '24px', overflow: 'hidden', flex: 1 }}>
              <img src="https://images.unsplash.com/photo-1581141849291-1125c7b692b5?auto=format&fit=crop&w=600&h=400" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Tools" />
            </div>
          </div>
          <div style={{ borderRadius: '24px', overflow: 'hidden', height: '400px' }}>
             <img src="https://images.unsplash.com/photo-1505798577917-a65157d3320a?auto=format&fit=crop&w=600&h=800" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Under sink pipes" />
          </div>
        </div>
      </div>

      {/* Local Testimonials */}
      <div style={{ marginBottom: '80px' }}>
        <h2 style={{ fontSize: '1.8rem', fontWeight: '800', marginBottom: '32px', color: 'var(--text-primary)' }}>Local Testimonials</h2>
        
        <div style={{ display: 'flex', gap: '32px', overflowX: 'auto', paddingBottom: '32px', scrollbarWidth: 'none' }}>
          {testimonials.map(test => (
            <div key={test.id} className="glass-panel" style={{ minWidth: '400px', padding: '40px', borderRadius: '24px', display: 'flex', flexDirection: 'column', gap: '24px', border: '1px solid var(--border-glass)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <img src={test.img} style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover' }} />
                  <div>
                    <div style={{ fontSize: '1.15rem', fontWeight: '800', color: 'var(--text-primary)' }}>{test.name}</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px', letterSpacing: '0.5px', fontWeight: '600' }}>{test.location}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '2px' }}>
                  {[...Array(test.rating)].map((_, i) => <Star key={i} size={16} fill="#16a34a" color="#16a34a" />)}
                </div>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontStyle: 'italic', lineHeight: '1.7', fontSize: '1rem' }}>
                {test.text}
              </p>
            </div>
          ))}
        </div>
        
        {/* Fake scrollbar indicator */}
        <div style={{ width: '100%', height: '8px', background: 'var(--border-glass)', borderRadius: '4px', position: 'relative' }}>
          <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: '40%', background: 'var(--text-secondary)', borderRadius: '4px' }}></div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '20px', paddingBottom: '40px', borderTop: '1px solid var(--border-glass)', paddingTop: '48px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '32px', fontWeight: '500' }}>
          <span style={{ cursor: 'pointer', transition: 'color 0.2s', ':hover': { color: 'var(--accent-primary)' } }}>Support</span>
          <span style={{ cursor: 'pointer', transition: 'color 0.2s' }}>About</span>
          <span style={{ cursor: 'pointer', transition: 'color 0.2s' }}>Privacy</span>
          <span style={{ cursor: 'pointer', transition: 'color 0.2s' }}>Terms</span>
        </div>
        <div style={{ opacity: 0.8 }}>© 2024 JobConnect. The Curated Connection.</div>
      </div>

      {/* Floating Action Button */}
      <button style={{ position: 'fixed', bottom: '40px', right: '40px', background: '#2563eb', color: 'white', padding: '18px 32px', borderRadius: '40px', border: 'none', fontSize: '1.15rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '14px', boxShadow: '0 12px 30px rgba(37,99,235,0.4)', cursor: 'pointer', zIndex: 100, transition: 'transform 0.2s', ':active': { transform: 'scale(0.95)' } }}>
        <MessageSquare size={24} /> Start Live Chat
      </button>

    </div>
  );
}
