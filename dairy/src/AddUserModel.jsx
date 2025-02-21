import React from 'react';
import { UserPlus, Users } from 'lucide-react';

const AddUserModal = ({ isOpen, position, onClose }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="absolute z-50 mt-2 w-64 rounded-lg shadow-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
      style={{ 
        top: `${position.top + 40}px`, 
        left: `${position.left - 100}px` 
      }}
    >
      <div className="p-4 space-y-3">
        <button 
          onClick={() => onClose('manager')}
          className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
        >
          <UserPlus size={18} />
          <span>Add Manager</span>
        </button>
        
        <button 
          onClick={() => onClose('staff')}
          className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
        >
          <Users size={18} />
          <span>Add Staff</span>
        </button>
      </div>
      
      <div className="absolute w-3 h-3 bg-white dark:bg-gray-800 border-t border-l border-gray-200 dark:border-gray-700 transform -translate-y-1/2 rotate-45" 
        style={{ top: 0, left: '50%', marginLeft: '-6px' }}
      />
    </div>
  );
};

export default AddUserModal;