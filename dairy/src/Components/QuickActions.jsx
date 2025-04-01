import React, { useState, useEffect } from 'react';
import { User, ChevronRight, Mail, Phone, Calendar } from 'lucide-react';
import "./QuickActions.css";

const QuickActions = () => {
 
  const randomNames = [
    { id: 1, name: "Nikhil", role: "Chef" },
    { id: 2, name: "Satya", role: "Server" },
    { id: 3, name: "Ram", role: "Manager" },
    
  ];

  // State to store user data with online status
  const [users, setUsers] = useState([]);

  // Function to randomly assign online status
  const assignRandomStatus = () => {
    return randomNames.map(user => ({
      ...user,
      isOnline: Math.random() > 0.4 // 60% chance of being online
    }));
  };

  // Initialize and refresh statuses periodically
  useEffect(() => {
    setUsers(assignRandomStatus());
    
    // Update statuses every 30 seconds
    const intervalId = setInterval(() => {
      setUsers(assignRandomStatus());
    }, 30000);
    
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="quick-actions-container">
      <div className="quick-actions-header">
        <h1>Quick Actions</h1>
        <p>Connect with team members and perform quick actions</p>
      </div>
      
      <div className="quick-actions-cards">
        <div className="action-card">
          <h2>Team Members</h2>
          <div className="users-list">
            {users.map((user) => (
              <div key={user.id} className="user-item">
                <div className="user-avatar">
                  <User size={24} />
                  <span className={`status-indicator ${user.isOnline ? 'online' : 'offline'}`}></span>
                </div>
                <div className="user-info">
                  <h3>{user.name}</h3>
                  <p>{user.role}</p>
                </div>
                <button className="action-button">
                  <ChevronRight size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>
        
        <div className="actions-panel">
          <div className="action-group">
            <h2>Common Actions</h2>
            <div className="action-buttons">
              <button className="action-item">
                <Mail />
                <span>Send Message</span>
              </button>
              <button className="action-item">
                <Phone />
                <span>Start Call</span>
              </button>
              <button className="action-item">
                <Calendar />
                <span>Schedule Meeting</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;