import React, { useState, useEffect } from "react";
import FootballStats from "./Stats";
import Lineup from "./Lineup";
import HeadToHead from "./H2h";
// import KeyboardBackspaceTwoToneIcon from '@mui/icons-material/KeyboardBackspaceTwoTone';
import ClearTwoToneIcon from '@mui/icons-material/ClearTwoTone';

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
           <button onClick={onBack} className="mt-2 text-gray-400">
         <ClearTwoToneIcon/>
        </button>
        <p className="text-red-500">{error}</p>
     
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
    <div
      style={{ scrollbarWidth: "none" }}
      className="p-2 rounded-lg w-full text-white space-y-2 h-110 overflow-y-scroll">

      {/* Header */}
      <button onClick={onBack} className=" float-right sticky top-0 bg-[#2F2D2D]  p-1 rounded text-white hover:bg-blue-600 cursor-pointer  text-sm   ">
     <ClearTwoToneIcon/>
      </button>
      <span className="gap-2 text-lg font-semibold flex items-center "><img className="h-7 rounded-full" src=

        {matchData.league_logo || matchData.country_logo} /> {matchData.league_name}</span>
      <div className="flex items-center justify-between">
        <div className="">
          {/* <div className="flex items-center  justify-between bg-[#2F2D2D] rounded-2xl mt-1 p-6 w-full max-w-md"> */}
          <div className="flex items-center justify-between bg-[#2F2D2D] rounded-2xl  p-6 w-full  sticky top-0 z-50 border border-gray-600">


            {/* Home Team */}
            <div className="flex items-center gap-3">
              <img
                src={match.team_home_badge}
                alt={match.match_hometeam_name}
                className="w-12 h-12 object-contain "
                onError={(e) => (e.target.src = "/placeholder.png")}
              />
              <span className="text-white font-semibold text-sm">
                {match.match_hometeam_name.split(" ")[0]}
              </span>
            </div>

            {/* Score & Time */}
            <div className="text-center text-white font-bold">
              <div className="text-lg">{match.match_hometeam_score} - {match.match_awayteam_score}</div>
              <div className="text-sm text-red-500">{match.match_status}</div>
            </div>

            {/* Away Team */}
            <div className="flex items-center gap-3">
              <span className="text-white font-semibold text-sm">
                {match.match_awayteam_name.split(" ")[0]}
              </span>
              <img
                src={match.team_away_badge}
                alt={match.match_awayteam_name}
                className="w-12 h-12 object-contain"
                onError={(e) => (e.target.src = "/placeholder.png")}
              />
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-3">
            <div className="flex  ">
              {["summary", "stats", "lineup", "H2H", "Table"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 text-lg font-bold focus:outline-none ${activeTab === tab
                    ? ""
                    : "text-gray-400"
                    }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="mt-4  bg-[#2F2D2D] p-3 rounded-2xl ">
              {activeTab === "summary" && (
                <div>
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
                    // <div className="mt-4">
                    //   <h4 className="font-semibold">Head-to-Head Records</h4>
                    //   {matchData.h2h.map((game, index) => (
                    //     <div
                    //       key={index}
                    //       className="flex justify-between border-b border-gray-600 py-2"
                    //     >
                    //       <span>{game.date}</span>
                    //       <span>
                    //         {game.team1} {game.score} {game.team2}
                    //       </span>
                    //     </div>
                    //   ))}
                    // </div>.
                    <HeadToHead/>
                  ) : (
                    <p className="mt-4">No head-to-head records available.</p>
                  )}
                </div>

              )}



              {activeTab === "stats" && (

                <FootballStats matchData={matchData} />
              )}

              {activeTab === "lineup" && (
                // <div>
                //   <h3 className="text-lg font-semibold mb-2">Lineup</h3>
                //   {matchData.lineup ? (
                //     <div>
                //       {/* Home Team Lineup */}
                //       <div>
                //         <h4 className="font-semibold">
                //           Home Team: {matchData.match_hometeam_name}
                //         </h4>
                //         <p>Formation: {matchData.match_hometeam_system || "N/A"}</p>
                //         <div className="mt-2">
                //           <h5 className="font-semibold">Starting XI</h5>
                //           <ul className="list-disc ml-5">
                //             {matchData.lineup.home.starting_lineups.map(
                //               (player, index) => (
                //                 <li key={index}>
                //                   {player.lineup_number}. {player.lineup_player} (Pos:{" "}
                //                   {player.lineup_position})
                //                 </li>
                //               )
                //             )}
                //           </ul>
                //         </div>
                //         <div className="mt-2">
                //           <h5 className="font-semibold">Substitutes</h5>
                //           <ul className="list-disc ml-5">
                //             {matchData.lineup.home.substitutes.map(
                //               (player, index) => (
                //                 <li key={index}>{player.lineup_player}</li>
                //               )
                //             )}
                //           </ul>
                //         </div>
                //       </div>

                //       {/* Away Team Lineup */}
                //       <div className="mt-4">
                //         <h4 className="font-semibold">
                //           Away Team: {matchData.match_awayteam_name}
                //         </h4>
                //         <p>Formation: {matchData.match_awayteam_system || "N/A"}</p>
                //         <div className="mt-2">
                //           <h5 className="font-semibold">Starting XI</h5>
                //           <ul className="list-disc ml-5">
                //             {matchData.lineup.away.starting_lineups.map(
                //               (player, index) => (
                //                 <li key={index}>
                //                   {player.lineup_number}. {player.lineup_player} (Pos:{" "}
                //                   {player.lineup_position})
                //                 </li>
                //               )
                //             )}
                //           </ul>
                //         </div>
                //         <div className="mt-2">
                //           <h5 className="font-semibold">Substitutes</h5>
                //           <ul className="list-disc ml-5">
                //             {matchData.lineup.away.substitutes.map(
                //               (player, index) => (
                //                 <li key={index}>{player.lineup_player}</li>
                //               )
                //             )}
                //           </ul>
                //         </div>
                //       </div>
                //     </div>
                //   ) : (
                //     <p>No lineup data available.</p>

                //   )}

                // </div>
                <Lineup matchData='86392' /> 
              )}
            </div>
          </div>
        </div>
        <div className="bg-gray-800 p-4 ">right</div>
      </div>

    </div>
  );
};

export default MatchDetail;
