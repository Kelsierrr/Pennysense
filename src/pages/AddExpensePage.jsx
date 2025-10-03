import React from "react";
import { useNavigate, useLocation, useOutletContext } from "react-router-dom";
import AddExpenseForm from "../components/AddExpenseForm/AddExpenseForm";
import "../styles/AddExpense.css";

export default function AddExpensePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { handleAddExpense, filterMonth, filterYear } = useOutletContext();

  function handleSubmit(expenseArray) {
    handleAddExpense(expenseArray);
    navigate("..", {
      state: { filterMonth, filterYear },
      replace: true,
    });
  }

  function handleCancel() {
    navigate("..", {
      state: { filterMonth, filterYear },
      replace: true,
    });
  }

  return (
   <div className="add-expense-layout">
  <div className="add-expense-left">
    {/* Optional: could show stats or just leave empty */}
  </div>
  <div className="add-expense-right">
    <h2 className="page-title">Add New Expense</h2>
    <AddExpenseForm visible={true} onSubmit={handleSubmit} onCancel={handleCancel} />
  </div>
</div>

  );
}
