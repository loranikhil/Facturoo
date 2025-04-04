import React from 'react';
import './OTPKeypad.css';

const OTPKeypad = ({ onKeyPress, onClose, isVisible }) => {
  const keys = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['', '0', '⌫']
  ];

  const handleKeyPress = (key) => {
    if (key === '⌫') {
      onKeyPress('backspace');
    } else if (key === '') {
      return;
    } else {
      onKeyPress(key);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="otp-keypad-overlay" onClick={onClose}>
      <div className="otp-keypad-container" onClick={(e) => e.stopPropagation()}>
        <div className="otp-keypad-header">
          <div className="otp-keypad-title">Enter OTP</div>
          <button className="otp-keypad-done" onClick={onClose}>Done</button>
        </div>
        <div className="otp-keypad">
          {keys.map((row, rowIndex) => (
            <div key={`row-${rowIndex}`} className="keypad-row">
              {row.map((key) => (
                <button
                  key={`key-${key || `empty-${rowIndex}`}`}
                  className={`keypad-key ${key === '⌫' ? 'backspace' : ''} ${key === '' ? 'empty-key' : ''}`}
                  onClick={() => handleKeyPress(key)}
                  disabled={key === ''}
                >
                  {key === '⌫' ? (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22 3H7C6.31 3 5.77 3.35 5.41 3.88L0 12L5.41 20.11C5.77 20.64 6.31 21 7 21H22C23.1 21 24 20.1 24 19V5C24 3.9 23.1 3 22 3ZM19 15.59L17.59 17L14 13.41L10.41 17L9 15.59L12.59 12L9 8.41L10.41 7L14 10.59L17.59 7L19 8.41L15.41 12L19 15.59Z" fill="currentColor"/>
                    </svg>
                  ) : key}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OTPKeypad;
