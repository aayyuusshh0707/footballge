import React from 'react'

export default function Layout() {
  return (
    <>
      {/* DESKTOP LAYOUT (3-column) */}

      <div className="hidden md:grid grid-cols-4 gap-4 container mx-auto mt-4 px-4">
        {/* Left Sidebar */}


        <aside className="col-span-1 flex flex-col space-y-4">
          <div className="bg-gray-800 rounded-lg p-4 text-center h-38">
            ferature match
          </div>

          <div className="bg-gray-800 rounded-lg p-4 text-center flex-1 h-38">
            pinnned
          </div>



        </aside>
        {/* Main Content (col-span-2) */}
        <main style={{
          overflowY: "none",
          overflowX: "auto",

          scrollbarWidth: "thin",
          scrollbarColor: "#4B5563 #1F2937",
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#1F2937",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#4B5563",
          },



        }} className="col-span-2 space-y-4 ">
          {/* Large Banner */}
          <div className="bg-gray-700 rounded-lg p-4 h-38 text-center">
            <h2 className="text-xl font-semibold">Large Banner</h2>

          </div>
          {/* Subheading + Match Section */}
          <div className="bg-gray-800 rounded-lg p-4 space-y-4">
            {/* Example heading row */}
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Bundesliga</h3>
              <span className="text-sm opacity-75">Upcoming / Finished</span>
            </div>
            {/* Match List */}
            <div className="space-y-2">
              {/* Single match row */}
              <div className="bg-gray-700 rounded p-2 flex justify-between">
                <span>Team A vs Team B</span>
                <span>16:00</span>
              </div>
              <div className="bg-gray-700 rounded p-2 flex justify-between">
                <span>Team C vs Team D</span>
                <span>18:00</span>
              </div>
              <div className="bg-gray-700 rounded p-2 flex justify-between">
                <span>Team E vs Team F</span>
                <span>20:00</span>
              </div>
            </div>
          </div>
          {/* Another League Example */}

          <div class="bg-gray-800 rounded-lg p-4 space-y-4">
            <div class="flex justify-between items-center">
              <h3 class="text-lg font-semibold">Premier League</h3>
              <span class="text-sm opacity-75">In Match</span>
            </div>
            <div class="space-y-2">
              <div class="bg-gray-700 rounded p-2 flex justify-between">
                <span>Team X vs Team Y</span>
                <span>Now</span>
              </div>
              <div class="bg-gray-700 rounded p-2 flex justify-between">
                <span>Team M vs Team N</span>
                <span>16:00</span>
              </div>
            </div>
          </div>
          <div class="bg-gray-800 rounded-lg p-4 space-y-4">
            <div class="flex justify-between items-center">
              <h3 class="text-lg font-semibold">Premier League</h3>
              <span class="text-sm opacity-75">In Match</span>
            </div>
            <div class="space-y-2">
              <div class="bg-gray-700 rounded p-2 flex justify-between">
                <span>Team X vs Team Y</span>
                <span>Now</span>
              </div>
              <div class="bg-gray-700 rounded p-2 flex justify-between">
                <span>Team M vs Team N</span>
                <span>16:00</span>
              </div>
            </div>
          </div>
          <div />
        </main>
        {/* Right Sidebar (col-span-1) */}
        <aside className="col-span-1 flex flex-col space-y-4">
          <div className="bg-gray-800 rounded-lg p-4 text-center h-38">
            Side Banner 1
          </div>
          <div className="bg-gray-800 rounded-lg p-4 text-center h-38">
            Side Banner 2
          </div>
          <div className="bg-gray-800 rounded-lg p-4 text-center flex-1 h-40">
            Side Long Banner
          </div>
        </aside>
      </div>


      {/* MOBILE LAYOUT (single-column) */}
      <div className="md:hidden container mx-auto mt-4 px-4 flex flex-col space-y-4 py-4">
        <div className="grid grid-cols-3 space-x-1">
          <div className="flex flex-col space-y-1">
            <div className="bg-gray-800 text-center p-4 h-18 rounded-2xl">
              Side Banner 1
            </div>
            <div className="bg-gray-800 text-center p-4 h-18 rounded-2xl">
              Pinned match
            </div>
          </div>
          <div className="bg-gray-800  text-center col-span-2 p-4 max-h-40 rounded-2xl">
            Large Banner
          </div>
        </div>
        {/* Home Match Cards */}
        <div className="bg-gray-800 p-4 rounded-md">
          <h3 className="text-lg font-semibold mb-2">nav</h3>
          <div className="space-y-2">
            {/* Example match card placeholders */}
            {/* there the leauge name and the match below the leauge name */}
            <h6>Bundesliga</h6>
            <div className="bg-gray-700 p-2 rounded">team1 vs team2</div>

          </div>
        </div>

        {/* Side Long + Side Banner 2 */}
        <div className="grid grid-cols-3 space-x-1">
          <div className="bg-gray-800  text-center col-span-2 p-4 rounded-2xl">
            Side Long Banner
          </div>
          <div className="bg-gray-800 text-center p-4 rounded-2xl">
            Side Banner 2
          </div>
        </div>

      </div>
    </>
  )
}
