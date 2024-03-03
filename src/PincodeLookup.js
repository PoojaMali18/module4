import React, { useState } from 'react';

const PincodeLookup = () => {
  const [pincode, setPincode] = useState('');
  const [filterText, setFilterText] = useState('');
  const [originalData, setOriginalData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const lookupPincode = () => {
    if (pincode.length !== 6 || isNaN(pincode)) {
      alert("Please enter a valid 6-digit Pincode.");
      return;
    }

    const apiUrl = `https://api.postalpincode.in/pincode/${pincode}`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        setOriginalData(data[0]);
        displayResult(data[0]);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        alert('Error fetching data. Please try again.');
      });
  };

  const applyFilter = () => {
    const lowerFilterText = filterText.toLowerCase();
    const filteredResults = originalData.PostOffice.filter(postOffice => postOffice.Name.toLowerCase().includes(lowerFilterText));
    displayResult({ PostOffice: filteredResults });
  };

  const displayResult = (data) => {
    // Use state to update the resultContainer
    if (data && data.PostOffice) {
      const details = data.PostOffice.map((postOffice, index) => (
        <div key={index}>
          <p><strong>Post Office Name:</strong> {postOffice.Name}</p>
          <p><strong>Branch Type - Delivery Status:</strong> {postOffice.BranchType} - {postOffice.DeliveryStatus}</p>
          <p><strong>District:</strong> {postOffice.District}</p>
          <p><strong>State:</strong> {postOffice.State}</p>
          <hr />
        </div>
      ));

      setFilteredData(details);
    } else {
      setFilteredData(<p>No data found for the given Pincode.</p>);
    }
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

      <label htmlFor="filterInput">Filter by Post Office Name:</label>
      <input
        type="text"
        id="filterInput"
        placeholder="Enter Post Office Name"
        value={filterText}
        onChange={(e) => {
          setFilterText(e.target.value);
          applyFilter();
        }}
      />

      <div id="resultContainer">
        {filteredData}
      </div>

      <button onClick={lookupPincode}>Lookup</button>
    </div>
  );
};

export default PincodeLookup;
