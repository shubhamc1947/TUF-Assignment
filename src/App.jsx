import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { BannerProvider } from './context/BannerContext';
import Dashboard from './components/Dashboard/Dashboard';
import HomePage from './components/HomePage/HomePage';
import Login from './components/Login/Login';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import './App.css';
import { ToastContainer} from 'react-toastify';
const App = () => {
    return (
        <div className='app'>

            <Router>
                <BannerProvider>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
                    </Routes>
                </BannerProvider>
            </Router>
            <ToastContainer />
        </div>
    );
};

export default App;
