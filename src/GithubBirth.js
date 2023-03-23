import React, { useState, useEffect } from 'react';
import { API } from 'aws-amplify';

export const GithubBirth = () => {
    const [born, updateBorn] = useState([]);

    const fetchBorn = async() => {
        const data = await API.get('lab5api', '/born');
        updateBorn(data.born);
    }

    useEffect(() => {
        fetchBorn()
    }, []);
   
    return (
        <>
            <h3> Work !!</h3>
            {born.map(x => (
                <h3>Hello, {x.name} </h3>
            ))}
        </>
    );
}