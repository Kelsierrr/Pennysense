import './ExpenseHistory.css';
import React from 'react';
import { FaChevronRight}  from 'react-icons/fa';


export default function ExpenseHistory({items, onSelect}) {
    return(
        <div className="expense-history">
            {items.length === 0 ? (
                <div className="no-expenses"> No expenses recorded yet. </div>
            ) : (
                items.map((expense, index) => (
                    <div 
                        key={index} 
                        className="expense-row" 
                        onClick={() => onSelect(expense)}
                    >
                       <span className="expense-date">{expense.date}</span>
                       <span className="expense-category">{expense.category}</span>
                        <span className="expense-amount">₦{expense.amount.toLocaleString()}</span>
                        <FaChevronRight className="expense-chevron" />
                    </div>
                ))
            )}
        </div>
    );
}