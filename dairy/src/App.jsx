import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Sidebar from "./Components/Sidebar";
import Header from "./Components/Header";
import Customer from "./Components/Customer";
import OrderManagement from "./Components/OrderManagement";
import MyOrders from "./Components/MyOrders";
import OffersPage from "./Components/OffersPage";
import StaffEntryForm from "./Components/StaffEntryForm";
import Admin from "./Components/Admin";
import QuickActions from "./Components/QuickActions";
import Inventory from "./Components/Inventory";
import Bill from "./Components/Bill";
import Table from "./Components/Table";
import TableSelectionPopup from "./Components/TableSelectionPopup";
import PrivateRoute from './Components/PrivateRoute';
import LoginForm from "./Components/LoginForm";
import TableEntryForm from "./Components/TableEntryForm";
import Support from "./Components/Support";

import "./App.css";

const App = () => {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
};

const AppRoutes = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login" || location.pathname === "/";

  return (
    <>
      {isLoginPage ? (
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      ) : (
        <div className="app-container">
          <Sidebar />
          <div className="main-content">
            <Header />
            <div className="content-wrapper">
              <Routes>
                <Route path="/customer" element={<Customer />} />
                <Route path="/orders" element={<OrderManagement />} />
                <Route path="/MyOrders" element={<MyOrders />} />
                <Route path="/OffersPage" element={<OffersPage />} />
                <Route path="/StaffEntryForm" element={<StaffEntryForm />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/quick-actions" element={<QuickActions />} />
                <Route path="/Inventory" element={<Inventory />} />
                <Route path="/Bill" element={<Bill />} />
                <Route path="/Table" element={<Table />} />
                <Route path="/TableSelectionPopup" element={<TableSelectionPopup />} />
                <Route path="/TableEntryForm" element={<TableEntryForm />} />
                <Route path="/Support" element={<Support />} />
                <Route path="*" element={<Navigate to="/login" replace />} />
              </Routes>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default App;