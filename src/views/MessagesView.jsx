import React, { useState, useRef } from 'react';
import { Send, Phone, Video, MoreVertical, Briefcase, Paperclip, FileText } from 'lucide-react';

export default function MessagesView() {
  const [activeChat, setActiveChat] = useState(1);

  const contacts = [
    { id: 1, name: 'Abhinav', role: 'Senior Plukker', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=100&h=100', status: 'online', lastMessage: 'I can come by tomorrow at 10 AM.', unread: 2 },
    { id: 2, name: 'Marcus Chen', role: 'Electrician', avatar: 'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?auto=format&fit=crop&q=80&w=100&h=100', status: 'offline', lastMessage: 'The panel upgrade is complete.', unread: 0 },
    { id: 3, name: 'Elena Rodriguez', role: 'Painter', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=100&h=100', status: 'online', lastMessage: 'Let me check my schedule.', unread: 0 }
  ];

  const [newMessage, setNewMessage] = useState('');
  
  const [messages, setMessages] = useState({
    1: [
      { id: 1, text: 'Hi Abhinav, I have a leak under my kitchen sink.', sender: 'me', time: '09:30 AM' },
      { id: 2, text: 'Hello! I can definitely help with that. Could you send a quick photo of the pipes?', sender: 'them', time: '09:32 AM' },
      { id: 3, text: 'Sure, just sent it.', sender: 'me', time: '09:35 AM' },
      { id: 4, text: 'Thanks. Looks like a standard P-trap replacement. My rate is $85/hr and it should take about an hour.', sender: 'them', time: '09:40 AM' },
      { id: 5, text: 'I can come by tomorrow at 10 AM.', sender: 'them', time: '09:41 AM' }
    ],
    2: [
      { id: 101, text: 'Hey Marcus, when can you come by?', sender: 'me', time: '10:00 AM' },
      { id: 102, text: 'The panel upgrade is complete.', sender: 'them', time: '10:05 AM' }
    ],
    3: [
      { id: 201, text: 'Hi Elena, I need my living room painted.', sender: 'me', time: '11:00 AM' },
      { id: 202, text: 'Let me check my schedule.', sender: 'them', time: '11:15 AM' }
    ]
  });

  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const newMsg = {
      id: Date.now(),
      text: `Attached file: ${file.name}`,
      sender: 'me',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isFile: true
    };
    
    setMessages(prev => ({
      ...prev,
      [activeChat]: [...(prev[activeChat] || []), newMsg]
    }));
    
    setTimeout(() => {
      setMessages(prev => ({
        ...prev,
        [activeChat]: [...(prev[activeChat] || []), {
          id: Date.now() + 1,
          text: "Got the file! Let me take a look.",
          sender: 'them',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }]
      }));
    }, 1500);
  };

  const handleSendMessage = (e) => {
    if (e) e.preventDefault();
    if (!newMessage.trim()) return;

    const newMsg = {
      id: Date.now(),
      text: newMessage,
      sender: 'me',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => ({
      ...prev,
      [activeChat]: [...(prev[activeChat] || []), newMsg]
    }));
    setNewMessage('');
    
    // Simulate a quick worker auto-reply
    setTimeout(() => {
      setMessages(prev => ({
        ...prev,
        [activeChat]: [...(prev[activeChat] || []), {
          id: Date.now() + 1,
          text: "Got it! I'll take a look at that.",
          sender: 'them',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }]
      }));
    }, 1500);
  };

  const currentContact = contacts.find(c => c.id === activeChat);

  return (
    <div style={{ height: 'calc(100vh - 120px)', display: 'flex', gap: '24px', overflow: 'hidden' }}>

      {/* Contacts Sidebar */}
      <div className="glass-panel" style={{ width: '320px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ padding: '24px', borderBottom: '1px solid var(--border-glass)' }}>
          <h2 style={{ fontSize: '1.5rem' }}>Messages</h2>
        </div>

        <div style={{ overflowY: 'auto', flex: 1, padding: '12px' }}>
          {contacts.map(contact => (
            <div
              key={contact.id}
              onClick={() => setActiveChat(contact.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: '12px', padding: '16px',
                borderRadius: '12px', cursor: 'pointer', transition: 'all 0.2s',
                background: activeChat === contact.id ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
                border: activeChat === contact.id ? '1px solid var(--accent-primary)' : '1px solid transparent'
              }}
            >
              <div style={{ position: 'relative' }}>
                <img src={contact.avatar} alt={contact.name} style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }} />
                {contact.status === 'online' && (
                  <div style={{ position: 'absolute', bottom: 0, right: 0, width: '12px', height: '12px', background: 'var(--success)', borderRadius: '50%', border: '2px solid var(--bg-primary)' }}></div>
                )}
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontWeight: '500', color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{contact.name}</span>
                  {contact.unread > 0 && (
                    <span style={{ background: 'var(--accent-primary)', color: 'white', fontSize: '0.7rem', padding: '2px 6px', borderRadius: '10px' }}>{contact.unread}</span>
                  )}
                </div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {contact.lastMessage}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      {currentContact ? (
        <div className="glass-panel" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

          {/* Chat Header */}
          <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border-glass)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <img src={currentContact.avatar} alt={currentContact.name} style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }} />
              <div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '2px' }}>{currentContact.name}</h3>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{currentContact.role}</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <button className="btn-primary" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>
                <Briefcase size={16} /> Hire Now
              </button>
              <div style={{ display: 'flex', gap: '12px', color: 'var(--text-secondary)' }}>
                <Phone size={20} style={{ cursor: 'pointer' }} />
                <Video size={20} style={{ cursor: 'pointer' }} />
                <MoreVertical size={20} style={{ cursor: 'pointer' }} />
              </div>
            </div>
          </div>

          {/* Messages Wrapper */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '8px' }}>Today</div>

            {(messages[activeChat] || []).map(msg => (
              <div key={msg.id} style={{ display: 'flex', flexDirection: 'column', alignItems: msg.sender === 'me' ? 'flex-end' : 'flex-start' }}>
                <div style={{
                  background: msg.sender === 'me' ? 'var(--accent-primary)' : 'var(--bg-secondary)',
                  color: msg.sender === 'me' ? 'white' : 'var(--text-primary)',
                  padding: '12px 16px',
                  borderRadius: msg.sender === 'me' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                  maxWidth: '70%',
                  lineHeight: '1.5'
                }}>
                  {msg.isFile ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontStyle: 'italic', opacity: 0.9 }}>
                      <FileText size={18} /> <span>{msg.text}</span>
                    </div>
                  ) : (
                    msg.text
                  )}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                  {msg.time}
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div style={{ padding: '20px 24px', borderTop: '1px solid var(--border-glass)' }}>
            <form onSubmit={handleSendMessage} style={{ display: 'flex', gap: '12px', alignItems: 'flex-end' }}>
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
                    handleSendMessage(e);
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
          Select a conversation to start chatting
        </div>
      )}
    </div>
  );
}
