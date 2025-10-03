import React from "react";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import ExpensePreview from "../components/ExpensePreview/ExpensePreview";

export default function PreviewPage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { exp } = state || {};
  const { filterMonth, filterYear } = useOutletContext();

  function handleBack() {
    navigate("..", {
      state: { filterMonth, filterYear },
      replace: true,
    });
  }

  return (
    <div className="preview-page">
      <ExpensePreview expense={exp} />
      {/* <button className="backBtn" onClick={handleBack}>
        Back to Dashboard
      </button> */}
    </div>
  );
}
