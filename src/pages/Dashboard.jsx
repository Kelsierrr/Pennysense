
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css"
import Header from "../components/Header/header";
import AddExpenseForm from "../components/AddExpenseForm/AddExpenseForm";
import ExpenseHistory from "../components/ExpenseHistory/ExpenseHistory";
import ExpensePreview from "../components/ExpensePreview/ExpensePreview";
import  FilterControls from "../components/FilterControls/FilterControls";
import Notification from "../components/Notification/Notification";

function Dashboard({expenses, onAddExpense}) {
    const navigate = useNavigate();
    const [filterMonth, setFilterMonth] = useState('JUN');
    const [filterYear, setFilterYear] = useState('2025');
    const [showForm, setShowForm] = useState(true);
    const [selectedExpense, setSelectedExpense] = useState(null);
    const [toast, setToast] = useState(null);

    function handleFilterChange(month, year) {
        setFilterMonth(month);
        setFilterYear(year);
    }
    function handleAddExpense(newExpenses) {
      newExpenses.forEach(exp => onAddExpense(exp));
      // setSelectedExpense(newExpenses[0]);
      const exp = newExpenses[0];
      setFilterMonth(exp.month);
      setFilterYear(exp.year);
      setSelectedExpense(exp);
      setToast('Expense added successfully!');
      // setshowForm(false);
    }

    function handleToastClose() {
        setToast("");
    }
    function handleExpenseSelect(expense) {
        setSelectedExpense(expense);
        setShowForm(false);
         
        if (window.innerWidth < 768) {
          navigate('/dashboard/preview', {state: expense});
        }
      }
  
      const filteredExpenses = expenses.filter(expense =>
        expense.month === filterMonth && expense.year === filterYear
      );
    const thisMonthTotal = filteredExpenses.reduce
    ((total, expense) => total + expense.amount, 0);
    const thisYearTotal = expenses.filter(expense => expense.year === filterYear).reduce((total, expense) => total + expense.amount, 0);


    return (
        <div className="dashboard">
            {toast && (
                <Notification 
                    message={toast} 
                    onClose={handleToastClose} 
                />
            )}
            <Header />
            <div className="dashboard-content">
               
               <div className="dashboard-left">
                <div className="stats-card-combined">
                    <div className="stats-block">
                        <p className="stats-title">This Month</p>
                        <p className="stats-amount">₦{thisMonthTotal.toFixed(2)}</p>
                    </div>
                    <div className="stats-divider" />
                    <div className="stats-block">
                        <p className="stats-title">This Year</p>
                        <p className="stats-amount">₦{thisYearTotal.toFixed(2)}</p>
                    </div>
                </div>
                  
                  <div className="controls-row">
                  <FilterControls 
                    month = {filterMonth}
                    year = {filterYear}
                    onChange = { handleFilterChange}
                 />
                  
                    <button className="addExpenseBtn" onClick={() => {setShowForm(true); setSelectedExpense(null); }}>
                     Add Expense <span className="plus">+</span>
                    </button>
                 <button className="addExpenseBtn mobile-visible" onClick={() => navigate('/dashboard/add-expense')}>
                    Add Expense <span className="plus">+</span></button>
                  </div>
                
                 <ExpenseHistory
                    items = {filteredExpenses}
                    onSelect = {handleExpenseSelect}
                    />
                        </div>
                <div className="dashboard-right">
                  <div className="desktop-visible">
                    {showForm ? (
                   <AddExpenseForm
                    visible = {true}
                    onSubmit = {handleAddExpense}
                    onCancel = { () => {} }
                    />
                  ) : (
                    <ExpensePreview expense={selectedExpense} />
                  )}
                    </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;