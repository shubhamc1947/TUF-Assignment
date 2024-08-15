import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Banner.scss';

const Banner = () => {
    const [banner, setBanner] = useState(null);
    const [timeRemaining, setTimeRemaining] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        axios.get('http://localhost:5000/api/banner')
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

    if (!banner || !banner.isVisible) return null;

    // alert(banner.link)
    return (
        <div className="banner">
            <p>{banner.description}</p>
            <div className="timebox">
                <div className="time-element">
                    <span className="time-value">{timeRemaining.days}</span>
                    <span className="time-label">D</span>
                </div>
                <div className="time-element">
                    <span className="time-value">{timeRemaining.hours}</span>
                    <span className="time-label">H</span>
                </div>
                <div className="time-element">
                    <span className="time-value">{timeRemaining.minutes}</span>
                    <span className="time-label">M</span>
                </div>
                <div className="time-element">
                    <span className="time-value">{timeRemaining.seconds}</span>
                    <span className="time-label">S</span>
                </div>
            </div>

            <a href={banner.link} target="_blank">Read More</a>
        </div>
    );
};

export default Banner;
