import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sun, Moon, MapPin, Zap, BarChart2, Bell, MessageCircle, User, LogOut, Phone, Mail } from 'lucide-react';
import { Search } from 'lucide-react';
import { Popover, Tooltip } from '@mui/material';
import { IoIosPersonAdd } from "react-icons/io";
import { ImUsers } from "react-icons/im";

import './Header.css';


const Header = () => {
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [circleAnchorEl, setCircleAnchorEl] = useState(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
  const [profileAnchorEl, setProfileAnchorEl] = useState(null);
  const searchInputRef = useRef(null);
  
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Lora",
      message: "Customer ABC sent a request",
      time: "10 minutes ago",
      read: false
    },
    {
      id: 2,
      title: "System",
      message: "New update available",
      time: "1 hour ago",
      read: false
    },
    {
      id: 3,
      title: "Admin",
      message: "Monthly report is ready",
      time: "Yesterday",
      read: true
    }
  ]);

  const userProfile = {
    name: "Nikhil",
    phone: "+91 9999000000",
    email: "nik@gmail.com"
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDark(prefersDark);
    document.body.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
  }, []);
  
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.body.setAttribute('data-theme', !isDark ? 'dark' : 'light');
  };
  
  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current.focus();
      }, 300);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleCircleClick = (event) => {
    setCircleAnchorEl(event.currentTarget);
  };

  const handleNotificationClick = (event) => {
    setNotificationAnchorEl(event.currentTarget);
  };

  const handleProfileClick = (event) => {
    setProfileAnchorEl(event.currentTarget);
  };

  const handleCloseCircle = () => {
    setCircleAnchorEl(null);
  };

  const handleCloseNotifications = () => {
    setNotificationAnchorEl(null);
  };

  const handleCloseProfile = () => {
    setProfileAnchorEl(null);
  };

  const handleLogout = () => {
    console.log("Logging out...");
    
    navigate('/login');
    handleCloseProfile();
  };

  const markAsRead = (notificationId) => {
    setNotifications(notifications.map(notification => 
      notification.id === notificationId 
        ? { ...notification, read: true } 
        : notification
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
  };

  const deleteNotification = (notificationId, event) => {
    event.stopPropagation();
    setNotifications(notifications.filter(notification => notification.id !== notificationId));
  };

  const handleQuickActionsClick = () => {
    console.log("Navigating to Quick Actions");
    navigate('/quick-actions');
  };

  const circleOpen = Boolean(circleAnchorEl);
  const circleId = circleOpen ? 'circle-popover' : undefined;
  
  const notificationOpen = Boolean(notificationAnchorEl);
  const notificationId = notificationOpen ? 'notification-popover' : undefined;

  const profileOpen = Boolean(profileAnchorEl);
  const profileId = profileOpen ? 'profile-popover' : undefined;
  
  const unreadCount = notifications.filter(notification => !notification.read).length;

  const navigationItems = [
    { id: 'location', icon: <MapPin />, label: 'Location' },
    { id: 'quick-actions', icon: <Zap />, label: 'QuickActions', onClick: handleQuickActionsClick },
    { id: 'sales', icon: <BarChart2 />, label: 'Sales' },
    { 
      id: 'notifications', 
      icon: <Bell />, 
      label: 'Notifications', 
      onClick: handleNotificationClick,
      badge: unreadCount > 0 ? unreadCount : null
    },
    { id: 'support', icon: <MessageCircle />, label: 'Support' },
    { id: 'theme', icon: isDark ? <Sun /> : <Moon />, label: isDark ? 'Light Mode' : 'Dark Mode', onClick: toggleTheme },
    { id: 'circle', icon: <IoIosPersonAdd />, label: 'Circle', onClick: handleCircleClick },
    { id: 'user', icon: <User />, label: 'User Profile', onClick: handleProfileClick }
  ];

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        <div className="header-content">
          <div className="left-section">
            <a href="/" className="logo">
              <span className="logo-text">Facturo</span>
              <span className="logo-dot"></span>
            </a>
            
            <div className="search-wrapper">
              <button
                className="search-toggle"
                aria-label="Toggle search"
                onClick={toggleSearch}
              >
                <Search />
              </button>
              <div className={`search-bar ${isSearchOpen ? 'open' : ''}`}>
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search..."
                  className="search-input"
                  aria-label="Search input"
                />
              </div>
            </div>
          </div>

          <button className="mobile-menu-toggle" onClick={toggleMenu} aria-label="Toggle menu">
            <span></span>
            <span></span>
            <span></span>
          </button>

          <nav className={`nav-container ${isMenuOpen ? 'menu-open' : ''}`} role="navigation">
            {navigationItems.map(({ id, icon, label, onClick, badge }) => (
              <div key={id} className="nav-item">
                <button
                  className={`icon-button ${badge ? 'has-badge' : ''}`}
                  aria-label={label}
                  onClick={onClick || (() => {})}
                  title={label}
                >
                  {icon}
                  {badge != null && (
                    <span className="badge">{badge}</span>
                  )}
                </button>
                <span className="tooltip">{label}</span>
              </div>
            ))}
          </nav>
        </div>
      </div>

      <Popover
        id={circleId}
        open={circleOpen}
        anchorEl={circleAnchorEl}
        onClose={handleCloseCircle}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        PaperProps={{
          className: 'popover-paper'
        }}
      >
        <div className="icon-popover-container">
          <Tooltip title="Add Manager" placement="bottom">
            <button 
              className="icon-popover-button"
              onClick={() => console.log('Add Manager clicked')}
            >
              <IoIosPersonAdd />
            </button>
          </Tooltip>
          <Tooltip title="Add Staff" placement="bottom">
            <button 
              className="icon-popover-button"
              onClick={() =>  navigate('/StaffEntryForm')}
            >
              <ImUsers />
            </button>
          </Tooltip>
        </div>
      </Popover>

      <Popover
        id={notificationId}
        open={notificationOpen}
        anchorEl={notificationAnchorEl}
        onClose={handleCloseNotifications}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          className: 'notification-popover-paper'
        }}
      >
        <div className="notification-container">
          <div className="notification-header">
            <h3>Notifications</h3>
            {unreadCount > 0 && (
              <button 
                className="mark-all-read"
                onClick={markAllAsRead}
              >
                Mark all as read
              </button>
            )}
          </div>
          
          <div className="notification-list">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <div 
                  key={notification.id} 
                  className={`notification-item ${notification.read ? 'read' : 'unread'}`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="notification-content">
                    <div className="notification-title">{notification.title}</div>
                    <div className="notification-message">{notification.message}</div>
                    <div className="notification-time">{notification.time}</div>
                  </div>
                  <button 
                    className="notification-delete"
                    onClick={(e) => deleteNotification(notification.id, e)}
                    aria-label="Delete notification"
                  >
                    &times;
                  </button>
                </div>
              ))
            ) : (
              <div className="no-notifications">No notifications</div>
            )}
          </div>
          
          <div className="notification-footer">
            <button className="view-all-button">View All Notifications</button>
          </div>
        </div>
      </Popover>

      
      <Popover
  id={profileId}
  open={profileOpen}
  anchorEl={profileAnchorEl}
  onClose={handleCloseProfile}
  anchorOrigin={{
    vertical: 'bottom',
    horizontal: 'right',
  }}
  transformOrigin={{
    vertical: 'top',
    horizontal: 'right',
  }}
  PaperProps={{
    className: 'profile-popover-paper'
  }}
>
  <div className="profile-container"> 
    <div className="profile-content">
      <div className="profile-item">
        <div className="profile-icon">
          <User size={18} />
        </div>
        <div>
          <span className="profile-info-label">Name</span>
          <div className="profile-info">{userProfile.name}</div>
        </div>
      </div>
      
      <div className="profile-item">
        <div className="profile-icon">
          <Phone size={18} />
        </div>
        <div>
          <span className="profile-info-label">Phone</span>
          <div className="profile-info">{userProfile.phone}</div>
        </div>
      </div>
      
      <div className="profile-item">
        <div className="profile-icon">
          <Mail size={18} />
        </div>
        <div>
          <span className="profile-info-label">Email</span>
          <div className="profile-info">{userProfile.email}</div>
        </div>
      </div>
    </div>
    
    <div className="profile-footer">
      <button className="logout-button" onClick={handleLogout}>
        <LogOut size={18} />
        <span>Logout</span>
      </button>
    </div>
  </div>
</Popover>
    </header>
  );
};

export default Header;