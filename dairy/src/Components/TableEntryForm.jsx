import React from 'react';
import { X } from 'lucide-react';

const TableEntryForm = ({ 
  tableNumber, 
  tableError, 
  showTableSelector, 
  setShowTableSelector, 
  handleTableSubmit, 
  handleTableSelect, 
  setCheckoutStep, 
  cart, 
  getTotalPrice, 
  tables 
}) => {
  return (
    <div className="table-entry-container">
      <div className="table-entry-card">
        <h2>Select Your Table</h2>
        <p>Please select your table number to place your order</p>
        
        <form onSubmit={handleTableSubmit} className="table-form">
          <div className="form-group">
            <label htmlFor="tableNumber">Table Number</label>
            <div className="table-input-container">
              <input
                type="text"
                id="tableNumber"
                value={tableNumber}
                readOnly
                placeholder="Select a table"
                className={tableError ? "error" : ""}
                onClick={() => setShowTableSelector(true)}
              />
              <button 
                type="button" 
                id="select-table-btn"
                onClick={() => setShowTableSelector(true)}
              >
                Select
              </button>
            </div>
            {tableError && <div className="error-message">{tableError}</div>}
          </div>
          
          <div className="order-summary">
            <h3>Order Summary</h3>
            <div className="order-items">
              {cart.map(item => (
                <div key={item.id} className="order-item">
                  <span>{item.quantity} × {item.name}</span>
                  <span>Rs. {(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="order-total">
              <span>Total:</span>
              <span>Rs. {(parseFloat(getTotalPrice()) + 89).toFixed(2)}</span>
            </div>
          </div>
          
          <div className="form-buttons">
            <button type="button" className="cancel-btn nn" onClick={() => setCheckoutStep("cart")}>
              Back to Cart
            </button>
            <button type="submit" className="submit-btn nn">
              Confirm Order
            </button>
          </div>
        </form>
      </div>
      
      {showTableSelector && (
        <>
          <div id="table-selector-popup">
            <div id="table-selector-header">
              <h3>Select a Table</h3>
              <button id="close-table-selector" onClick={() => setShowTableSelector(false)}>
                <X size={20} />
              </button>
            </div>
            <div id="tables-grid">
              {tables.map(table => (
                <button
                  key={table.id}
                  id={`table-${table.number}`}
                  className={`table-button ${!table.isAvailable ? 'table-unavailable' : ''}`}
                  onClick={() => table.isAvailable && handleTableSelect(table.number)}
                  disabled={!table.isAvailable}
                >
                  {table.number}
                </button>
              ))}
            </div>
          </div>
          <div id="table-selector-overlay" onClick={() => setShowTableSelector(false)}></div>
        </>
      )}
    </div>
  );
};

export default TableEntryForm;