import React, { useState, useEffect } from "react";
import { Box, Tab, CircularProgress } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const MatchesComponent = () => {
  const [value, setValue] = useState("1");
  const [liveMatches, setLiveMatches] = useState([]);
  const [upcomingMatches, setUpcomingMatches] = useState([]);
  const [finishedMatches, setFinishedMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_KEY = "e707a9fba8b84e15880fc90307ba2640653124faa7f886c2b00ad099e44b857a";
  const BASE_URL = `https://apiv3.apifootball.com/?action=get_events&APIkey=${API_KEY}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const today = new Date();
        const yesterday = new Date(today);
        const tomorrow = new Date(today);

        yesterday.setDate(today.getDate() - 1);
        tomorrow.setDate(today.getDate() + 1);

        const formatDate = (date) => date.toISOString().split("T")[0];

        // Fetch live matches
        const liveRes = await axios.get(`${BASE_URL}&match_live=1`);
        setLiveMatches(liveRes.data || []);

        // Fetch upcoming matches (next 1 day)
        const upcomingRes = await axios.get(
          `${BASE_URL}&from=${formatDate(today)}&to=${formatDate(tomorrow)}`
        );
        setUpcomingMatches(upcomingRes.data || []);

        // Fetch finished matches (previous 1 day)
        const finishedRes = await axios.get(
          `${BASE_URL}&from=${formatDate(yesterday)}&to=${formatDate(today)}`
        );
        const validFinishedMatches = (finishedRes.data || []).filter(
          (match) => match.match_hometeam_score !== "" && match.match_awayteam_score !== ""
        );
        setFinishedMatches(validFinishedMatches);
      } catch (error) {
        console.error("Error fetching match data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const cleanLeagueTitle = (title) => {
    // Remove any leading numbers, dots, or spaces
    return title.replace(/^\d+\.\s*/, "").trim();
  };

  // Group matches by league name. Each group will be an array of match objects.
  const groupByLeague = (matches) => {
    return matches.reduce((acc, match) => {
      const cleanedLeagueName = cleanLeagueTitle(match.league_name);
      acc[cleanedLeagueName] = acc[cleanedLeagueName] || [];
      acc[cleanedLeagueName].push(match);
      return acc;
    }, {});
  };

  const renderMatchItem = (match, isLive = false, isFinished = false) => {
    const homeScore = match.match_hometeam_score;
    const awayScore = match.match_awayteam_score;

    const getWinnerText = () => {
      if (homeScore > awayScore) return `${match.match_hometeam_name} Won`;
      if (homeScore < awayScore) return `${match.match_awayteam_name} Won`;
      return "Draw";
    };

    return (
      <motion.div
        key={match.match_id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="bg-gray-700 rounded-lg p-3 md:p-4 grid grid-cols-3 items-center shadow-lg"
      >
        {/* Column 1: Home Team */}
        <div className="flex items-center space-x-2">
          <img src={match.team_home_badge} alt="Home" className="w-6 h-6 rounded-full" />
          <span className="text-white font-medium text-xs">{match.match_hometeam_name}</span>
        </div>

        {/* Column 2: Score or Time */}
        <div className="flex flex-col items-center justify-center">
          {isLive || match.match_status === "Live" ? (
            <span className="text-sm font-bold text-green-400">
              {homeScore} - {awayScore}
            </span>
          ) : isFinished ? (
            <>
              <p className="text-sm font-bold text-yellow-400">
                {homeScore} - {awayScore}
              </p>
              <p className="text-xs text-blue-400">{getWinnerText()}</p>
            </>
          ) : (
            <span className="text-gray-300 text-xs">{match.match_time}</span>
          )}
        </div>

        {/* Column 3: Away Team */}
        <div className="flex items-center space-x-2 justify-end">
          <span className="text-white font-medium text-xs">{match.match_awayteam_name}</span>
          <img src={match.team_away_badge} alt="Away" className="w-6 h-6 rounded-full" />
        </div>
      </motion.div>
    );
  };

  const renderMatchesByLeague = (matches, isLive = false, isFinished = false) => {
    const groupedMatches = groupByLeague(matches);
    return Object.keys(groupedMatches).map((league) => {
      // Retrieve the first match of the group to extract league and host country details
      const firstMatch = groupedMatches[league][0];
      // League logo (if needed) can be shown separately if required
      const leagueLogo = firstMatch.league_logo;
      const countryLogo = firstMatch.country_logo;
      const countryName = firstMatch.country_name;

      return (
        <div key={league} className="mb-6">
          <div className="flex items-center space-x-2 mb-2">
            {/* Show host country flag if available */}
            {countryLogo && (
              <img
                src={countryLogo}
                alt={countryName}
                className="w-6 h-6 object-cover rounded-full"
              />
            )}
            <h2 className="text-white text-sm font-bold">
              {countryName ? `${countryName.toUpperCase()} : ${league}` : league}
            </h2>
          </div>
          <div className="space-y-4">
            {groupedMatches[league].map((match) => renderMatchItem(match, isLive, isFinished))}
          </div>
        </div>
      );
    });
  };

  return (
    <div className="w-2/3 pr-4">
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={handleChange}
              aria-label="Football Matches Tabs"
              textColor="inherit"
              indicatorColor="secondary"
            >
              <Tab label="Live" value="1" />
              <Tab label="Upcoming" value="2" />
              <Tab label="Finished" value="3" />
            </TabList>
          </Box>

          {loading ? (
            <div className="flex justify-center items-center h-96">
              <CircularProgress />
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <TabPanel value="1">
                <div className="space-y-4 h-104 overflow-y-scroll" style={{ scrollbarWidth: "none" }}>
                  {liveMatches.length > 0 ? (
                    renderMatchesByLeague(liveMatches, true)
                  ) : (
                    <p className="text-gray-400 text-sm">No live matches available.</p>
                  )}
                </div>
              </TabPanel>

              <TabPanel value="2">
                <div className="space-y-4 h-104 overflow-y-scroll" style={{ scrollbarWidth: "none" }}>
                  {upcomingMatches.length > 0 ? (
                    renderMatchesByLeague(upcomingMatches)
                  ) : (
                    <p className="text-gray-400 text-sm">No upcoming matches.</p>
                  )}
                </div>
              </TabPanel>

              <TabPanel value="3">
                <div className="space-y-6 h-104 overflow-y-scroll" style={{ scrollbarWidth: "none" }}>
                  {finishedMatches.length > 0 ? (
                    renderMatchesByLeague(finishedMatches, false, true)
                  ) : (
                    <p className="text-gray-400 text-sm">No finished matches.</p>
                  )}
                </div>
              </TabPanel>
            </AnimatePresence>
          )}
        </TabContext>
      </Box>
    </div>
  );
};

export default MatchesComponent;

