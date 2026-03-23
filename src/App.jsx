import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import RoleSelection from './components/RoleSelection';
import CustomerLoginView from './components/CustomerLoginView';
import WorkerLoginView from './components/WorkerLoginView';
import MainLayout from './components/MainLayout';
import HomeView from './views/HomeView';
import MapView from './views/MapView';
import CollaborationHub from './views/CollaborationHub';
import MessagesView from './views/MessagesView';
import ProfileView from './views/ProfileView';
import WorkerProfileView from './views/WorkerProfileView';
import EarningsView from './views/EarningsView';
import ExploreView from './views/ExploreView';
import ProjectDetailView from './views/ProjectDetailView';
import './index.css';
import WorkerHome from './views/WorkerHome';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RoleSelection />} />
        <Route path="/login/customer" element={<CustomerLoginView />} />
        <Route path="/login/worker" element={<WorkerLoginView />} />

        {/* Main Application Layout */}
        <Route path="/app" element={<MainLayout />}>
          <Route index element={<HomeView />} />
          <Route path='workerHome' element={<WorkerHome />} />
          <Route path="explore" element={<ExploreView />} />
          <Route path="project/:id" element={<ProjectDetailView />} />
          <Route path="collab" element={<CollaborationHub />} />
          <Route path="map" element={<MapView />} />
          <Route path="messages" element={<MessagesView />} />
          <Route path="profile" element={<ProfileView />} />
          <Route path="workerProfile" element={<WorkerProfileView />} />
          <Route path="earnings" element={<EarningsView />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
