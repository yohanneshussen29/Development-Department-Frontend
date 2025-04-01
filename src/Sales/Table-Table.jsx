import React from "react";

const SalesTable = ({ tableData, handleEdit, handleDelete }) => {
    return (
        <div className="table-container" style={{
            height: '400px',
            width: '100%',
            overflow: 'hidden',
            border: '1px solid #ddd',
            borderRadius: '4px',
            position: 'relative'
        }}>
            <div style={{
                height: '100%',
                width: '100%',
                overflow: 'auto'
            }}>
                <table className="custom-table" style={{
                    width: 'max-content',
                    minWidth: '100%',
                    borderCollapse: 'collapse'
                }}>
                    <thead style={{
                        position: 'sticky',
                        top: 0,
                        backgroundColor: 'rgb(51, 150, 145)',
                        color: 'white',
                        zIndex: 1
                    }}>
                        <tr>
                            <th style={{ padding: '12px 15px', textAlign: 'center' }}>No</th>
                            <th style={{ padding: '12px 15px', textAlign: 'center' }}>ጠዋት / ማታ</th>
                            <th style={{ padding: '12px 15px', textAlign: 'center' }}>ቀን / Date</th>
                            <th style={{ padding: '12px 15px', textAlign: 'center' }}>የሰጠው አአባል ስም</th>
                            <th style={{ padding: '12px 15px', textAlign: 'center' }}>የሸጠው አባል ስም</th>
                            <th style={{ padding: '12px 15px', textAlign: 'center' }}>ያስገባው ገንዘብ</th>
                            <th style={{ padding: '12px 15px', textAlign: 'center' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.map((row, index) => (
                            <tr key={index} className="custom-row" style={{
                                backgroundColor: index % 2 === 0 ? '#fff' : '#f9f9f9'
                            }}>
                                <td className="custom-cell" style={{
                                    padding: '12px 15px',
                                    textAlign: 'center',
                                    border: '1px solid #ddd'
                                }}>{index + 1}</td>
                                <td className="custom-cell" style={{
                                    padding: '12px 15px',
                                    textAlign: 'center',
                                    border: '1px solid #ddd'
                                }}>{row.timeOfDay}</td>
                                <td className="custom-cell" style={{
                                    padding: '12px 15px',
                                    textAlign: 'center',
                                    border: '1px solid #ddd'
                                }}>{row.date}</td>
                                <td className="custom-cell" style={{
                                    padding: '12px 15px',
                                    textAlign: 'center',
                                    border: '1px solid #ddd'
                                }}>{row.givenBy}</td>
                                <td className="custom-cell" style={{
                                    padding: '12px 15px',
                                    textAlign: 'center',
                                    border: '1px solid #ddd'
                                }}>{row.soldBy}</td>
                                <td className="custom-cell" style={{
                                    padding: '12px 15px',
                                    textAlign: 'center',
                                    border: '1px solid #ddd'
                                }}>{row.amount}</td>
                                <td className="custom-cell" style={{
                                    padding: '12px 15px',
                                    textAlign: 'center',
                                    border: '1px solid #ddd'
                                }}>
                                    <button onClick={() => handleEdit(index)} className="icon-button" style={{
                                        background: '#6a0dad',
                                        border: 'none',
                                        cursor: 'pointer',
                                        padding: '5px',
                                        margin: '0 3px'
                                    }}>
                                        <span className="material-icons">edit</span>
                                    </button>
                                    <button onClick={() => handleDelete(index)} className="icon-button" style={{
                                        background: '#6a0dad',
                                        border: 'none',
                                        cursor: 'pointer',
                                        padding: '5px',
                                        margin: '0 3px'
                                    }}>
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