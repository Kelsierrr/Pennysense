import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Loginpage from "./pages/LoginPage";
import Registerpage from "./pages/RegisterPage";
import  PasswordRecovery from "./pages/PasswordRecovery"; 
import PasswordReset from "./pages/PasswordReset"
import Dashboard from "./pages/Dashboard";
import AddExpensePage from "./pages/AddExpensePage";
import PreviewPage from "./pages/PreviewPage";

function App() {
   const [expenses, setExpenses] = useState([]);

 function handleAddExpenseSingle(expenseObjects) {
    setExpenses(prev => [expenseObjects, ...prev]);
  }

  return (
    <Routes>
      <Route path="/" element={<Loginpage />} />
      <Route path="/register" element={<Registerpage />}/>
      <Route path="/recoverpassword" element={<PasswordRecovery />} /> 
      <Route path="/resetpassword" element={<PasswordReset />} /> 
      <Route path="/dashboard" element={<Dashboard expenses={expenses}onAddExpense={handleAddExpenseSingle}/>} /> 
      <Route path="/dashboard/add-expense" element = { <AddExpensePage onSubmit={handleAddExpenseSingle}/>}/>
      <Route path="/dashboard/preview" element = { <PreviewPage/>}/>

    </Routes>
  );
}

export default App;
