import React, { useState } from 'react';

const PincodeEntry = () => {
  const [pincode, setPincode] = useState('');
  const [resultData, setResultData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const lookupPincode = () => {
    if (pincode.length !== 6 || isNaN(pincode)) {
      setErrorMessage('Please enter a valid 6-digit Pincode.');
      setResultData(null);
      return;
    }

    const apiUrl = `https://api.postalpincode.in/pincode/${pincode}`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        if (data[0]) {
          setResultData(data[0]);
          setErrorMessage('');
        } else {
          setResultData(null);
          setErrorMessage('No data found for the given Pincode.');
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setResultData(null);
        setErrorMessage('Error fetching data. Please try again.');
      });
  };

  return (
    <div>
      <h1>Pincode Lookup</h1>

      <label htmlFor="pincodeInput">Enter 6-digit Indian Postal Code:</label>
      <input
        type="text"
        id="pincodeInput"
        maxLength="6"
        placeholder="Enter Pincode"
        value={pincode}
        onChange={(e) => setPincode(e.target.value)}
      />

      <button onClick={lookupPincode}>Lookup</button>

      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      {resultData && (
        <div>
          <p><strong>Post Office Name:</strong> {resultData.PostOffice}</p>
          <p><strong>Branch Type - Delivery Status:</strong> {resultData.BranchType} - {resultData.DeliveryStatus}</p>
          <p><strong>District:</strong> {resultData.District}</p>
          <p><strong>State:</strong> {resultData.State}</p>
        </div>
      )}
    </div>
  );
};

export default PincodeEntry;
