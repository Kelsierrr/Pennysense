import { createContext, useContext, useEffect, useState } from "react";
import API from "../utils/api";

const ExpenseContext = createContext();

export function ExpenseProvider({ children }) {
  const [expenses, setExpenses] = useState([]);            // all expenses
  const [filteredExpenses, setFilteredExpenses] = useState([]);  // monthly
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🟢 Fetch ALL expenses (used for yearly totals)
  async function loadAllExpenses() {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      const res = await API.get("/expenses");
      setExpenses(res.data);
      setError(null);
    } catch (err) {
      const message = err.response?.data?.message || "Failed to load expenses.";
      setError(message);
      console.error("Error loading all expenses:", message);
    } finally {
      setLoading(false);
    }
  }

  // 🟢 Fetch filtered (month/year) expenses for dashboard list
  async function fetchFilteredExpenses(month, year) {
    try {
      const res = await API.get(`/expenses?month=${month}&year=${year}`);
      setFilteredExpenses(res.data);
      setError(null);
    } catch (err) {
      const message = err.response?.data?.message || "Failed to load filtered expenses.";
      setError(message);
      console.error("Error fetching filtered expenses:", message);
    }
  }

  // 🟢 Add new expense(s)
  async function addExpense(expenseObjOrArray) {
    try {
      const payload = Array.isArray(expenseObjOrArray)
        ? expenseObjOrArray
        : [expenseObjOrArray];

      const res = await API.post("/expenses", payload);
      const newExpenses = Array.isArray(res.data) ? res.data : [res.data];

      // Update both states immediately
      setExpenses((prev) => [...newExpenses, ...prev]);
      setFilteredExpenses((prev) => [...newExpenses, ...prev]);

      return newExpenses;
    } catch (err) {
      const message = err.response?.data?.message || "Failed to add expense.";
      setError(message);
      console.error("Error adding expense:", message);
      throw err;
    }
  }

  // 🟢 Run once on login/mount
  useEffect(() => {
    loadAllExpenses();
  }, []);

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        filteredExpenses,
        addExpense,
        fetchFilteredExpenses,
        loading,
        error,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
}

export function useExpenses() {
  return useContext(ExpenseContext);
}
