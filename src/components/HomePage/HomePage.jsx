import React from 'react';
import Banner from '../Banner/Banner';
import { motion } from 'framer-motion';
import './HomePage.scss';
import Navigation from '../Navigation/Navigation';

const HomePage = () => {
    return (
        <motion.div

            initial={{ opacity: 0, y: -50,scale:1 }} 
            animate={{ opacity: 1, y: 0,scale:1 }}   
            transition={{ duration: 0.8, ease: "linear" }} 
            // whileTap={{ scale: 0.95 }} 
            // whileHover={{scale:1.02}}
            className="homepage"
        >
            <Navigation/>
            <div>
                <h1>Welcome to the Homepage...</h1>
                <Banner />
            </div>
        </motion.div>
    );
};

export default HomePage;
