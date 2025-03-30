import React, { useEffect, useState } from "react";

export default function Featuredmatch() {
  const [matches, setMatches] = useState([]);
  const [matchDetails, setMatchDetails] = useState([]);
  const API_KEY = import.meta.env.VITE_API_KEY;
  const API_URL = import.meta.env.VITE_FOOTBALL_URL;

  useEffect(() => {
    const fetchFeaturedMatches = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/featured/get");
        const data = await response.json();

        let matchIds = [];

        if (data.matchid) {
          matchIds = [data.matchid];
        }
        else if (Array.isArray(data)) {
          matchIds = data.map(item => item.matchid).filter(id => id);
        }
        else {
          console.error("Unexpected response format:", data);
          return;
        }

        setMatches(matchIds);
        fetchMatchDetails(matchIds);
      } catch (error) {
        console.error("Error fetching featured matches:", error);
      }
    };

    fetchFeaturedMatches();
  }, []);

  const fetchMatchDetails = async (matchIds) => {
    if (!Array.isArray(matchIds) || matchIds.length === 0) {
      console.error("Invalid matchIds:", matchIds);
      return;
    }

    try {
      const details = await Promise.all(
        matchIds.map(async (matchId) => {
          const response = await fetch(
            `${API_URL}&APIkey=${API_KEY}&match_id=${matchId}`
          );
          if (!response.ok) {
            console.error(`Error fetching match ${matchId}:`, response.status);
            return null;
          }
          const data = await response.json();
          return data.length > 0 ? data[0] : null;
        })
      );

      setMatchDetails(details.filter(detail => detail !== null));
    } catch (error) {
      console.error("Error fetching match details:", error);
    }
  };
  return (
<div className="text-white  sm:p-2">
  {matchDetails.length > 0 ? (
    matchDetails.map((match, index) => (
      <div key={index} className="text-left text-[13px] sm:text-base">
        <h2 className="font-bold text-[13px]  sm:text-lg">
          {match.match_hometeam_name.split(" ")[0]}
        </h2>
        <h2 className="font-bold text-[13px]  sm:text-lg">
          {match.match_awayteam_name.split(" ")[0]}
        </h2>
        <p className="text-[13px] sm:text-sm mt-1">
          {match.match_date} | {match.match_time}
        </p>
        <p className="text-[13px] sm:text-sm">{match.match_stadium}</p>
      </div>
    ))
  ) : (
    <p className="text-center text-[13px] sm:text-base">Loading matches...</p>
  )}
</div>


  );
}
