import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
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
import SignUp from "./Components/SignUp";
import Login from "./Components/Login";

import "./App.css";

const App = () => {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
};

const MainLayout = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === "/SignUp" || location.pathname === "/Login";

  return (
    <>
      {isAuthPage ? (
        <Routes>
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/Login" element={<Login />} />
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
              </Routes>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default App;
