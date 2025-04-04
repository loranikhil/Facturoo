import React from 'react';
import { Clock } from 'lucide-react';

const WaitingScreen = ({
  tableNumber,
  orderStatus,
  waitingTime,
  formatTime,
  cart,
  getTotalPrice,
  goToMyOrders
}) => {
  return (
    <div className="order-status-container">
      <div className="order-status-card">
        <h2>Thank You for Your Order!</h2>
        <div className="table-number">
          <span>Your Table Number</span>
          <div className="table-number-value">{tableNumber}</div>
        </div>
        
        <div className="waiting-time">
          <div className="waiting-time-header">
            <Clock size={24} />
            <h3>{orderStatus === "ready" ? "Your Order is Ready!" : "Estimated Waiting Time"}</h3>
          </div>
          
          {orderStatus === "preparing" ? (
            <>
              <div className="timer">{formatTime(waitingTime)}</div>
              <div className="progress-bar">
                <div 
                  className="progress" 
                  style={{ width: `${(1 - waitingTime / 600) * 100}%` }}
                ></div>
              </div>
              <p className="status-message">Our kitchen is preparing your delicious food...</p>
            </>
          ) : (
            <>
              <div className="ready-message">
                <p>Your order is ready.</p>
                <p>Please collect it from the counter.</p>
              </div>
            </>
          )}
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
        
        <button className="new-order-btn" onClick={goToMyOrders}>
          Place New Order
        </button>
      </div>
    </div>
  );
};

export default WaitingScreen;