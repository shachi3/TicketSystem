import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [collectionSummary, setCollectionSummary] = useState(null);
  const [passengerSummary, setPassengerSummary] = useState(null);

  useEffect(() => {
    async function fetchSummary() {
      const res = await axios.get('http://localhost:5000/api/journeys/summary');
      setCollectionSummary(res.data.collectionSummary);
      setPassengerSummary(res.data.passengerSummary);
    }
    fetchSummary();
  }, []);

  return (
    <div className="App">
      <h1>Metro Journey Summary</h1>
      <h2>Collection Summary</h2>
      {collectionSummary && (
        <div>
          <p>Total Amount: {collectionSummary.totalAmount}</p>
          <p>Total Discount: {collectionSummary.totalDiscount}</p>
        </div>
      )}
      <h2>Passenger Summary</h2>
      {passengerSummary && (
        <div>
          {Object.keys(passengerSummary).sort((a, b) => passengerSummary[b] - passengerSummary[a]).map((type) => (
            <p key={type}>{type}: {passengerSummary[type]}</p>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
