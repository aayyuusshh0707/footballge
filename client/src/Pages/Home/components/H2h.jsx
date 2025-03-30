import React, { useState, useEffect } from "react";

const HeadToHead = ({ team1Id, team2Id }) => {
  const [h2hData, setH2hData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = "e707a9fba8b84e15880fc90307ba2640653124faa7f886c2b00ad099e44b857a";
  const API_URL = `https://apiv3.apifootball.com/?action=get_H2H&firstTeamId=${team1Id}&secondTeamId=${team2Id}&APIkey=${API_KEY}`;

  useEffect(() => {
    if (!team1Id || !team2Id) return;

    const fetchH2HData = async () => {
      setLoading(true);
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Failed to fetch H2H data");
        const data = await response.json();
        setH2hData(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchH2HData();
  }, [team1Id, team2Id]);

  if (loading) {
    return <p className="text-center text-white">Loading head-to-head data...</p>;
  }

  if (error) {
    return <p className="text-center text-white">Error: {error}</p>;
  }

  if (!h2hData || !h2hData.firstTeam_VS_secondTeam) {
    return <p className="text-center text-white">No head-to-head data available</p>;
  }

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md text-white w-full">
      <h2 className="text-xl font-bold text-center mb-4">Head-to-Head Matches</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-700">
          <thead>
            <tr className="bg-gray-900">
              <th className="border border-gray-700 p-2">Date</th>
              <th className="border border-gray-700 p-2">Home Team</th>
              <th className="border border-gray-700 p-2">Away Team</th>
              <th className="border border-gray-700 p-2">Score</th>
            </tr>
          </thead>
          <tbody>
            {h2hData.firstTeam_VS_secondTeam.map((match, index) => (
              <tr key={index} className="text-center">
                <td className="border border-gray-700 p-2">{match.match_date}</td>
                <td className="border border-gray-700 p-2">{match.match_hometeam_name}</td>
                <td className="border border-gray-700 p-2">{match.match_awayteam_name}</td>
                <td className="border border-gray-700 p-2">{match.match_hometeam_score} - {match.match_awayteam_score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HeadToHead;
