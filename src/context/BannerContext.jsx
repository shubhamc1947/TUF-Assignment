import React, { createContext, useState } from 'react';
import axios from 'axios';

export const BannerContext = createContext();

export const BannerProvider = ({ children }) => {
    const [banner, setBanner] = useState({
        description: '',
        timer: 0,
        link: '',
        isVisible: true,
    });

    const updateBanner = (newBanner) => {
        axios.post('http://localhost:5000/api/banner', newBanner)
            .then(response => {
                setBanner(newBanner);
                alert(response.data.message);
            });
    };

    return (
        <BannerContext.Provider value={{ banner, updateBanner }}>
            {children}
        </BannerContext.Provider>
    );
};
