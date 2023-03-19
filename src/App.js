import './App.css';
import React, { useState, useEffect } from 'react';
import { API } from 'aws-amplify';
import Amplify from 'aws-amplify';
import config from './aws-exports';
Amplify.configure(config);

const App = () => {
  // creates coins variable and sets as empty array
  const [coins, updateCoins] = useState([]);

  // define func to all API
  async function fetchCoins() {
    const data = await API.get('lab5api', '/coins');
    updateCoins(data.coins);
  };

  // call fetch func on component load ONCE
  useEffect(() => {
    fetchCoins();
  }, []);
  // ^^ empty array added to restrict code to run just once, the first time component loads
  // set up the display...
  return (
    <div className="App">
      {coins.map((coin, index) => (
        <div key={index}>
          <h2>{coin.name} - {coin.symbol}</h2>
          <h5>${coin.price_usd}</h5>
        </div>
      ))}
    </div>
  );
}

export default App;
