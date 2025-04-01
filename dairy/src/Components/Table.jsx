import React, { useState, useEffect } from 'react';
import { RefreshCw, Check, X } from 'lucide-react';
import './Table.css';

const Table = () => {
  const [tables, setTables] = useState([]);
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('tables');

  useEffect(() => {
    loadTables();
    loadOrders();

    // Listen for changes in tables or orders
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleStorageChange = (e) => {
    if (e.key === 'tables') {
      loadTables();
    } else if (e.key === 'orders') {
      loadOrders();
    }
  };

  const loadTables = () => {
    const savedTables = JSON.parse(localStorage.getItem("tables")) || [];
    
    // If no tables in localStorage, create default tables (1-20)
    if (savedTables.length === 0) {
      const defaultTables = Array.from({ length: 20 }, (_, i) => ({
        id: i + 1,
        number: i + 1,
        isAvailable: true
      }));
      localStorage.setItem("tables", JSON.stringify(defaultTables));
      setTables(defaultTables);
    } else {
      setTables(savedTables);
    }
  };

  const loadOrders = () => {
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(savedOrders);
  };

  const handleFreeTable = (tableNumber) => {
    const updatedTables = tables.map(table => 
      table.number === tableNumber ? { ...table, isAvailable: true } : table
    );
    
    localStorage.setItem("tables", JSON.stringify(updatedTables));
    setTables(updatedTables);
    
    // Also update the dispatch event to notify other components
    window.dispatchEvent(new Event('storage'));
  };

  const getTableStatus = (tableNumber) => {
    const table = tables.find(t => t.number === tableNumber);
    if (!table) return 'Unknown';
    return table.isAvailable ? 'Available' : 'Occupied';
  };

  const getTableOrder = (tableNumber) => {
    return orders.find(order => parseInt(order.tableNumber) === tableNumber);
  };

  return (
    <div id="table-management-container">
      <div id="table-management-header">
        <h1>Table Management</h1>
        <button id="refresh-button" onClick={() => { loadTables(); loadOrders(); }}>
          <RefreshCw size={18} />
          <span>Refresh</span>
        </button>
      </div>
      
      <div id="table-management-tabs">
        <button 
          id="tables-tab" 
          className={activeTab === 'tables' ? 'active-tab' : ''}
          onClick={() => setActiveTab('tables')}
        >
          Tables Overview
        </button>
        <button 
          id="orders-tab" 
          className={activeTab === 'orders' ? 'active-tab' : ''}
          onClick={() => setActiveTab('orders')}
        >
          Current Orders
        </button>
      </div>
      
      {activeTab === 'tables' && (
        <div id="tables-grid-container">
          <div id="tables-grid-view">
            {tables.map(table => {
              const order = getTableOrder(table.number);
              return (
                <div 
                  key={table.id} 
                  id={`table-card-${table.number}`}
                  className={`table-card ${table.isAvailable ? 'available' : 'occupied'}`}
                >
                  <div id={`table-number-${table.number}`} className="table-number">
                    Table {table.number}
                  </div>
                  <div id={`table-status-${table.number}`} className="table-status">
                    {getTableStatus(table.number)}
                  </div>
                  {!table.isAvailable && (
                    <div id={`table-actions-${table.number}`} className="table-actions">
                      <button
                        id={`free-table-${table.number}`}
                        className="free-table-btn"
                        onClick={() => handleFreeTable(table.number)}
                      >
                        <Check size={16} />
                        <span>Free Table</span>
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
      
      {activeTab === 'orders' && (
        <div id="orders-container">
          {orders.length === 0 ? (
            <div id="no-orders-message">No current orders</div>
          ) : (
            <div id="orders-list">
              {orders.map((order, index) => (
                <div key={index} id={`order-card-${index}`} className="order-card">
                  <div id={`order-header-${index}`} className="order-header">
                    <h3>Table {order.tableNumber}</h3>
                    <span id={`order-time-${index}`} className="order-time">{order.orderTime}</span>
                  </div>
                  
                  <div id={`order-items-${index}`} className="order-items">
                    {order.items.map((item, itemIndex) => (
                      <div key={itemIndex} id={`order-item-${index}-${itemIndex}`} className="order-item">
                        <span>{item.quantity} × {item.name}</span>
                        <span>Rs. {(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div id={`order-total-${index}`} className="order-total">
                    <span>Total:</span>
                    <span>Rs. {order.totalPrice.toFixed(2)}</span>
                  </div>
                  
                  <div id={`order-actions-${index}`} className="order-actions">
                    <button
                      id={`free-table-btn-${index}`}
                      className="free-table-btn"
                      onClick={() => handleFreeTable(parseInt(order.tableNumber))}
                    >
                      <Check size={16} />
                      <span>Free Table</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Table;