import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import data from "../mockodds.json"; // Assuming the data is in a JSON file

const SoccerPage = () => {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    // Filter soccer matches from the data
    const soccerMatches = Object.keys(data).filter((key) => key.startsWith("soccer"));
    const soccerData = soccerMatches.map((matchKey) => ({ id: matchKey, ...data[matchKey] }));
    setMatches(soccerData);
  }, []);

  return (
    <>
      <div className="container-fluid soccer-banner">
        {/* Add any soccer banner content or background here */}
      </div>
      <h1 className="soccer-heading">Soccer Matches</h1>
      <table className="table table-hover">
        <tbody>
          {matches.length > 0 ? (
            matches.map((match, index) => (
              <tr key={index}>
                <td style={{ padding: "20px", fontSize: "18px" }}>
                  <Link
                    to={`/soccer/${match.id}`}
                    style={{ textDecoration: "none", color: "blue" }}
                  >
                    {match.teams[0]} vs {match.teams[1]}
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <p>Loading soccer matches..sadasd.</p>
          )}
        </tbody>
      </table>
    </>
  );
};

export default SoccerPage;
