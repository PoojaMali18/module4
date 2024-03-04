// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Router, Route, Switch } from 'react-router-dom';
import './App.css';

const API_URL = 'https://api.postalpincode.in/pincode/';

function PincodeForm({ history }) {
  const [pincode, setPincode] = useState('');
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (pincode.length !== 6) {
      alert('Please enter a valid 6-digit pincode.');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}${pincode}`);
      setDetails(response.data[0].PostOffice);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter 6-digit Pincode"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
        />
        <button type="submit">Lookup</button>
      </form>
      {loading && <div className="loader">Loading...</div>}
      {details && (
        <div className="details">
          <h2>Pincode Details</h2>
          <ul>
            {details.map((office) => (
              <li key={office.Name}>
                {office.Name}, {office.BranchType}, {office.District}, {office.State}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={PincodeForm} />
        {/* Add other routes if needed */}
      </Switch>
    </Router>
  );
}

export default App;
