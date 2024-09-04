// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Dashboard from "./components/Dashboard";
import Map from "./components/Map";
import About from "./components/About";
import Measures from "./components/Measure";
import "./App.css";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/map" element={<Map />} />
          <Route path="/about" element={<About />} />
          <Route path="/measures" element={<Measures />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
