import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import data from "../mockodds.json";

const HorseRidingPage = () => {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    // Filter horse riding matches from the data
    const horseRidingMatches = Object.keys(data).filter((key) => key.startsWith("horse_riding"));
    const horseRidingData = horseRidingMatches.map((matchKey) => ({ id: matchKey, ...data[matchKey] }));
    setMatches(horseRidingData);
  }, []);

  return (
    <>
      <div className="container-fluid horse-riding-banner">
        {/* Add any horse-riding banner content */}
      </div>
      <h1 className="horse-riding-heading">Horse Riding Matches</h1>
      <table className="table table-hover">
        <tbody>
          {matches.length > 0 ? (
            matches.map((match, index) => (
              <tr key={index}>
                <td style={{ padding: "20px", fontSize: "18px" }}>
                  <Link
                    to={`/horse_riding/${match.id}`}
                    style={{ textDecoration: "none", color: "blue" }}
                  >
                    {match.teams[0]} vs {match.teams[1]}
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <p>Loading horse riding matches...</p>
          )}
        </tbody>
      </table>
    </>
  );
};

export default HorseRidingPage;
