import React, { useState, useEffect } from 'react';
import { API } from 'aws-amplify';

export const Coins = () => {
  const [coins, updateCoins] = useState([]);

  const [input, updateInput] = useState({ limit: 5, start: 0});

  const updateInputValues = (type, value) => updateInput(
    { ...input, [type]: value }
  );

  const fetchCoins = async() => {
    updateLoading(true);
    const { start, limit } = input;
    const data = await API.get('lab5api', `/coins?start=${start}&limit=${limit}`);
    updateCoins(data.coins);
    updateLoading(false);
  };

  useEffect(() => {
    fetchCoins()
  }, []);

  const [loading, updateLoading] = useState(true);

  return (
    <>
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
        !loading && coins.map((x, index) => (
        <div key={index}>
          <h2>{x.name} - {x.symbol}</h2>
          <h4>${x.price_usd}</h4>
        </div>
      ))}
    </>
  )
}