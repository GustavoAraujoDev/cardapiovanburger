// src/App.jsx

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "../src/pages/HomePage";
import ProductDetailsPage from "../src/pages/ProductDetailsPage";
import "../src/styles.css";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={HomePage} />
        <Route path="/product/:id" Component={ProductDetailsPage} />
      </Routes>
    </Router>
  );
};

export default App;
