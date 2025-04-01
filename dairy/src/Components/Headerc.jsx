import React, { useState, useEffect } from 'react';
import { Sun, Moon, MapPin, Zap, BarChart2, Bell, MessageCircle, User } from 'lucide-react';
import { SearchOutlined } from '@mui/icons-material';
import { Popover, Tooltip } from '@mui/material';
import { ImUsers } from "react-icons/im";
import { IoIosPersonAdd } from "react-icons/io";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useNavigate } from 'react-router-dom';

import './Header.css';

const Header = () => {
  const [isDark, setIsDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [circleAnchorEl, setCircleAnchorEl] = useState(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Lora",
      message: "Customer ABC sent a request",
      time: "10 minutes ago",
      read: false
    },
  ]);
  const navigate = useNavigate();
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDark(prefersDark);
    document.body.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.body.setAttribute('data-theme', !isDark ? 'dark' : 'light');
  };

  

  const handleCircleClick = (event) => {
    setCircleAnchorEl(event.currentTarget);
  };

  const handleNotificationClick = (event) => {
    setNotificationAnchorEl(event.currentTarget);
  };

  const handleCloseCircle = () => {
    setCircleAnchorEl(null);
  };

  const handleCloseNotifications = () => {
    setNotificationAnchorEl(null);
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

  const deleteNotification = (notificationId) => {
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
  
  const unreadCount = notifications.filter(notification => !notification.read).length;

  const navigationItems = [
    { id: 'location', icon: <MapPin />, label: 'Location' },
    { id: 'theme', icon: isDark ? <Sun /> : <Moon />, label: isDark ? 'Light Mode' : 'Dark Mode', onClick: toggleTheme },
    { id: 'circle', icon: <AddCircleOutlineIcon />, label: 'Circle', onClick: handleCircleClick },
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
    { id: 'user', icon: <User />, label: 'User Profile' }
  ];

  return (
    <header className={`header theme-transition ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        <div className="header-content">
          <div className="left-section">
            <a href="/" className="logo theme-transition">
              Facturo
            </a>
            <div
      className="search-wrapper"
      onMouseEnter={() => setIsSearchOpen(true)}
      onMouseLeave={() => setIsSearchOpen(false)}
    >
      <button
        className="icon-button search-toggle"
        aria-label="Toggle search"
        onClick={() => setIsSearchOpen((prev) => !prev)}
      >
        <SearchOutlined />
      </button>
      <div className={`search-bar ${isSearchOpen ? "open" : ""}`}>
        <input
          type="text"
          placeholder="Search..."
          className="search-input"
          aria-label="Search input"
          autoFocus={isSearchOpen} 
        />
      </div>
    </div>
          </div>

          <nav className="nav-container" role="navigation">
            {navigationItems.map(({ id, icon, label, onClick, badge }) => (
              <div key={id} className="nav-item">
                <button
                  className={`icon-button ${id === 'notifications' && badge ? 'has-badge' : ''}`}
                  aria-label={label}
                  onClick={onClick || (() => console.log(`${label} clicked`))}
                >
                  {icon}
                  {badge != null && (
                    <span className="badge">{badge}</span>
                  )}
                </button>
                <span className="tooltip" role="tooltip">
                  {label}
                </span>
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
        onClick={() => console.log('Add Staff clicked')}
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
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
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
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteNotification(notification.id);
                    }}
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
    </header>
  );
};

export default Header;