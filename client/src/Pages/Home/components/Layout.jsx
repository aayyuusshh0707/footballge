import React from 'react';

export default function Layout() {
  return (
    <>

      {/* DESKTOP LAYOUT (3-column) */}
      <div className="hidden md:grid grid-cols-4 gap-4 container mx-auto mt-4 h-full " style={{ gridAutoRows: '1fr' }}>

        {/* Left Sidebar */}
        <aside className="col-span-1 flex flex-col space-y-4">
          <div className="bg-gray-800 rounded-lg p-4 text-center h-36">
            Featured Match
          </div>
          <div className="bg-gray-800 rounded-lg p-4 text-center flex-1 h-38">
            Pinned
          </div>
        </aside>

        {/* Main Content */}
        <main className="col-span-2 flex flex-col space-y-4 flex-grow">
          {/* Large Banner */}
          <div className="bg-gray-700 rounded-lg p-4 h-36 text-center">
            <h2 className="text-xl font-semibold">Large Banner</h2>
          </div>

          {/* Match Section */}
          <div

            className="bg-gray-800 rounded-lg p-4 h-96 flex-grow"
          >
            {/* Heading */}
            <div className="flex justify-between items-center sticky top-0 bg-gray-800 p-2 z-10 ">
              <h3 className="text-lg font-semibold">Bundesliga</h3>
              <span className="text-sm opacity-75">Upcoming / Finished</span>
            </div>

            {/* Match List */}
            <div style={{
              overflowY: 'scroll',
              scrollbarWidth: 'none',
            }} className="space-y-2 h-78 ">
              {[
                { teams: 'Team A vs Team B', time: '16:00' },
                { teams: 'Team C vs Team D', time: '18:00' },
                { teams: 'Team E vs Team F', time: '20:00' },
                { teams: 'Team A vs Team B', time: '16:00' },
                { teams: 'Team C vs Team D', time: '18:00' },
                { teams: 'Team E vs Team F', time: '20:00' },
                { teams: 'Team A vs Team B', time: '16:00' },
                { teams: 'Team C vs Team D', time: '18:00' },
                { teams: 'Team E vs Team F', time: '20:00' },
                { teams: 'Team A vs Team B', time: '16:00' },
                { teams: 'Team C vs Team D', time: '18:00' },
                { teams: 'Team E vs Team F', time: '20:00' },
                { teams: 'Team A vs Team B', time: '16:00' },
                { teams: 'Team C vs Team D', time: '18:00' },
                { teams: 'Team E vs Team F', time: '20:00' },
              ].map((match, index) => (
                <div key={index} className="bg-gray-700 rounded p-2 flex justify-between">
                  <span>{match.teams}</span>
                  <span>{match.time}</span>
                </div>
              ))}
            </div>
          </div>
        </main>

        {/* Right Sidebar */}
        <aside className="col-span-1 flex flex-col space-y-4">
          <div className="bg-gray-800 rounded-lg p-4 text-center h-36">
            Side Banner 1
          </div>
          <div className="bg-gray-800 rounded-lg p-4 text-center h-36">
            Side Banner 2
          </div>
          <div className="bg-gray-800 rounded-lg p-4 text-center flex-1 h-40">
            Side Long Banner
          </div>
        </aside>
      </div>

      {/* MOBILE LAYOUT (single-column) */}
      <div className="md:hidden container mx-auto mt-4 px-4 flex flex-col space-y-4 py-4">
        {/* Top Section */}
        <div className="grid grid-cols-3 space-x-1">
          <div className="flex flex-col space-y-1">
            <div className="bg-gray-800 text-center p-4 h-18 rounded-2xl">
              Side Banner 1
            </div>
            <div className="bg-gray-800 text-center p-4 h-18 rounded-2xl">
              Pinned Match
            </div>
          </div>
          <div className="bg-gray-800 text-center col-span-2 p-4 max-h-40 rounded-2xl">
            Large Banner
          </div>
        </div>

        {/* Match Section */}
        <div className="bg-gray-800 p-4 rounded-md">
          <h3 className="text-lg font-semibold mb-2">Matches</h3>
          <div className="space-y-2">
            <h6>Bundesliga</h6>
            <div className="bg-gray-700 p-2 rounded">Team 1 vs Team 2</div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-3 space-x-1">
          <div className="bg-gray-800 text-center col-span-2 p-4 rounded-2xl">
            Side Long Banner
          </div>
          <div className="bg-gray-800 text-center p-4 rounded-2xl">
            Side Banner 2
          </div>
        </div>
      </div>
    </>
  );
}
