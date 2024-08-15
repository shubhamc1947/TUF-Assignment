// Banner.js
import React, { useContext } from 'react';
import { BannerContext } from '../../context/BannerContext';
import './Banner.scss';

const Banner = () => {
    const { banner, timeRemaining } = useContext(BannerContext);

    if (!banner || !banner.isVisible) return null;

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

            <a href={banner.link} target="_blank" rel="noopener noreferrer">Read More</a>
        </div>
    );
};

export default Banner;
