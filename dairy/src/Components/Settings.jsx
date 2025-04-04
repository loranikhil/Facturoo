import React, { useState } from 'react';
import { FiUser, FiShield, FiFileText, FiBell } from 'react-icons/fi';
import './Settings.css';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('account');
  

  const [accountSettings, setAccountSettings] = useState({
    notifications: true,
    darkMode: false,
    autoSaveOrders: true,
    showRecommendations: true,
    defaultPaymentMethod: 'credit_card'
  });


  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    loginNotifications: true,
    biometricLogin: false,
    rememberDevice: true
  });

  // Privacy settings state
  const [privacySettings, setPrivacySettings] = useState({
    shareOrderHistory: false,
    allowMarketing: true,
    saveSearchHistory: true,
    locationTracking: false
  });

  const handleToggleChange = (section, setting) => {
    switch (section) {
      case 'account':
        setAccountSettings({
          ...accountSettings,
          [setting]: !accountSettings[setting]
        });
        break;
      case 'security':
        setSecuritySettings({
          ...securitySettings,
          [setting]: !securitySettings[setting]
        });
        break;
      case 'privacy':
        setPrivacySettings({
          ...privacySettings,
          [setting]: !privacySettings[setting]
        });
        break;
      default:
        break;
    }
  };

  const handleSelectChange = (e) => {
    setAccountSettings({
      ...accountSettings,
      defaultPaymentMethod: e.target.value
    });
  };

  const handleSaveSettings = () => {
   
    alert('Settings saved successfully!');
  };

  return (
    <div className="settings-container">
      <h1 className="settings-title">Settings</h1>
      
      <div className="settings-layout">
    
        <div className="settings-sidebar">
          <div className="settings-menu">
            <ul className="settings-menu-list">
              <li>
                <button
                  onClick={() => setActiveTab('account')}
                  className={`settings-menu-item ${activeTab === 'account' ? 'active' : ''}`}
                >
                  <FiUser className="settings-icon" /> Account Settings
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('security')}
                  className={`settings-menu-item ${activeTab === 'security' ? 'active' : ''}`}
                >
                  <FiShield className="settings-icon" /> Security
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('privacy')}
                  className={`settings-menu-item ${activeTab === 'privacy' ? 'active' : ''}`}
                >
                  <FiShield className="settings-icon" /> Privacy
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('terms')}
                  className={`settings-menu-item ${activeTab === 'terms' ? 'active' : ''}`}
                >
                  <FiFileText className="settings-icon" /> Terms & Conditions
                </button>
              </li>
            </ul>
          </div>
        </div>
        
      
        <div className="settings-content">
          {activeTab === 'account' && (
            <div>
              <h2 className="settings-section-title">Account Settings</h2>
              <div className="settings-options">
                <div className="settings-option">
                  <div className="settings-option-info">
                    <h3 className="settings-option-title">Push Notifications</h3>
                    <p className="settings-option-description">Receive order updates and promotions</p>
                  </div>
                  <div className="toggle-container">
                    <label className="toggle">
                      <input 
                        type="checkbox" 
                        checked={accountSettings.notifications}
                        onChange={() => handleToggleChange('account', 'notifications')}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                </div>
                
                {/* <div className="settings-option">
                  <div className="settings-option-info">
                    <h3 className="settings-option-title">Dark Mode</h3>
                    <p className="settings-option-description">Switch to dark theme</p>
                  </div>
                  <div className="toggle-container">
                    <label className="toggle">
                      <input 
                        type="checkbox" 
                        checked={accountSettings.darkMode}
                        onChange={() => handleToggleChange('account', 'darkMode')}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                </div> */}
                
                <div className="settings-option">
                  <div className="settings-option-info">
                    <h3 className="settings-option-title">Auto-Save Orders</h3>
                    <p className="settings-option-description">Save recent orders for quicker reordering</p>
                  </div>
                  <div className="toggle-container">
                    <label className="toggle">
                      <input 
                        type="checkbox" 
                        checked={accountSettings.autoSaveOrders}
                        onChange={() => handleToggleChange('account', 'autoSaveOrders')}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                </div>
                
                <div className="settings-option">
                  <div className="settings-option-info">
                    <h3 className="settings-option-title">Recommended Items</h3>
                    <p className="settings-option-description">Show food recommendations based on your preferences</p>
                  </div>
                  <div className="toggle-container">
                    <label className="toggle">
                      <input 
                        type="checkbox" 
                        checked={accountSettings.showRecommendations}
                        onChange={() => handleToggleChange('account', 'showRecommendations')}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                </div>
                
                <div className="settings-option">
                  <div className="settings-option-info">
                    <h3 className="settings-option-title">Default Payment Method</h3>
                    <p className="settings-option-description">Select your preferred payment option</p>
                  </div>
                  <div>
                    <select 
                      value={accountSettings.defaultPaymentMethod}
                      onChange={handleSelectChange}
                      className="settings-select"
                    >
                      <option value="credit_card">Credit Card</option>
                      <option value="paypal">PayPal</option>
                      <option value="apple_pay">Apple Pay</option>
                      <option value="google_pay">Google Pay</option>
                      <option value="google_pay">PhonePe</option>
                      <option value="cash">Cash</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'security' && (
            <div>
              <h2 className="settings-section-title">Security Settings</h2>
              <div className="settings-options">
                <div className="settings-option">
                  <div className="settings-option-info">
                    <h3 className="settings-option-title">Two-Factor Authentication</h3>
                    <p className="settings-option-description">Add an extra layer of security to your account</p>
                  </div>
                  <div className="toggle-container">
                    <label className="toggle">
                      <input 
                        type="checkbox" 
                        checked={securitySettings.twoFactorAuth}
                        onChange={() => handleToggleChange('security', 'twoFactorAuth')}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                </div>
                
                <div className="settings-option">
                  <div className="settings-option-info">
                    <h3 className="settings-option-title">Login Notifications</h3>
                    <p className="settings-option-description">Get notified of new logins to your account</p>
                  </div>
                  <div className="toggle-container">
                    <label className="toggle">
                      <input 
                        type="checkbox" 
                        checked={securitySettings.loginNotifications}
                        onChange={() => handleToggleChange('security', 'loginNotifications')}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                </div>
                
                <div className="settings-option">
                  <div className="settings-option-info">
                    <h3 className="settings-option-title">Biometric Login</h3>
                    <p className="settings-option-description">Use fingerprint or face ID to login</p>
                  </div>
                  <div className="toggle-container">
                    <label className="toggle">
                      <input 
                        type="checkbox" 
                        checked={securitySettings.biometricLogin}
                        onChange={() => handleToggleChange('security', 'biometricLogin')}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                </div>
                
                <div className="settings-option">
                  <div className="settings-option-info">
                    <h3 className="settings-option-title">Remember Device</h3>
                    <p className="settings-option-description">Stay logged in on this device</p>
                  </div>
                  <div className="toggle-container">
                    <label className="toggle">
                      <input 
                        type="checkbox" 
                        checked={securitySettings.rememberDevice}
                        onChange={() => handleToggleChange('security', 'rememberDevice')}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'privacy' && (
            <div>
              <h2 className="settings-section-title">Privacy Settings</h2>
              <div className="settings-options">
                <div className="settings-option">
                  <div className="settings-option-info">
                    <h3 className="settings-option-title">Share Order History</h3>
                    <p className="settings-option-description">Allow restaurants to see your previous orders</p>
                  </div>
                  <div className="toggle-container">
                    <label className="toggle">
                      <input 
                        type="checkbox" 
                        checked={privacySettings.shareOrderHistory}
                        onChange={() => handleToggleChange('privacy', 'shareOrderHistory')}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                </div>
                
                <div className="settings-option">
                  <div className="settings-option-info">
                    <h3 className="settings-option-title">Marketing Communications</h3>
                    <p className="settings-option-description">Receive promotional emails and offers</p>
                  </div>
                  <div className="toggle-container">
                    <label className="toggle">
                      <input 
                        type="checkbox" 
                        checked={privacySettings.allowMarketing}
                        onChange={() => handleToggleChange('privacy', 'allowMarketing')}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                </div>
                
                <div className="settings-option">
                  <div className="settings-option-info">
                    <h3 className="settings-option-title">Save Search History</h3>
                    <p className="settings-option-description">Store your food searches for better recommendations</p>
                  </div>
                  <div className="toggle-container">
                    <label className="toggle">
                      <input 
                        type="checkbox" 
                        checked={privacySettings.saveSearchHistory}
                        onChange={() => handleToggleChange('privacy', 'saveSearchHistory')}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                </div>
                
             
              </div>
            </div>
          )}
          
          {activeTab === 'terms' && (
            <div>
              <h2 className="settings-section-title">Terms & Conditions</h2>
              <div className="settings-options">
                <div className="settings-terms-item">
                  <h3 className="settings-option-title">Terms of Service</h3>
                  <p className="settings-terms-date">Welcome to Facturo, a platform designed to provide a seamless digital experience for viewing restaurant menus, placing orders, and handling billing via your mobile device after scanning a QR code. By accessing and using our website or app, you agree to comply with the following Terms and Conditions.

Please read these terms carefully before using the services provided by Facturo. If you do not agree with these terms, you must refrain from using the service.</p>
                 
                </div>
                
                <div className="settings-terms-item">
                  <h3 className="settings-option-title">Privacy Policy</h3>
                  <p className="settings-terms-date">We may collect the following types of personal information when you use our services:

Personal Identification Information: Name, email address, phone number, payment details, etc.

Usage Data: Information on how you access and use our platform, including your device type, IP address, browser type, and session information.

Order Data: Information related to your orders, such as items ordered, quantities, table number, and payment details.

Location Data: If you grant permission, we may collect location data for delivering restaurant-specific menu information.</p>
                  
                </div>
                
                <div className="settings-terms-item">
                  <h3 className="settings-option-title">Cookie Policy</h3>
                  <p className="settings-terms-date">This Cookie Policy explains how Facturo uses cookies and similar technologies to provide you with the best possible user experience when using our platform.

1. What Are Cookies?
Cookies are small text files stored on your device when you visit a website. These cookies allow websites to remember your preferences and provide personalized features.

2. How We Use Cookies
We use cookies for the following purposes:

Essential Cookies: These cookies are necessary for the functionality of our platform, such as enabling you to place orders, view menus, and manage billing.

Performance and Analytics Cookies: These cookies help us analyze user behavior, improve our platform, and optimize your experience.

Functionality Cookies: These cookies allow us to remember your preferences (e.g., language settings or login status) to provide a more personalized experience.

Targeting and Advertising Cookies: These cookies are used to deliver personalized advertisements based on your interests and behavior on our platform.

3. Managing Cookies
Most web browsers automatically accept cookies. However, you can manage or disable cookies through your browser settings. Please note that disabling cookies may impact the functionality of the platform, and some features may not work as intended.</p>
                 
                </div>
                
                <div className="settings-terms-item">
                  <h3 className="settings-option-title">User Agreement</h3>
                  <p className="settings-terms-date">By using the Facturo platform, you agree to the following terms and conditions. This User Agreement ("Agreement") outlines the rights and responsibilities of both Facturo and the user of the platform.

1. Acceptance of Terms
By accessing or using Facturo, you agree to be bound by these Terms and Conditions. If you do not agree with these terms, you must not use the platform.

2. Eligibility
To use the services of Facturo, you must be at least [Insert Minimum Age, e.g., 18] years old and capable of entering into a legally binding contract.

3. Platform Use
You agree to use Facturo for lawful purposes only, such as placing orders, viewing menus, and managing your bills.

You must not use the platform to engage in activities that could harm the security, integrity, or operation of the platform.

4. Account Responsibilities
You may need to create an account to place an order or access certain features.

You are responsible for maintaining the confidentiality of your account details, including your password.

You agree to notify Facturo immediately if you suspect any unauthorized access to your account.

5. Order Placement
By placing an order through Facturo, you agree to purchase the selected items from the restaurant at the displayed prices.

You are responsible for reviewing your order details before confirming the purchase.

6. Payment
Payments made through Facturo are processed by third-party payment providers. We are not responsible for any issues related to payment transactions.

You agree to pay for the services rendered by the restaurant in accordance with the terms displayed on the platform.

7. Refunds and Cancellations
Any disputes or requests for refunds should be directed to the restaurant. Facturo is not responsible for order cancellations or refunds.

The restaurant's refund and cancellation policies apply to all orders.

8. Platform Availability
Facturo strives to provide uninterrupted access to the platform, but we do not guarantee the availability of the platform at all times. Service interruptions may occur due to maintenance, technical issues, or other factors.</p>
                 
                </div>
              </div>
            </div>
          )}
          
          <div className="settings-actions">
            <button 
              onClick={handleSaveSettings}
              className="settings-save-button"
            >
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;