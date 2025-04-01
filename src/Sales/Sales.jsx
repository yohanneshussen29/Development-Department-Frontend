import React from 'react';
import { Link } from 'react-router-dom';
import './../Maping/Where';

function Sales() {
    return (
        <div className="about-container">
            <h3>እንኳን ወደ ሽያጭ ንዑስ ክፍል መጡ ። <br /> Welcome To Sale Subdivision department .</h3>
            <div className="button-container">
                <Link to="/Table-Sales">
                    <button className="nav-button">የጠረጴዛ ሽያጭ <br /> Table sales</button>
                </Link>
                <Link to="/Shop-Sales">
                    <button className="nav-button">የሱቅ ሽያጭ <br /> Shop sales</button>
                </Link>

            </div>
            <br />
            <br />
            <Link to="/Where">
                <button className="nav-button">ለመመለስ / To Return</button>
            </Link>
        </div>
    );
}

export default Sales;