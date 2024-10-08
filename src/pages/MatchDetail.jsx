import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import data from "../mockodds.json";
import { FaStopwatch } from "react-icons/fa";
import { IoMdHelpCircleOutline } from "react-icons/io";
import { toast } from "react-hot-toast"; // For success message

const MatchDetail = ({ onBetSubmit }) => {
  const { matchId } = useParams();
  const [match, setMatch] = useState(null);
  const [bet, setBet] = useState({
    betFor: "",
    odds: "",
    stake: "",
    profit: "",
    type: "", // Adding lay or back
  });

  useEffect(() => {
    const matchData = data[matchId];
    setMatch(matchData);
  }, [matchId]);

  if (!match) return <p>Loading match details...</p>;

  // Create 3 odds entries (e.g., 2.04, 2.06, 2.08)
  const generateOdds = (baseOdd) => {
    const oddsArray = [baseOdd, (baseOdd + 0.02).toFixed(2), (baseOdd + 0.04).toFixed(2)];
    return oddsArray;
  };

  const handleOddClick = (team, odd, type) => {
    setBet({
      ...bet,
      betFor: team,
      odds: odd,
      type: type, // 'lay' or 'back'
    });
  };

  const handleStakeChange = (e) => {
    const stake = e.target.value;
    const profit = (stake * bet.odds).toFixed(2);
    setBet({
      ...bet,
      stake,
      profit,
    });
  };

  const handleSubmit = () => {
    if (bet.betFor && bet.odds && bet.stake) {
      if (bet.stake <= 1000) { // Assuming 1000 is the initial balance for demonstration
        onBetSubmit(Number(bet.stake)); // Deduct the stake from balance
        toast.success(`Bet placed successfully on ${bet.betFor} (${bet.type})!`);
      } else {
        toast.error("Not enough balance!"); // Error if stake exceeds available balance
      }
    } else {
      toast.error("Please complete the bet form.");
    }
  };

  return (
    <>
      <div
        className="container-fluid detail-cricket-banner d-flex"
        style={{ flexDirection: "column", justifyContent: "center" }}
      >
        <div className="row">
          <div
            className="col-lg-1"
            style={{
              borderRadius: "20px",
              display: "flex",
              justifyContent: "end",
              alignItems: "center",
            }}
          >
            <div
              style={{
                backgroundColor: "gray",
                padding: "5px",
                borderRadius: "10px",
              }}
            >
              <img
                src="https://www.bpexch.com/img/v2/soccer.svg"
                height={40}
                width={40}
                alt=""
              />
            </div>
          </div>
          <div
            className="col-5 d-flex"
            style={{
              borderRadius: "20px",
              color: "white",
              flexDirection: "column",
            }}
          >
            <span
              className="d-flex"
              style={{ marginBottom: "-10px", marginTop: "25px" }}
            >
              {" "}
              <FaStopwatch size={20} /> &nbsp; in 33 minutes | Oct 4 3:00 am |
              Winners: 1
            </span>
            <h1 className="cricket-detail-banner">{match.teams.join(" vs ")}</h1>
            <p style={{ fontWeight: "bold", marginTop: "-15px" }}>
              Remaining : 00:23:29
            </p>
          </div>
        </div>
      </div>
      <div className="container-fluid mt-2">
        <div className="row">
          <div className="col-lg-3">
            <p
              style={{
                backgroundColor: "blueviolet",
                width: "max-content",
                padding: "0px 20px",
                borderRadius: "5px",
              }}
            >
              <FaStopwatch size={20} /> Match Odds (MaxBet: 250K){" "}
              <IoMdHelpCircleOutline size={20} />
            </p>
            <table className="table table-hover">
              <tbody>
                {match.markets[0].options.map((option, index) => (
                  <tr key={index}>
                    <td style={{ padding: "15px" }}>{option.team}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Lay Odds */}
          <div className="col-lg-2">
            <p
              style={{
                backgroundColor: "blueviolet",
                width: "100%",
                padding: "0px 20px",
                borderRadius: "5px",
                fontSize: "18px",
                fontWeight: "bold",
                textAlign: "end",
              }}
            >
              Lay
            </p>
            <table className="table table-hover">
              <tbody>
                {match.markets[0].options.map((option, index) => (
                  <tr key={index}>
                    {generateOdds(option.lay[0]).map((odd, oddIndex) => (
                      <td
                        key={oddIndex}
                        style={{ padding: "15px", cursor: "pointer" }}
                        className="odds-item lay-odd" // Add class for lay hover effect
                        onClick={() => handleOddClick(option.team, odd, "lay")}
                      >
                        {odd}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Back Odds */}
          <div className="col-lg-2">
            <p
              style={{
                backgroundColor: "blueviolet",
                width: "100%",
                padding: "0px 20px",
                borderRadius: "5px",
                fontSize: "18px",
                fontWeight: "bold",
                textAlign: "start",
              }}
            >
              Back
            </p>
            <table className="table table-hover">
              <tbody>
                {match.markets[0].options.map((option, index) => (
                  <tr key={index}>
                    {generateOdds(option.back[0]).map((odd, oddIndex) => (
                      <td
                        key={oddIndex}
                        style={{ padding: "15px", cursor: "pointer" }}
                        className="odds-item back-odd" // Add class for back hover effect
                        onClick={() => handleOddClick(option.team, odd, "back")}
                      >
                        {odd}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Bet Slip */}
          <div className="col-lg-5">
            <p className="tv-scorecardbtn">
              <button>TV</button>
              <button>Score Card</button>
            </p>
            <p
              className="Bet-slip d-flex"
              style={{
                fontSize: "15px",
                fontWeight: "bold",
                justifyContent: "space-between",
              }}
            >
              <span>Bet Slip</span>
              <span>Edit Bet Sizes</span>
            </p>
            <div
              className="Bet-for d-flex"
              style={{
                fontSize: "15px",
                fontWeight: "bold",
                justifyContent: "space-between",
              }}
            >
              <span>Bet for:<br/> {bet.betFor}</span>
              <span>Type:<br/>  {bet.type}</span>
              <span>Odds:<br/>  {bet.odds}</span>
              <input
                type="number"
                placeholder="Stake"
                value={bet.stake}
                onChange={handleStakeChange}
                className="Stake"
              />
              <span>Profit /:<br/> {bet.profit}</span>
            </div>
            <button
              onClick={handleSubmit}
              style={{
                border: "none",
                backgroundColor: "#72F97B",
                padding: "5px 20px",
                borderRadius: "10px",
                marginTop: "40px",
              }}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MatchDetail;
