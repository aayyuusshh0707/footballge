import { BASE_URI } from "./Api.service";
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

export const fetchBanners = async () => {
  try {
    const responses = await Promise.all([
      // Desktop
      fetch(`${BASE_URI}/api/desktop-banner/get`),
      fetch(`${BASE_URI}/api/desktop-sidebanner/get`),
      fetch(`${BASE_URI}/api/desktop-sidebannertwo/get`),
      fetch(`${BASE_URI}/api/desktop-sidelongbanner/get`),
      fetch(`${BASE_URI}/api/desktop-matchbanner/get`),
      // iPad
      fetch(`${BASE_URI}/api/ipad-banner/get`),
      fetch(`${BASE_URI}/api/ipad-sidebanner/get`),
      fetch(`${BASE_URI}/api/ipad-sidebannertwo/get`),
      fetch(`${BASE_URI}/api/ipad-sidelongbanner/get`),
      fetch(`${BASE_URI}/api/ipad-matchbanner/get`),
      // Mobile
      fetch(`${BASE_URI}/api/mobile-banner/get`),
      fetch(`${BASE_URI}/api/mobile-sidebanner/get`),
      fetch(`${BASE_URI}/api/mobile-sidebannertwo/get`),
      fetch(`${BASE_URI}/api/mobile-sidelongbanner/get`),
    ]);

    const jsonResponses = await Promise.all(
      responses.map(async (res, index) => {
        if (!res.ok) {
          throw new Error(
            `Failed to fetch API ${index + 1}: ${res.statusText}`
          );
        }
        return res.json();
      })
    );

    return {
      desktopBanner: modifyUrl(jsonResponses[0]),
      sidebarBanner: modifyUrl(jsonResponses[1]),
      sidebarTwoBanner: modifyUrl(jsonResponses[2]),
      longBanner: modifyUrl(jsonResponses[3]),
      matchBanner: modifyUrl(jsonResponses[4]),
      ipadBanner: modifyUrl(jsonResponses[5]),
      ipadSidebarBanner: modifyUrl(jsonResponses[6]),
      ipadSidebarTwoBanner: modifyUrl(jsonResponses[7]),
      ipadLongBanner: modifyUrl(jsonResponses[8]),
      ipadMatchBanner: modifyUrl(jsonResponses[9]),
      mobileBanner: modifyUrl(jsonResponses[10]),
      mobileSidebarBanner: modifyUrl(jsonResponses[11]),
      mobileSidebarTwoBanner: modifyUrl(jsonResponses[12]),
      mobileLongBanner: modifyUrl(jsonResponses[13]),
    };
  } catch (error) {
    console.error("Error fetching banners:", error);
    throw error;
  }
};
