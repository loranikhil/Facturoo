import React, { useState, useEffect } from "react";
import "./MyOrders.css";

const MyOrders = () => {
  const [myOrders, setMyOrders] = useState([]);

  useEffect(() => {
    // Load orders from localStorage
    const storedOrders = JSON.parse(localStorage.getItem("myOrders")) || [];
    setMyOrders(storedOrders);
    updateBills(storedOrders); // Update bills initially

    // Event listener for localStorage changes
    const handleStorageChange = () => {
      const updatedOrders = JSON.parse(localStorage.getItem("myOrders")) || [];
      setMyOrders(updatedOrders);
      updateBills(updatedOrders);
    };

    window.addEventListener("storage", handleStorageChange);
    
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Function to update bills based on orders
  const updateBills = (orders) => {
    const updatedBills = createBillsFromOrders(orders);
    localStorage.setItem("bills", JSON.stringify(updatedBills));
  };

  // Function to create bills from orders
  const createBillsFromOrders = (orders) => {
    const tableOrders = {};
    
    orders.forEach(order => {
      const tableNumber = order.tableNumber;

      if (!tableOrders[tableNumber]) {
        tableOrders[tableNumber] = [];
      }
      
      tableOrders[tableNumber].push(order);
    });

    return Object.keys(tableOrders).map(tableNumber => {
      const tableOrdersList = tableOrders[tableNumber];

      const totalTablePrice = tableOrdersList.reduce(
        (sum, order) => sum + parseFloat(order.totalPrice),
        0
      ).toFixed(2);

      const allItems = [];
      tableOrdersList.forEach(order => {
        order.items.forEach(item => {
          const existingItem = allItems.find(i => i.name === item.name);

          if (existingItem) {
            existingItem.quantity += item.quantity;
            existingItem.totalPrice += item.price * item.quantity;
          } else {
            allItems.push({
              name: item.name,
              quantity: item.quantity,
              price: item.price,
              totalPrice: item.price * item.quantity
            });
          }
        });
      });

      return {
        tableNumber,
        items: allItems,
        orderTime: new Date().toLocaleString(),
        totalPrice: totalTablePrice,
        ordersIncluded: tableOrdersList.length,
        status: "unpaid"
      };
    });
  };

  const getStatusInfo = (status) => {
    switch(status) {
      case "pending":
        return { label: "Pending", className: "status-pending" };
      case "ready":
        return { label: "Ready for Pickup", className: "status-ready" };
      case "served":
        return { label: "Served", className: "status-served" };
      default:
        return { label: "Processing", className: "status-pending" };
    }
  };

  return (
    <div id="my-orders">
      <h2>My Orders</h2>
      
      {myOrders.length === 0 ? (
        <div id="no-orders-message">
          <p>You haven't placed any orders yet.</p>
        </div>
      ) : (
        <div id="orders-container">
          {myOrders.map((order, index) => {
            const statusInfo = getStatusInfo(order.status);
            
            return (
              <div 
                key={index} 
                id={`order-card-${index}`} 
                className={`order-card ${statusInfo.className}`}
              >
                <div id="order-header">
                  <h3>Order #{index + 1}</h3>
                  <span 
                    id={`status-indicator-${index}`} 
                    className={statusInfo.className}
                  >
                    {statusInfo.label}
                  </span>
                </div>
                
                <div id="order-details">
                  <p><strong>Table:</strong> {order.tableNumber}</p>
                  <p><strong>Order Time:</strong> {order.orderTime}</p>
                  
                  <div id="order-items">
                    <h4>Items:</h4>
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
                  
                  <div id="order-summary">
                    <p id={`total-price-${index}`}><strong>Total:</strong> Rs. {order.totalPrice}</p>
                  </div>
                </div>
                
                {order.status === "ready" && (
                  <div id="pickup-notification">
                    <div id="notification-icon">📢</div>
                    <p>Your order is ready for pickup at the counter!</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
