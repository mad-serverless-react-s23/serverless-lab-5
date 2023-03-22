import React, { useState, useEffect } from 'react';
import { API } from 'aws-amplify';

export const GithubBirth = () => {
    const [birth, updateBirth] = useState([]);

    const fetchBirth = async() => {
        const data = await API.get('lab5api', '/born');
        updateBirth(data.birth);
    }

    useEffect(() => {
        fetchBirth()
    }, []);
    
    return (
    <h3>This message might work, let's see...</h3>
)}