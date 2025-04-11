import React from 'react';
import { Printer, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Bills.css';

const Bill = () => {
  const [bills, setBills] = React.useState([]);
  const [printingBill, setPrintingBill] = React.useState(null);

  React.useEffect(() => {
    loadBills();
  }, []);

  const loadBills = () => {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const servedOrders = orders.filter(order => order.status === 'served');
    setBills(servedOrders);
  };

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      
      if (isNaN(date.getTime())) {
        return new Date().toLocaleString();
      }
      
      return date.toLocaleString();
    } catch (error) {
      return new Date().toLocaleString();
    }
  };

  const calculateSubtotal = (items) => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateTax = (subtotal) => {
    return subtotal * 0.18; 
  };

  const handlePrint = (bill) => {
    setPrintingBill(bill);
    
    document.getElementById('root').classList.add('print-root');
    
    setTimeout(() => {
      window.print();

      window.addEventListener('afterprint', handleAfterPrint, { once: true });
      
      // Trigger a storage event to update sales data
      notifyDataChange();
    }, 500);
  };
  
  const handleAfterPrint = () => {
    document.getElementById('root').classList.remove('print-root');
    setPrintingBill(null);
  };

  // This function notifies other components about the data change
  const notifyDataChange = () => {
    // Dispatch a storage event to notify other components
    window.dispatchEvent(new Event('storage'));
  };

  React.useEffect(() => {
    if (printingBill) {
      const mediaQueryList = window.matchMedia('print');
      
      const handlePrintChange = (mql) => {
        if (!mql.matches) {
          setPrintingBill(null);
         
          document.getElementById('root').classList.remove('print-root');
        }
      };

      mediaQueryList.addEventListener('change', handlePrintChange);
      
      return () => {
        mediaQueryList.removeEventListener('change', handlePrintChange);
      };
    }
  }, [printingBill]);

  return (
    <div className="bills-container">
      <div className="bills-header">
        <h2 className="bills-title">Bills</h2>
      </div>
      
      {bills.length === 0 ? (
        <div className="empty-bills">
          <p>No bills available.</p>
        </div>
      ) : (
        <div className="bills-list">
          {bills.map((bill, index) => (
            <div key={index} className="bill-card">
              <div className="bill-header">
                <div>
                  <h3 className="restaurant-name">Facturo</h3>
                  <p className="bill-meta">Bill #{index + 1} | Table: {bill.tableNumber}</p>
                </div>
                <button 
                  onClick={() => handlePrint(bill)}
                  className="print-button"
                >
                  <Printer size={18} />
                  <span className="print-text">Print Bill</span>
                </button>
              </div>

              <div className="bill-details">
                <div>
                  <p><span className="label">Date:</span> {formatDate(bill.orderTime)}</p>
                </div>
               
              </div>

              <div className="table-container">
                <table className="bill-table">
                  <thead>
                    <tr>
                      <th className="text-left">Item</th>
                      <th className="text-center">Qty</th>
                      <th className="text-right">Price</th>
                      <th className="text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bill.items.map((item, i) => (
                      <tr key={i}>
                        <td>{item.name}</td>
                        <td className="text-center">{item.quantity}</td>
                        <td className="text-right">Rs. {item.price.toFixed(2)}</td>
                        <td className="text-right">Rs. {(item.quantity * item.price).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="bill-summary">
                <div className="summary-row">
                  <span>Subtotal:</span>
                  <span>Rs. {calculateSubtotal(bill.items).toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Tax (18%):</span>
                  <span>Rs. {calculateTax(calculateSubtotal(bill.items)).toFixed(2)}</span>
                </div>
                <div className="summary-row total">
                  <span>Total:</span>
                  <span>Rs. {(calculateSubtotal(bill.items) + calculateTax(calculateSubtotal(bill.items))).toFixed(2)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
    
      <div className="print-only">
        {printingBill && (
          <div className="print-bill">
            <div className="print-header">
              <h3>Facturo</h3>
              <p>Hyderabad</p>
            </div>

            <div className="print-details">
              <table className="print-details-table">
                <tbody>
                  <tr>
                    <td><strong>Bill No:</strong> #{bills.indexOf(printingBill) + 1}</td>
                  </tr>
                  <tr>
                    <td><strong>Table:</strong> {printingBill.tableNumber}</td>
                  </tr>
                  <tr>
                    <td><strong>Date:</strong> {formatDate(printingBill.orderTime)}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="print-table-container">
              <table className="print-table">
                <thead>
                  <tr>
                    <th style={{width: "40%", textAlign: "left"}}>Item</th>
                    <th style={{width: "15%", textAlign: "center"}}>Qty</th>
                    <th style={{width: "20%", textAlign: "right"}}>Price</th>
                    <th style={{width: "25%", textAlign: "right"}}>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {printingBill.items.map((item, i) => (
                    <tr key={i}>
                      <td style={{textAlign: "left"}}>{item.name}</td>
                      <td style={{textAlign: "center"}}>{item.quantity}</td>
                      <td style={{textAlign: "right"}}>Rs. {item.price.toFixed(2)}</td>
                      <td style={{textAlign: "right"}}>Rs. {(item.quantity * item.price).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="print-summary">
              <table className="print-summary-table">
                <tbody>
                  <tr className="print-summary-row">
                    <td style={{textAlign: "left"}}>Subtotal:</td>
                    <td style={{textAlign: "right"}}>Rs. {calculateSubtotal(printingBill.items).toFixed(2)}</td>
                  </tr>
                  <tr className="print-summary-row">
                    <td style={{textAlign: "left"}}>Tax (18%):</td>
                    <td style={{textAlign: "right"}}>Rs. {calculateTax(calculateSubtotal(printingBill.items)).toFixed(2)}</td>
                  </tr>
                  <tr className="print-summary-row print-total">
                    <td style={{textAlign: "left"}}><strong>Total:</strong></td>
                    <td style={{textAlign: "right"}}><strong>Rs. {(calculateSubtotal(printingBill.items) + calculateTax(calculateSubtotal(printingBill.items))).toFixed(2)}</strong></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="print-footer">
              <p>Thank you for dining with us!</p>
              <p>Please visit again</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Bill;