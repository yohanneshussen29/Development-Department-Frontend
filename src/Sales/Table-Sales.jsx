import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import './../Maping/Where.css';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import { Autocomplete } from "@mui/material";
import TodayIcon from '@mui/icons-material/Today';
import SalesTable from "./Table-Table";

function TableSales() {
    const [timeOfDay, setTimeOfDay] = useState("");
    const [date, setDate] = useState("");
    const [givenBy, setGivenBy] = useState("");
    const [soldBy, setSoldBy] = useState("");
    const [amount, setAmount] = useState("");
    const [tableData, setTableData] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState("");

    const timeOptions = ['ጠዋት / Morning', 'ማታ / Night'];

    // Fetch data on component mount
    useEffect(() => {
        const fetchSales = async () => {
            try {
                const response = await fetch('https://development-department.onrender.com/api/table-sales');
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Failed to fetch sales');
                }
                const data = await response.json();
                setTableData(data);
            } catch (error) {
                console.error('Error fetching sales:', error);
                setError(error.message || 'Failed to fetch sales data');
            }
        };
        fetchSales();
    }, []);

    const resetForm = () => {
        setTimeOfDay("");
        setDate("");
        setGivenBy("");
        setSoldBy("");
        setAmount("");
        setEditIndex(null);
        setError("");
    };

    const validateForm = () => {
        if (!timeOfDay || !date || !givenBy || !soldBy || !amount) {
            setError('All fields are required');
            return false;
        }
        if (isNaN(amount) || parseFloat(amount) <= 0) {
            setError('Please enter a valid positive amount');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError("");

        if (!validateForm()) {
            setIsSubmitting(false);
            return;
        }

        const saleData = {
            timeOfDay,
            date,
            givenBy,
            soldBy,
            amount: parseFloat(amount).toFixed(2)
        };

        try {
            const url = editIndex === null 
                ? 'https://development-department.onrender.com/api/table-sales' 
                : `https://development-department.onrender.com/api/table-sales/${tableData[editIndex]._id}`;

            const method = editIndex === null ? 'POST' : 'PUT';

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(saleData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to save sale');
            }

            const result = await response.json();
            
            if (editIndex === null) {
                setTableData([...tableData, result]);
            } else {
                const updatedData = [...tableData];
                updatedData[editIndex] = result;
                setTableData(updatedData);
            }

            resetForm();
        } catch (error) {
            console.error('Error saving sale:', error);
            setError(error.message || 'Failed to save sale');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleEdit = (index) => {
        if (index < 0 || index >= tableData.length) {
            setError('Invalid selection for editing');
            return;
        }

        const row = tableData[index];
        setTimeOfDay(row.timeOfDay || "");
        setDate(row.date || "");
        setGivenBy(row.givenBy || "");
        setSoldBy(row.soldBy || "");
        setAmount(row.amount || "");
        setEditIndex(index);
        
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const handleDelete = async (index) => {
        if (index < 0 || index >= tableData.length) {
            setError('Invalid selection for deletion');
            return;
        }

        const row = tableData[index];
        if (!row._id) {
            setError('Cannot delete - missing record ID');
            return;
        }

        if (!window.confirm(`Are you sure you want to delete this sale?\n\nDate: ${row.date}\nAmount: ${row.amount}`)) {
            return;
        }

        try {
            setIsDeleting(true);
            const response = await fetch(`https://development-department.onrender.com/api/table-sales/${row._id}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to delete sale");
            }

            setTableData(tableData.filter((_, i) => i !== index));
            if (editIndex === index) resetForm();
        } catch (error) {
            console.error("Error deleting sale:", error);
            setError(error.message || "Failed to delete sale");
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className="table-sales-container">
            <br /><br /><br /><br />
            <h3>የጠረጴዛ ሽያጮች / Table Sales</h3>
            
            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit}>
                <div className="input-fields">
                    <Autocomplete
                    className="Date-input"
                        options={timeOptions}
                        value={timeOfDay}
                        onChange={(_, newValue) => setTimeOfDay(newValue)}
                        renderInput={(params) => (
                            <TextField 
                                {...params} 
                                label="ጠዋት / ማታ" 
                                variant="standard" 
                                required 
                            />
                        )}
                    />
                    <TextField
                    className="Date-input"
                        label="ቀን / Date"
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <TodayIcon />
                                </InputAdornment>
                            ),
                        }}
                        variant="standard"
                        required
                        InputLabelProps={{ shrink: true }}
                    />

                    <TextField
                        label="የሰጠው አባል ስም"
                        value={givenBy}
                        onChange={(e) => setGivenBy(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AccountCircle />
                                </InputAdornment>
                            ),
                        }}
                        variant="standard"
                        required
                    />

                    <TextField
                        label="የሸጠው አባል ስም"
                        value={soldBy}
                        onChange={(e) => setSoldBy(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SupervisorAccountIcon />
                                </InputAdornment>
                            ),
                        }}
                        variant="standard"
                        required
                    />

                    <TextField
                        label="የሸጠው አባል ያስገባው ገንዘብ"
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <MonetizationOnIcon />
                                </InputAdornment>
                            ),
                        }}
                        variant="standard"
                        required
                    />
                </div>
<br />
                <div className="form-actions">
                    <button 
                        type="submit" 
                        disabled={isSubmitting || isDeleting}
                        className="submit-button"
                    >
                        {isSubmitting ? 'Processing...' : editIndex === null ? 'Submit' : 'Update'}
                    </button>

                    {editIndex !== null && (
                        <button 
                            type="button" 
                            onClick={resetForm}
                            className="cancel-button"
                        >
                            Cancel Edit
                        </button>
                    )}

                    <Link to="/Sales" className="return-link">
                        <button type="button" className="nav-button">
                            ለመመለስ / To Return
                        </button>
                    </Link>
                </div>
            </form>

            <SalesTable
                tableData={tableData}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                isDeleting={isDeleting}
            />
        </div>
    );
}

export default TableSales;