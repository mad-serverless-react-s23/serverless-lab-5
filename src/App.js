import './App.css';
import React, { useState, useEffect } from 'react';
import { API } from 'aws-amplify';

const App = () => {
  // creates coins variable and sets as empty array
  const [coins, updateCoins] = useState([]);

  // function for input
  const [input, updateInput] = useState({ limit: 5, start: 0});

  // function for users to update input
  const updateInputValues = (type, value) => updateInput(
    { ...input, [type]: value }
  );

  // define func to all API - modernized...
  const fetchCoins = async() => {
    updateLoading(true);
    const { start, limit } = input;
    const data = await API.get('lab5api', `/coins?start=${start}&limit=${limit}`);
    updateCoins(data.coins);
    updateLoading(false);
  };

  // call fetch func on component load ONCE
  useEffect(() => {
    fetchCoins()
  }, []);
  // ^^ empty array added to restrict code to run just once, the first time component loads

  // loading screen func
  const [loading, updateLoading] = useState(true);

  // new input fields for limit and start, and run button
  return (
    <div className="App">
      <input
        onChange={e => updateInputValues('start', e.target.value)}
        placeholder="start"
      />
      <hr/>
      <input
        onChange={e => updateInputValues('limit', e.target.value)}
        placeholder="limit"
      />
      <hr/>
      <button
        onClick={fetchCoins}
      >Fetch Coins</button>
      <hr/>
      {loading && <h2>Loading your request...</h2>}
        {
          !loading && coins.map((coin, index) => (
          <div key={index}>
            <h2>{coin.name} - {coin.symbol}</h2>
            <h5>${coin.price_usd}</h5>
          </div>
        ))}
    </div>
  );
}

export default App;
