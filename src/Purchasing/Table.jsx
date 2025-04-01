import React from "react";
import "./Table.css";

const SalesTable = ({ tableData, handleEdit, handleDelete }) => {
    return (
        <div className="table-container">
            <table className="custom-table">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>የመጡበት ቀን</th>
                        <th>ጠቅላላ ያስወጡት ብር</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((row, index) => (
                        <tr key={index} className="custom-row">
                            <td className="custom-cell">{index + 1}</td>
                            <td className="custom-cell">{row.dateOfArrival}</td>
                            <td className="custom-cell">{row.totalMoneySpent}</td>
                            <td className="custom-cell">
                                <button onClick={() => handleEdit(index)} className="icon-button">
                                    <span className="material-icons">edit</span>
                                </button>
                                <button onClick={() => handleDelete(index)} className="icon-button">
                                    <span className="material-icons">delete</span> 
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SalesTable;