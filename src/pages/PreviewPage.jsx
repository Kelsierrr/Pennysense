import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ExpensePreview from '../components/ExpensePreview/ExpensePreview';
import '../styles/PreviewPage.css';


export default function PreviewPage() {
    const {state: expense} = useLocation;
    const navigate = useNavigate();


    if(!expense) {
        return navigate ('/dashboard');
    }


    return (
        <div className="preview-page">
            <button className="backBtn" onClick={() => navigate(-1)}>
            ← Back
            </button>
            <ExpensePreview expense={expense} />
        </div>
    )


}