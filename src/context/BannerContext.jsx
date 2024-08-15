import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const BannerContext = createContext();

export const BannerProvider = ({ children }) => {
    const [banner, setBanner] = useState(null);
    const [timeRemaining, setTimeRemaining] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/banner`)
            .then(response => {
                setBanner(response.data);
                calculateTimeRemaining(response.data.targetDate);
            });
    }, []);

    useEffect(() => {
        if (banner && banner.targetDate && banner.isVisible) {
            const interval = setInterval(() => {
                calculateTimeRemaining(banner.targetDate);
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [banner]);

    const calculateTimeRemaining = (targetDate) => {
        const now = new Date();
        const endDate = new Date(targetDate);
        const total = endDate - now;

        if (total <= 0) {
            
            setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            return;
        }

        const days = Math.floor(total / (1000 * 60 * 60 * 24));
        const hours = Math.floor((total % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((total % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((total % (1000 * 60)) / 1000);

        setTimeRemaining({ days, hours, minutes, seconds });
    };


    return (
        <BannerContext.Provider value={{ banner, timeRemaining }}>
            {children}
        </BannerContext.Provider>
    );
};
