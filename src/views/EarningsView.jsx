import React, { useState, useEffect } from 'react';
import { Bell, HelpCircle, Wallet, Percent, PiggyBank, Search, SlidersHorizontal, ChevronLeft, ChevronRight, TrendingUp, Loader2 } from 'lucide-react';

export default function EarningsView() {
  const [timeFilter, setTimeFilter] = useState('Month'); // Month, Quarter, Year
  const [txFilter, setTxFilter] = useState('All'); // All, Payments, Refunds
  
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('userProfile')) || { name: 'Worker', title: 'Top Rated Provider', avatar: 'https://ui-avatars.com/api/?name=Worker' };

  useEffect(() => {
    if (!token) return;
    fetch('http://localhost:5000/api/jobs', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        // Filter out declined jobs or only show completed/accepted for financial tracking
        const validJobs = data.filter(job => job.status === 'Completed' || job.status === 'Accepted');
        setJobs(validJobs);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [token]);

  // Calculate mock financials based on real job data
  const baseRate = user.hourlyRate || 500;
  
  const transactions = jobs.map((job, index) => {
    // Generate a pseudo-realistic cost based on ID length or just static multiplier for demo
    const hours = (job._id.charCodeAt(0) % 5) + 2; 
    const gross = baseRate * hours;
    const fees = gross * 0.10; // 10% platform fee
    const net = gross - fees;
    
    return {
      id: job._id,
      date: new Date(job.updatedAt || job.createdAt).toLocaleDateString(),
      project: job.serviceType,
      gross,
      fees,
      net,
      status: job.status === 'Completed' ? 'Paid' : 'Processing',
      statusColor: job.status === 'Completed' ? 'var(--success)' : 'var(--text-secondary)',
      icon: job.serviceType.charAt(0).toUpperCase()
    };
  });

  const totalGross = transactions.reduce((acc, tx) => acc + (tx.status === 'Paid' ? tx.gross : 0), 0) + (jobs.length === 0 ? 54000 : 0); // Include mock base if empty for demo purposes
  const totalFees = transactions.reduce((acc, tx) => acc + (tx.status === 'Paid' ? tx.fees : 0), 0) + (jobs.length === 0 ? 5750 : 0);
  const totalNet = totalGross - totalFees;

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '32px', height: '100%', overflowY: 'auto' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 className="heading-gradient" style={{ fontSize: '2rem' }}>Earnings Overview</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <Bell size={20} color="var(--text-secondary)" style={{ cursor: 'pointer' }} />
          <HelpCircle size={20} color="var(--text-secondary)" style={{ cursor: 'pointer' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderLeft: '1px solid var(--border-glass)', paddingLeft: '20px' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontWeight: '600', fontSize: '0.95rem' }}>{user.name}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{user.title || 'Top Rated Provider'}</div>
            </div>
            <img src={user.avatar || 'https://ui-avatars.com/api/?name=Worker'} alt="Profile" style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
          </div>
        </div>
      </div>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '100px 0' }}><Loader2 className="animate-spin" size={48} color="var(--accent-primary)" /></div>
      ) : (
        <>
          {/* Snapshot Section */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px' }}>
              <div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px' }}>Financial Snapshot</div>
                <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>₹{totalNet.toLocaleString('en-IN', {minimumFractionDigits: 2})}</div>
                <div style={{ color: 'var(--success)', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem', fontWeight: '500', marginTop: '4px' }}>
                  <TrendingUp size={16} /> +12.5% from last month
                </div>
              </div>
              
              <div style={{ display: 'flex', background: 'var(--bg-glass)', borderRadius: '30px', padding: '6px', border: '1px solid var(--border-glass)' }}>
                {['Month', 'Quarter', 'Year'].map(t => (
                  <button 
                    key={t}
                    onClick={() => setTimeFilter(t)}
                    style={{ padding: '8px 24px', borderRadius: '24px', border: 'none', background: timeFilter === t ? 'var(--bg-primary)' : 'transparent', color: timeFilter === t ? 'var(--accent-primary)' : 'var(--text-secondary)', fontWeight: timeFilter === t ? '600' : 'normal', cursor: 'pointer', transition: 'all 0.2s', boxShadow: timeFilter === t ? '0 2px 8px rgba(0,0,0,0.1)' : 'none' }}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
              {/* Gross Earnings */}
              <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(99,102,241,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-primary)' }}>
                    <Wallet size={20} />
                  </div>
                  <span style={{ fontSize: '0.75rem', background: 'rgba(255,255,255,0.05)', padding: '4px 8px', borderRadius: '4px', color: 'var(--text-secondary)', fontWeight: '600', letterSpacing: '0.5px' }}>GROSS</span>
                </div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '8px' }}>Gross Earnings</div>
                <div style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>₹{totalGross.toLocaleString('en-IN', {minimumFractionDigits: 2})}</div>
              </div>

              {/* Fees & Commission */}
              <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(245,158,11,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--warning)' }}>
                    <Percent size={20} />
                  </div>
                  <span style={{ fontSize: '0.75rem', background: 'rgba(255,255,255,0.05)', padding: '4px 8px', borderRadius: '4px', color: 'var(--text-secondary)', fontWeight: '600', letterSpacing: '0.5px' }}>PLATFORM</span>
                </div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '8px' }}>Fees & Commission</div>
                <div style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>- ₹{totalFees.toLocaleString('en-IN', {minimumFractionDigits: 2})}</div>
              </div>

              {/* Net Payout */}
              <div style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)', borderRadius: '16px', padding: '24px', color: 'white', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', boxShadow: '0 10px 25px rgba(59,130,246,0.3)' }}>
                <PiggyBank size={150} color="rgba(255,255,255,0.1)" style={{ position: 'absolute', right: '-20px', bottom: '-20px' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', position: 'relative', zIndex: 1 }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <PiggyBank size={20} color="white" />
                  </div>
                  <span style={{ fontSize: '0.75rem', background: 'rgba(255,255,255,0.2)', padding: '4px 8px', borderRadius: '4px', fontWeight: '600', letterSpacing: '0.5px' }}>NET</span>
                </div>
                <div style={{ opacity: 0.9, fontSize: '0.95rem', marginBottom: '8px', position: 'relative', zIndex: 1 }}>Net Payout Ready</div>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', position: 'relative', zIndex: 1 }}>₹{totalNet.toLocaleString('en-IN', {minimumFractionDigits: 2})}</div>
              </div>
            </div>
          </div>

          {/* Transactions */}
          <div className="glass-panel" style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                <h2 style={{ fontSize: '1.3rem' }}>Transactions</h2>
                <div style={{ display: 'flex', background: 'rgba(255,255,255,0.03)', borderRadius: '20px', padding: '4px' }}>
                  {['All', 'Payments', 'Refunds'].map(f => (
                    <button 
                      key={f} 
                      onClick={() => setTxFilter(f)}
                      style={{ background: txFilter === f ? 'var(--accent-primary)' : 'transparent', color: txFilter === f ? 'white' : 'var(--text-secondary)', border: 'none', padding: '6px 16px', borderRadius: '16px', fontSize: '0.85rem', cursor: 'pointer', transition: 'all 0.2s', fontWeight: txFilter === f ? '600' : 'normal' }}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '16px' }}>
                <div style={{ position: 'relative' }}>
                  <Search size={16} color="var(--text-secondary)" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
                  <input type="text" placeholder="Search project..." className="input-field" style={{ paddingLeft: '40px', padding: '10px 16px 10px 44px', borderRadius: '12px', minWidth: '250px' }} />
                </div>
                <button className="glass-panel" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 16px', border: '1px solid var(--border-glass)', cursor: 'pointer' }}>
                  <SlidersHorizontal size={18} color="var(--text-secondary)" />
                </button>
              </div>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', minWidth: '800px', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', letterSpacing: '1px', borderBottom: '1px solid var(--border-glass)' }}>
                    <th style={{ padding: '0 0 16px 0', fontWeight: '600' }}>DATE</th>
                    <th style={{ padding: '0 0 16px 0', fontWeight: '600' }}>PROJECT NAME</th>
                    <th style={{ padding: '0 0 16px 0', fontWeight: '600' }}>GROSS (₹)</th>
                    <th style={{ padding: '0 0 16px 0', fontWeight: '600' }}>FEES (₹)</th>
                    <th style={{ padding: '0 0 16px 0', fontWeight: '600' }}>NET (₹)</th>
                    <th style={{ padding: '0 0 16px 0', fontWeight: '600', textAlign: 'right' }}>STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((tx, index) => (
                    <tr key={tx.id} style={{ borderBottom: index < transactions.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                      <td style={{ padding: '20px 0', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{tx.date}</td>
                      <td style={{ padding: '20px 0' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(99,102,241,0.1)', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 'bold' }}>
                            {tx.icon}
                          </div>
                          <div>
                            <div style={{ color: 'var(--accent-primary)', fontWeight: '500', fontSize: '0.95rem', cursor: 'pointer' }}>{tx.project}</div>
                            <div style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', marginTop: '2px' }}>ID: #{tx.id.substring(18, 24).toUpperCase()}</div>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '20px 0', fontWeight: '500' }}>{tx.gross.toLocaleString('en-IN', {minimumFractionDigits: 2})}</td>
                      <td style={{ padding: '20px 0', color: 'var(--warning)' }}>{tx.fees > 0 ? tx.fees.toLocaleString('en-IN', {minimumFractionDigits: 2}) : '0.00'}</td>
                      <td style={{ padding: '20px 0', fontWeight: '600' }}>{tx.net.toLocaleString('en-IN', {minimumFractionDigits: 2})}</td>
                      <td style={{ padding: '20px 0', textAlign: 'right' }}>
                        <span style={{ 
                          background: tx.status === 'Paid' ? 'rgba(16,185,129,0.15)' : tx.status === 'Processing' ? 'rgba(245,158,11,0.15)' : 'rgba(255,255,255,0.05)',
                          color: tx.status === 'Paid' ? 'var(--success)' : 'var(--warning)',
                          padding: '6px 12px',
                          borderRadius: '20px',
                          fontSize: '0.8rem',
                          fontWeight: '600',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}>
                          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'currentColor' }}></div>
                          {tx.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {transactions.length === 0 && (
                    <tr>
                      <td colSpan="6" style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>
                        No completed transactions yet. Start accepting and completing jobs to see earnings here.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
