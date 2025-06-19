import React from 'react';
import './ExpensePreview.css';


export default function ExpensePreview ({expense}) {
    if (!expense) {
        return (
            <div className="expense-preview empty">
                <p>Select an item from history to see details</p>
            </div>
        );
    }
    const{
        amount = 0,
        date = '--/--/----',
        category = '',
        additionalInfo = ''
    } = expense;

    const formattedAmount = typeof amount === 'number' ? amount.toLocaleString() : String(amount);

    return (
        <div className="expense-preview">
            <h2 className="preview-title">Expense Preview</h2>

            <div className="preview-row">
                <span className="label">Date Spent</span>
                <span className="value">{date}</span>
                </div>
            <div className="preview-row">
            <span className="label">Amount Spent</span>
                <span className="value">₦{formattedAmount}</span>
                </div>
            <div className="preview-section">
                <div className="section-title">Expense Details</div>
                    <div className="detail-row">
                        <span className="detail-label">{category}</span>
                        <span className="detail-amount">₦{formattedAmount}</span>
                    </div>
                
        </div>

        {additionalInfo && (
            <div className="preview-section">
                <div className="section-title">Additional Information</div>
                <p className="additional-info">{additionalInfo}</p>
            </div>
        )}
        </div>
    )
}