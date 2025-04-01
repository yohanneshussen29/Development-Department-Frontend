import React from "react";
import './../Maping/Where.css';

const SalesTable = ({ tableData, handleEdit, handleDelete }) => {
    return (
        <div className="table-container" style={{
            height: '400px', // Fixed height container
            width: '100%',
            overflow: 'hidden',
            position: 'relative'
        }}>
            <div style={{
                height: '100%',
                width: '100%',
                overflow: 'auto'
            }}>
                <table className="custom-table" style={{
                    width: 'max-content',
                    minWidth: '100%'
                }}>
                    <thead style={{
                        position: 'sticky',
                        top: 0,
                        zIndex: 1
                    }}>
                        <tr>
                            <th>No</th>
                            <th>ጠዋት / ማታ</th>
                            <th>ቀን / Date</th>
                            <th>የሸጠው አባል ስም</th>
                            <th>ያስገባው ገንዘብ</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.map((row, index) => (
                            <tr key={index} className="custom-row">
                                <td className="custom-cell">{index + 1}</td>
                                <td className="custom-cell">{row.timeOfDay}</td>
                                <td className="custom-cell">{row.date}</td>
                                <td className="custom-cell">{row.sellerName}</td>
                                <td className="custom-cell">{row.amount}</td>
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
        </div>
    );
};

export default SalesTable;