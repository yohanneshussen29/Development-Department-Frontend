import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Purchasing() {
    const [date, setDate] = useState("");
    const [totalMoney, setTotalMoney] = useState("");
    const [tableData, setTableData] = useState([]);
    const [editIndex, setEditIndex] = useState(null);

    useEffect(() => {
        fetchPurchases();
    }, []);

    const fetchPurchases = async () => {
        try {
            const response = await fetch("https://development-department.onrender.com/api/purchases");
            if (!response.ok) throw new Error('Failed to fetch');
            setTableData(await response.json());
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!date || !totalMoney) return;

        const url = editIndex === null 
            ? "https://development-department.onrender.com/api/purchases" 
            : `https://development-department.onrender.com/api/purchases/${tableData[editIndex]._id}`;

        try {
            const response = await fetch(url, {
                method: editIndex === null ? 'POST' : 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ dateOfArrival: date, totalMoneySpent: totalMoney }),
            });

            if (response.ok) {
                setDate("");
                setTotalMoney("");
                setEditIndex(null);
                fetchPurchases();
            }
        } catch (error) {
            console.error('Submit error:', error);
        }
    };

    const handleDelete = async (index) => {
        if (!window.confirm("Are you sure?")) return;
        
        try {
            await fetch(`https://development-department.onrender.com/api/purchases/${tableData[index]._id}`, {
                method: 'DELETE'
            });
            fetchPurchases();
        } catch (error) {
            console.error('Delete error:', error);
        }
    };

    return (
        <div className="table-sales-container">
            <h3>የመጡ እቃዎች / Goods Received</h3>
            <div className="input-fields">
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
                <input
                    type="number"
                    value={totalMoney}
                    onChange={(e) => setTotalMoney(e.target.value)}
                    placeholder="Total Money Spent"
                />
                <button onClick={handleSubmit}>
                    {editIndex === null ? 'Submit' : 'Update'}
                </button>
                <Link to="/Where"><button>ለመመለስ / To Return</button></Link>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((row, index) => (
                        <tr key={row._id}>
                            <td>{row.dateOfArrival}</td>
                            <td>{row.totalMoneySpent}</td>
                            <td>
                                <button onClick={() => { setDate(row.dateOfArrival); setTotalMoney(row.totalMoneySpent); setEditIndex(index); }}>Edit</button>
                                <button onClick={() => handleDelete(index)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Purchasing;