import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Home() {
    const [showChangePassword, setShowChangePassword] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChangePassword = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setError("Passwords don't match");
            return;
        }

        try {
            const response = await fetch('https://development-department.onrender.com/api/change-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    username: "DGSESMSMFBDD", 
                    currentPassword, 
                    newPassword 
                }),
            });

            const data = await response.json();
            if (response.ok) {
                setError('');
                setSuccess('Password changed!');
                setCurrentPassword('');
                setNewPassword('');
                setConfirmPassword('');
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError('Connection error');
        }
    };


    return (
        <>
            <div className='container center-container'>
                <div className='one-two-div'>
                    <img src="./public/one.png" alt="" className='one' />
                    <img src="./public/two.png" alt="" className='two' />
                </div>
                <h2>እንኳን ወደ ደብረ ገነት ቅዱስ እስጢፋኖስ  ቅዱስ ሚካኤል ወቅድስት ማርያም ቤ/ክ  ፈለገ ብርሀን ሰንበት ት/ቤት የልማት ክፍል ፋይል ማደራጃ በሰላም መጡ ።</h2>
                <Link to="/where">
                    <button className="center-button">Let's Start / ይግቡ</button>
                </Link>
                <h2>Welcome to Debre Genet St. Stephen's St. Michael's and St. Mary's Church, <u>Felege Birhan</u> Sunday School, Development Department, File Organization, and Peacefully.</h2>
            </div>
            <br />
            {/* Change Password Section */}
            <button 
                onClick={() => setShowChangePassword(!showChangePassword)}
                className="password-toggle"
            >
                {showChangePassword ? 'Hide' : 'Change Password'}
            </button>

            {showChangePassword && (
                <div className="password-form">
                    <h3>Change Password</h3>
                    <form onSubmit={handleChangePassword}>
                        <input
                            type="password"
                            placeholder="Current Password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="New Password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Confirm New Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                        <button type="submit">Submit</button>
                    </form>
                    {error && <p className="error">{error}</p>}
                    {success && <p className="success">{success}</p>}
                </div>
            )}
        </>
    );
}

export default Home;