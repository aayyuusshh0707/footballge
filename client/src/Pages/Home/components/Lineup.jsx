import React, { useState, useEffect } from "react";

const Lineup = ({ matchId, matchData: initialMatchData }) => {
  const [matchData, setMatchData] = useState(initialMatchData);
  const [loading, setLoading] = useState(!initialMatchData);
  const [error, setError] = useState(null);

  const API_KEY = "e707a9fba8b84e15880fc90307ba2640653124faa7f886c2b00ad099e44b857a";
  const API_URL = `https://apiv3.apifootball.com/?action=get_lineups&match_id=${matchId}&APIkey=${API_KEY}`;

  useEffect(() => {
    if (!matchId || initialMatchData?.lineup) return; // Skip fetch if matchId is missing or data is already provided

    const fetchLineupData = async () => {
      setLoading(true);
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Failed to fetch lineup data");
        const data = await response.json();
        // Assuming the API returns an array with the match data as the first element
        const lineupData = data[0] || {};
        setMatchData(lineupData);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLineupData();
  }, [matchId, initialMatchData]);

  if (loading) {
    return <p className="text-center text-white">Loading lineup data...</p>;
  }

  if (error) {
    return <p className="text-center text-white">Error: {error}</p>;
  }

  if (!matchData || !matchData.lineup) {
    return <p className="text-center text-white">No lineup data available</p>;
  }

  const { home, away } = matchData.lineup;

  const renderLineup = (team, teamName, teamBadge) => {
    if (!team) {
      return <p className="text-center text-white">No team data available</p>;
    }

    return (
      <div className="bg-gray-800 p-4 rounded-lg shadow-md text-white w-full">
        <div className="text-center mb-2">
          <img src={teamBadge} alt={teamName} className="w-16 h-16 mx-auto mb-2" />
          <h2 className="text-lg font-bold">{teamName}</h2>
        </div>

        {/* Starting Lineup */}
        <h3 className="text-md font-semibold">Starting Lineup</h3>
        {team.starting_lineups?.length > 0 ? (
          <ul className="mb-2">
            {team.starting_lineups.map((player, index) => (
              <li key={player.player_key || index} className="text-sm">
                {player.lineup_number ? `${player.lineup_number} - ` : ""}
                {player.lineup_player}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm italic">No starting lineup available</p>
        )}

        {/* Substitutes */}
        <h3 className="text-md font-semibold mt-2">Substitutes</h3>
        {team.substitutes?.length > 0 ? (
          <ul className="mb-2">
            {team.substitutes.map((player, index) => (
              <li key={player.player_key || index} className="text-sm">
                {player.lineup_number ? `${player.lineup_number} - ` : ""}
                {player.lineup_player}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm italic">No substitutes available</p>
        )}

        {/* Coach */}
        <h3 className="text-md font-semibold mt-2">Coach</h3>
        {team.coach?.length > 0 ? (
          <p className="text-sm">{team.coach[0].lineup_player}</p>
        ) : (
          <p className="text-sm italic">No coach information available</p>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 justify-center p-6">
      {renderLineup(home, matchData.match_hometeam_name, matchData.team_home_badge)}
      {renderLineup(away, matchData.match_awayteam_name, matchData.team_away_badge)}
    </div>
  );
};

export default Lineup;