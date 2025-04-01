import React, { useState, useEffect } from "react";
import "./OrderManagement.css";

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(storedOrders);
    setFilteredOrders(storedOrders);
  }, []);

  useEffect(() => {
    let result = [...orders];
    
    if (searchTerm) {
      result = result.filter(
        order => 
          order.tableNumber.toString().includes(searchTerm) ||
          order.items.some(item => 
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }
    
    if (filterStatus !== "all") {
      result = result.filter(order => order.status === filterStatus);
    }
    
    setFilteredOrders(result);
  }, [searchTerm, filterStatus, orders]);

  const updateOrderStatus = (index, newStatus) => {
    const orderIndex = orders.findIndex(order => order === filteredOrders[index]);
    
    const updatedOrders = [...orders];
    updatedOrders[orderIndex].status = newStatus;
    setOrders(updatedOrders);
    
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
    
    const myOrders = JSON.parse(localStorage.getItem("myOrders")) || [];
    
    const matchingOrderIndex = myOrders.findIndex(myOrder => 
      myOrder.tableNumber === updatedOrders[orderIndex].tableNumber && 
      myOrder.orderTime === updatedOrders[orderIndex].orderTime &&
      myOrder.totalPrice === updatedOrders[orderIndex].totalPrice
    );
    
    if (matchingOrderIndex !== -1) {
      myOrders[matchingOrderIndex].status = newStatus;
      localStorage.setItem("myOrders", JSON.stringify(myOrders));
    }
  };

  return (
    <div id="order-management">
      <h2>Order Management</h2>
      
      <div id="search-filter-container">
        <div id="search-box">
          <input
            type="text"
            placeholder="Search by table or item..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div id="filter-dropdown">
          <select 
            value={filterStatus} 
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="ready">Ready</option>
            <option value="served">Served</option>
          </select>
        </div>
      </div>
      
      <div id="order-list">
        {filteredOrders.length === 0 ? (
          <p id="no-orders">No orders match your search criteria.</p>
        ) : (
          filteredOrders.map((order, index) => (
            <div key={index} id={`order-card-${index}`} className={order.status}>
              <div id="order-header">
                <h3>Table {order.tableNumber}</h3>
                <span id={`status-badge-${index}`} className={order.status}>
                  {order.status}
                </span>
              </div>
              
              <div id="order-details">
                <p><strong>Order Time:</strong> {order.orderTime}</p>
                
                <div id="order-items">
                  <strong>Items:</strong>
                  <ul>
                    {order.items.map((item, i) => (
                      <li key={i}>
                        <span id={`item-quantity-${index}-${i}`}>{item.quantity} ×</span> 
                        <span id={`item-name-${index}-${i}`}>{item.name}</span> 
                        <span id={`item-price-${index}-${i}`}>Rs. {(item.price * item.quantity).toFixed(2)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <p id="total-price"><strong>Total:</strong> Rs. {order.totalPrice}</p>
              </div>
              
              <div id="action-buttons">
                {order.status !== "ready" && order.status !== "served" && (
                  <button 
                    id={`btn-ready-${index}`}
                    onClick={() => updateOrderStatus(index, "ready")}
                  >
                    Mark as Ready
                  </button>
                )}
                
                {order.status !== "served" && (
                  <button 
                    id={`btn-served-${index}`}
                    onClick={() => updateOrderStatus(index, "served")}
                  >
                    Mark as Served
                  </button>
                )}
                
                {order.status === "served" && (
                  <button 
                    id={`btn-served-disabled-${index}`}
                    disabled
                  >
                    Order Served
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default OrderManagement;
