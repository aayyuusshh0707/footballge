
import React, { useState, useEffect } from 'react';
import logo from '../../../assets/footballge.png';
import { BASE_URI } from '../../../services/Api.service';

export default function Nav() {
  const [links, setLinks] = useState({ cricket: '#', casino: '#', tournaments: '#' });

  useEffect(() => {
    Promise.all([
      fetch(`${BASE_URI}/api/nav-button/one-get`).then(res => res.json()),
      fetch(`${BASE_URI}/api/nav-button/two-get`).then(res => res.json()),
      fetch(`${BASE_URI}/api/nav-button/three-get`).then(res => res.json())
    ])
      .then(([cricket, casino, tournaments]) => {
        setLinks({ cricket: cricket.url, casino: casino.url, tournaments: tournaments.url });
      })
      .catch(error => console.error('Error fetching links:', error));
  }, []);

  return (
    <nav className="flex w-full items-center p-1  md:p-3 ">
      <img src={logo} alt="Logo" className="h-8 md:h-14" />
      {/* <div className="flex items-center gap-2 md:gap-5 sm:ml-auto ml-0 justify-start "> */}
      <div className="flex items-center gap-2 md:ml-10 ml-auto overflow-x-auto whitespace-nowrap">

        <a href={links.cricket} className="bg-[#131212] text-white font-semibold px-3 md:px-6 py-1 rounded-full text-xs sm:text-sm md:text-base lg:text-lg">
          Cricket
        </a>
        <a href={links.casino} className="bg-[#131212] text-white font-semibold px-3 md:px-6 py-1 rounded-full text-xs sm:text-sm md:text-base lg:text-lg">
          Casino
        </a>
        <a href={links.tournaments} className="bg-[#131212] text-white font-semibold px-3 md:px-6 py-1 rounded-full text-xs sm:text-sm md:text-base lg:text-lg">
          Play
        </a>
      </div>
    </nav>
  );
}