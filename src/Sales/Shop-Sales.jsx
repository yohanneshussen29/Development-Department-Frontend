import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import './../Maping/Where.css';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import { Autocomplete } from "@mui/material";
import TodayIcon from '@mui/icons-material/Today';
import SalesTable from './SalesTable'; 

function ShopSales() {
    const [timeOfDay, setTimeOfDay] = useState(""); 
    const [date, setDate] = useState("");
    const [sellerName, setSellerName] = useState("");
    const [amount, setAmount] = useState(""); 
    const [tableData, setTableData] = useState([]); 
    const [editIndex, setEditIndex] = useState(null); 

    const flatProps = {
        options: ['ጠዋት / Morning', 'ማታ / Night'],
        getOptionLabel: (option) => option,
    };

    useEffect(() => {
        const fetchSales = async () => {
            try {
                const response = await fetch('https://development-department.onrender.com/api/shop-sales');
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Failed to fetch sales');
                }
                const data = await response.json();
                setTableData(data);
            } catch (error) {
                console.error('Error fetching sales:', error);
                alert(error.message || 'Failed to fetch sales data');
            }
        };

        fetchSales();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!timeOfDay || !date || !sellerName || !amount) {
            alert('All fields are required');
            return;
        }

        const newEntry = {
            timeOfDay: timeOfDay,
            date: date,
            sellerName: sellerName,
            amount: amount,
        };

        try {
            const url = editIndex === null ?
                'https://development-department.onrender.com/api/shop-sales' :
                `https://development-department.onrender.com/api/shop-sales/${tableData[editIndex]._id}`; // Use the correct ID

            const method = editIndex === null ? 'POST' : 'PUT';

            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newEntry),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to submit sale');
            }

            const data = await response.json();
            if (editIndex === null) {
                setTableData([...tableData, data]); 
            } else {
                const updatedData = [...tableData];
                updatedData[editIndex] = data; 
                setTableData(updatedData);
                setEditIndex(null); 
            }

            setTimeOfDay("");
            setDate("");
            setSellerName("");
            setAmount("");
        } catch (error) {
            console.error('Error submitting sale:', error);
            alert(error.message || 'Failed to submit sale');
        }
    };

    const handleEdit = (index) => {
        const row = tableData[index];
        setTimeOfDay(row.timeOfDay);
        setDate(row.date);
        setSellerName(row.sellerName);
        setAmount(row.amount);
        setEditIndex(index);
    };

    const handleDelete = async (index) => {
        const rowId = tableData[index]._id;
    
        const isConfirmed = window.confirm("Are you sure you want to delete this");
        if (!isConfirmed) {
            return; 
        }
    
        try {
            const response = await fetch(`https://development-department.onrender.com/api/shop-sales/${rowId}`, {
                method: 'DELETE',
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to delete purchase");
            }
    
            const updatedData = tableData.filter((row, i) => i !== index); 
            setTableData(updatedData);
        } catch (error) {
            console.error("Error deleting purchase:", error);
            alert(error.message || "Failed to delete purchase");
        }
    };

    return (
        <div className="table-sales-container">
            <br /><br /><br />
            <h3>የሱቅ ውስጥ ሽያጮች / Sales on the Shop</h3>
            <div className="input-fields">
                <Autocomplete
                    className="Date-input"
                    {...flatProps}
                    id="flat-demo"
                    value={timeOfDay}
                    onChange={(event, newValue) => setTimeOfDay(newValue)}
                    renderInput={(params) => (
                        <TextField {...params} label="ጠዋት / ማታ" variant="standard" />
                    )}
                />
                <TextField
                    className="Date-input"
                    id="input-with-icon-textfield"
                    label="ቀን / Date"
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <TodayIcon />
                                </InputAdornment>
                            ),
                            className: "Date-input"
                        },
                    }}
                    variant="standard"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
                <TextField
                    id="input-with-icon-textfield"
                    label="የሸጠው አባል ስም"
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SupervisorAccountIcon />
                                </InputAdornment>
                            ),
                        },
                    }}
                    variant="standard"
                    value={sellerName}
                    onChange={(e) => setSellerName(e.target.value)}
                />
                <TextField
                    id="input-with-icon-textfield"
                    label="የሸጠው አባል ያስገባው ገንዘብ"
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <MonetizationOnIcon />
                                </InputAdornment>
                            ),
                        },
                    }}
                    variant="standard"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
                <button className="submit" type="submit" onClick={handleSubmit}>
                    {editIndex === null ? 'Submit' : 'Update'}
                </button>
            </div>
            <br />
            <Link to="/Sales">
                <button className="nav-button">ለመመለስ / To Return</button>
            </Link>
            <SalesTable
                tableData={tableData}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
            />
        </div>
    );
}

export default ShopSales;