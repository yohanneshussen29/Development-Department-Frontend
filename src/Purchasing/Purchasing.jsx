import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  TextField, 
  Button, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  Typography,
  Box,
  useMediaQuery,
  IconButton
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

function Purchasing() {
    const [formData, setFormData] = useState({
        date: "",
        totalMoney: "",
        typeOfThing: "",
        nameOfPurchaser: ""
    });
    const [tableData, setTableData] = useState([]);
    const [editId, setEditId] = useState(null);
    const isMobile = useMediaQuery('(max-width:600px)');

    useEffect(() => {
        fetchPurchases();
    }, []);

    const fetchPurchases = async () => {
        try {
            const response = await fetch("https://development-department.onrender.com/api/purchases");
            if (!response.ok) throw new Error('Failed to fetch');
            const data = await response.json();
            setTableData(data);
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { date, totalMoney, typeOfThing, nameOfPurchaser } = formData;
        
        if (!date || !totalMoney || !typeOfThing || !nameOfPurchaser) {
            alert("Please fill all fields");
            return;
        }

        const purchaseData = {
            dateOfArrival: date,
            totalMoneySpent: parseFloat(totalMoney),
            typeOfThing,
            nameOfPurchaser
        };

        const url = editId 
            ? `https://development-department.onrender.com/api/purchases/${editId}`
            : "https://development-department.onrender.com/api/purchases";

        const method = editId ? 'PUT' : 'POST';

        try {
            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(purchaseData),
            });

            if (response.ok) {
                resetForm();
                await fetchPurchases();
            }
        } catch (error) {
            console.error('Submit error:', error);
        }
    };

    const handleEdit = (purchase) => {
        setFormData({
            date: purchase.dateOfArrival.split('T')[0],
            totalMoney: purchase.totalMoneySpent.toString(),
            typeOfThing: purchase.typeOfThing,
            nameOfPurchaser: purchase.nameOfPurchaser
        });
        setEditId(purchase._id);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this record?")) return;
        
        try {
            await fetch(`https://development-department.onrender.com/api/purchases/${id}`, {
                method: 'DELETE'
            });
            await fetchPurchases();
        } catch (error) {
            console.error('Delete error:', error);
        }
    };

    const resetForm = () => {
        setFormData({
            date: "",
            totalMoney: "",
            typeOfThing: "",
            nameOfPurchaser: ""
        });
        setEditId(null);
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    return (
        <Box sx={{ 
            p: isMobile ? 1 : 3,
            maxWidth: '100%',
            overflowX: 'auto'
        }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                የመጡ እቃዎች / Goods Received
            </Typography>
            
            <Box 
                component="form" 
                onSubmit={handleSubmit}
                sx={{ 
                    mb: 3,
                    display: 'grid',
                    gap: 2,
                    gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)'
                }}
            >
                <TextField
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    label="Date of Arrival"
                    variant="outlined"
                    size="small"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                />
                <TextField
                    name="typeOfThing"
                    value={formData.typeOfThing}
                    onChange={handleChange}
                    label="Type of Thing"
                    variant="outlined"
                    size="small"
                    fullWidth
                />
                <TextField
                    name="nameOfPurchaser"
                    value={formData.nameOfPurchaser}
                    onChange={handleChange}
                    label="Name of Purchaser"
                    variant="outlined"
                    size="small"
                    fullWidth
                />
                <TextField
                    type="number"
                    name="totalMoney"
                    value={formData.totalMoney}
                    onChange={handleChange}
                    label="Total Money Spent (ETB)"
                    variant="outlined"
                    size="small"
                    fullWidth
                    InputProps={{ inputProps: { min: 0, step: "0.01" } }}
                />
                
                <Box sx={{ 
                    display: 'flex',
                    gap: 2,
                    gridColumn: isMobile ? '1' : '1 / span 2'
                }}>
                    <Button 
                        type="submit"
                        variant="contained" 
                        fullWidth
                        size="large"
                    >
                        {editId ? 'Update' : 'Submit'}
                    </Button>
                    <Button 
                        variant="outlined" 
                        component={Link} 
                        to="/Where"
                        fullWidth
                        size="large"
                    >
                        ለመመለስ / To Return
                    </Button>
                </Box>
            </Box>

            <TableContainer component={Paper} sx={{ maxHeight: '60vh', overflow: 'auto' }}>
                <Table stickyHeader size={isMobile ? 'small' : 'medium'}>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold' }}>Date</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Type</TableCell>
                            {!isMobile && (
                                <TableCell sx={{ fontWeight: 'bold' }}>Purchaser</TableCell>
                            )}
                            <TableCell sx={{ fontWeight: 'bold' }}>Amount (ETB)</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tableData.map((row) => (
                            <TableRow key={row._id}>
                                <TableCell>{formatDate(row.dateOfArrival)}</TableCell>
                                <TableCell>
                                    {isMobile ? 
                                        `${row.typeOfThing.substring(0, 15)}${row.typeOfThing.length > 15 ? '...' : ''}` : 
                                        row.typeOfThing
                                    }
                                </TableCell>
                                {!isMobile && (
                                    <TableCell>{row.nameOfPurchaser}</TableCell>
                                )}
                                <TableCell>{row.totalMoneySpent.toFixed(2)}</TableCell>
                                <TableCell>
                                    <IconButton 
                                        color="primary"
                                        onClick={() => handleEdit(row)}
                                        size="small"
                                    >
                                        <Edit fontSize={isMobile ? 'small' : 'medium'} />
                                    </IconButton>
                                    <IconButton 
                                        color="error"
                                        onClick={() => handleDelete(row._id)}
                                        size="small"
                                    >
                                        <Delete fontSize={isMobile ? 'small' : 'medium'} />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

export default Purchasing;