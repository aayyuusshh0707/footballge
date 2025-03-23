import React, { useEffect, useState } from 'react';
import { fetchBanners } from '../../../services/Banner.service';
import MatchesComponent from './Matches';
import LeaguesList from './Leagues';

export default function Layout() {
  // Desktop banners
  const [desktopBanner, setDesktopBanner] = useState(null);
  const [longBanner, setLongBanner] = useState(null);
  const [matchBanner, setMatchBanner] = useState(null);
  const [sidebarBanner, setSidebarBanner] = useState(null);
  const [sidebarTwoBanner, setSidebarTwoBanner] = useState(null);

  // iPad banners
  const [ipadBanner, setIpadBanner] = useState(null);
  const [ipadLongBanner, setIpadLongBanner] = useState(null);
  const [ipadMatchBanner, setIpadMatchBanner] = useState(null);
  const [ipadSidebarBanner, setIpadSidebarBanner] = useState(null);
  const [ipadSidebarTwoBanner, setIpadSidebarTwoBanner] = useState(null);

  // Mobile banners
  const [mobileBanner, setMobileBanner] = useState(null);
  const [mobileLongBanner, setMobileLongBanner] = useState(null);
  const [mobileSidebarBanner, setMobileSidebarBanner] = useState(null);
  const [mobileSidebarTwoBanner, setMobileSidebarTwoBanner] = useState(null);



  // Screen size state
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);


  // Update screen width on resize
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fetch banners
  useEffect(() => {
    const loadBanners = async () => {
      try {
        const banners = await fetchBanners();
        setDesktopBanner(banners.desktopBanner);
        setSidebarBanner(banners.sidebarBanner);
        setSidebarTwoBanner(banners.sidebarTwoBanner);
        setLongBanner(banners.longBanner);
        setMatchBanner(banners.matchBanner);
        setIpadBanner(banners.ipadBanner);
        setIpadSidebarBanner(banners.ipadSidebarBanner);
        setIpadSidebarTwoBanner(banners.ipadSidebarTwoBanner);
        setIpadLongBanner(banners.ipadLongBanner);
        setIpadMatchBanner(banners.ipadMatchBanner);
        setMobileBanner(banners.mobileBanner);
        setMobileSidebarBanner(banners.mobileSidebarBanner);
        setMobileSidebarTwoBanner(banners.mobileSidebarTwoBanner);
        setMobileLongBanner(banners.mobileLongBanner);
      } catch (error) {
        console.error("Error loading banners:", error);
      }
    };

    loadBanners();
  }, []);

  // Determine which banner to show based on screen width
  const getBanner = (desktopBanner, ipadBanner, mobileBanner) => {
    if (screenWidth >= 1024) {
      return desktopBanner; // Desktop
    } else if (screenWidth >= 768 && screenWidth < 1024) {
      return ipadBanner; // iPad
    } else {
      return mobileBanner; // Mobile
    }
  };

  return (
    <>
      {/* DESKTOP LAYOUT (3-column) */}
      <div className="hidden md:grid grid-cols-4 gap-4     h-full p-6" style={{ gridAutoRows: '1fr' }}>
        {/* Left Sidebar */}
        <aside className="col-span-1 flex flex-col space-y-4">
          <div className="bg-gray-800 rounded-lg p-4 text-center h-36">
            Featured Match
          </div>
          <div className="bg-gray-800 rounded-lg p-4  text-center flex-1 ">
          
            <LeaguesList />
            
          </div>
        </aside>

        {/* Main Content */}
        <main className="col-span-2 flex flex-col space-y-4 flex-grow">
          {/* Large Banner */}
          <div className="h-36 text-center">
            {getBanner(desktopBanner, ipadBanner, mobileBanner)?.file_url && (
              <>
                {getBanner(desktopBanner, ipadBanner, mobileBanner).file_url.match(/\.(mp4|webm|ogg)$/) ? (
                  <video
                    src={getBanner(desktopBanner, ipadBanner, mobileBanner).file_url}
                    autoPlay
                    loop
                    muted
                    className="w-full h-full object-cover rounded-2xl"
                  />
                ) : (
                  <img
                    src={getBanner(desktopBanner, ipadBanner, mobileBanner).file_url}
                    alt="Banner"
                    className="w-full h-full object-cover rounded-2xl"
                  />
                )}
              </>
            )}
          </div>
          <div className="bg-gray-800 rounded-lg p-4 h-96 flex-grow flex">

            <MatchesComponent className="w-2/3 pr-4" />

            {/* Right Section - Image */}
            <div className=" w-1/3 pt-10">
              {getBanner(matchBanner, ipadMatchBanner, mobileBanner)?.file_url && (
                <>
                  {getBanner(matchBanner, ipadMatchBanner, mobileBanner).file_url.match(/\.(mp4|webm|ogg)$/) ? (
                    <video
                      src={getBanner(matchBanner, ipadMatchBanner, mobileBanner).file_url}
                      autoPlay
                      loop
                      muted
                      className="w-full h-full object-cover rounded-2xl"
                    />
                  ) : (
                    <img
                      src={getBanner(matchBanner, ipadMatchBanner, mobileBanner).file_url}
                      alt="Banner"
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
          <div className="rounded-lg text-center h-36">
            {getBanner(sidebarBanner, ipadSidebarBanner, mobileSidebarBanner)?.file_url && (
              <>
                {getBanner(sidebarBanner, ipadSidebarBanner, mobileSidebarBanner).file_url.match(/\.(mp4|webm|ogg)$/) ? (
                  <video
                    src={getBanner(sidebarBanner, ipadSidebarBanner, mobileSidebarBanner).file_url}
                    autoPlay
                    loop
                    muted
                    className="w-full h-full object-cover rounded-2xl"
                  />
                ) : (
                  <img
                    src={getBanner(sidebarBanner, ipadSidebarBanner, mobileSidebarBanner).file_url}
                    alt="Banner"
                    className="w-full h-full object-cover rounded-2xl"
                  />
                )}
              </>
            )}
          </div>
          <div className="rounded-lg text-center h-36">
            {getBanner(sidebarTwoBanner, ipadSidebarTwoBanner, mobileSidebarTwoBanner)?.file_url && (
              <>
                {getBanner(sidebarTwoBanner, ipadSidebarTwoBanner, mobileSidebarTwoBanner).file_url.match(/\.(mp4|webm|ogg)$/) ? (
                  <video
                    src={getBanner(sidebarTwoBanner, ipadSidebarTwoBanner, mobileSidebarTwoBanner).file_url}
                    autoPlay
                    loop
                    muted
                    className="w-full h-full object-cover rounded-2xl"
                  />
                ) : (
                  <img
                    src={getBanner(sidebarTwoBanner, ipadSidebarTwoBanner, mobileSidebarTwoBanner).file_url}
                    alt="Banner"
                    className="w-full h-full object-cover rounded-2xl"
                  />
                )}
              </>
            )}
          </div>
          <div className="rounded-lg text-center h-90">
            {getBanner(longBanner, ipadLongBanner, mobileLongBanner)?.file_url && (
              <>
                {getBanner(longBanner, ipadLongBanner, mobileLongBanner).file_url.match(/\.(mp4|webm|ogg)$/) ? (
                  <video
                    src={getBanner(longBanner, ipadLongBanner, mobileLongBanner).file_url}
                    autoPlay
                    loop
                    muted
                    className="w-full h-full object-cover rounded-2xl"
                  />
                ) : (
                  <img
                    src={getBanner(longBanner, ipadLongBanner, mobileLongBanner).file_url}
                    alt="Banner"
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
            <div className="text-center h-18 rounded-2xl">
              {getBanner(sidebarBanner, ipadSidebarBanner, mobileSidebarBanner)?.file_url && (
                <>
                  {getBanner(sidebarBanner, ipadSidebarBanner, mobileSidebarBanner).file_url.match(/\.(mp4|webm|ogg)$/) ? (
                    <video
                      src={getBanner(sidebarBanner, ipadSidebarBanner, mobileSidebarBanner).file_url}
                      autoPlay
                      loop
                      muted
                      className="w-full h-full object-cover rounded-2xl"
                    />
                  ) : (
                    <img
                      src={getBanner(sidebarBanner, ipadSidebarBanner, mobileSidebarBanner).file_url}
                      alt="Banner"
                      className="w-full h-full object-cover rounded-2xl"
                    />
                  )}
                </>
              )}
            </div>
            <div className="bg-gray-800 text-center p-4 h-18 rounded-2xl">
              Featured Match
            </div>
          </div>
          <div className="text-center col-span-2 max-h-40 rounded-2xl">
            {getBanner(desktopBanner, ipadBanner, mobileBanner)?.file_url && (
              <>
                {getBanner(desktopBanner, ipadBanner, mobileBanner).file_url.match(/\.(mp4|webm|ogg)$/) ? (
                  <video
                    src={getBanner(desktopBanner, ipadBanner, mobileBanner).file_url}
                    autoPlay
                    loop
                    muted
                    className="w-full h-full object-cover rounded-2xl"
                  />
                ) : (
                  <img
                    src={getBanner(desktopBanner, ipadBanner, mobileBanner).file_url}
                    alt="Banner"
                    className="w-full h-full object-cover rounded-2xl"
                  />
                )}
              </>
            )}
          </div>
        </div>

        {/* Match Section */}
        <MatchesComponent className={"bg-gray-800 rounded-2xl p-2"} />

        {/* Bottom Section */}
        <div className="grid grid-cols-3 space-x-1">
          <div className="text-center col-span-2 rounded-2xl">
            {getBanner(longBanner, ipadLongBanner, mobileLongBanner)?.file_url && (
              <>
                {getBanner(longBanner, ipadLongBanner, mobileLongBanner).file_url.match(/\.(mp4|webm|ogg)$/) ? (
                  <video
                    src={getBanner(longBanner, ipadLongBanner, mobileLongBanner).file_url}
                    autoPlay
                    loop
                    muted
                    className="w-full h-30 object-cover rounded-2xl"
                  />
                ) : (
                  <img
                    src={getBanner(longBanner, ipadLongBanner, mobileLongBanner).file_url}
                    alt="Banner"
                    className="w-full h-30 object-cover rounded-2xl"
                  />
                )}
              </>
            )}
          </div>
          <div className="text-center rounded-2xl">
            {getBanner(sidebarTwoBanner, ipadSidebarTwoBanner, mobileSidebarTwoBanner)?.file_url && (
              <>
                {getBanner(sidebarTwoBanner, ipadSidebarTwoBanner, mobileSidebarTwoBanner).file_url.match(/\.(mp4|webm|ogg)$/) ? (
                  <video
                    src={getBanner(sidebarTwoBanner, ipadSidebarTwoBanner, mobileSidebarTwoBanner).file_url}
                    autoPlay
                    loop
                    muted
                    className="w-full h-30 object-cover rounded-2xl"
                  />
                ) : (
                  <img
                    src={getBanner(sidebarTwoBanner, ipadSidebarTwoBanner, mobileSidebarTwoBanner).file_url}
                    alt="Banner"
                    className="w-full h-30 object-cover rounded-2xl"
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