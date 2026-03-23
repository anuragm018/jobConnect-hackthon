import React, { useState, useEffect, useRef } from 'react';
import { Send, Phone, Video, MoreVertical, Briefcase, Paperclip, FileText, Loader2 } from 'lucide-react';

export default function MessagesView() {
  const [activeChat, setActiveChat] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [messages, setMessages] = useState({});
  const [newMessage, setNewMessage] = useState('');
  const [loadingContacts, setLoadingContacts] = useState(true);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  
  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);
  
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('userProfile')) || {};
  const myId = user.id;

  // 1 & 2. Fetch Contacts and Messages Polling
  useEffect(() => {
    if (!token) return;
    
    const fetchAll = () => {
      // Poll global updated contacts (Sorted by latest msg with unread counts)
      fetch('http://localhost:5000/api/messages/contacts', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
        .then(res => res.json())
        .then(data => {
          setContacts(data);
          // Auto-select top contact if none selected
          if (!activeChat && data.length > 0) setActiveChat(data[0]._id);
          setLoadingContacts(false);
        })
        .catch(err => {
          console.error(err);
          setLoadingContacts(false);
        });

      // Poll messages for active chat
      if (activeChat) {
        fetch(`http://localhost:5000/api/messages/${activeChat}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        })
          .then(res => res.json())
          .then(data => {
            setMessages(prev => ({
              ...prev,
              [activeChat]: data
            }));
          })
          .catch(console.error);
      }
    };

    fetchAll(); // initial fetch
    const interval = setInterval(fetchAll, 3000); // 3 second sync
    
    return () => clearInterval(interval);
  }, [activeChat, token]);

  // Global Search using debounce
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    const delayDebounceFn = setTimeout(() => {
      fetch(`http://localhost:5000/api/users/search?q=${searchQuery}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      .then(res => res.json())
      .then(data => setSearchResults(data))
      .catch(console.error);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, token]);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, activeChat]);

  const handleSendMessage = async (e) => {
    if (e) e.preventDefault();
    if (!newMessage.trim() || !activeChat) return;

    const messageText = newMessage;
    setNewMessage(''); // optimistic clear
    
    // Optimistic UI update
    const tempMsg = {
      _id: Date.now().toString(),
      senderId: myId,
      receiverId: activeChat,
      content: messageText,
      createdAt: new Date().toISOString()
    };
    
    setMessages(prev => ({
      ...prev,
      [activeChat]: [...(prev[activeChat] || []), tempMsg]
    }));

    try {
      await fetch('http://localhost:5000/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          receiverId: activeChat,
          content: messageText
        })
      });
      // The interval will fetch the true message with DB _id shortly
    } catch (err) {
      console.error('Error sending message:', err);
    }
  };

  const handleFileChange = (e) => {
    // Mock file send for MVP
    const file = e.target.files[0];
    if (!file) return;
    setNewMessage(`[Attached file: ${file.name}]`);
    // Wait slightly then send
    setTimeout(() => {
      document.getElementById('send-msg-form').dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    }, 100);
  };

  const currentContact = contacts.find(c => c._id === activeChat);
  const activeMessages = messages[activeChat] || [];
  
  const formatTime = (isoString) => {
    return new Date(isoString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleSelectContact = (selectedUser) => {
    setActiveChat(selectedUser._id);
    setSearchQuery('');
    setSearchResults([]);
    
    // Add to local contacts if missing
    if (!contacts.find(c => c._id === selectedUser._id)) {
      setContacts([selectedUser, ...contacts]);
    }
  };

  const displayList = searchQuery.trim() ? searchResults : contacts;

  return (
    <div style={{ height: 'calc(100vh - 120px)', display: 'flex', gap: '24px', overflow: 'hidden' }}>

      {/* Contacts Sidebar */}
      <div className="glass-panel" style={{ width: '320px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ padding: '24px 24px 16px 24px' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '16px' }}>Network</h2>
          <input 
            type="text" 
            placeholder="Search..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-field"
            style={{ width: '100%', borderRadius: '20px', padding: '10px 16px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-glass)', fontSize: '0.9rem' }}
          />
        </div>

        <div style={{ overflowY: 'auto', flex: 1, padding: '12px' }}>
          {loadingContacts ? (
             <div style={{ display: 'flex', justifyContent: 'center', padding: '40px 0' }}><Loader2 className="animate-spin" color="var(--accent-primary)" /></div>
          ) : displayList.length === 0 ? (
             <div style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '20px' }}>
               {searchQuery ? 'No users found matching your search.' : 'No contacts found across network.'}
             </div>
          ) : (
            displayList.map(contact => (
              <div
                key={contact._id}
                onClick={() => handleSelectContact(contact)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '12px', padding: '16px',
                  borderRadius: '12px', cursor: 'pointer', transition: 'all 0.2s',
                  background: activeChat === contact._id ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
                  border: activeChat === contact._id ? '1px solid var(--accent-primary)' : '1px solid transparent'
                }}
              >
                <div style={{ position: 'relative' }}>
                  <img src={contact.avatar || `https://ui-avatars.com/api/?name=${contact.name}`} alt={contact.name} style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }} />
                  {contact.isAvailable !== false && (
                    <div style={{ position: 'absolute', bottom: 0, right: 0, width: '12px', height: '12px', background: 'var(--success)', borderRadius: '50%', border: '2px solid var(--bg-primary)' }}></div>
                  )}
                  {contact.unreadCount > 0 && contact._id !== activeChat && (
                     <div style={{ position: 'absolute', top: '-4px', right: '-4px', background: '#ef4444', color: 'white', fontSize: '0.7rem', fontWeight: 'bold', width: '20px', height: '20px', borderRadius: '50%', border: '2px solid var(--bg-glass)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10, boxShadow: '0 0 10px rgba(239, 68, 68, 0.5)' }}>
                       {contact.unreadCount > 9 ? '9+' : contact.unreadCount}
                     </div>
                  )}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ fontWeight: '500', color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{contact.name}</span>
                  </div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {contact.role === 'customer' ? 'Customer' : contact.title || 'Professional'}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Chat Area */}
      {currentContact ? (
        <div className="glass-panel" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

          {/* Chat Header */}
          <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border-glass)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <img src={currentContact.avatar || `https://ui-avatars.com/api/?name=${currentContact.name}`} alt={currentContact.name} style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }} />
              <div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '2px' }}>{currentContact.name}</h3>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{currentContact.role === 'customer' ? 'Customer' : currentContact.title}</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              {currentContact.role === 'worker' && user.role === 'customer' && (
                <button className="btn-primary" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>
                  <Briefcase size={16} /> Hire Now
                </button>
              )}
              <div style={{ display: 'flex', gap: '12px', color: 'var(--text-secondary)' }}>
                <Phone size={20} style={{ cursor: 'pointer' }} />
                <Video size={20} style={{ cursor: 'pointer' }} />
                <MoreVertical size={20} style={{ cursor: 'pointer' }} />
              </div>
            </div>
          </div>

          {/* Messages Wrapper */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {activeMessages.length === 0 ? (
              <div style={{ textAlign: 'center', color: 'var(--text-secondary)', marginTop: '40px' }}>
                No messages yet. Start the conversation!
              </div>
            ) : (
              <div style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '8px' }}>
                Conversation History
              </div>
            )}

            {activeMessages.map(msg => (
              <div key={msg._id} style={{ display: 'flex', flexDirection: 'column', alignItems: msg.senderId === myId ? 'flex-end' : 'flex-start' }}>
                <div style={{
                  background: msg.senderId === myId ? 'var(--accent-primary)' : 'var(--bg-secondary)',
                  color: msg.senderId === myId ? 'white' : 'var(--text-primary)',
                  padding: '12px 16px',
                  borderRadius: msg.senderId === myId ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                  maxWidth: '70%',
                  lineHeight: '1.5'
                }}>
                  {msg.content.includes('[Attached file: ') ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontStyle: 'italic', opacity: 0.9 }}>
                      <FileText size={18} /> <span>{msg.content.replace('[Attached file: ', '').replace(']', '')}</span>
                    </div>
                  ) : (
                    msg.content
                  )}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                  {formatTime(msg.createdAt)}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div style={{ padding: '20px 24px', borderTop: '1px solid var(--border-glass)' }}>
            <form id="send-msg-form" onSubmit={handleSendMessage} style={{ display: 'flex', gap: '12px', alignItems: 'flex-end' }}>
              <input type="file" ref={fileInputRef} onChange={handleFileChange} style={{ display: 'none' }} />
              <button 
                type="button" 
                onClick={() => fileInputRef.current?.click()}
                style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', padding: '12px', cursor: 'pointer' }}
              >
                <Paperclip size={24} />
              </button>
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    document.getElementById('send-msg-form').dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
                  }
                }}
                placeholder="Type a message..."
                className="input-field"
                style={{ resize: 'none', height: '50px', flex: 1 }}
              ></textarea>
              <button type="submit" className="btn-primary" style={{ height: '50px', width: '50px', padding: 0, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Send size={20} />
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="glass-panel" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>
          Select a contact from your network to start chatting
        </div>
      )}
    </div>
  );
}
