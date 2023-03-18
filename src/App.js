import './App.css';
import { useState, useEffect } from 'react';
import { API } from 'aws-amplify';

function App() {
  // creates coins variable and sets as empty array
  const [coins, updateCoins] = useState([]);

  // define func to all API
  async function fetchCoins() {
    const data = await API.get('lab5api', '/coins');
    updateCoins(data.coins);
  };

  // call fetch func on component load
  useEffect(() => {
    fetchCoins()
  }, []);

  // set up the display...
  return (
    <div className="App">
      {
        coins.map((coin, index) => (
          <div key={index}>
            <h2>{coin.name} - {coin.symbol}</h2>
            <h5>${coin.price_usd}</h5>
          </div>
        ))
      }
    </div>
  );
}

export default App;
