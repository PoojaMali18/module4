import React from 'react';
import PincodeEntry from "./Components/PincodeEntry";
import ResultDisplay from "./Components/ResultDisplay";
import {Router,Route} from "react-router-dom"
const App = () => {
  return (
    <Router>
        <Route path="/"  element={PincodeEntry} />
        <Route path="/result" element={ResultDisplay} />
    </Router>

  );
};

export default App;
