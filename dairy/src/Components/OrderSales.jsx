import React from 'react';
import { BarChart, LineChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CalendarDays, Users, BarChart3, IndianRupee, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import './OrderSales.css';

const OrderSales = () => {
  const [salesData, setSalesData] = React.useState({
    monthlyRevenue: 0,
    totalRevenue: 0,
    customerCount: 0,
    orderCount: 0,
    monthlyChart: [],
    weeklyChart: [],
    dailyChart: []
  });

  React.useEffect(() => {

    const handleStorageChange = () => {
      loadSalesData();
    };

    window.addEventListener('storage', handleStorageChange);

    loadSalesData();

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const loadSalesData = () => {
   
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const servedOrders = orders.filter(order => order.status === 'served');

    calculateSalesData(servedOrders);
  };

  const calculateSalesData = (orders) => {
 
    const currentDate = new Date(2025, 3, 8); 
    const currentMonth = 3; 
    const currentYear = 2025;
    const currentDay = 8;
    const daysInMonth = 30; 
    
    console.log("Current Date:", currentDate);
    console.log("Current Month:", currentMonth);
    console.log("Current Year:", currentYear);
    console.log("Current Day:", currentDay);
    console.log("Days in Month:", daysInMonth);
    
    if (!orders || orders.length === 0) {
      setSalesData({
        monthlyRevenue: 0,
        totalRevenue: 0,
        customerCount: 0,
        orderCount: 0,
        monthlyChart: initializeMonthlyData(currentMonth),
        weeklyChart: initializeWeeklyData(),
        dailyChart: initializeDailyData(daysInMonth)
      });
      return;
    }

    const uniqueCustomers = new Set();
    
    let total = 0;
    
    const monthlyData = initializeMonthlyData(currentMonth);
    const weeklyData = initializeWeeklyData();
    const dailyData = initializeDailyData(daysInMonth);
  
    let monthlyRevenue = 0;
    
    orders.forEach(order => {
      try {

        if (order.tableNumber) {
          uniqueCustomers.add(order.tableNumber);
        }
       
        const subtotal = order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const orderTotal = subtotal + (subtotal * 0.18);
 
        total += orderTotal;
        
     
        if (order.orderTime) {
          const orderDate = new Date(order.orderTime);
          
      
          if (!isNaN(orderDate.getTime())) {
      
            const orderMonth = orderDate.getMonth();
            const orderYear = orderDate.getFullYear();
            
 
            if (orderMonth >= 0 && orderMonth < 12) {
              monthlyData[orderMonth].revenue += orderTotal;
            }
            
            if (orderMonth === currentMonth && orderYear === currentYear) {
              monthlyRevenue += orderTotal;
              
              const dayOfMonth = orderDate.getDate() - 1;
              if (dayOfMonth >= 0 && dayOfMonth < daysInMonth) {
                dailyData[dayOfMonth].revenue += orderTotal;
              }
            }
            
            const dayDiff = Math.floor((currentDate - orderDate) / (1000 * 60 * 60 * 24));
            if (dayDiff < 7) {
              const orderDay = orderDate.getDay();
              weeklyData[orderDay].revenue += orderTotal;
            }
          }
        }
      } catch (error) {
        console.error("Error processing order:", error);
      }
    });
    
    setSalesData({
      monthlyRevenue,
      totalRevenue: total,
      customerCount: uniqueCustomers.size,
      orderCount: orders.length,
      monthlyChart: monthlyData,
      weeklyChart: weeklyData,
      dailyChart: dailyData
    });
  };


  const initializeMonthlyData = (currentMonth) => {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return monthNames.map((name, index) => ({ 
      name, 
      revenue: 0,
      fill: index === currentMonth ? '#6366f1' : '#4f46e5' 
    }));
  };


  const initializeWeeklyData = () => {
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return dayNames.map(name => ({ name, revenue: 0 }));
  };

  const initializeDailyData = (daysInMonth) => {
    return Array.from({ length: daysInMonth }, (_, index) => ({
      name: index + 1,
      revenue: 0
    }));
  };

  const formatCurrency = (amount) => {
    return `Rs. ${amount.toFixed(2)}`;
  };

  const getCurrentMonthName = () => {
    const monthNames = ["January", "February", "March", "April", "May", "June", 
                         "July", "August", "September", "October", "November", "December"];
    return monthNames[3]; 
  };


  React.useEffect(() => {

    const refreshEvent = new Event('storage');
    window.dispatchEvent(refreshEvent);
  }, []);

  return (
    <div className="sales-container">
      <div className="sales-header">
        <h2 className="sales-title">Sales Analytics</h2>
        <Link to="/bill" className="back-link">
          <ArrowLeft size={18} />
          <span>Back to Bills</span>
        </Link>
      </div>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <CalendarDays size={24} />
          </div>
          <div className="stat-content">
            <h3 className="stat-title">{getCurrentMonthName()} Revenue</h3>
            <p className="stat-value">{formatCurrency(salesData.monthlyRevenue)}</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">
            <IndianRupee size={24} />
          </div>
          <div className="stat-content">
            <h3 className="stat-title">Total Revenue</h3>
            <p className="stat-value">{formatCurrency(salesData.totalRevenue)}</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">
            <Users size={24} />
          </div>
          <div className="stat-content">
            <h3 className="stat-title">Customers</h3>
            <p className="stat-value">{salesData.customerCount}</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">
            <BarChart3 size={24} />
          </div>
          <div className="stat-content">
            <h3 className="stat-title">Orders</h3>
            <p className="stat-value">{salesData.orderCount}</p>
          </div>
        </div>
      </div>
      
      <div className="charts-container">
        <div className="chart-card">
          <h3 className="chart-title">Monthly Revenue (2025)</h3>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesData.monthlyChart}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => [`${formatCurrency(value)}`, 'Revenue']}
                />
                <Legend />
                <Bar dataKey="revenue" fill="#4f46e5" name="Revenue" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="chart-card">
          <h3 className="chart-title">Daily Revenue (April 2025)</h3>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesData.dailyChart}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => [`${formatCurrency(value)}`, 'Revenue']}
                />
                <Legend />
                <Bar dataKey="revenue" fill="#4f46e5" name="Revenue" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-card">
          <h3 className="chart-title">Weekly Revenue</h3>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData.weeklyChart}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => [`${formatCurrency(value)}`, 'Revenue']}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#4f46e5" 
                  activeDot={{ r: 8 }} 
                  name="Revenue" 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="refresh-button-container">
        <button className="refresh-button" onClick={loadSalesData}>
          Refresh Data
        </button>
      </div>
    </div>
  );
};

export default OrderSales;