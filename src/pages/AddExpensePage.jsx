import React from "react";
import { useNavigate } from "react-router-dom";
import AddExpenseForm from "../components/AddExpenseForm/AddExpenseForm";
import '../styles/AddExpense.css';

export default function AddExpensePage({ onSubmit }) {
  const navigate = useNavigate();

  function handleSubmit(expenseArray) {
    expenseArray.forEach(expenseObject => onSubmit(expenseObject));
    navigate('/dashboard');
  }
  

  function handleCancel() {
    navigate('/dashboard');
  }

  return (
    <div className="add-expense-container">
      <h2 className="page-title">Add New Expense</h2>
      <AddExpenseForm visible={true} onSubmit={handleSubmit} onCancel={handleCancel} />
    </div>
  );
}