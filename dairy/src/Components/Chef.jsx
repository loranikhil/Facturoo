import React, { useState, useEffect } from "react";
import "./chef.css";
 
const Chef = () => {
  const [orders, setOrders] = useState([]);
  const [timers, setTimers] = useState({});
 
  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    console.log("Stored Orders:", storedOrders);
    setOrders(storedOrders);
    

    const initialTimers = {};
    storedOrders.forEach((order, index) => {
      if (order.status === "preparing") {
      
        if (order.orderTime) {
          const orderDate = new Date(order.orderTime);
          const now = new Date();
          const elapsedMinutes = Math.floor((now - orderDate) / (10000000000 * 60));
          initialTimers[index] = Math.max(0, 10 - elapsedMinutes);
        } else {
          initialTimers[index] = 10; 
        }
      }
    });
    setTimers(initialTimers);
  }, []);
  
  useEffect(() => {
   
    const timerInterval = setInterval(() => {
      setTimers(prevTimers => {
        const updatedTimers = { ...prevTimers };
        let hasChanges = false;
        
        Object.keys(updatedTimers).forEach(key => {
          if (updatedTimers[key] > 0) {
            updatedTimers[key] -= 1/60; 
            hasChanges = true;
          }
        });
        
        return hasChanges ? updatedTimers : prevTimers;
      });
    }, 1000);
    
    return () => clearInterval(timerInterval);
  }, []);
 
  const updateOrderStatus = (index, newStatus) => {
    const updatedOrders = [...orders];
    updatedOrders[index].status = newStatus;
    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
    
    
    const updatedTimers = { ...timers };
    delete updatedTimers[index];
    setTimers(updatedTimers);
  };
  
  const formatTimeRemaining = (minutes) => {
    if (minutes === undefined) return "";
    
    const mins = Math.floor(minutes);
    const secs = Math.floor((minutes - mins) * 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
  const isUrgent = (timeRemaining) => {
    return timeRemaining !== undefined && timeRemaining < 2;
  };
 
  return (
    <div id="chefs">
      <h2 className="chefs-title">Chef Dashboard</h2>
      {orders.length === 0 ? (
        <p className="no-orderss">No orders available</p>
      ) : (
        <div id="order-listss">
          {orders.map((order, index) => {
            const timeRemaining = timers[index];
            const timeDisplay = formatTimeRemaining(timeRemaining);
            const urgent = isUrgent(timeRemaining);
            
            return (
              <div
                key={index}
                className={`order-cards ${order.status}-statuss`}
                data-time={order.status === "preparing" ? `${timeDisplay}` : ""}
                data-urgent={urgent ? "true" : "false"}
              >
                <h3 className="order-titles">Table {order.tableNumber}</h3>
                <span className="order-statuss">{order.status}</span>
 
                <ul className="order-itemss">
                  {order.items.map((item, i) => (
                    <li key={i} className="order-itemss-li">
                      <span>{item.quantity}× {item.name}</span>
                    </li>
                  ))}
                </ul>
 
                <div>
                  {order.status === "preparing" && (
                    <button  
                      className="buttonssss served-btns"
                      onClick={() => updateOrderStatus(index, "ready")}
                    >
                      Mark as ready
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
 
export default Chef;