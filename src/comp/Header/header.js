import React from 'react';
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { IoIosNotifications } from "react-icons/io";
import './style.css';

const Header = ({ toggleTheme }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  const handleRedirect = () => {
    if (user) {
      if (user.role === 'teacher') {
        navigate('/eventlist');
      } else if (user.role === 'student') {
        navigate('/feedback');
      }
    }
  };
  
  return (
    <header>
    <div className='head'>
      <h1 className='head_text'>SIES Event Management </h1>
      <button className='button_head'>
    <FaUserCircle  size={50} style={{color:'white'}}/>
    <div className='hover_head'>
    <div className='contant_button'>
    <div class="login-card">

    {user ? (
        <div>
          <p>Welcome, {user.username}!</p>
          <p>Your role: {user.role}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <p>Welcome, Guest!</p>
          <button class="normal-signin" onClick={() => navigate('/login')}>Login</button>
        </div>
      )}
      </div>
      </div>
      </div>
      </button>
      <IoIosNotifications onClick={handleRedirect} size={50} style={{color:'white', margin:'5px' , marginRight:'20px'}}/>
      <div className="toggle-switch">
        <label className="switch">
          <input type="checkbox" onClick={toggleTheme} />
          <span className="slider"></span>
        </label>
      </div>
      </div>

    </header>
  );
};

export default Header;
