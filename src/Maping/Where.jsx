import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './../Maping/Where.css';

function Where() {
  const navigate = useNavigate();

  // Check if the user is logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      navigate('/'); // Redirect to login page if not logged in
    }
  }, [navigate]);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn'); // Clear login status
    navigate('/'); // Redirect to login page
  };

  return (
    <div className="about-container">
      <h3>ወዴት ንዑስ ክፍል መሄድ ይፈልጋሉ ? / Which Subdivision Department Do You Want To Go To ?</h3>
      <div className="button-container">
        <Link to="/Sales">
          <button className="nav-button">ሽያጭ ክፍል <br /> Sales Department</button>
        </Link>
        <Link to="/Purchasing">
          <button className="nav-button">ግዢ ክፍል <br /> Purchasing Department</button>
        </Link>
        <Link to="/Nathan">
          <button className="nav-button">ናታኔም ክፍል <br /> Nathan's Department</button>
        </Link>
        <Link to="/Travel">
          <button className="nav-button">ጉዞ አዘጋጅ ክፍል <br /> Travel preparation Department</button>
        </Link>
        <button onClick={handleLogout} className="nav-button">Logout</button>
      </div>
    </div>
  );
}

export default Where;