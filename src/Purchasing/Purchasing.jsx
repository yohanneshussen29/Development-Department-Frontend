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

  useEffect(() => {
    fetchPurchases();
  }, []);

  const fetchPurchases = async () => {
    try {
      const response = await fetch("https://development-department.onrender.com/api/purchases");
      if (!response.ok) throw new Error("Failed to fetch");
      const data = await response.json();
      setTableData(data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
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

    const method = editId ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(purchaseData)
      });

      if (response.ok) {
        resetForm();
        await fetchPurchases();
      }
    } catch (error) {
      console.error("Submit error:", error);
    }
  };

  const handleEdit = (purchase) => {
    setFormData({
      date: purchase.dateOfArrival.split("T")[0],
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
        method: "DELETE"
      });
      await fetchPurchases();
    } catch (error) {
      console.error("Delete error:", error);
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
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <Box sx={{ p: { xs: 1, md: 3 }, maxWidth: "100%", overflowX: "auto", marginLeft: "80px" }}>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
        የመጡ እቃዎች / Goods Received
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          mb: 3,
          display: "grid",
          gap: 2,
          gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" }
        }}
      >
        <TextField
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          label="Date of Arrival / እቃው የመጣበት ቀን"
          variant="outlined"
          size="small"
          fullWidth
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          name="typeOfThing"
          value={formData.typeOfThing}
          onChange={handleChange}
          label="Type of item / የእቃው አይነት"
          variant="outlined"
          size="small"
          fullWidth
        />
        <TextField
          name="nameOfPurchaser"
          value={formData.nameOfPurchaser}
          onChange={handleChange}
          label="Name of Purchaser / የገዢ ስም"
          variant="outlined"
          size="small"
          fullWidth
        />
        <TextField
          type="number"
          name="totalMoney"
          value={formData.totalMoney}
          onChange={handleChange}
          label="Total Money Spent / ጠቅላላ ወጪ"
          variant="outlined"
          size="small"
          fullWidth
          InputProps={{ inputProps: { min: 0, step: "0.01" } }}
        />
        <Button variant="contained" type="submit">
          {editId ? "Update" : "Submit / መዝግብ"}
        </Button>
        <Link to="/Where">
          <Button variant="outlined">ለመመለስ / To Return</Button>
        </Link>
      </Box>

      <TableContainer component={Paper} sx={{ maxHeight: "60vh", overflow: "auto" }}>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Date / ቀን</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Type / የእቃው አይነት</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Purchaser / ገዢ</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Amount / በወጪ</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((row) => (
              <TableRow key={row._id}>
                <TableCell>{formatDate(row.dateOfArrival)}</TableCell>
                <TableCell>
                  {row.typeOfThing.length > 20
                    ? row.typeOfThing.substring(0, 20) + "..."
                    : row.typeOfThing}
                </TableCell>
                <TableCell>{row.nameOfPurchaser}</TableCell>
                <TableCell>{row.totalMoneySpent.toFixed(2)}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleEdit(row)} size="small">
                    <Edit />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(row._id)} size="small">
                    <Delete />
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
