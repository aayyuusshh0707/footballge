import React, { useState, useEffect } from 'react';
import logo from '../../../assets/footballge.png';
import { BASE_URI } from '../../../api/api';

export default function Nav() {
  const [links, setLinks] = useState({ cricket: '#', casino: '#', tournaments: '#' });

  useEffect(() => {
    Promise.all([
      fetch(`${BASE_URI}/api/button-one/getlink`).then(res => res.json()),
      fetch(`${BASE_URI}/api/button-two/getlink`).then(res => res.json()),
      fetch(`${BASE_URI}/api/button-three/getlink`).then(res => res.json())
    ])
      .then(([cricket, casino, tournaments]) => {
        setLinks({ cricket: cricket.url, casino: casino.url, tournaments: tournaments.url });
      })
      .catch(error => console.error('Error fetching links:', error));
  }, []);

  return (
    <div>
      <nav className="flex items-center md:px-14 pt-2 gap-5 justify-center md:justify-start md:gap-19  ">
        <div className="flex items-center space-x-1">
          <img src={logo} alt="Logo" className="h-8 md:h-12" />
        </div>
        <div className="flex space-x-1">
          <a href={links.cricket} className="bg-gray-600 text-white font-semibold px-3 py-1 rounded-full cursor-pointer text-xs sm:text-sm md:text-base">Cricket</a>
          <a href={links.casino} className="bg-gray-600 text-white font-semibold px-3 py-1 rounded-full cursor-pointer text-xs sm:text-sm md:text-base">Casino</a>
          <a href={links.tournaments} className="bg-gray-600 text-white font-semibold px-3 py-1 rounded-full cursor-pointer text-xs sm:text-sm md:text-base">Play</a>
        </div>
      </nav>
    </div>
  );
}
