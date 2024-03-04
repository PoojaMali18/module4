import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const ResultDisplay = () => {
  const [data, setData] = useState(null);
  const [filter, setFilter] = useState('');
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const pincode = queryParams.get('pincode');

  const fetchData = async () => {
    try {
      const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
      const result = await response.json();

      if (result && result.length > 0) {
        setData(result[0].PostOffice);
      } else {
        alert('No data found for the given pincode.');
      }
    } catch (error) {
      alert('Error fetching data. Please try again later.');
    }
  };

  useEffect(() => {
    fetchData();
  }, [pincode]);

  const filteredData = data ? data.filter((item) => item.Name.toLowerCase().includes(filter.toLowerCase())) : [];

  return (
    <div>
      <h2>Pincode Details</h2>
      <input
        type="text"
        placeholder="Filter by Post Office Name"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      {filteredData.length === 0 && <p>Couldn’t find the postal data you’re looking for…</p>}
      {filteredData.length > 0 && (
        <ul>
          {filteredData.map((item, index) => (
            <li key={index}>
              <strong>Post Office Name:</strong> {item.Name} <br />
              <strong>Branch Type - Delivery Status:</strong> {item.BranchType} - {item.DeliveryStatus} <br />
              <strong>District:</strong> {item.District} <br />
              <strong>State:</strong> {item.State} <br />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ResultDisplay;
