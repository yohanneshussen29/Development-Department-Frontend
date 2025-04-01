import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Nathan = () => {
    const [entries, setEntries] = useState([]);
    const [inputText, setInputText] = useState('');
    const [editId, setEditId] = useState(null);
    const [editText, setEditText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchEntries();
    }, []);

    const fetchEntries = async () => {
        setIsLoading(true);
        try {
            const response = await fetch("https://development-department.onrender.com/api/nathan");
            if (!response.ok) throw new Error('Failed to fetch entries');
            setEntries(await response.json());
            setError('');
        } catch (error) {
            console.error('Fetch error:', error);
            setError('Failed to load entries. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!inputText.trim()) {
            setError('Please enter some text');
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch("https://development-department.onrender.com/api/nathan", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: inputText }),
            });
            
            if (!response.ok) throw new Error('Failed to save entry');
            
            setInputText('');
            setError('');
            fetchEntries();
        } catch (error) {
            console.error('Submit error:', error);
            setError('Failed to save entry. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSave = async (id) => {
        if (!editText.trim()) {
            setError('Please enter some text');
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch(`https://development-department.onrender.com/api/nathan/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: editText }),
            });

            if (!response.ok) throw new Error('Failed to update entry');
            
            setEditId(null);
            setError('');
            fetchEntries();
        } catch (error) {
            console.error('Update error:', error);
            setError('Failed to update entry. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this entry?')) return;

        setIsLoading(true);
        try {
            const response = await fetch(`https://development-department.onrender.com/api/nathan/${id}`, { 
                method: 'DELETE' 
            });

            if (!response.ok) throw new Error('Failed to delete entry');
            
            setError('');
            fetchEntries();
        } catch (error) {
            console.error('Delete error:', error);
            setError('Failed to delete entry. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{
            maxWidth: '100%',
            margin: '0 auto',
            padding: '20px',
            overflow: 'hidden',
            marginLeft: '270px'
        }}>
            <form onSubmit={handleSubmit} style={{
                marginBottom: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                minWidth: '600px' // Ensures form doesn't get too narrow
            }}>
                <div style={{
                    display: 'flex',
                    gap: '10px',
                    width: '100%',
                    overflowX: 'auto',
                    paddingBottom: '10px'
                }}>
                    <textarea
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="የናታኔም ክፍል ስራዎችን ዘርዝር"
                        style={{ 
                            resize: 'vertical',
                            flex: '1',
                            width: '10px',
                        }}
                        disabled={isLoading}
                    />
                </div>
                <div style={{ 
                    display: 'flex', 
                    gap: '10px',
                    overflowX: 'auto',
                    paddingBottom: '10px'
                }}>
                    <br />
                    <button 
                        type="submit" 
                        disabled={isLoading}
                        style={{
                            backgroundColor: '#6a0dad',
                            color: 'white',
                            border: 'none',
                            cursor: 'pointer',
                            whiteSpace: 'nowrap',
                            height: '40px',

                        }}
                    >
                        {isLoading ? 'Submitting...' : 'Submit'}
                    </button>
                    <Link to="/Where" style={{ textDecoration: 'none' }}>
                        <button
                            style={{
                                marginTop: '-15px',
                                backgroundColor: '#6a0dad',
                                color: 'white',
                                border: 'none',
                                cursor: 'pointer',
                                whiteSpace: 'nowrap',
                                height: '40px',
                            }}
                        >
                            ለመመለስ / To Return
                        </button>
                    </Link>
                </div>
            </form>

            {error && (
                <div style={{ 
                    color: 'red', 
                    marginBottom: '15px',
                    padding: '10px',
                    backgroundColor: '#ffebee',
                    borderRadius: '4px',
                    overflowX: 'auto',
                    minWidth: '300px'
                }}>
                    {error}
                </div>
            )}

            <h3 style={{ marginBottom: '15px' }}>የናታኔም ክፍል ስራዎች ዝርዝር</h3>
            
            <div style={{ 
                maxHeight: '400px',
                overflowY: 'auto',
                overflowX: 'auto',
                border: '1px solid #ddd',
                borderRadius: '4px',
                padding: '10px',
                minWidth: '600px' // Ensures table doesn't get too narrow
            }}>
                {isLoading && entries.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '20px' }}>Loading...</div>
                ) : entries.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '20px' }}>No entries found</div>
                ) : (
                    <div style={{ minWidth: '100%', display: 'inline-block' }}>
                        {entries.map((entry) => (
                            <div 
                                key={entry._id} 
                                style={{ 
                                    marginBottom: '15px',
                                    padding: '15px',
                                    backgroundColor: '#f9f9f9',
                                    borderRadius: '4px',
                                    border: '1px solid #eee',
                                    minWidth: '500px' // Ensures entry doesn't get too narrow
                                }}
                            >
                                {editId === entry._id ? (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', minWidth: '100%' }}>
                                        <input
                                            type="text"
                                            value={editText}
                                            onChange={(e) => setEditText(e.target.value)}
                                            style={{
                                                width: '100%',
                                                padding: '8px',
                                                fontSize: '16px',
                                                minWidth: '300px'
                                            }}
                                            disabled={isLoading}
                                        />
                                        <div style={{ display: 'flex', gap: '10px', overflowX: 'auto' }}>
                                            <button 
                                                onClick={() => handleSave(entry._id)}
                                                disabled={isLoading}
                                                style={{
                                                    padding: '6px 12px',
                                                    backgroundColor: '#2196F3',
                                                    color: 'white',
                                                    border: 'none',
                                                    borderRadius: '4px',
                                                    cursor: 'pointer',
                                                    whiteSpace: 'nowrap'
                                                }}
                                            >
                                                {isLoading ? 'Saving...' : 'Save'}
                                            </button>
                                            <button 
                                                onClick={() => {
                                                    setEditId(null);
                                                    setError('');
                                                }}
                                                style={{
                                                    padding: '6px 12px',
                                                    backgroundColor: '#9E9E9E',
                                                    color: 'white',
                                                    border: 'none',
                                                    borderRadius: '4px',
                                                    cursor: 'pointer',
                                                    whiteSpace: 'nowrap'
                                                }}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <p style={{ 
                                            marginBottom: '10px',
                                            fontSize: '16px',
                                            wordBreak: 'break-word',
                                            minWidth: '300px'
                                        }}>
                                            {entry.text}
                                        </p>
                                        <div style={{ display: 'flex', gap: '10px', overflowX: 'auto' }}>
                                            <button 
                                                onClick={() => { 
                                                    setEditId(entry._id); 
                                                    setEditText(entry.text); 
                                                }}
                                                style={{
                                                    padding: '6px 12px',
                                                    backgroundColor: '#6a0dad',
                                                    color: 'white',
                                                    border: 'none',
                                                    borderRadius: '4px',
                                                    cursor: 'pointer',
                                                    whiteSpace: 'nowrap'
                                                }}
                                            >
                                                Edit
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(entry._id)}
                                                disabled={isLoading}
                                                style={{
                                                    padding: '6px 12px',
                                                    backgroundColor: '#6a0dad',
                                                    color: 'white',
                                                    border: 'none',
                                                    borderRadius: '4px',
                                                    cursor: 'pointer',
                                                    whiteSpace: 'nowrap'
                                                }}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Nathan;