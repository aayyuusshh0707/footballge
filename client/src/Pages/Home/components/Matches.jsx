import React, { useState, useEffect } from "react";
import { CircularProgress } from "@mui/material";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { usePinnedLeagues } from "../../../hook/PinnedLeaguesContext"; 
import { API_URL } from "../../../api/api";

const MatchesComponent = ({ className }) => {
  const [value, setValue] = useState("1");
  const [liveMatches, setLiveMatches] = useState([]);
  const [upcomingMatches, setUpcomingMatches] = useState([]);
  const [finishedMatches, setFinishedMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredLeague, setHoveredLeague] = useState(null);
  const { pinnedLeagues, setPinnedLeagues } = usePinnedLeagues(); 


  useEffect(() => {
    const fetchData = async () => {
      try {
        const now = new Date();
        const formatDate = (date) => date.toISOString().split("T")[0];

        const [liveRes, upcomingRes, finishedRes] = await Promise.all([
          axios.get(`${API_URL}&match_live=1`),
          axios.get(`${API_URL}&from=${formatDate(now)}&to=${formatDate(now)}`),
          axios.get(`${API_URL}&from=${formatDate(now)}&to=${formatDate(now)}`),
        ]);

        const safeArray = (data) => (Array.isArray(data) ? data : []);

        setLiveMatches(safeArray(liveRes.data));
        setUpcomingMatches(safeArray(upcomingRes.data));
        setFinishedMatches(
          safeArray(finishedRes.data).filter(
            (match) => match.match_hometeam_score !== "" && match.match_awayteam_score !== ""
          )
        );
      } catch (error) {
        console.error("Error fetching match data:", error);
      } finally {
        setLoading(false);
      }
    };
   
    fetchData();
  }, []);

  const handleChange = (event, newValue) => setValue(newValue);

  const cleanLeagueTitle = (title) => title.replace(/^\d+\.\s*/, "").trim();

  const groupByLeague = (matches) => {
    if (!Array.isArray(matches)) return {};
    return matches.reduce((acc, match) => {
      const cleanedLeagueName = cleanLeagueTitle(match.league_name);
      acc[cleanedLeagueName] = acc[cleanedLeagueName] || [];
      acc[cleanedLeagueName].push(match);
      return acc;
    }, {});
  };

  const togglePinLeague = (leagueId) => {
    setPinnedLeagues((prev) => {
      const updatedLeagues = prev.includes(leagueId)
        ? prev.filter((l) => l !== leagueId)
        : [leagueId, ...prev];
      return updatedLeagues;
    });
  };

  const renderMatchItem = (match, isLive, isFinished) => {
    const homeScore = parseInt(match.match_hometeam_score) || 0;
    const awayScore = parseInt(match.match_awayteam_score) || 0;
    const matchTime = match.match_time;

    return (
      // <motion.div
      <div
        key={`${match.match_id}-${match.match_hometeam_name}-${match.match_awayteam_name}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="bg-gray-700 rounded-xl p-4 grid grid-cols-2 items-center shadow-xl gap-4"
      >
        <div className="flex flex-col space-y-2">
          <div className="flex items-center space-x-2">
            <img
              src={match.team_home_badge}
              alt={match.match_hometeam_name}
              className="w-5 h-5 object-contain"
            />
            <span className="text-white font-semibold text-[12px] md:text-sm">{match.match_hometeam_name}</span>
          </div>
          <div className="flex items-center space-x-2">
            <img
              src={match.team_away_badge}
              alt={match.match_awayteam_name}
              className="w-5 h-5 object-contain"
            />
            <span className="text-white font-semibold text-[12px] md:text-sm">{match.match_awayteam_name}</span>
          </div>
        </div>

        <div className="flex flex-col items-end justify-center space-y-1">
          {isLive ? (
            <>
              <span className="text-white font-bold text-sm">{homeScore}</span>
              <span className="text-white font-bold text-sm">{awayScore}</span>
            </>
          ) : isFinished ? (
            <>
              <span className="text-yellow-400 font-bold text-sm">{homeScore}</span>
              <span className="text-yellow-400 font-bold text-sm">{awayScore}</span>
            </>
          ) : (
            <span className="text-blue-400 font-semibold text-sm">⏳ {matchTime}</span>
          )}
        </div>
      </div>
    );
  };

  const renderMatchesByLeague = (matches, isLive = false, isFinished = false) => {
    const groupedMatches = groupByLeague(matches);
    const allLeagues = Object.keys(groupedMatches);

    const orderedLeagues = [
      ...allLeagues.filter((league) => {
        const leagueId = groupedMatches[league][0].league_id;
        return pinnedLeagues.includes(leagueId);
      }),
      ...allLeagues.filter((league) => {
        const leagueId = groupedMatches[league][0].league_id;
        return !pinnedLeagues.includes(leagueId);
      }),
    ];

    const uniqueLeagueIds = new Set();

    return orderedLeagues.map((league) => {
      const leagueSample = groupedMatches[league][0];
      const leagueId = leagueSample.league_id;
      const leagueFlag = leagueSample.country_logo || "";

      if (uniqueLeagueIds.has(leagueId)) {
        return null;
      }
      uniqueLeagueIds.add(leagueId);

      return (
        <div
          key={`${leagueId}-${league}`}
          className="mb-6"
          onMouseEnter={() => setHoveredLeague(leagueId)}
          onMouseLeave={() => setHoveredLeague(null)}
        >
          <h2 className="text-white text-sm font-bold mb-2 flex items-center gap-2">
            {leagueFlag ? (
              <img src={leagueFlag} alt={league} className="w-6 h-6 object-cover rounded-full" />
            ) : (
              <span className="text-2xl">🌍</span>
            )}
            {league}
            <span
              className="cursor-pointer"
              onClick={() => togglePinLeague(leagueId)}
            >
              {(pinnedLeagues.includes(leagueId) || hoveredLeague === leagueId) && "📌"}
            </span>
          </h2>
          <div className="flex flex-col gap-2">
            {groupedMatches[league].map((match) =>
              renderMatchItem(match, isLive, isFinished)
            )}
          </div>
        </div>
      );
    }).filter(Boolean);
  };

  return (
    <div className={className}>
      <div className="flex space-x-2 mb-4">
        {["Live", "Upcoming", "Finished"].map((label, index) => (
          <button
            key={label}
            onClick={() => setValue((index + 1).toString())}
            className={`px-2 py-1 rounded-lg font-semibold cursor-pointer ${
              value === (index + 1).toString() ? "bg-blue-500 text-white" : "bg-gray-800 text-gray-300"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {loading ? (
        <CircularProgress />
      ) : (
        <div className="space-y-6 h-110 overflow-y-scroll" style={{ scrollbarWidth: "none" }}>
          {/* <AnimatePresence> */}
            {value === "1" && renderMatchesByLeague(liveMatches, true)}
            {value === "2" && renderMatchesByLeague(upcomingMatches )}
            {value === "3" && renderMatchesByLeague(finishedMatches, false, true)}
         {/*  </AnimatePresence> */}
        </div>
      )}
    </div>
  );
};

export default MatchesComponent;

