import React, { useState, useEffect } from "react";
import axios from "axios";

const OngoingLeagues = () => {
  const [leagues, setLeagues] = useState([]);
  const [loading, setLoading] = useState(true);

  // Replace with your actual API key
  const API_KEY =
    "e707a9fba8b84e15880fc90307ba2640653124faa7f886c2b00ad099e44b857a";
  const BASE_URL = `https://apiv3.apifootball.com/?action=get_events&APIkey=${API_KEY}`;

  useEffect(() => {
    const fetchTodayMatches = async () => {
      try {
        const today = new Date();
        const formatDate = (date) => date.toISOString().split("T")[0];

        // Fetch matches scheduled for today by setting from and to as today's date
        const response = await axios.get(
          `${BASE_URL}&from=${formatDate(today)}&to=${formatDate(today)}`
        );
        const matches = response.data;

        if (Array.isArray(matches)) {
          // Use a Map to extract unique leagues based on league_id
          const leagueMap = new Map();

          matches.forEach((match) => {
            const { league_id, league_name, league_logo, country_name, country_logo } = match;
            if (!leagueMap.has(league_id)) {
              leagueMap.set(league_id, { league_id, league_name, league_logo, country_name, country_logo });
            }
          });

          setLeagues([...leagueMap.values()]);
        }
      } catch (error) {
        console.error("Error fetching today's matches:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTodayMatches();
  }, []);

  // Format the display so that the host country flag and name appear before a colon, then the league name.
  const formatLeagueDisplay = (league) => {
    const host = league.country_name ? league.country_name.toUpperCase() : "";
    return `${host} : ${league.league_name}`;
  };

  if (loading) {
    return (
      <div className="p-4 flex justify-center items-center h-32">
        <p className="text-gray-300">Loading today's leagues...</p>
      </div>
    );
  }

  return (
    <div
      className="bg-gray-800 mt-3 rounded-lg p-4 text-center flex-1 overflow-scroll "
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >

      {leagues.length === 0 ? (
        <p className="text-gray-300">No leagues found for today.</p>
      ) : (
        <div className="flex flex-col gap-4 h-96">
          {leagues.map((league) => (
            <div
              key={league.league_id}
              className="bg-gray-700 p-4 rounded-lg shadow flex items-center space-x-2 "
            >
              {/* Show host country flag if available */}
              {league.country_logo && (
                <img
                  src={league.country_logo}
                  alt={league.country_name}
                  className="w-8 h-8 object-cover rounded-full"
                />
              )}
              <span className="text-white text-sm font-semibold">
                {formatLeagueDisplay(league)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OngoingLeagues;
