import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const PincodeEntry = () => {
  const [pincode, setPincode] = useState('');
  const history = useHistory();

  const handleSubmit = () => {
    if (pincode.length === 6 && /^\d+$/.test(pincode)) {
      history.push(`/result?pincode=${pincode}`);
    } else {
      alert('Please enter a valid 6-digit pincode.');
    }
  };

  return (
    <div>
      <h2>Pincode Lookup</h2>
      <input
        type="text"
        placeholder="Enter 6-digit Pincode"
        value={pincode}
        onChange={(e) => setPincode(e.target.value)}
      />
      <button onClick={handleSubmit}>Lookup</button>
    </div>
  );
};

export default PincodeEntry;
