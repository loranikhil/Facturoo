import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  User,Home,
  ShoppingCart,
  CreditCard,
  Gift,
  Trophy,
  Headphones,
  Settings,
  BarChart2,
  Table,
  List,
  Logs,
  TicketPercent,
  
} from "lucide-react";
import "./Sidebar.css";

const Sidebar = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const currentTheme = document.body.getAttribute("data-theme");
    if (currentTheme) {
      setDarkMode(currentTheme === "dark");
    } else {
      setDarkMode(window.matchMedia("(prefers-color-scheme: dark)").matches);
    }
  }, []);


  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "data-theme") {
          setDarkMode(document.body.getAttribute("data-theme") === "dark");
        }
      });
    });

    observer.observe(document.body, { attributes: true });
    return () => observer.disconnect();
  }, []);

  
  const sidebarItems = [
    { id: "customer", icon: <User size={20} />, label: "Customer", path: "/Customer" },
    { id: "MyOrders", icon: <ShoppingCart size={20} />, label: "My Orders", path: "/MyOrders" },
    { id: "payments", icon: <CreditCard size={20} />, label: "Payments & Bills", path: "/payments" },
    { id: "OffersPage", icon: <TicketPercent size={20} />, label: "Offers & Discounts", path: "/OffersPage" },
    // { id: "loyalty", icon: <Trophy size={20} />, label: "Loyalty Program", path: "/loyalty" },
    { id: "support", icon: <Headphones size={20} />, label: "Support & Feedback", path: "/support" },
    // { id: "settings", icon: <Settings size={20} />, label: "Settings", path: "/settings" },
    { id: "dashboard", icon: <Home size={20} />, label: "Dashboard", path: "/admin" },
    { id: "Inventory", icon: <List size={20} />, label: "Inventory Management", path: "/Inventory" },
    { id: "Table", icon: <Table size={20} />, label: "Manage Tables", path: "/Table" },
    // { id: "sales", icon: <ShoppingCart size={20} />, label: "Orders & Sales", path: "/sales" },
    { id: "Bill", icon: <CreditCard size={20} />, label: "Billing & Invoices", path: "/Bill" },
    // { id: "reports", icon: <BarChart2 size={20} />, label: "Reports & Analytics", path: "/reports" },
    // { id: "marketing", icon: <Gift size={20} />, label: "Marketing & Promotions", path: "/marketing" },
    // { id: "users", icon: <Home size={20} />, label: "Users & Roles", path: "/users" },
    // { id: "branding", icon: <Settings size={20} />, label: "Store Setup & Branding", path: "/branding" },
    // { id: "system", icon: <Settings size={20} />, label: "System Settings", path: "/system" },
    { id: "orders", icon: <Logs size={20} />, label: "Orders Management", path: "/orders" },
    // { id: "stock", icon: <ShoppingCart size={20} />, label: "Stock & Inventory", path: "/stock" },
    // { id: "sales-reports", icon: <BarChart2 size={20} />, label: "Sales Reports", path: "/sales-reports" },
    // { id: "queries", icon: <Headphones size={20} />, label: "Queries & Feedback", path: "/queries" },
    // { id: "refunds", icon: <CreditCard size={20} />, label: "Refunds & Cancellations", path: "/refunds" },
    // { id: "staff", icon: <Trophy size={20} />, label: "Staff Performance & Attendance", path: "/staff" },
  ];

  return (
    <div className={`sidebar scrollbar-auto ${darkMode ? "dark-theme" : "light-theme"}`}>
      <div className="sidebar-content">
        <nav>
          {sidebarItems.map((item) => (
            <Link key={item.id} to={item.path} className="sidebar-item">
              <span className="icon">{item.icon}</span>
              <span className="label">{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;