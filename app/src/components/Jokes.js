import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import axiosWithAuth from '../utils/axiosWithAuth.js';

const Jokes = (props) => {
    const [jokes, setJokes] = useState([]);

    const getJokes = () => {
        axios.get('http://localhost:8000/api/jokes')
            .then(res => setJokes(res.data))
            .catch(err => console.log(err.response));
    }

    useEffect(() => {
        getJokes();
    })

    return (
        <div>
            <h2>Jokes</h2>
            {jokes.map(joke => 
            <>
               <p>{joke.joke}</p>
            </>
            )}
        </div>
    )
}

export default Jokes;