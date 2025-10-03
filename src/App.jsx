// App.jsx
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AddExpensePage from "./pages/AddExpensePage";
import PreviewPage from "./pages/PreviewPage";
import Loginpage from "./pages/LoginPage";
import Registerpage from "./pages/RegisterPage";
import PasswordRecovery from "./pages/PasswordRecovery";
import PasswordReset from "./pages/PasswordReset";

function App() {
  const [expenses, setExpenses] = useState([
    // your dummy data
  ]);

 function handleAddExpense(expenseObj) {
  setExpenses(prev => {
    const updated = [expenseObj, ...prev];
    console.log("✅ Expense added:", expenseObj);
    console.log("📦 Updated expenses array:", updated);
    return updated;
  });
}


  return (
    <Routes>
      <Route path="/" element={<Loginpage />} />
      <Route path="/register" element={<Registerpage />} />
      <Route path="/recoverpassword" element={<PasswordRecovery />} />
      <Route path="/resetpassword" element={<PasswordReset />} />

      {/* 🧠 Nest child routes under dashboard */}
      <Route path="/dashboard" element={
        <Dashboard
          expenses={expenses}
          onAddExpense={handleAddExpense}
        />
      }>
        <Route path="add-expense" element={<AddExpensePage />} />
        <Route path="preview" element={<PreviewPage />} />
      </Route>
    </Routes>
  );
}

export default App;
