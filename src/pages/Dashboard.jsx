import { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";
import Header from "../components/Header/header";
import ExpenseHistory from "../components/ExpenseHistory/ExpenseHistory";
import FilterControls from "../components/FilterControls/FilterControls";
import Notification from "../components/Notification/Notification";
import { useExpenses } from "../context/ExpenseContext";

function Dashboard() {
  const {
    expenses,
    filteredExpenses,
    addExpense,
    fetchFilteredExpenses,
    loading,
    error,
  } = useExpenses();

  const location = useLocation();
  const navigate = useNavigate();

  // 🕒 Default current month/year
  const now = new Date();
  const defaultMonth = now.toLocaleString("default", { month: "short" }).toUpperCase();
  const defaultYear = now.getFullYear().toString();

  const initialFilterMonth = location.state?.filterMonth || defaultMonth;
  const initialFilterYear = location.state?.filterYear || defaultYear;

  const [filterMonth, setFilterMonth] = useState(initialFilterMonth);
  const [filterYear, setFilterYear] = useState(initialFilterYear);
  const [toast, setToast] = useState(null);

  // 🟢 Fetch data whenever filters change
  useEffect(() => {
    fetchFilteredExpenses(filterMonth, filterYear);
  }, [filterMonth, filterYear]);

  // 🟢 Update filter when navigating back
  useEffect(() => {
    if (location.state?.filterMonth) setFilterMonth(location.state.filterMonth);
    if (location.state?.filterYear) setFilterYear(location.state.filterYear);
  }, [location.state]);

  // 🔁 Handlers
  function handleFilterChange(month, year) {
    setFilterMonth(month);
    setFilterYear(year);
  }

  async function handleAddExpense(newExpenses) {
    const exp = newExpenses[0];
    await addExpense(newExpenses);

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
    navigate("preview", { state: { exp, filterMonth, filterYear } });
  }

  // 🧮 Totals (fixed)
  const currentMonth = filterMonth.toUpperCase();
  const currentYear = String(filterYear);

  const thisMonthTotal = filteredExpenses
    .filter(
      (expense) =>
        expense.month.toUpperCase() === currentMonth &&
        String(expense.year) === currentYear
    )
    .reduce((total, expense) => total + expense.amount, 0);

  // ✅ Now correctly uses all months in the year
  const thisYearTotal = expenses
    .filter((expense) => String(expense.year) === currentYear)
    .reduce((total, expense) => total + expense.amount, 0);

  return (
    <div className="dashboard">
      {toast && <Notification message={toast} onClose={handleToastClose} />}
      {error && <Notification message={error} type="error" onClose={() => {}} />}

      <Header />
      <div className="dashboard-content">
        <div className="dashboard-left">
          {/* Stats */}
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

          {/* Filters + Add button */}
          <div className="controls-row">
            <FilterControls
              month={filterMonth}
              year={filterYear}
              onChange={handleFilterChange}
            />
            <button
              className="addExpenseBtn"
              onClick={() =>
                navigate("add-expense", { state: { filterMonth, filterYear } })
              }
            >
              Add Expense <span className="plus">+</span>
            </button>
          </div>

          {/* Expense history */}
          <ExpenseHistory items={filteredExpenses} onSelect={handleExpenseSelect} />
        </div>

        {/* Right panel for nested pages */}
        <div className="dashboard-right">
          {loading ? (
            <p className="loading-text">Loading...</p>
          ) : (
            <Outlet
              context={{
                handleAddExpense,
                handleExpenseSelect,
                filterMonth,
                filterYear,
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
