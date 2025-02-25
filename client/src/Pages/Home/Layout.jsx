import React from 'react'

export default function Layout() {
  return (
    <>
      {/* Top Navigation (common for both desktop & mobile) */}
      <nav className="w-full bg-gray-800 p-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          {/* Logo */}
          <div className="text-xl font-bold tracking-wide">Football GE</div>
          {/* Desktop Nav Items */}
          <div className="hidden md:flex space-x-4">
            <a href="#" className="hover:text-gray-300">
              Cricket
            </a>
            <a href="#" className="hover:text-gray-300">
              2-3
            </a>
            <a href="#" className="hover:text-gray-300">
              Play Tournaments
            </a>
          </div>
        </div>
        {/* Mobile Nav Button (optional) */}
        <button className="md:hidden bg-gray-700 px-3 py-2 rounded hover:bg-gray-600">
          Menu
        </button>
      </nav>
      {/* DESKTOP LAYOUT (3-column) */}
      <div className="hidden md:grid grid-cols-4 gap-4 container mx-auto mt-4 px-4">
        {/* Left Sidebar */}
        <aside className="col-span-1 bg-gray-800 rounded-lg p-4 space-y-2">
          <h2 className="text-lg font-semibold mb-2">Leagues</h2>
          <ul className="space-y-1">
            <li>
              <a href="#" className="block hover:text-gray-300">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="block hover:text-gray-300">
                Premier League
              </a>
            </li>
            <li>
              <a href="#" className="block hover:text-gray-300">
                La Liga
              </a>
            </li>
            <li>
              <a href="#" className="block hover:text-gray-300">
                Serie A
              </a>
            </li>
            <li>
              <a href="#" className="block hover:text-gray-300">
                Manchester City
              </a>
            </li>
            <li>
              <a href="#" className="block hover:text-gray-300">
                Manchester United
              </a>
            </li>
          </ul>
        </aside>
        {/* Main Content (col-span-2) */}
        <main className="col-span-2 space-y-4">
          {/* Large Banner */}
          <div className="bg-gray-700 rounded-lg p-4 text-center">
            <h2 className="text-xl font-semibold">Large Banner</h2>
            <p className="text-sm mt-1">
              Dortmund vs Bremen | Jan 21 | 19:00 | Signal Iduna Park
            </p>
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
          {/* <div class="bg-gray-800 rounded-lg p-4 space-y-4">
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
</div> */}
        </main>
        {/* Right Sidebar (col-span-1) */}
        <aside className="col-span-1 flex flex-col space-y-4">
          <div className="bg-gray-800 rounded-lg p-4 text-center">
            Side Banner 1
          </div>
          <div className="bg-gray-800 rounded-lg p-4 text-center">
            Side Banner 2
          </div>
          <div className="bg-gray-800 rounded-lg p-4 text-center flex-1">
            Side Long Banner
          </div>
        </aside>
      </div>
      {/* MOBILE LAYOUT (single-column) */}
      <div className="md:hidden container mx-auto mt-4 px-4 flex flex-col space-y-4">
        {/* Side Banner 1 */}
        <div className="bg-gray-800 p-4 rounded-md text-center">Side Banner 1</div>
        {/* Featured Match Label + Large Banner */}
        <div>
          <span className="block text-sm text-gray-400 uppercase mb-1">
            Featured match
          </span>
          <div className="bg-gray-700 p-4 rounded-md text-center">
            <h2 className="text-xl font-semibold">Dortmund vs Bremen</h2>
            <p className="text-sm mt-1">Jan 21 | 19:00 | Signal Iduna Park</p>
          </div>
        </div>
        {/* Home Match Cards */}
        <div className="bg-gray-800 p-4 rounded-md">
          <h3 className="text-lg font-semibold mb-2">Home Match Cards</h3>
          <div className="space-y-2">
            {/* Example match card placeholders */}
            <div className="bg-gray-700 p-2 rounded">Bundesliga (Image/Badge)</div>
            <div className="bg-gray-700 p-2 rounded">Bundesliga (Image/Badge)</div>
            <div className="bg-gray-700 p-2 rounded">Bundesliga (Image/Badge)</div>
          </div>
        </div>
        {/* Pinned Leagues / In Match */}
        <div className="bg-gray-800 p-4 rounded-md">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold">Pinned Leagues</h3>
            <span className="text-sm text-gray-400">In Match</span>
          </div>
          <div className="space-y-2">
            <div className="bg-gray-700 p-2 rounded">Premier League (Now)</div>
            <div className="bg-gray-700 p-2 rounded">La Liga (16:00)</div>
          </div>
        </div>
        {/* Side Long + Side Banner 2 */}
        <div className="bg-gray-800 p-4 rounded-md text-center">
          Side Long Banner
        </div>
        <div className="bg-gray-800 p-4 rounded-md text-center">Side Banner 2</div>
      </div>
    </>
  )
}
