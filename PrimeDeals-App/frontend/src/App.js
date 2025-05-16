// import logo from './logo.svg';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './screens/Home';
import Listings from './screens/Listings';
import Agents from './screens/Agent';
import About from './screens/AboutUs';
import Contact from './screens/ContactUs';
import Signup from './screens/Signup';
import Login from './screens/Login';
import Details from './screens/Details';
import AdminProperties from './screens/AdminProperties';
import AdminDashboard from './screens/AdminDashboard';
import AdminAgents from './screens/AdminAgents';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/listings" element={<Listings />} />
        <Route path="/agents" element={<Agents />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/signIn" element={<Login />} />
        <Route path="/signUp" element={<Signup />} />
        <Route path="/AdminDashboard" element={<AdminDashboard />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/properties" element={<AdminProperties />} />
        <Route path="/agents-management" element={<AdminAgents />} />
        <Route path="/AgentCRUD" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
};

export default App;