import { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";
import Header from "../components/Header/header";
import ExpenseHistory from "../components/ExpenseHistory/ExpenseHistory";
import FilterControls from "../components/FilterControls/FilterControls";
import Notification from "../components/Notification/Notification";
import { useExpenses } from "../context/ExpenseContext";

function Dashboard() {
  const { expenses, addExpense } = useExpenses();
  const location = useLocation();
  const navigate = useNavigate();

  const initialFilterMonth = location.state?.filterMonth || "JUN";
  const initialFilterYear = location.state?.filterYear || "2025";
  const [filterMonth, setFilterMonth] = useState(initialFilterMonth);
  const [filterYear, setFilterYear] = useState(initialFilterYear);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (location.state?.filterMonth) setFilterMonth(location.state.filterMonth);
    if (location.state?.filterYear) setFilterYear(location.state.filterYear);
  }, [location.state]);

  function handleFilterChange(month, year) {
    setFilterMonth(month);
    setFilterYear(year);
  }

  function handleAddExpense(newExpenses) {
    const exp = newExpenses[0];
    newExpenses.forEach(addExpense);
    navigate(".", {
      replace: true,
      state: { filterMonth: exp.month, filterYear: exp.year },
    });
    setToast("Expense added successfully!");
  }

  function handleToastClose() {
    setToast("");
  }

  function handleExpenseSelect(exp) {
    navigate("preview", {
      state: { exp, filterMonth, filterYear },
    });
  }

 const filteredExpenses = expenses.filter(
  (expense) =>
    expense.month === filterMonth &&
    expense.year.toString() === filterYear
);



  const thisMonthTotal = filteredExpenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );

  const thisYearTotal = expenses
  .filter(expense => expense.year.toString() === filterYear)
  .reduce((total, expense) => total + expense.amount, 0);


  return (
    <div className="dashboard">
      {toast && <Notification message={toast} onClose={handleToastClose} />}
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
  <div className="filter-controls-group">
    <FilterControls
      month={filterMonth}
      year={filterYear}
      onChange={handleFilterChange}
    />
  </div>

  <div className="add-expense-btn-wrapper">
    <button
      className="addExpenseBtn"
      onClick={() =>
        navigate("add-expense", {
          state: { filterMonth, filterYear },
        })
      }
    >
      Add Expense <span className="plus">+</span>
    </button>
  </div>
</div>


          <ExpenseHistory items={filteredExpenses} onSelect={handleExpenseSelect} />
        </div>

        <div className="dashboard-right">
          <Outlet
            context={{
              handleAddExpense,
              handleExpenseSelect,
              filterMonth,
              filterYear,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

