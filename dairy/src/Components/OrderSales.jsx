import React from "react";
import "./OrderSales.css";
 
const OrdersSales = () => {
  const orders = [
    { id: 1, product: "Laptop", image: "/images/laptop.png", price: "$1200", status: "Shipped" },
    { id: 2, product: "Headphones", image: "/images/headphones.png", price: "$150", status: "Pending" },
    { id: 3, product: "Smartphone", image: "/images/phone.png", price: "$800", status: "Delivered" },
  ];
 
  return (
<div className="orders-sales">
<h1>Orders & Sales</h1>
<div className="stats-container">
<div className="stat-card">Total Sales: <span>$25,000</span></div>
<div className="stat-card">Orders: <span>105</span></div>
<div className="stat-card">Revenue: <span>$78,000</span></div>
</div>
 
      <div className="order-list">
<h2>Recent Orders</h2>
<table>
<thead>
<tr>
<th>Product</th>
<th>Image</th>
<th>Price</th>
<th>Status</th>
</tr>
</thead>
<tbody>
            {orders.map((order) => (
<tr key={order.id}>
<td>{order.product}</td>
<td><img src={order.image} alt={order.product} className="order-img" /></td>
<td>{order.price}</td>
<td className={order.status.toLowerCase()}>{order.status}</td>
</tr>
            ))}
</tbody>
</table>
</div>
</div>
  );
};
 
export default OrdersSales;