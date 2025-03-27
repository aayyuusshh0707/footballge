import React, { useState, useEffect, useRef } from "react";
import { CircularProgress } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { fetchMatchData, calculateLiveTimes } from "../../../services/Match.service";
import MatchDetail from "./MatchDetail";
import PinnedLeagues from "./PinnedLeagues";

const MATCH_TABS = {
  LIVE: "live",
  UPCOMING: "upcoming",
  FINISHED: "finished",
  PINNED: "pinned"
};

const PLACEHOLDER_IMAGE = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 50 50'%3E%3Crect width='50' height='50' fill='%23ccc'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23fff' font-size='20'%3E?%3C/text%3E%3C/svg%3E";

const MatchesComponent = ({ className, banner, screenWidth }) => {
  const [tab, setTab] = useState(MATCH_TABS.LIVE);
  const [liveMatches, setLiveMatches] = useState([]);
  const [upcomingMatches, setUpcomingMatches] = useState([]);
  const [finishedMatches, setFinishedMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [liveTimes, setLiveTimes] = useState({});
  const [selectedMatch, setSelectedMatch] = useState(null);
  const scrollRef = useRef(null);

  const isMobile = screenWidth < 768;

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const { liveMatches, upcomingMatches, finishedMatches } = await fetchMatchData();
        setLiveMatches(liveMatches);
        console.log("Live Matches:", liveMatches);
        setUpcomingMatches(upcomingMatches);
        
        setFinishedMatches(finishedMatches);
        const timer = calculateLiveTimes(liveMatches, setLiveTimes);
        const interval = setInterval(fetchMatchData, 60000);

        return () => {
          clearInterval(interval);
          clearInterval(timer);
        };
      } catch (error) {
        console.error("Failed to load match data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const groupByLeague = (matches) => {
    if (!Array.isArray(matches)) return {};
    return matches.reduce((acc, match) => {
      const cleanedLeagueName = match.league_name?.replace(/^\d+\.\s*/, "").trim() || "Unknown League";
      acc[cleanedLeagueName] = acc[cleanedLeagueName] || [];
      acc[cleanedLeagueName].push(match);
      return acc;
    }, {});
  };

  const renderMatchItem = (match, isLive, isFinished) => {
    const homeScore = match.match_hometeam_score;
    const awayScore = match.match_awayteam_score;
    const matchTime = match.match_time || "TBD";
    const displayTime = getLiveMatchTime(match);

    return (
      <motion.div
        key={`${match.match_id}-${match.match_hometeam_name}-${match.match_awayteam_name}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className={`bg-[#2F2D2D] rounded-xl p-4 grid ${isMobile ? "grid-cols-2" : "grid-cols-3"} items-center shadow-xl gap-4 cursor-pointer`}
        onClick={() => setSelectedMatch(match)}
      >
        <div className="flex flex-col space-y-2">
          <div className="flex items-center space-x-2">
            <img
              src={match.team_home_badge || PLACEHOLDER_IMAGE}
              alt={match.match_hometeam_name}
              className="w-5 h-5 object-contain"
              onError={(e) => (e.target.src = PLACEHOLDER_IMAGE)}
            />
            <span className="text-white font-semibold text-[12px] md:text-sm">
              {match.match_hometeam_name || "Unknown Team"}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <img
              src={match.team_away_badge || PLACEHOLDER_IMAGE}
              alt={match.match_awayteam_name}
              className="w-5 h-5 object-contain"
              onError={(e) => (e.target.src = PLACEHOLDER_IMAGE)}
            />
            <span className="text-white font-semibold text-[12px] md:text-sm">
              {match.match_awayteam_name || "Unknown Team"}
            </span>
          </div>
        </div>
        <div className="flex flex-col items-center space-y-2">
          {isLive || isFinished ? (
            <>
              <span className={`font-bold text-sm ${isLive ? "text-white" : "text-yellow-400"}`}>
                {homeScore}
              </span>
              <span className={`font-bold text-sm ${isLive ? "text-white" : "text-yellow-400"}`}>
                {awayScore}
              </span>
            </>
          ) : (
            <span className="text-gray-400 text-sm">-</span>
          )}
        </div>
        {!isMobile && (
          <div className="flex flex-col items-end">
            {isLive ? (
              <span className="text-sm flex flex-col justify-center align-center text-green-400">
                <div>{displayTime}</div>
                <div className="text-white">{match.match_time}</div>
              </span>
            ) : isFinished ? (
              <span className="text-gray-400 text-sm">
                {homeScore > awayScore
                  ? `${match.match_hometeam_name} Win`
                  : awayScore > homeScore
                    ? `${match.match_awayteam_name} Win`
                    : "Draw"}
              </span>
            ) : (
              <span className="text-blue-400 text-sm">{matchTime}</span>
            )}
          </div>
        )}
      </motion.div>
    );
  };

  const getLiveMatchTime = (match) => {
    const status = match.match_status;
    if (match.match_live === "1" && status !== "FT") {
      if (status === "HT") return "Half Time";
      if (status === "FT") return "Finished";
    }
    return status || "TBD";
  };

  const renderMatchesByLeague = (matches, isLive = false, isFinished = false) => {
    const groupedMatches = groupByLeague(matches);
    const allLeagues = Object.keys(groupedMatches);

    const uniqueLeagueIds = new Set();

    return allLeagues.map((league) => {
      const leagueSample = groupedMatches[league][0];
      const leagueId = leagueSample?.league_id;
      if (!leagueId || uniqueLeagueIds.has(leagueId)) return null;
      uniqueLeagueIds.add(leagueId);

      const sortedMatches = groupedMatches[league].sort((a, b) => {
        const timeA = new Date(`${a.match_date} ${a.match_time}`).getTime();
        const timeB = new Date(`${b.match_date} ${b.match_time}`).getTime();
        return isFinished ? timeB - timeA : timeA - timeB;
      });

      return (
        <div key={`${leagueId}-${league}`} className="mb-6">
          <h2 className="text-white text-sm font-bold mb-2 flex items-center gap-2">
            {leagueSample.country_logo ? (
              <img src={leagueSample.country_logo} alt={league} className="w-6 h-6 object-cover rounded-full" />
            ) : (
              <span className="text-2xl">🌍</span>
            )}
            {league}
          </h2>
          <div className="flex flex-col gap-2">
            {sortedMatches.map((match) => renderMatchItem(match, isLive, isFinished))}
          </div>
        </div>
      );
    }).filter(Boolean);
  };

  const renderTabs = () => (
    <div className="flex space-x-2 mb-2 overflow-x-auto">
      {Object.entries(MATCH_TABS).map(([label, value]) => (
        (value !== MATCH_TABS.PINNED || isMobile) && (
          <button
            key={value}
            onClick={() => setTab(value)}
            className={`px-2 py-1 rounded-lg font-semibold cursor-pointer whitespace-nowrap ${tab === value ? "bg-blue-500 text-white" : "bg-[#131212] text-gray-300 hover:bg-[#2F2D2D]"
              }`}
          >
            {label.charAt(0) + label.slice(1).toLowerCase().replace("_", " ")}
          </button>
        )
      ))}
    </div>
  );


  return (
    <div className={`bg-[#131212] rounded-lg p-4 flex flex-col ${className}`}>
      <div className="w-full relative">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <CircularProgress />
          </div>
        ) : (
          <div ref={scrollRef}>
            <AnimatePresence>
              <div className="flex w-full flex-col">
                {/* Tabs always visible */}
                {renderTabs()}
                <div className="bg-amber-50 h-0.5 w-full mb-2"></div>

                {selectedMatch ? (
                  <MatchDetail match={selectedMatch} onBack={() => setSelectedMatch(null)} />
                ) : (
                  <div className="flex w-full">
                    {/* Left Section: Matches */}
                    <div className="w-2/3 pr-4">
                      <div
                        className="space-y-6 h-110 overflow-y-scroll"
                        style={{ scrollbarWidth: "none" }}
                      >
                        {tab === MATCH_TABS.LIVE && (
                          liveMatches.length > 0 ? (
                            renderMatchesByLeague(liveMatches, true)
                          ) : (
                            <p className="text-white">No live matches available</p>
                          )
                        )}
                        {tab === MATCH_TABS.UPCOMING && (
                          upcomingMatches.length > 0 ? (
                            renderMatchesByLeague(upcomingMatches)
                          ) : (
                            <p className="text-white">No upcoming matches available</p>
                          )
                        )}
                        {tab === MATCH_TABS.FINISHED && (
                          finishedMatches.length > 0 ? (
                            renderMatchesByLeague(finishedMatches, false, true)
                          ) : (
                            <p className="text-white">No finished matches available</p>
                          )

                        )}
                        {isMobile && (
                          tab === MATCH_TABS.PINNED && (
                            <PinnedLeagues />
                          )
                        )}
                      </div>
                    </div>

                    {/* Right Section: Banner (hidden on mobile when match not selected) */}
                    {/* {!isMobile && ( */}
                    <div className="w-1/3 pt-10 h-50">
                      {banner?.file_url && (
                        <>
                          {banner.file_url.match(/\.(mp4|webm|ogg)$/) ? (
                            <video
                              src={banner.file_url}
                              autoPlay
                              loop
                              muted
                              className="w-full h-full object-cover rounded-2xl"
                            />
                          ) : (
                            <img
                              src={banner.file_url}
                              alt="Banner"
                              className="w-full h-full object-cover rounded-2xl"
                            />
                          )}
                        </>
                      )}
                    </div>
                    {/* )} */}
                  </div>
                )}
              </div>
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default MatchesComponent;