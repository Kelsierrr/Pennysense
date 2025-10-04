import React, { useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './AddExpenseForm.css';
import { FiX } from 'react-icons/fi';
import API from '../../utils/api';


export default function AddExpenseForm({ visible, onSubmit, onCancel }) {
   const [lines, setLines] = useState([
    { date: null, category: '', amount: '', additionalInfo: '' }
   ]);

   const total = lines.reduce((sum, line) => {
    const amt = parseFloat(line.amount);
    return sum + (isNaN(amt) ? 0 : amt);
   }, 0);

   function handleLineChange(idx, field, value) {
    setLines(prev => {
        const newLines = [...prev];
        newLines[idx] = { ...newLines[idx], [field]: value };
        return newLines;
    });
   }

   function handleAddLine() {
    setLines(prev => [...prev, 
            { date: null, category: '', amount: '', additionalInfo: '' }]);
    }

    function handleRemoveLine(idx) {
        setLines(prev => prev.filter((_, i) => i !== idx));
    }

    async function handleSubmit(e) {
  e.preventDefault();

  const expenseObjects = lines.map(line => {
    const dt = line.date || new Date();

    const dayStr = String(dt.getDate()).padStart(2, '0');
    const monthStr = String(dt.getMonth() + 1).padStart(2, '0');
    const yearStr = dt.getFullYear();
    const displayDate = `${yearStr}-${monthStr}-${dayStr}`;

    const monthAbbr = dt.toLocaleString('default', { month: 'short' }).toUpperCase();

    return {
      date: displayDate,
      month: monthAbbr,
      year: yearStr,
      category: line.category,
      amount: parseFloat(line.amount),
      details: [],
      additionalInfo: line.additionalInfo
    };
  });

  try {
    // 🔑 Save to backend
    await Promise.all(
      expenseObjects.map(exp =>
        API.post("/expenses", exp) // your server route
      )
    );

    // 🔑 Pass up to parent (keeps dashboard in sync)
    onSubmit(expenseObjects);

    // ✅ Reset the form
    setLines([{ date: null, category: '', amount: '', additionalInfo: '' }]);

  } catch (err) {
    console.error("Error saving expense:", err.response?.data || err.message);
    alert("Failed to save expense.");
  }
}
    if (!visible) {return null};

    return(
        <form className="add-expense-form" onSubmit = {handleSubmit}>
            <div className="inputGroup totalGroup">
                <input
                type='text'
                readOnly
                value={`Total: ₦${total.toLocaleString()}`}
                className="totalInput"
                />
            </div>

            {lines.map((line, idx) => (
                <div key={idx} className="lineGroup">
                     <div className="row row-single">
                    <ReactDatePicker
                        selected={line.date}
                        onChange={date => handleLineChange(idx, 'date', date)}
                        placeholderText="Select Date"
                        dateFormat="dd/MM/yyyy"
                        className="dateInput"
                        required
                    />
                    </div>

                    <div className="row row-dual">
                    <input
                        type='text'
                        placeholder='Item Category'
                        value={line.category}
                        onChange={e => handleLineChange(idx, 'category', e.target.value)}
                        className="textInput"
                        required
                    />
                    <input
                        type='number'
                        placeholder='Amount'
                        value={line.amount}
                        onChange={e => handleLineChange(idx, 'amount', e.target.value)}
                        className="numberInput"
                        required
                        min="0.01"
                        step="0.01"
                    />
                    </div>
                    <div className="row row-single">
                    <textarea
                        type='text'
                        placeholder='Additional Information'
                        value={line.additionalInfo}
                        onChange={e => handleLineChange(idx, 'additionalInfo', e.target.value)}
                        className="textareaInput"
                        rows="2"
                    />

            <button
            type="button"
            className="removeLineBtn"
            onClick={() => handleRemoveLine(idx)}>
           <FiX size={15} />
          </button>
                     </div>

    
                </div>
            ))}

            
            <div className="row row-single">
                <button
                    type="button"
                    className="addLineBtn"
                    onClick={handleAddLine}
                >
                   + Add New Expense
                </button>
                </div>
            <div className="row row-buttons">
                <button type="submit" className="confirmBtn">
                    Confirm Expense 
                </button>
                <button type="button" className="cancelBtn" onClick={onCancel}>
                    Cancel
                </button>
            </div>
        </form>
    )
}  