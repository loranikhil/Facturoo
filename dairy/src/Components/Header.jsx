import React, { useState, useEffect } from 'react';
import { Sun, Moon, MapPin, Zap, BarChart2, Bell, MessageCircle, User } from 'lucide-react';
import { ControlPoint, SearchOutlined, PersonAdd, GroupAdd } from '@mui/icons-material';
import { Popover, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import './Header.css';

const Header = () => {
  const [isDark, setIsDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

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
    document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.setAttribute('data-theme', !isDark ? 'dark' : 'light');
  };

  const handleCircleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'circle-popover' : undefined;

  const navigationItems = [
    { id: 'location', icon: <MapPin />, label: 'Location' },
    { id: 'theme', icon: isDark ? <Sun /> : <Moon />, label: isDark ? 'Light Mode' : 'Dark Mode', onClick: toggleTheme },
    { id: 'circle', icon: <ControlPoint />, label: 'Circle', onClick: handleCircleClick },
    { id: 'quick-actions', icon: <Zap />, label: 'Quick Actions' },
    { id: 'sales', icon: <BarChart2 />, label: 'Sales' },
    { id: 'notifications', icon: <Bell />, label: 'Notifications' },
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
            <div className="search-wrapper" 
                 onMouseEnter={() => setIsSearchOpen(true)}
                 onMouseLeave={() => setIsSearchOpen(false)}>
              <button
                className="icon-button search-toggle" 
                aria-label="Toggle search"
              >
                <SearchOutlined />
              </button>
              <div className={`search-bar ${isSearchOpen ? 'open' : ''}`}>
                <input
                  type="text"
                  placeholder="Search..."
                  className="search-input"
                  aria-label="Search input"
                />
              </div>
            </div>
          </div>

          <nav className="nav-container" role="navigation">
            {navigationItems.map(({ id, icon, label, onClick }) => (
              <div key={id} className="nav-item">
                <button
                  className="icon-button"
                  aria-label={label}
                  onClick={onClick || (() => console.log(`${label} clicked`))}
                >
                  {icon}
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
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <List>
          <ListItem button onClick={() => console.log('Add Manager clicked')}>
            <ListItemIcon>
              <PersonAdd />
            </ListItemIcon>
            <ListItemText primary="Add Manager" />
          </ListItem>
          <ListItem button onClick={() => console.log('Add Staff clicked')}>
            <ListItemIcon>
              <GroupAdd />
            </ListItemIcon>
            <ListItemText primary="Add Staff" />
          </ListItem>
        </List>
      </Popover>
    </header>
  );
};

export default Header;

