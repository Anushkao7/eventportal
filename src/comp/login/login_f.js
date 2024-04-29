// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';






// const Login = () => {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const navigate = useNavigate();
//     const users = [
//         { username: 'arshad', password: '1234', role: 'teacher' },
//         { username: 'rohit', password: 'super', role: 'teacher' },
//         { username: 'goku', password: '1234', role: 'student' },
//         { username: 'gohan', password: 'pan', role: 'student' },
//         { username: 'naruto', password: '1234', role: 'student' },
//     ];
//     const handleSubmit = (e) => {
//     e.preventDefault();
//     const user = users.find(user => user.username === username && user.password === password);
//     if (user) {
//     localStorage.setItem('user', JSON.stringify(user));
//     navigate('/dashboard');
//     } else {
//     alert('Invalid username or password');
//     }
//     };
//     return (
//     <div>
//         <h2>Login</h2>
//         <form onSubmit={handleSubmit}>
//         <div>
//         <label>Username:</label>
//         <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
//         </div>
//         <div>
//         <label>Password:</label>
//         <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
//         </div>
//         <button type="submit">Login</button>
//     </form>
//     </div>
//     );
// };


// export default Login;
import './login.css';
import { FaUser, FaLock } from "react-icons/fa";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import QuestionGenerator from './login_in'
const Login_form = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const users = [
        { username: 'arshad', password: '1234', role: 'teacher' },
        { username: 'rohit', password: 'super', role: 'teacher' },
        { username: 'anushka', password: '1234', role: 'student' },
        { username: 'gohan', password: 'pan', role: 'student' },
        { username: 'naruto', password: '1234', role: 'student' },
    ];
    const handleSubmit = (e) => {
        e.preventDefault();
        const user = users.find(user => user.username === username && user.password === password);
        if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        navigate('/dashboard');
        } else {
        alert('Invalid username or password');
        }
    };
    return (
    <div className='wrapper' style={{width:'100%', alignItems:'center',justifyContent:'center'}}>
        <form onSubmit={handleSubmit}>
            <h1>Login</h1>
            <div className="input-box">
                <input type='text' placeholder='Username'value={username} onChange={(e) =>  setUsername(e.target.value)} required />
                
            <FaUser className='icon' />
            </div>
            <div className="input-box">
                <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required />
                <FaLock className='icon' />
            </div>
            <button type="submit">Login</button>
            {/* <QuestionGenerator/> */}
        </form>
    </div>
    )
}

export default Login_form