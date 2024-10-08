import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import data from "../mockodds.json";

const GreyhoundsPage = () => {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    // Filter greyhounds matches from the data
    const greyhoundsMatches = Object.keys(data).filter((key) => key.startsWith("greyhounds"));
    const greyhoundsData = greyhoundsMatches.map((matchKey) => ({ id: matchKey, ...data[matchKey] }));
    setMatches(greyhoundsData);
  }, []);

  return (
    <>
      <div className="container-fluid greyhounds-banner">
        {/* Add any greyhounds banner content */}
      </div>
      <h1 className="greyhounds-heading">Greyhounds Matches</h1>
      <table className="table table-hover">
        <tbody>
          {matches.length > 0 ? (
            matches.map((match, index) => (
              <tr key={index}>
                <td style={{ padding: "20px", fontSize: "18px" }}>
                  <Link
                    to={`/greyhounds/${match.id}`}
                    style={{ textDecoration: "none", color: "blue" }}
                  >
                    {match.teams[0]} vs {match.teams[1]}
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <p>Loading greyhounds matches...</p>
          )}
        </tbody>
      </table>
    </>
  );
};

export default GreyhoundsPage;
