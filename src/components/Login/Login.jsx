
// components/Login/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.scss';
import Navigation from '../Navigation/Navigation';
import {motion} from 'framer-motion'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.scss';

const Login = () => {
    const [userId, setUserId] = useState('admin');
    const [password, setPassword] = useState('password');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (userId === 'admin' && password === 'password') {
            toast.success('Successfully logged in!');
            localStorage.setItem('isAuthenticated', true);
            setTimeout(() => {
                navigate('/dashboard');
            }, 1000); 
        } else {
            toast.error('Wrong credentials, please try again!');
        }
    };
    
    

    return (
        <motion.div 
            initial={{ opacity: 0, y: -50,scale:1 }} 
            animate={{ opacity: 1, y: 0,scale:1 }}   
            transition={{ duration: 0.8, ease: "linear" }} 
            className="login-container"
        >
            <Navigation/>
            <motion.div className="login-box">
                <h2 className="login-title">Login</h2>
                <form onSubmit={handleSubmit} className="login-form">
                    <input 
                        type="text" 
                        placeholder="User ID" 
                        value={userId} 
                        onChange={(e) => setUserId(e.target.value)} 
                        className="login-input"
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        className="login-input"
                    />
                    <button type="submit" className="login-button">Login</button>
                </form>
            </motion.div>
        </motion.div>
    );
};

export default Login;
