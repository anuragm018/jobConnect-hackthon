import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, ThumbsUp, HelpCircle, Send, Loader2, User, CornerDownRight, Award, Image as ImageIcon, X } from 'lucide-react';

export default function CommunityQA() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [showAskForm, setShowAskForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  
  const [activeCommentId, setActiveCommentId] = useState(null);
  const [commentText, setCommentText] = useState('');

  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('userProfile')) || {};

  useEffect(() => {
    fetchPosts();
  }, [token]);

  const fetchPosts = async () => {
    if (!token) return;
    try {
      const res = await fetch('http://localhost:5000/api/forum', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      setPosts(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    try {
      const formData = new FormData();
      formData.append('title', newTitle);
      formData.append('content', newContent);
      if (selectedFile) {
        formData.append('media', selectedFile);
      }

      const res = await fetch('http://localhost:5000/api/forum', {
        method: 'POST',
        headers: {
          // No Content-Type needed for FormData, browser sets it automatically with boundary
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });
      
      const data = await res.json();
      setPosts([data, ...posts]);
      
      // Reset form
      setNewTitle('');
      setNewContent('');
      setSelectedFile(null);
      setShowAskForm(false);
    } catch (err) {
      alert('Error posting question');
    }
  };

  const handleCommentSubmit = async (e, postId) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    try {
      const res = await fetch(`http://localhost:5000/api/forum/${postId}/comment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ content: commentText })
      });
      const updatedPost = await res.json();
      
      setPosts(posts.map(p => p._id === postId ? updatedPost : p));
      setCommentText('');
      setActiveCommentId(null);
    } catch (err) {
      alert('Error posting comment');
    }
  };

  const handleUpvoteUser = async (e, userId) => {
    e.stopPropagation();
    try {
      const res = await fetch(`http://localhost:5000/api/users/${userId}/reputation`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        fetchPosts();
      }
    } catch (err) {
      console.error('Failed to upvote user', err);
    }
  };

  const formatTime = (dateString) => {
    const d = new Date(dateString);
    return isNaN(d.getTime()) ? 'Recently' : d.toLocaleDateString() + ' ' + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const renderBadge = (score) => {
    if (!score || score === 0) return null;
    if (score >= 10) {
       return <span style={{ background: 'linear-gradient(45deg, #f59e0b, #fbbf24)', color: '#000', fontSize: '0.65rem', padding: '2px 8px', borderRadius: '10px', fontWeight: 'bold', boxShadow: '0 0 15px rgba(245, 158, 11, 0.8)', marginLeft: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}><Award size={12}/> Top Expert ({score})</span>;
    }
    if (score >= 5) {
       return <span style={{ background: 'linear-gradient(45deg, #a855f7, #ec4899)', color: '#fff', fontSize: '0.65rem', padding: '2px 8px', borderRadius: '10px', fontWeight: 'bold', boxShadow: '0 0 12px rgba(168, 85, 247, 0.6)', marginLeft: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}><Award size={12}/> Rising Pro ({score})</span>;
    }
    return <span style={{ background: 'rgba(59,130,246,0.15)', color: '#3b82f6', fontSize: '0.65rem', padding: '2px 8px', borderRadius: '10px', fontWeight: 'bold', border: '1px solid #3b82f6', marginLeft: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}>Helpful ({score})</span>;
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '24px', paddingBottom: '80px', height: '100%', overflowY: 'auto' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 className="heading-gradient" style={{ fontSize: '2.5rem', marginBottom: '8px' }}>Community Help</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Ask questions, share problems, and get solutions from local experts.</p>
        </div>
        <button className="btn-primary" onClick={() => setShowAskForm(!showAskForm)} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', fontSize: '1.05rem', boxShadow: '0 8px 20px rgba(37,99,235,0.25)' }}>
          <HelpCircle size={20} /> Ask a Question
        </button>
      </div>

      {/* Ask Form */}
      {showAskForm && (
        <div className="glass-panel" style={{ padding: '32px', borderRadius: '24px', marginBottom: '32px', borderTop: '4px solid var(--accent-primary)', animation: 'fadeIn 0.3s ease' }}>
          <h2 style={{ fontSize: '1.3rem', marginBottom: '20px' }}>What do you need help with?</h2>
          <form onSubmit={handlePostSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <input 
              type="text"
              placeholder="Question Title (e.g., How to fix a leaky faucet?)"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="input-field"
              style={{ fontSize: '1.1rem', fontWeight: 'bold' }}
              required
            />
            <textarea 
              placeholder="Describe your problem in detail... attaching a photo usually gets faster answers!"
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              className="input-field"
              style={{ height: '120px', resize: 'none' }}
              required
            />
            
            {/* File Upload Selector */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={(e) => setSelectedFile(e.target.files[0])} 
                style={{ display: 'none' }}
                accept="image/*,video/*"
              />
              <button 
                type="button" 
                className="btn-outline" 
                onClick={() => fileInputRef.current?.click()}
                style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', border: '1px dashed var(--border-glass)' }}
              >
                <ImageIcon size={18} /> Attach Photo or Video
              </button>
              
              {selectedFile && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(59,130,246,0.1)', padding: '6px 12px', borderRadius: '12px', color: 'var(--text-primary)' }}>
                  <span style={{ fontSize: '0.85rem' }}>{selectedFile.name}</span>
                  <X size={14} style={{ cursor: 'pointer', color: '#ef4444' }} onClick={() => setSelectedFile(null)} />
                </div>
              )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '8px' }}>
              <button type="button" className="btn-outline" onClick={() => setShowAskForm(false)}>Cancel</button>
              <button type="submit" className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Send size={18} /> Post Question
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Feed */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {loading ? (
           <div style={{ display: 'flex', justifyContent: 'center', padding: '60px 0' }}><Loader2 className="animate-spin" size={40} color="var(--accent-primary)" /></div>
        ) : posts.length === 0 ? (
           <div className="glass-panel" style={{ padding: '48px', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
             No questions have been asked yet. Be the first to start a discussion!
           </div>
        ) : (
          posts.map(post => {
            const authorRep = post.authorId?.reputationScore;
            return (
              <div key={post._id} className="glass-panel" style={{ padding: '32px', borderRadius: '24px', transition: 'transform 0.2s' }}>
                
                {/* Post Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <img src={post.authorId?.avatar || `https://ui-avatars.com/api/?name=${post.authorId?.name || 'User'}`} style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover', border: authorRep >= 5 ? '2px solid var(--accent-primary)' : 'none' }} />
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <span style={{ fontWeight: '700', fontSize: '1.1rem', color: 'var(--text-primary)' }}>{post.authorId?.name || 'Anonymous User'}</span>
                        {renderBadge(authorRep)}
                      </div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--accent-primary)', fontWeight: '600', marginTop: '2px' }}>{post.authorId?.role === 'customer' ? 'Community Member' : post.authorId?.title || 'Professional'} &bull; <span style={{ color: 'var(--text-secondary)', fontWeight: 'normal' }}>{formatTime(post.createdAt)}</span></div>
                    </div>
                  </div>
                </div>

                {/* Post Body & Media */}
                <h3 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '12px', color: 'var(--text-primary)' }}>{post.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: '1.6', marginBottom: post.mediaUrl ? '16px' : '24px' }}>{post.content}</p>

                {post.mediaUrl && (
                  <div style={{ marginBottom: '24px', borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--border-glass)' }}>
                    {post.mediaType === 'video' ? (
                      <video src={`http://localhost:5000${post.mediaUrl}`} controls style={{ width: '100%', maxHeight: '400px', objectFit: 'cover', background: '#000' }} />
                    ) : (
                      <img src={`http://localhost:5000${post.mediaUrl}`} alt="Attachment" style={{ width: '100%', maxHeight: '400px', objectFit: 'cover' }} />
                    )}
                  </div>
                )}

                {/* Actions Divider */}
                <div style={{ display: 'flex', gap: '24px', borderTop: '1px solid var(--border-glass)', borderBottom: '1px solid var(--border-glass)', padding: '16px 0', marginBottom: '24px' }}>
                  <button 
                    onClick={() => setActiveCommentId(activeCommentId === post._id ? null : post._id)}
                    style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', fontWeight: '600', cursor: 'pointer', fontSize: '0.95rem', transition: 'color 0.2s', outline: 'none' }}
                  >
                    <MessageSquare size={18} /> {post.comments?.length || 0} Answers
                  </button>
                </div>

                {/* Comments Section */}
                {post.comments && post.comments.length > 0 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
                    {post.comments.map(comment => {
                      const commRep = comment.authorId?.reputationScore;
                      const isMe = comment.authorId?._id === user.id;
                      
                      return (
                        <div key={comment._id} style={{ display: 'flex', gap: '16px', background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '16px' }}>
                          <CornerDownRight size={20} color="var(--text-secondary)" style={{ marginTop: '4px' }} />
                          <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                              <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                                <img src={comment.authorId?.avatar || `https://ui-avatars.com/api/?name=${comment.authorId?.name}`} style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }} />
                                <span style={{ fontWeight: '700', fontSize: '0.95rem' }}>{comment.authorId?.name || 'Local Expert'}</span>
                                {comment.authorId?.role === 'worker' && <span style={{ background: 'rgba(16,185,129,0.1)', color: 'var(--success)', fontSize: '0.7rem', padding: '2px 8px', borderRadius: '10px', fontWeight: 'bold' }}>{comment.authorId?.title || 'Verified'}</span>}
                                {renderBadge(commRep)}
                              </div>
                              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{formatTime(comment.createdAt)}</span>
                            </div>
                            
                            <p style={{ color: 'var(--text-primary)', fontSize: '0.95rem', lineHeight: '1.5', marginTop: '8px', marginBottom: '12px' }}>{comment.content}</p>
                            
                            {/* Upvote mechanics */}
                            {!isMe && (
                              <button 
                                onClick={(e) => handleUpvoteUser(e, comment.authorId?._id)}
                                style={{ background: 'rgba(37,99,235,0.1)', border: '1px solid rgba(37,99,235,0.3)', color: 'var(--accent-primary)', padding: '4px 12px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 'bold', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px', transition: 'all 0.2s' }}
                              >
                                <ThumbsUp size={12} /> Mark Helpful +1
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Add Comment Input */}
                {activeCommentId === post._id && (
                  <form onSubmit={(e) => handleCommentSubmit(e, post._id)} style={{ display: 'flex', gap: '12px', animation: 'fadeIn 0.2s ease' }}>
                    <img src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}`} style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
                    <div style={{ flex: 1, position: 'relative' }}>
                      <input 
                        type="text" 
                        placeholder="Write your solution or advice..." 
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        className="input-field" 
                        style={{ paddingRight: '50px', borderRadius: '20px' }}
                        autoFocus
                      />
                      <button type="submit" style={{ position: 'absolute', right: '6px', top: '50%', transform: 'translateY(-50%)', background: 'var(--accent-primary)', border: 'none', color: 'white', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                        <Send size={16} />
                      </button>
                    </div>
                  </form>
                )}
              </div>
            );
          })
        )}
      </div>

    </div>
  );
}
