import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Home, MessageSquare, User, Users, Briefcase, DollarSign, Map, Compass } from 'lucide-react';

export default function MainLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const role = localStorage.getItem('userRole') || 'customer';

  const workerNavItems = [
    { path: '/app/workerHome', icon: Home, label: 'Job Requests' },
    { path: '/app/explore', icon: Compass, label: 'Explore Works' },
    { path: '/app/collab', icon: Users, label: 'Collaboration Hub' },
    { path: '/app/messages', icon: MessageSquare, label: 'Messages' },
    { path: '/app/earnings', icon: DollarSign, label: 'Earnings' },
    { path: '/app/workerProfile', icon: Briefcase, label: 'My Profile' }
  ];

  const customerNavItems = [
    { path: '/app', icon: Home, label: 'Discover' },
    { path: '/app/explore', icon: Compass, label: 'Explore Works' },
    { path: '/app/map', icon: Map, label: 'Map View' },
    { path: '/app/messages', icon: MessageSquare, label: 'Messages' },
    { path: '/app/profile', icon: User, label: 'My Profile' }
  ];

  const navItems = role === 'worker' ? workerNavItems : customerNavItems;

  return (
    <div className="layout-container">
      {/* Desktop Sidebar */}
      <aside className="sidebar glass-panel">
        <div className="logo-section">
          <h2 className="heading-gradient">JobConnect</h2>
        </div>
        <nav className="desktop-nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <div 
                key={item.path} 
                className={`nav-item ${isActive ? 'active' : ''}`}
                onClick={() => navigate(item.path)}
              >
                <Icon size={24} className="nav-icon" />
                <span className="nav-label">{item.label}</span>
              </div>
            );
          })}
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="main-content">
        {/* Dynamic Mobile Header */}
        <header className="mobile-header glass-panel">
          <h2 className="heading-gradient">JobConnect</h2>
          {/* Optional actions like notifications could go here */}
        </header>

        <div className="content-scroll">
          <Outlet />
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="bottom-nav glass-panel">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <div 
              key={item.path} 
              className={`mobile-nav-item ${isActive ? 'active' : ''}`}
              onClick={() => navigate(item.path)}
            >
              <Icon size={24} className="nav-icon" />
              <span className="nav-label">{item.label}</span>
            </div>
          );
        })}
      </nav>
    </div>
  );
}
