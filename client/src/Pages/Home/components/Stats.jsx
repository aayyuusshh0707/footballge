import React from "react";
const FootballStats = ({ matchData }) => {
  if (!matchData || !matchData.statistics) return <p>No statistics data available.</p>;

  const statsData = matchData.statistics;
  const stats = statsData?.map(({ type }) => ({ label: type, type })) || [];

  const getStatValue = (type, team) => {
    const stat = statsData.find((s) => s.type === type);
    return stat ? parseInt(stat[team]) || 0 : 0;
  };

  return (
    <div className="p-2 rounded-lg text-white">
      {stats.map(({ label, type }) => {
        const homeValue = getStatValue(type, "home");
        const awayValue = getStatValue(type, "away");
        const total = homeValue + awayValue || 1;

        return (
          <div key={type} className="mb-4">
            <p className="text-sm font-semibold text-center">{label}</p>
            <div className="flex items-center gap-2">
              <p className="w-8 text-right">{homeValue}</p>
              <div className="w-full bg-gray-700 rounded-md h-2 relative overflow-hidden">
                <div
                  className="bg-blue-500 h-full absolute"
                  style={{ width: `${(homeValue / total) * 100}%` }}
                ></div>
                <div
                  className="bg-red-500 h-full absolute right-0"
                  style={{ width: `${(awayValue / total) * 100}%` }}
                ></div>
              </div>
              <p className="w-8 text-left">{awayValue}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FootballStats;