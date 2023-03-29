import React from "react";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import Layout from "./views/Layout";
import Tracking from './views/Tracking'
import Allocation from './views/Allocation'
import NoPage from './views/NoPage';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />} >
            <Route exact path="/" element={<Navigate to="/allocation" />} />
            <Route path="allocation" element={<Allocation />} />
            <Route path="track" element={<Tracking />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
