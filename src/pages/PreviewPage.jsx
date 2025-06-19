import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ExpensePreview from '../components/ExpensePreview/ExpensePreview';
import '../styles/PreviewPage.css';


export default function PreviewPage() {
    const {state} = useLocation();
    const {expense, filterMonth, filterYear} = state || {};
    const navigate = useNavigate();
    useEffect(() => {
        if (!expense) {
          navigate('/dashboard');
        }
      }, [expense, navigate]);

    if(!expense) {
        return null;
    }


    return (
        <div className="preview-page">
            <button className="backBtn" onClick={() => navigate('/dashboard', {
                state: { filterMonth, filterYear
                }
            })}>
            ← Back
            </button>
            <ExpensePreview expense={expense} />
        </div>
    )


}