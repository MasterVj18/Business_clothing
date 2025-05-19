import React, { useEffect, useState } from "react";
import { getAllExpenses, createExpense, deleteExpense } from "../services/expenseService";
import "./ExpenseList.css"; // Import CSS

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({
    name: "",
    amount: "",
    date: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const data = await getAllExpenses();
      setExpenses(data);
      setError("");
    } catch (error) {
      console.error("Error fetching expenses:", error);
      setError("Failed to fetch expenses");
    }
  };

  const handleAddExpense = async (e) => {
    e.preventDefault();
    try {
      // Validate inputs
      if (!newExpense.name || !newExpense.amount || !newExpense.date) {
        setError("All fields are required");
        return;
      }

      // Convert amount to number
      const expenseData = {
        ...newExpense,
        amount: parseFloat(newExpense.amount)
      };

      await createExpense(expenseData);
      await fetchExpenses();
      setNewExpense({ name: "", amount: "", date: "" }); // Reset form
      setError("");
    } catch (error) {
      console.error("Error adding expense:", error);
      setError("Failed to add expense");
    }
  };

  const handleDeleteExpense = async (id) => {
    try {
      await deleteExpense(id);
      await fetchExpenses();
      setError("");
    } catch (error) {
      console.error("Error deleting expense:", error);
      setError("Failed to delete expense");
    }
  };

  return (
    <div className="expense-container">
      <h2>Expense List</h2>
      {error && <div className="error-message">{error}</div>}
      
      <div className="expense-form">
        <h3>Add New Expense</h3>
        <form onSubmit={handleAddExpense}>
          <input
            type="text"
            placeholder="Expense Name"
            value={newExpense.name}
            onChange={(e) => setNewExpense({ ...newExpense, name: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Amount"
            value={newExpense.amount}
            onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
            required
            min="0"
            step="0.01"
          />
          <input
            type="date"
            value={newExpense.date}
            onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
            required
          />
          <button type="submit">Add Expense</button>
        </form>
      </div>

      <div className="expense-list">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense.id}>
                <td>{expense.name}</td>
                <td>${expense.amount.toFixed(2)}</td>
                <td>{new Date(expense.date).toLocaleDateString()}</td>
                <td>
                  <button 
                    onClick={() => handleDeleteExpense(expense.id)}
                    className="delete-button"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExpenseList;
