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
        birth.map((born, index) => (
            <div key={index}>
                <h3> {born.name} </h3>
            </div>
        ))
    )
}