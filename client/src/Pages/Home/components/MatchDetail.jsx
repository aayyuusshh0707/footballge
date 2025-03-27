import React, { useState, useEffect } from "react";

const MatchDetail = ({ match, onBack }) => {
  const [activeTab, setActiveTab] = useState("summary");
  const [matchData, setMatchData] = useState(match);
  const [error, setError] = useState(null);

  // Build API URL using environment variables
  const apiUrl = `${import.meta.env.VITE_FOOTBALL_URL}&APIkey=${import.meta.env.VITE_API_KEY}&match_id=${match.match_id}`;

  useEffect(() => {
    const fetchMatchDetails = async () => {
      console.log("Requesting URL:", apiUrl);
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(
            `HTTP error! Status: ${response.status} - ${response.statusText}. Details: ${errorText}`
          );
        }
        const data = await response.json();
        console.log("API Response:", data);

        // Merge the fetched details into our existing match object
        if (Array.isArray(data) && data.length > 0) {
          setMatchData({ ...match, ...data[0] });
        } else if (data && typeof data === "object" && !data.error) {
          setMatchData({ ...match, ...data });
        } else if (data.error) {
          setError(`API Error: ${data.error}`);
        } else {
          setError("No additional match details found.");
        }
      } catch (err) {
        console.error("Error details:", err.message);
        setError(`Failed to fetch match details: ${err.message}`);
      }
    };

    fetchMatchDetails();
  }, [apiUrl, match]);

  if (error) {
    return (
      <div className="p-4 rounded-lg w-full bg-gray-800 text-white">
        <p className="text-red-500">{error}</p>
        <button onClick={onBack} className="mt-2 text-gray-400">
          Back
        </button>
      </div>
    );
  }

  if (!matchData) {
    return (
      <div className="p-4 rounded-lg w-full bg-gray-800 text-white">
        <p>Loading match details...</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-800 rounded-lg w-full text-white">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">
          {matchData.match_hometeam_name} vs {matchData.match_awayteam_name}
        </h2>
        <button
          onClick={onBack}
          className="px-3 py-1 bg-gray-700 rounded hover:bg-gray-600"
        >
          Back
        </button>
      </div>

      {/* Tabs */}
      <div className="mt-4">
        <div className="flex border-b border-gray-600">
          {["summary", "stats", "lineup"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-lg focus:outline-none ${
                activeTab === tab
                  ? "border-b-2 border-white"
                  : "text-gray-400"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="mt-4 max-h-80 overflow-y-auto">
          {activeTab === "summary" && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Match Summary</h3>
              <p>Date: {matchData.match_date}</p>
              <p>Time: {matchData.match_time}</p>
              <p>
                Score: {matchData.match_hometeam_score} -{" "}
                {matchData.match_awayteam_score}
              </p>
              <p>
                Status:{" "}
                {matchData.match_status === "FT"
                  ? "Finished"
                  : matchData.match_status || "Live"}
              </p>
              <p>League: {matchData.league_name}</p>
              <p>Stadium: {matchData.match_stadium || "N/A"}</p>
              <p>Referee: {matchData.match_referee || "N/A"}</p>
              {matchData.h2h ? (
                <div className="mt-4">
                  <h4 className="font-semibold">Head-to-Head Records</h4>
                  {matchData.h2h.map((game, index) => (
                    <div
                      key={index}
                      className="flex justify-between border-b border-gray-600 py-2"
                    >
                      <span>{game.date}</span>
                      <span>
                        {game.team1} {game.score} {game.team2}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mt-4">No head-to-head records available.</p>
              )}
            </div>
          )}

          {activeTab === "stats" && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Match Statistics</h3>
              {matchData.statistics && matchData.statistics.length > 0 ? (
                matchData.statistics.map((stat, index) => (
                  <div
                    key={index}
                    className="flex justify-between py-2 border-b border-gray-600"
                  >
                    <span>{stat.type}</span>
                    <span>
                      {stat.home} - {stat.away}
                    </span>
                  </div>
                ))
              ) : (
                <p>No statistics available.</p>
              )}
            </div>
          )}

          {activeTab === "lineup" && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Lineup</h3>
              {matchData.lineup ? (
                <div>
                  {/* Home Team Lineup */}
                  <div>
                    <h4 className="font-semibold">
                      Home Team: {matchData.match_hometeam_name}
                    </h4>
                    <p>Formation: {matchData.match_hometeam_system || "N/A"}</p>
                    <div className="mt-2">
                      <h5 className="font-semibold">Starting XI</h5>
                      <ul className="list-disc ml-5">
                        {matchData.lineup.home.starting_lineups.map(
                          (player, index) => (
                            <li key={index}>
                              {player.lineup_number}. {player.lineup_player} (Pos:{" "}
                              {player.lineup_position})
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                    <div className="mt-2">
                      <h5 className="font-semibold">Substitutes</h5>
                      <ul className="list-disc ml-5">
                        {matchData.lineup.home.substitutes.map(
                          (player, index) => (
                            <li key={index}>{player.lineup_player}</li>
                          )
                        )}
                      </ul>
                    </div>
                  </div>

                  {/* Away Team Lineup */}
                  <div className="mt-4">
                    <h4 className="font-semibold">
                      Away Team: {matchData.match_awayteam_name}
                    </h4>
                    <p>Formation: {matchData.match_awayteam_system || "N/A"}</p>
                    <div className="mt-2">
                      <h5 className="font-semibold">Starting XI</h5>
                      <ul className="list-disc ml-5">
                        {matchData.lineup.away.starting_lineups.map(
                          (player, index) => (
                            <li key={index}>
                              {player.lineup_number}. {player.lineup_player} (Pos:{" "}
                              {player.lineup_position})
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                    <div className="mt-2">
                      <h5 className="font-semibold">Substitutes</h5>
                      <ul className="list-disc ml-5">
                        {matchData.lineup.away.substitutes.map(
                          (player, index) => (
                            <li key={index}>{player.lineup_player}</li>
                          )
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              ) : (
                <p>No lineup data available.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MatchDetail;
