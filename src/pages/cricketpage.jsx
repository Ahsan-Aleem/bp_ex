import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import data from "../mockodds.json"; 

const CricketPage = () => {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    
    const cricketMatches = Object.keys(data).filter(key => key.startsWith("cricket"));
    const cricketData = cricketMatches.map(matchKey => ({ id: matchKey, ...data[matchKey] }));
    setMatches(cricketData);
  }, []);

  return (
    <>
    <div className="container-fluid cricket-banner">
    </div>
    <h1 className="cricket-heading">Cricket Matches</h1>
    <table class="table table-hover">
  <tbody>

  {matches.length > 0 ? (
    matches.map((match, index) => (
      <tr>
        <td key={index} style={{padding:'20px',fontSize:"18px"}}>
        <Link to={`/cricket/${match.id}`} style={{ textDecoration: 'none', color: 'blue' }}>
          {match.teams[0]} vs {match.teams[1]}
        </Link>
      </td>
      </tr>
    ))
  ) : (
    <p>Loading cricket matches...</p>
  )}
  </tbody> 
</table>
    </>
  );
}; 

export default CricketPage;
