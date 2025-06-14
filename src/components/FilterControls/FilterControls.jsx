import './FilterControls.css';
export default function FilterControls ({month, year, onChange}) {
    const months = Array.from({length: 12}, (_, i) => { 
        const date = new Date(0, i);
        return date.toLocaleString('default', { month: 'short' }).toUpperCase();
    });
    const years = Array.from({length: 5}, (_, i) => new Date().getFullYear() - i);


    return (
       <div className="filter-controls">
        <select className='FC1'
            value={month}
            onChange={(e) => onChange(e.target.value, year)} 
            >
                {months.map((m) => (
                    <option key={m} value={m}>
                        {m}
                    </option>
                ))}
            </select>

        <select className='FC2'
            value={year}
            onChange={(e) => onChange(month, e.target.value)}
            >
                {years.map((y) => (
                    <option key={y} value={y}>
                        {y}
                    </option>
                ))}
            </select>
       </div>
    );
}