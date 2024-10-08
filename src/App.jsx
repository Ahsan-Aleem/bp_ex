import React, { useState } from "react";
import SideBar from "./components/SideBar";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import SoccerPage from "./pages/SoccerPage";
import CricketPage from "./pages/CricketPage";
import TennisPage from "./pages/TennisPage";
import HorseRidingPage from "./pages/HorseRidingPage";
import GreyhoundsPage from "./pages/GreyhoundsPage";
import MatchDetail from "./pages/MatchDetail";
import Header from "./components/Header";
import { toast, Toaster } from "react-hot-toast"; // Ensure to import Toaster

function App() {
  const [userBalance, setUserBalance] = useState(1000); // Initial balance

  // Handle bet submission to deduct the stake amount from the balance
  const handleBetSubmit = (stake) => {
    if (stake <= userBalance) {
      setUserBalance(userBalance - stake); // Deduct the stake from balance if enough balance
      toast.success(`Bet placed! ${stake} deducted from balance.`);
    } else {
      toast.error("Not enough balance!"); // Show error if stake exceeds balance
    }
  };

  return (
    <Router>
      <div style={{ display: "flex" }}>
        <SideBar />
        <div style={{ flex: 1 }}>
          <Header userBalance={userBalance} /> {/* Pass user balance to Header */}
          <Routes>
            {/* Redirect to soccer page by default */}
            <Route path="/" element={<Navigate to="/soccer" />} />
            
            {/* Pages for each sport */}
            <Route path="/soccer" element={<SoccerPage />} />
            <Route path="/cricket" element={<CricketPage />} />
            <Route path="/tennis" element={<TennisPage />} />
            <Route path="/horse_riding" element={<HorseRidingPage />} />
            <Route path="/greyhounds" element={<GreyhoundsPage />} />
            
            {/* MatchDetail pages for each sport */}
            <Route path="/cricket/:matchId" element={<MatchDetail onBetSubmit={handleBetSubmit} />} />
            <Route path="/soccer/:matchId" element={<MatchDetail onBetSubmit={handleBetSubmit} />} />
            <Route path="/tennis/:matchId" element={<MatchDetail onBetSubmit={handleBetSubmit} />} />
            <Route path="/horse_riding/:matchId" element={<MatchDetail onBetSubmit={handleBetSubmit} />} />
            <Route path="/greyhounds/:matchId" element={<MatchDetail onBetSubmit={handleBetSubmit} />} />
            
            {/* Catch-all route for non-existent paths */}
            <Route path="*" element={<div>404 - Page Not Found</div>} />
          </Routes>
        </div>
      </div>

      {/* Add the Toaster component to enable toast notifications */}
      <Toaster />
    </Router>
  );
}

export default App;
