import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import data from "../mockodds.json"; // Assuming the API data is in a JSON file

const TennisPage = () => {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    // Filter tennis matches from the data
    const tennisMatches = Object.keys(data).filter((key) => key.startsWith("tennis"));
    const tennisData = tennisMatches.map((matchKey) => ({ id: matchKey, ...data[matchKey] }));
    setMatches(tennisData);
  }, []);

  return (
    <>
      <div className="container-fluid tennis-banner">
        {/* Add any tennis banner content or background here */}
      </div>
      <h1 className="tennis-heading">Tennis Matches</h1>
      <table className="table table-hover">
        <tbody>
          {matches.length > 0 ? (
            matches.map((match, index) => (
              <tr key={index}>
                <td style={{ padding: "20px", fontSize: "18px" }}>
                  <Link
                    to={`/tennis/${match.id}`}
                    style={{ textDecoration: "none", color: "blue" }}
                  >
                    {match.teams[0]} vs {match.teams[1]}
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <p>Loading tennis matches...</p>
          )}
        </tbody>
      </table>
    </>
  );
};

export default TennisPage;
