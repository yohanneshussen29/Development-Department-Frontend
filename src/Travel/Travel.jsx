import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Travel = () => {
    const [entries, setEntries] = useState([]);
    const [inputText, setInputText] = useState('');
    const [editId, setEditId] = useState(null);
    const [editText, setEditText] = useState('');

    // Fetch travel entries when component mounts
    useEffect(() => {
        fetchEntries();
    }, []);

    const fetchEntries = async () => {
        try {
            const response = await fetch("https://development-department.onrender.com/api/travel");
            if (!response.ok) throw new Error('Failed to fetch entries');
            setEntries(await response.json());
        } catch (error) {
            console.error('Fetch error:', error);
            alert("Error fetching entries. Please try again.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!inputText.trim()) {
            alert("Text cannot be empty!");
            return;
        }

        try {
            const response = await fetch("https://development-department.onrender.com/api/travel", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: inputText }),
            });

            if (!response.ok) throw new Error("Failed to add entry.");

            setInputText('');
            fetchEntries(); // Refresh entries after submission
        } catch (error) {
            console.error('Submit error:', error);
            alert("Error adding entry. Please try again.");
        }
    };

    const handleSave = async (id) => {
        if (!editText.trim()) {
            alert("Text cannot be empty!");
            return;
        }

        const isConfirmed = window.confirm("Are you sure you want to save the changes?");
        if (!isConfirmed) return;

        try {
            const response = await fetch(`https://development-department.onrender.com/api/travel/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: editText }),
            });

            if (!response.ok) throw new Error("Failed to update entry.");

            setEditId(null);
            setEditText('');
            fetchEntries();
        } catch (error) {
            console.error('Update error:', error);
            alert("Error updating entry. Please try again.");
        }
    };

    const handleDelete = async (id) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this entry?");
        if (!isConfirmed) return;

        try {
            const response = await fetch(`https://development-department.onrender.com/api/travel/${id}`, { method: 'DELETE' });

            if (!response.ok) throw new Error("Failed to delete entry.");

            setEntries((prevEntries) => prevEntries.filter(entry => entry._id !== id));
            alert("Entry deleted successfully!");
        } catch (error) {
            console.error('Delete error:', error);
            alert("Error deleting entry. Please try again.");
        }
    };

    return (
        <div style={{ 
            maxWidth: '100%', 
            overflowX: 'auto',
            padding: '10px'
        }}>
            <form onSubmit={handleSubmit} style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                minWidth: '300px',
                marginBottom: '20px'
            }}>
                <br />
                <textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="የጉዞ አዘጋጅ ክፍል ስራዎችን ዘርዝር"
                    style={{ 
                        width: '100%', 
                        padding: '10px',
                        boxSizing: 'border-box'
                    }}
                />
                <div style={{
                    display: 'flex',
                    gap: '10px',
                    flexWrap: 'wrap',
                    whiteSpace: 'nowrap'
                }}>
                    <button type="submit" style={{ justifyContent: 'center', alignItems: 'center', alignContent: 'center', width:'160px', height: '42px', marginTop: '9px' }}>Submit / መዝግብ</button>
                    
                    <Link to="/Where">
                        <button style={{ justifyContent: 'center', alignItems: 'center', alignContent: 'center', marginLeft: '55px' }}>ለመመለስ / To Return</button>
                    </Link>
                </div>
            </form>
            
            <h3 style={{ marginBottom: '15px' }}>የጉዞ አዘጋጅ ክፍል ስራዎች ዝርዝር</h3>
            <div style={{ 
                maxHeight: '400px', 
                overflowY: 'auto',
                border: '1px solid #ddd',
                borderRadius: '4px',
                padding: '10px'
            }}>
                {entries.map((entry) => (
                    <div key={entry._id} style={{ 
                        marginBottom: '15px',
                        padding: '10px',
                        borderBottom: '1px solid #eee'
                    }}>
                        {editId === entry._id ? (
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '10px'
                            }}>
                                <input
                                    type="text"
                                    value={editText}
                                    onChange={(e) => setEditText(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '8px',
                                        boxSizing: 'border-box'
                                    }}
                                />
                                <div style={{
                                    display: 'flex',
                                    gap: '10px'
                                }}>
                                    <button 
                                        onClick={() => handleSave(entry._id)}
                                        style={{ padding: '6px 12px' }}
                                    >
                                        Save
                                    </button>
                                    <button 
                                        onClick={() => setEditId(null)}
                                        style={{ padding: '6px 12px' }}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <p style={{ 
                                    wordBreak: 'break-word',
                                    marginBottom: '10px'
                                }}>
                                    {entry.text}
                                </p>
                                <div style={{
                                    display: 'flex',
                                    gap: '10px'
                                }}>
                                    <button 
                                        onClick={() => { setEditId(entry._id); setEditText(entry.text); }}
                                        style={{ padding: '6px 12px' }}
                                    >
                                        Edit
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(entry._id)}
                                        style={{ padding: '6px 12px' }}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Travel;