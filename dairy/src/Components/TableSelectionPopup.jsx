import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const TableSelectionPopup = ({ onClose, onSelectTable }) => {
  const [tables, setTables] = useState([]);

  useEffect(() => {
    const savedTables = JSON.parse(localStorage.getItem('tables')) || [];
    setTables(savedTables);
  }, []);

  const handleTableSelect = (tableId) => {
    const updatedTables = tables.map(table => 
      table.id === tableId ? { ...table, isOccupied: true } : table
    );
    localStorage.setItem('tables', JSON.stringify(updatedTables));
    onSelectTable(tableId);
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <div className="popup-header">
          <h3>Select a Table</h3>
          <button className="close-popup" onClick={onClose}>
            <X size={24} />
          </button>
        </div>
        <div className="tables-grid">
          {tables.map(table => (
            <button
              key={table.id}
              className={`table-select-btn ${table.isOccupied ? 'occupied' : 'available'}`}
              onClick={() => handleTableSelect(table.id)}
              disabled={table.isOccupied}
            >
              <span className="table-number">Table {table.id}</span>
              <span className="table-status">
                {table.isOccupied ? 'Occupied' : 'Available'}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TableSelectionPopup;