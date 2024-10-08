import React from 'react';
const Header = ({ userBalance }) => {
  return (
    <div className="nav-container">
      <div>
        <h2>Dashboard</h2>
      </div>
      <div>
        <h5>B: {userBalance.toFixed(2)} | L: 0</h5> {/* Dynamically show user balance */}
        <p>User Name</p>
      </div>
    </div>
  );
};

export default Header;
