// App.jsx
import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";   // ✅ add Navigate
import Dashboard from "./pages/Dashboard";
import AddExpensePage from "./pages/AddExpensePage";
import PreviewPage from "./pages/PreviewPage";
import Loginpage from "./pages/LoginPage";
import Registerpage from "./pages/RegisterPage";
import PasswordRecovery from "./pages/PasswordRecovery";
import PasswordReset from "./pages/PasswordReset";

function App() {
  const [expenses, setExpenses] = useState([]);

  function handleAddExpense(expenseObj) {
    setExpenses((prev) => [expenseObj, ...prev]);
  }

  // ✅ helper function
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <Routes>
      <Route path="/" element={<Loginpage />} />
      <Route path="/register" element={<Registerpage />} />
      <Route path="/recoverpassword" element={<PasswordRecovery />} />
      <Route path="/resetpassword" element={<PasswordReset />} />

      {/* 🧠 Protect dashboard */}
      <Route
        path="/dashboard"
        element={
          isAuthenticated ? (
            <Dashboard
              expenses={expenses}
              onAddExpense={handleAddExpense}
            />
          ) : (
            <Navigate to="/" replace />
          )
        }
      >
        <Route path="add-expense" element={<AddExpensePage />} />
        <Route path="preview" element={<PreviewPage />} />
      </Route>
    </Routes>
  );
}

export default App;
