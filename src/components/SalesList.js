import React, { useEffect, useState } from "react";
import axiosInstance from "../services/axiosConfig";
import "./SalesList.css";

const SalesList = () => {
  const [sales, setSales] = useState([]);
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [newSale, setNewSale] = useState({
    customerId: "",
    items: [{ productId: "", quantity: 1 }],
    paymentMethod: "CASH"
  });
  const [error, setError] = useState("");

  useEffect(() => {
    fetchSales();
    fetchProducts();
    fetchCustomers();
  }, []);

  const fetchSales = async () => {
    try {
      const response = await axiosInstance.get("api/sales");
      setSales(response.data);
    } catch (error) {
      console.error("Error fetching sales:", error);
      setError("Failed to fetch sales");
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axiosInstance.get("api/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Failed to fetch products");
    }
  };

  const fetchCustomers = async () => {
    try {
      const response = await axiosInstance.get("api/customers");
      setCustomers(response.data);
    } catch (error) {
      console.error("Error fetching customers:", error);
      setError("Failed to fetch customers");
    }
  };

  const handleAddItem = () => {
    setNewSale({
      ...newSale,
      items: [...newSale.items, { productId: "", quantity: 1 }]
    });
  };

  const handleRemoveItem = (index) => {
    const updatedItems = newSale.items.filter((_, i) => i !== index);
    setNewSale({ ...newSale, items: updatedItems });
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...newSale.items];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    setNewSale({ ...newSale, items: updatedItems });
  };

  const calculateTotal = () => {
    return newSale.items.reduce((total, item) => {
      const product = products.find(p => p.id === parseInt(item.productId));
      return total + (product ? product.price * item.quantity : 0);
    }, 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const saleData = {
        ...newSale,
        totalAmount: calculateTotal(),
        items: newSale.items.map(item => ({
          ...item,
          productId: parseInt(item.productId),
          quantity: parseInt(item.quantity)
        }))
      };

      await axiosInstance.post("api/sales", saleData);
      fetchSales();
      setNewSale({
        customerId: "",
        items: [{ productId: "", quantity: 1 }],
        paymentMethod: "CASH"
      });
      setError("");
    } catch (error) {
      console.error("Error creating sale:", error);
      setError("Failed to create sale");
    }
  };

  return (
    <div className="sales-container">
      <h2>Sales Management</h2>
      {error && <div className="error-message">{error}</div>}

      <div className="sales-form">
        <h3>Create New Sale</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Customer</label>
            <select
              value={newSale.customerId}
              onChange={(e) => setNewSale({ ...newSale, customerId: e.target.value })}
              required
            >
              <option value="">Select Customer</option>
              {customers.map(customer => (
                <option key={customer.id} value={customer.id}>
                  {customer.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Payment Method</label>
            <select
              value={newSale.paymentMethod}
              onChange={(e) => setNewSale({ ...newSale, paymentMethod: e.target.value })}
              required
            >
              <option value="CASH">Cash</option>
              <option value="CARD">Card</option>
              <option value="ONLINE">Online</option>
            </select>
          </div>

          <div className="items-section">
            <h4>Items</h4>
            {newSale.items.map((item, index) => (
              <div key={index} className="sale-item">
                <select
                  value={item.productId}
                  onChange={(e) => handleItemChange(index, "productId", e.target.value)}
                  required
                >
                  <option value="">Select Product</option>
                  {products.map(product => (
                    <option key={product.id} value={product.id}>
                      {product.name} - ${product.price} (Stock: {product.quantity})
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => handleRemoveItem(index)}
                  className="remove-item"
                >
                  Remove
                </button>
              </div>
            ))}
            <button type="button" onClick={handleAddItem} className="add-item">
              Add Item
            </button>
          </div>

          <div className="total-section">
            <h4>Total: ${calculateTotal().toFixed(2)}</h4>
          </div>

          <button type="submit" className="submit-button">Create Sale</button>
        </form>
      </div>

      <div className="sales-list">
        <h3>Recent Sales</h3>
      <table>
        <thead>
          <tr>
            <th>Date</th>
              <th>Customer</th>
              <th>Items</th>
              <th>Total</th>
              <th>Payment Method</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((sale) => (
            <tr key={sale.id}>
                <td>{new Date(sale.createdAt).toLocaleDateString()}</td>
                <td>{sale.customer?.name || 'N/A'}</td>
                <td>
                  {sale.items.map(item => (
                    <div key={item.id}>
                      {item.product?.name} x {item.quantity}
                    </div>
                  ))}
              </td>
                <td>${sale.totalAmount.toFixed(2)}</td>
                <td>{sale.paymentMethod}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default SalesList;
