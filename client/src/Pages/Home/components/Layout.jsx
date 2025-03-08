import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { BASE_URI } from '../../../api/api';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

export default function Layout() {
  //desktop
  const [desktopBanner, setDesktopBanner] = useState(null);
  const [longBanner, setLongBanner] = useState(null);
  const [matchBanner, setMatchBanner] = useState(null);
  const [sidebarBanner, setSidebarBanner] = useState(null);
  const [sidebarTwoBanner, setSidebarTwoBanner] = useState(null);
  //mobile
  // Mobile banners
  const [mobileBanner, setMobileBanner] = useState(null);
  const [mobileLongBanner, setMobileLongBanner] = useState(null);
  // const [mobileMatchBanner, setMobileMatchBanner] = useState(null);
  const [mobileSidebarBanner, setMobileSidebarBanner] = useState(null);
  const [mobileSidebarTwoBanner, setMobileSidebarTwoBanner] = useState(null);

  //tabs
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // useEffect(() => {
  //   async function fetchBanners() {
  //     try {
  //       const responses = await Promise.all([
  //         //desktop
  //         fetch(`${BASE_URI}/api/desktop-banner/get`),
  //         fetch(`${BASE_URI}/api/desktop-sidebanner/get`),
  //         fetch(`${BASE_URI}/api/desktop-sidebannertwo/get`),
  //         fetch(`${BASE_URI}/api/desktop-sidelongbanner/get`),
  //         fetch(`${BASE_URI}/api/desktop-matchbanner/get`),
  //         //ipad
  //         fetch(`${BASE_URI}/api/ipad-banner/get`),
  //         fetch(`${BASE_URI}/api/ipad-sidebanner/get`),
  //         fetch(`${BASE_URI}/api/ipad-sidebannertwo/get`),
  //         fetch(`${BASE_URI}/api/ipad-sidelongbanner/get`),
  //         fetch(`${BASE_URI}/api/ipad-matchbanner/get`),
  //         //mobile
  //         fetch(`${BASE_URI}/api/mobile-banner/get`),
  //         fetch(`${BASE_URI}/api/p-sidebanner/get`),
  //         fetch(`${BASE_URI}/api/p-sidebannertwo/get`),
  //         fetch(`${BASE_URI}/api/p-sidelongbanner/get`),
  //         //fetch(`${BASE_URI}/api/phone-matchbanner/get`),

  //       ]);

  //       const [desktop, sidebar, sidebarTwo, long, match ] = await Promise.all(responses.map(res => res.json()));

  //       const modifyUrl = (banner) => {
  //         if (banner?.file_url) {
  //           return {
  //             ...banner,
  //             file_url: banner.file_url.replace("www.dropbox.com", "dl.dropboxusercontent.com").replace("&dl=0", "")
  //           };
  //         }
  //         return banner;
  //       };

  //       setDesktopBanner(modifyUrl(desktop));
  //       setSidebarBanner(modifyUrl(sidebar));
  //       setSidebarTwoBanner(modifyUrl(sidebarTwo));
  //       setLongBanner(modifyUrl(long));
  //       setMatchBanner(modifyUrl(match));
  //     } catch (error) {
  //       console.error('Error fetching banners:', error);
  //     }
  //   }
  //   fetchBanners();
  // }, []);

  useEffect(() => {
    async function fetchBanners() {
      try {
        const responses = await Promise.all([
          // Desktop
          fetch(`${BASE_URI}/api/desktop-banner/get`),
          fetch(`${BASE_URI}/api/desktop-sidebanner/get`),
          fetch(`${BASE_URI}/api/desktop-sidebannertwo/get`),
          fetch(`${BASE_URI}/api/desktop-sidelongbanner/get`),
          fetch(`${BASE_URI}/api/desktop-matchbanner/get`),
          // iPad
          // fetch(`${BASE_URI}/api/ipad-banner/get`),
          // fetch(`${BASE_URI}/api/ipad-sidebanner/get`),
          // fetch(`${BASE_URI}/api/ipad-sidebannertwo/get`),
          // fetch(`${BASE_URI}/api/ipad-sidelongbanner/get`),
          // fetch(`${BASE_URI}/api/ipad-matchbanner/get`),
          // Mobile
          fetch(`${BASE_URI}/api/mobile-banner/get`),
          fetch(`${BASE_URI}/api/mobile-sidebanner/get`),
          fetch(`${BASE_URI}/api/mobile-sidebannertwo/get`),
          fetch(`${BASE_URI}/api/mobile-sidelongbanner/get`),
        ]);

        const jsonResponses = await Promise.all(responses.map(async (res, index) => {
          if (!res.ok) {
            throw new Error(`Failed to fetch API ${index + 1}: ${res.statusText}`);
          }
          return res.json();
        }));

        const modifyUrl = (banner) => {
          if (banner?.file_url) {
            return {
              ...banner,
              file_url: banner.file_url
                .replace("www.dropbox.com", "dl.dropboxusercontent.com")
                .replace("&dl=0", ""),
            };
          }
          return banner;
        };

        // Assign fetched data to respective states
        setDesktopBanner(modifyUrl(jsonResponses[0]));
        setSidebarBanner(modifyUrl(jsonResponses[1]));
        setSidebarTwoBanner(modifyUrl(jsonResponses[2]));
        setLongBanner(modifyUrl(jsonResponses[3]));
        setMatchBanner(modifyUrl(jsonResponses[4]));

        // iPad banners
        // setIpadBanner(modifyUrl(jsonResponses[5]));
        // setIpadSidebarBanner(modifyUrl(jsonResponses[6]));
        // setIpadSidebarTwoBanner(modifyUrl(jsonResponses[7]));
        // setIpadLongBanner(modifyUrl(jsonResponses[8]));
        // setIpadMatchBanner(modifyUrl(jsonResponses[9]));

        // Mobile banners
        setMobileBanner(modifyUrl(jsonResponses[5]));
        setMobileSidebarBanner(modifyUrl(jsonResponses[6]));
        setMobileSidebarTwoBanner(modifyUrl(jsonResponses[7]));
        setMobileLongBanner(modifyUrl(jsonResponses[8]));



      } catch (error) {
        console.error("Error fetching banners:", error);
      }
    }

    fetchBanners();
  }, []);



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
          <div className="h-36 text-center">
            {desktopBanner?.file_url && (
              <>
                {desktopBanner.file_url.match(/\.(mp4|webm|ogg)$/) ? (
                  <video
                    src={desktopBanner.file_url}
                    autoPlay
                    loop
                    muted
                    className="w-full h-full object-cover rounded-2xl"
                  />
                ) : (
                  <img
                    src={desktopBanner.file_url}
                    alt="Desktop Banner"
                    className="w-full h-full object-cover rounded-2xl"
                  />
                )}
              </>
            )}
          </div>


          {/* Match Section */}
          <div className="bg-gray-800 rounded-lg p-4 h-96 flex-grow flex">
            {/* Left Section - Match List */}
            <div className="w-2/3 pr-4">
              <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={value}>
                  <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                      <Tab label="Live" value="1" />
                      <Tab label="Upcoming" value="2" />
                      <Tab label="Finished" value="3" />
                    </TabList>
                  </Box>
                  <TabPanel value="1">
                    {/* LIVE Match List */}
                    <div
                      style={{
                        overflowY: 'scroll',
                        scrollbarWidth: 'none',
                      }}
                      className="space-y-2 h-107"
                    >
                      {[
                        { teams: 'Team A vs Team B', time: '16:00' },
                        { teams: 'Team C vs Team D', time: '18:00' },
                        { teams: 'Team E vs Team F', time: '20:00' },
                        { teams: 'Team A vs Team B', time: '16:00' },
                        { teams: 'Team C vs Team D', time: '18:00' },
                        { teams: 'Team E vs Team F', time: '20:00' },
                        { teams: 'Team A vs Team B', time: '16:00' },
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
                  </TabPanel>
                  <TabPanel value="2">Upcoming Matches</TabPanel>
                  <TabPanel value="3">Finished Matches</TabPanel>
                </TabContext>
              </Box>
            </div>

            {/* Right Section - Image */}

            <div className="w-1/3 pt-10">
              {matchBanner?.file_url && (
                <>
                  {matchBanner.file_url.match(/\.(mp4|webm|ogg)$/) ? (
                    <video
                      src={matchBanner.file_url}
                      autoPlay
                      loop
                      muted
                      className="w-full h-full object-cover rounded-2xl"
                    />
                  ) : (
                    <img
                      src={matchBanner.file_url}
                      alt="Desktop Banner"
                      className="w-full h-full object-cover rounded-2xl"
                    />
                  )}
                </>
              )}

            </div>
          </div>

        </main>

        {/* Right Sidebar */}
        <aside className="col-span-1 flex flex-col space-y-4">
          <div className=" rounded-lg  text-center h-36">
            {sidebarBanner?.file_url && (
              <>
                {sidebarBanner.file_url.match(/\.(mp4|webm|ogg)$/) ? (
                  <video
                    src={sidebarBanner.file_url}
                    autoPlay
                    loop
                    muted
                    className="w-full h-full object-cover rounded-2xl"
                  />
                ) : (
                  <img
                    src={sidebarBanner.file_url}
                    alt="Desktop Banner"
                    className="w-full h-full object-cover rounded-2xl"
                  />
                )}
              </>
            )}
          </div>
          <div className=" rounded-lg text-center h-36">
            {sidebarTwoBanner?.file_url && (
              <>
                {sidebarTwoBanner.file_url.match(/\.(mp4|webm|ogg)$/) ? (
                  <video
                    src={sidebarTwoBanner.file_url}
                    autoPlay
                    loop
                    muted
                    className="w-full h-full object-cover rounded-2xl"
                  />
                ) : (
                  <img
                    src={sidebarTwoBanner.file_url}
                    alt="Desktop Banner"
                    className="w-full h-full object-cover rounded-2xl"
                  />
                )}
              </>
            )}
          </div>
          <div className="rounded-lg text-center h-90">

            {longBanner?.file_url && (
              <>
                {longBanner.file_url.match(/\.(mp4|webm|ogg)$/) ? (
                  <video
                    src={longBanner.file_url}
                    autoPlay
                    loop
                    muted
                    className="w-full h-full object-cover rounded-2xl"
                  />
                ) : (
                  <img
                    src={longBanner.file_url}
                    alt="Desktop Banner"
                    className="w-full h-full object-cover rounded-2xl"
                  />
                )}
              </>
            )}

          </div>
        </aside>
      </div>

      {/* MOBILE LAYOUT (single-column) */}
      <div className="md:hidden container mx-auto mt-4 px-4 flex flex-col space-y-4 py-4">
        {/* Top Section */}
        <div className="grid grid-cols-3 space-x-1">
          <div className="flex flex-col space-y-1">
            <div className=" text-center  h-18 rounded-2xl">
              {mobileSidebarBanner?.file_url && (
                <>
                  {mobileSidebarBanner.file_url.match(/\.(mp4|webm|ogg)$/) ? (
                    <video
                      src={mobileSidebarBanner.file_url}
                      autoPlay
                      loop
                      muted
                      className="w-full h-full object-cover rounded-2xl"
                    />
                  ) : (
                    <img
                      src={mobileSidebarBanner.file_url}
                      alt="Desktop Banner"
                      className="w-full h-full object-cover rounded-2xl"
                    />
                  )}
                </>
              )}
            </div>
            <div className="bg-gray-800 text-center p-4 h-18 rounded-2xl">
              Pinned Match
            </div>
          </div>
          <div className=" text-center col-span-2  max-h-40 rounded-2xl">
            {mobileBanner?.file_url && (
              <>
                {mobileBanner.file_url.match(/\.(mp4|webm|ogg)$/) ? (
                  <video
                    src={mobileBanner.file_url}
                    autoPlay
                    loop
                    muted
                    className="w-full h-full object-cover rounded-2xl"
                  />
                ) : (
                  <img
                    src={mobileBanner.file_url}
                    alt="Desktop Banner"
                    className="w-full h-full object-cover rounded-2xl"
                  />
                )}
              </>
            )}
          </div>
        </div>

        {/* Match Section */}
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="Live" value="1" />
                <Tab label="Upcoming" value="2" />
                <Tab label="Finished" value="3" />
              </TabList>
            </Box>
            <TabPanel value="1">Item One</TabPanel>
            <TabPanel value="2">Item Two</TabPanel>
            <TabPanel value="3">Item Three</TabPanel>
          </TabContext>
        </Box>


        {/* Bottom Section */}
        <div className="grid grid-cols-3 space-x-1">
          <div className=" text-center col-span-2 rounded-2xl">
            {mobileLongBanner?.file_url && (
              <>
                {mobileLongBanner.file_url.match(/\.(mp4|webm|ogg)$/) ? (
                  <video
                    src={mobileLongBanner.file_url}
                    autoPlay
                    loop
                    muted
                    className="w-full h-full object-cover rounded-2xl"
                  />
                ) : (
                  <img
                    src={mobileLongBanner.file_url}
                    alt="Desktop Banner"
                    className="w-full h-full object-cover rounded-2xl"
                  />
                )}
              </>
            )}
          </div>
          <div className=" text-center  rounded-2xl">
            {mobileSidebarTwoBanner?.file_url && (
              <>
                {mobileSidebarTwoBanner.file_url.match(/\.(mp4|webm|ogg)$/) ? (
                  <video
                    src={mobileSidebarTwoBanner.file_url}
                    autoPlay
                    loop
                    muted
                    className="w-full h-full object-cover rounded-2xl"
                  />
                ) : (
                  <img
                    src={mobileSidebarTwoBanner.file_url}
                    alt="Desktop Banner"
                    className="w-full h-full object-cover rounded-2xl"
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

