import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import ProductList from "./components/ProductList";
import SupplierList from "./components/SupplierList";
import ExpenseList from "./components/ExpenseList";
import SalesList from "./components/SalesList";
import Login from "./components/Login";
import Signup from "./components/Signup";
import "./App.css";

const Navigation = () => {
  return (
    <nav className="navbar">
      <h1>Business Accounting System</h1>
      <ul>
        <li><Link to="/products">Products</Link></li>
        <li><Link to="/suppliers">Suppliers</Link></li>
        <li><Link to="/expenses">Expenses</Link></li>
        <li><Link to="/sales">Sales</Link></li>
      </ul>
    </nav>
  );
};

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navigation />
        <div className="content">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/suppliers" element={<SupplierList />} />
            <Route path="/expenses" element={<ExpenseList />} />
            <Route path="/sales" element={<SalesList />} />
            
            {/* Redirect root to sales */}
            <Route path="/" element={<Navigate to="/sales" replace />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
