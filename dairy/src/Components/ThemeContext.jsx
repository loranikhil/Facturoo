import React, { createContext, useContext, useState, useEffect } from 'react';

// Create a context for theme management
export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    // Check for saved theme preference first
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
      // Use saved preference if available
      setIsDark(savedTheme === 'dark');
      document.body.setAttribute('data-theme', savedTheme);
    } else {
      // Fall back to system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDark(prefersDark);
      document.body.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
      localStorage.setItem('theme', prefersDark ? 'dark' : 'light');
    }
    
    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      if (!localStorage.getItem('theme')) { // Only auto-switch if user hasn't set preference
        const newTheme = e.matches ? 'dark' : 'light';
        setIsDark(e.matches);
        document.body.setAttribute('data-theme', newTheme);
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Toggle theme function that can be called from anywhere
  const toggleTheme = () => {
    const newTheme = !isDark ? 'dark' : 'light';
    setIsDark(!isDark);
    
    // Apply to document body
    document.body.setAttribute('data-theme', newTheme);
    
    // Store preference in localStorage for persistence across page loads
    localStorage.setItem('theme', newTheme);
    
    // Dispatch an event so other components can react to theme change
    window.dispatchEvent(new Event('themeChange'));
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};