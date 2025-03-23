import React, { useState, useEffect } from "react";
import axios from "axios";
import { usePinnedLeagues } from "../../../hook/PinnedLeaguesContext";
import { API_URL } from "../../../api/api";

const PinnedLeagues = () => {

  const [pinnedMatches, setPinnedMatches] = useState([]);
  const [leagueData, setLeagueData] = useState([]);
  const { pinnedLeagues, setPinnedLeagues } = usePinnedLeagues();

  useEffect(() => {
    const fetchPinnedLeagues = async () => {
      try {
        const leagueIds = pinnedLeagues;
        //  console.log("Pinned League IDs from context:", leagueIds);

        if (!leagueIds.length) {
          setLeagueData([]);
          setPinnedMatches([]);
          return;
        }

        const today = new Date();
        const formatDate = (date) => date.toISOString().split("T")[0];
        const fromDate = formatDate(today);
        const toDate = formatDate(new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000));

        const matchPromises = leagueIds.map((id) => {
          const url = `${API_URL}&league_id=${id}&from=${fromDate}&to=${toDate}`;
          //console.log("Fetching matches for URL:", url);
          return axios.get(url);
        });

        const matchResponses = await Promise.all(matchPromises);
        const allMatches = matchResponses
          .flatMap((res) => res.data || [])
          .filter(Boolean);

        console.log("All Matches from API:", allMatches);

        if (!allMatches.length) {
          setLeagueData([]);
          setPinnedMatches([]);
          return;
        }

        const leaguesMap = new Map();
        allMatches.forEach((match) => {
          if (!leaguesMap.has(match.league_id)) {
            leaguesMap.set(match.league_id, {
              league_id: match.league_id,
              league_name: match.league_name || "Unknown League",
              league_logo: match.league_logo || "https://via.placeholder.com/150",
            });
          }
        });

        const leagues = Array.from(leaguesMap.values());
        //console.log("Processed League Data:", leagues);

        setPinnedMatches(allMatches);
        setLeagueData(leagues);
      } catch (error) {
        console.error("Error fetching pinned leagues:", {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data,
        });
        setLeagueData([]);
        setPinnedMatches([]);
      }
    };

    fetchPinnedLeagues();
  }, [pinnedLeagues]);

  const handleUnpinLeague = (leagueId) => {
    setPinnedLeagues((prev) => prev.filter((id) => id !== leagueId));
  };

  return (
    <div>
      <h6 className="text-[16px] flex mb-5 text-white">Pinned Leagues 📌</h6>
      {leagueData.length === 0 ? (
        <p className="text-gray-400">No pinned leagues available</p>
      ) : (
        <div className="flex flex-col gap-2 h-110 overflow-y-scroll" style={{ scrollbarWidth: "none" }}>
          {leagueData.map((league) => (
            <div
              key={league.league_id}
              className="bg-gray-700 flex items-center p-1 rounded-2xl overflow-hidden shadow-lg"
            >
              <img
                src={league.league_logo}
                alt={league.league_name}
                className="h-9 rounded-full object-cover"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/150";
                }}
              />
              <div className="p-2 text-white flex items-center justify-between w-full">
                <span className="text-sm font-semibold">
                  {league.league_name || "Unknown League"}
                </span>
                <button
                  onClick={() => handleUnpinLeague(league.league_id)}
                  className="text-red-400 hover:text-red-600 text-sm font-semibold cursor-pointer"
                  title="Unpin League"
                >
                  ❌
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PinnedLeagues;