import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from "./Home";
import Where from './Maping/Where';
import Sales from './Sales/Sales';
import TableSales from './Sales/Table-Sales';
import ShopSales from './Sales/Shop-Sales';
import Purchasing from './Purchasing/Purchasing';
import Login from "./Login/Login";
import Nathan from "./Nathan/Nathan";
import Travel from "./Travel/Travel";

function App() {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/home" element={isLoggedIn ? <Home /> : <Navigate to="/" />} />
                <Route path="/where" element={isLoggedIn ? <Where /> : <Navigate to="/" />} />
                <Route path="/sales" element={isLoggedIn ? <Sales /> : <Navigate to="/" />} />
                <Route path="/table-sales" element={isLoggedIn ? <TableSales /> : <Navigate to="/" />} />
                <Route path="/shop-sales" element={isLoggedIn ? <ShopSales /> : <Navigate to="/" />} />
                <Route path="/purchasing" element={isLoggedIn ? <Purchasing /> : <Navigate to="/" />} />
                <Route path="/nathan" element={isLoggedIn ? <Nathan /> : <Navigate to="/" />} />
                <Route path="/travel" element={isLoggedIn ? <Travel /> : <Navigate to="/" />} />
            </Routes>
        </Router>
    );
}

export default App;