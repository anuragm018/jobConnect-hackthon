import React, { useState, useEffect } from 'react';
import { CreditCard, CheckCircle2, Clock, X, DollarSign, Wallet } from 'lucide-react';

export default function UserPaymentsView() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [selectedJob, setSelectedJob] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState('500'); // Default ₹500
  const [isProcessing, setIsProcessing] = useState(false);

  const token = localStorage.getItem('token');

  const fetchJobs = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/jobs?asCustomer=true', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      setJobs(data);
    } catch (err) {
      console.error('Error fetching jobs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handlePayment = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    const gross = parseFloat(paymentAmount);
    const platformFee = gross * 0.05; // 5% fee
    const net = gross - platformFee;

    try {
      // Simulate network delay for realistic mock payment
      await new Promise(r => setTimeout(r, 1500));

      const res = await fetch(`http://localhost:5000/api/jobs/${selectedJob._id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          status: 'Completed',
          financials: { gross, platformFee, net }
        })
      });

      if (res.ok) {
        alert('Payment Successful! The professional has been paid.');
        setSelectedJob(null);
        fetchJobs(); // refresh list
      }
    } catch (err) {
      console.error(err);
      alert('Payment failed.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (loading) {
    return <div style={{ display: 'flex', justifyContent: 'center', padding: '100px 0' }}><div className="animate-spin"><CheckCircle2 size={48} color="var(--accent-primary)" /></div></div>;
  }

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', paddingBottom: '80px' }}>
      <div style={{ padding: '0 0 32px 0' }}>
        <h1 className="heading-gradient" style={{ fontSize: '2.5rem', marginBottom: '8px' }}>My Bookings & Payments</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Manage your job requests and release secure payments to trusted professionals.</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {jobs.length === 0 ? (
          <div className="glass-panel" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-secondary)', borderRadius: '24px' }}>
            <Wallet size={48} style={{ margin: '0 auto 16px auto', opacity: 0.5 }} />
            <h3>No Bookings Yet</h3>
            <p>When you hire a professional, your active jobs and payment history will appear here.</p>
          </div>
        ) : (
          jobs.map(job => (
            <div key={job._id} className="glass-panel" style={{ padding: '24px', borderRadius: '24px', display: 'flex', flexWrap: 'wrap', gap: '24px', alignItems: 'center', borderLeft: job.status === 'Completed' ? '4px solid var(--success)' : '4px solid var(--accent-primary)' }}>
              
              <div style={{ flex: 1, minWidth: '250px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <img src={job.workerId?.avatar || `https://ui-avatars.com/api/?name=${job.workerId?.name}`} alt="Worker" style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
                  <div>
                    <h3 style={{ margin: 0, fontSize: '1.2rem' }}>{job.workerId?.name || 'Professional'}</h3>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{job.serviceType}</span>
                  </div>
                </div>
                <p style={{ color: 'var(--text-primary)', fontSize: '0.95rem', opacity: 0.9, margin: 0 }}>"{job.description}"</p>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '12px' }}>
                  Requested on {new Date(job.createdAt).toLocaleDateString()}
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '12px', minWidth: '150px' }}>
                <div style={{ 
                  background: job.status === 'Completed' ? 'rgba(16, 185, 129, 0.1)' : job.status === 'Accepted' ? 'rgba(59, 130, 246, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                  color: job.status === 'Completed' ? '#10b981' : job.status === 'Accepted' ? '#3b82f6' : 'var(--text-secondary)',
                  padding: '8px 16px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 'bold'
                }}>
                  {job.status === 'Pending' && <Clock size={14} style={{ display: 'inline', marginRight: '4px' }} />}
                  {job.status === 'Completed' && <CheckCircle2 size={14} style={{ display: 'inline', marginRight: '4px' }} />}
                  Status: {job.status}
                </div>

                {job.status === 'Accepted' && (
                  <button 
                    onClick={() => setSelectedJob(job)}
                    className="btn-primary" 
                    style={{ padding: '12px 24px', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 8px 15px rgba(99,102,241,0.3)' }}
                  >
                    <CreditCard size={18} /> Make Payment
                  </button>
                )}

                {job.status === 'Completed' && job.financials?.gross && (
                  <div style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--text-primary)', display: 'flex', alignItems: 'center' }}>
                    ₹{job.financials.gross.toLocaleString()} Paid
                  </div>
                )}
              </div>

            </div>
          ))
        )}
      </div>

      {/* Payment Modal Simulation */}
      {selectedJob && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(12px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
          <div className="glass-panel" style={{ width: '100%', maxWidth: '450px', padding: '40px', borderRadius: '24px', position: 'relative', background: 'linear-gradient(145deg, rgba(30,30,40,0.9), rgba(15,15,20,0.95))', border: '1px solid rgba(255,255,255,0.1)' }}>
            <button onClick={() => !isProcessing && setSelectedJob(null)} style={{ position: 'absolute', top: '24px', right: '24px', background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>
              <X size={24} />
            </button>

            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <div style={{ width: '64px', height: '64px', background: 'rgba(99, 102, 241, 0.15)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto', color: '#6366f1' }}>
                <CreditCard size={32} />
              </div>
              <h2 style={{ fontSize: '1.8rem', margin: '0 0 8px 0' }}>Secure Checkout</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>Releasing payment to {selectedJob.workerId?.name}</p>
            </div>

            <form onSubmit={handlePayment} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              <div>
                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Final Negotiated Amount (₹)</label>
                <div style={{ position: 'relative' }}>
                  <DollarSign size={20} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                  <input 
                    type="number" 
                    required 
                    min="1"
                    className="input-field" 
                    style={{ background: 'rgba(0,0,0,0.2)', fontSize: '1.2rem', paddingLeft: '48px', height: '56px' }}
                    value={paymentAmount}
                    onChange={(e) => setPaymentAmount(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Payment Method</label>
                <select className="input-field" style={{ background: 'rgba(0,0,0,0.2)', height: '56px', appearance: 'none' }}>
                  <option>UPI (Google Pay, PhonePe)</option>
                  <option>Credit / Debit Card</option>
                  <option>Net Banking</option>
                </select>
              </div>

              <div style={{ padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', marginTop: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.9rem' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Service Amount</span>
                  <span>₹{parseFloat(paymentAmount || 0).toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '0.9rem' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Platform Protection Fee (5%)</span>
                  <span>₹{(parseFloat(paymentAmount || 0) * 0.05).toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '1.1rem', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                  <span>Total to Pay</span>
                  <span style={{ color: 'var(--accent-primary)' }}>₹{(parseFloat(paymentAmount || 0) * 1.05).toLocaleString()}</span>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isProcessing} 
                className="btn-primary" 
                style={{ height: '56px', fontSize: '1.1rem', fontWeight: 'bold', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '8px', background: isProcessing ? 'var(--bg-glass)' : '' }}
              >
                {isProcessing ? 'Processing Securely...' : `Pay ₹${(parseFloat(paymentAmount || 0) * 1.05).toLocaleString()}`}
              </button>
            </form>
            
            <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '24px', opacity: 0.7 }}>
              Payments are fully encrypted and protected under Escrow.
            </p>
          </div>
        </div>
      )}

    </div>
  );
}
